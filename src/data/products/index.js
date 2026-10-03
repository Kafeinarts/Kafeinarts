/**
 * Kafeinarts - Runtime Product Store
 * ------------------------------------------------------------------
 * Seluruh konten halaman produk hidup sebagai file JSON statis di:
 *
 *   public/data/products/<slug>.json
 *
 * File itu di-FETCH saat runtime (bukan di-bundle), sehingga:
 *   - Mengubah isi website produk = edit JSON-nya saja (tanpa build ulang),
 *   - Setiap JSON terlihat di DevTools → tab Network (request terpisah),
 *   - Menambah produk baru = cukup tambah 1 file JSON + 1 entri di
 *     `PRODUCT_SLUGS` di bawah + 1 folder views/products/<slug>/.
 *
 * Konsumen data (komponen/router) membaca lewat store reaktif di sini,
 * bukan import langsung, agar status loading/error tertata di satu tempat.
 */
import { reactive } from "vue"

/** Daftar slug produk — urutan = urutan tampil di katalog & menu. */
export const PRODUCT_SLUGS = [
  "erp",
  "simrs",
  "lms",
  "cms",
  "event-management",
  "point-of-sale",
  "company-profile",
  "landing-page",
  "web-profile",
  "e-commerce",
  "undangan-digital",
]

/**
 * State internal store (reaktif). Array `items` diisi IN-PLACE saat fetch
 * selesai — identitasnya tetap sehingga referensi lama (mis. siteData.products)
 * otomatis ikut ter-update di semua komponen.
 */
const state = reactive({
  items: [], // objek produk hasil mapProduct()
  loaded: false, // true setelah fetch pertama selesai
  loading: false,
  error: null, // pesan error bila fetch gagal
})

/** Export reaktif untuk konsumen Vue. */
export const productsState = state

/** URL JSON satu produk (relatif → ikut base URL saat deploy di subfolder). */
export function productJsonUrl(slug) {
  return `${process.env.BASE_URL}data/products/${slug}.json`
}

/** Format harga ke Rupiah (mis. 3500000 → "Rp 3.500.000"). */
export function formatPrice(value, currency = "IDR") {
  if (typeof value !== "number" || Number.isNaN(value)) return ""
  return currency === "IDR"
    ? `Rp ${new Intl.NumberFormat("id-ID").format(value)}`
    : `${currency} ${new Intl.NumberFormat("id-ID").format(value)}`
}

/**
 * Label harga siap tampil dari satu paket.
 * Prioritas: priceLabel (teks) → price (angka, diformat) → "Hubungi Kami".
 */
export function priceLabel(plan) {
  if (!plan) return ""
  if (plan.priceLabel) return plan.priceLabel
  if (plan.price != null) return formatPrice(plan.price, plan.currency)
  return "Hubungi Kami"
}

/** Ringkasan harga termurah untuk kartu katalog ("Mulai Rp …"). */
export function priceFrom(pricing) {
  const plans = (pricing && pricing.plans) || []
  const numeric = plans.filter((p) => typeof p.price === "number")
  if (numeric.length === 0) return null
  const cheapest = numeric.reduce((a, b) => (a.price <= b.price ? a : b))
  return {
    label: formatPrice(cheapest.price, cheapest.currency),
    period: cheapest.period || "",
    name: cheapest.name,
  }
}

/**
 * Petakan JSON mentah menjadi objek produk siap pakai.
 * Semua komponen membaca bentuk objek ini (bentuk konsisten satu tempat).
 */
export function mapProduct(json) {
  const meta = json.meta || {}
  const slug = meta.slug || ""
  return {
    slug,
    name: meta.name || slug,
    shortName: meta.shortName || slug,
    category: meta.category || "system",
    icon: meta.icon || "bi-box",
    color: meta.color || "#00205D",
    tagline: (json.hero && json.hero.tagline) || "",
    desc: (json.hero && json.hero.description) || "",
    priceFrom: priceFrom(json.pricing),
    // Sisanya diteruskan apa adanya (hero, features, pricing, dst.)
    ...json,
  }
}

/** Cache promise agar fetch hanya dilakukan sekali untuk semua konsumen. */
let loadPromise = null

/**
 * Fetch seluruh JSON produk sekali, simpan di state reaktif.
 * Dipanggil dari main.js sebelum app di-mount (router & navbar butuh datanya).
 */
export function loadProducts() {
  if (loadPromise) return loadPromise
  state.loading = true

  loadPromise = Promise.all(
    PRODUCT_SLUGS.map((slug) =>
      fetch(productJsonUrl(slug))
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status} saat memuat ${slug}.json`)
          return res.json()
        })
        .then((json) => mapProduct(json))
    )
  )
    .then((items) => {
      // Isi array in-place agar referensi lama tetap valid & reaktif.
      state.items.splice(0, state.items.length, ...items)
      state.loaded = true
      state.loading = false
      state.error = null
      return items
    })
    .catch((err) => {
      state.loading = false
      state.error = (err && err.message) || "Gagal memuat data produk"
      loadPromise = null // boleh dicoba lagi
      console.error("[products] gagal memuat data produk:", err)
      throw err
    })

  return loadPromise
}

/** Semua produk (array reaktif; aman dibaca kapan pun). */
export function getProducts() {
  return state.items
}

/** Cari produk berdasarkan slug (mis. "erp"). Null bila belum ter-load. */
export function getProductBySlug(slug) {
  return state.items.find((p) => p.slug === slug) || null
}

/** Produk lain untuk section "Produk Terkait". */
export function getOtherProducts(slug, limit = 3) {
  return state.items.filter((p) => p.slug !== slug).slice(0, limit)
}

export default {
  productsState,
  PRODUCT_SLUGS,
  loadProducts,
  getProducts,
  getProductBySlug,
  getOtherProducts,
  mapProduct,
  formatPrice,
  priceLabel,
  priceFrom,
  productJsonUrl,
}
