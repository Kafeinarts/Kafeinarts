/**
 * Kafeinarts - Produk (folder data terpisah per produk)
 * ------------------------------------------------------------------
 * Setiap produk punya 1 file JSON berisi seluruh konten halamannya:
 *
 *   src/data/products/
 *   ├── erp.json               (data_erp.json → konten halaman ERP)
 *   ├── simrs.json             (data_simrs.json → konten halaman SIMRS)
 *   ├── lms.json               ...
 *   ├── cms.json
 *   ├── event-management.json
 *   ├── company-profile.json
 *   ├── landing-page.json
 *   ├── web-profile.json
 *   ├── e-commerce.json
 *   └── index.js               ← file ini (agregator, jangan diubah manual)
 *
 * CARA MENGGANTI ISI WEBSITE PRODUK:
 *   → Edit file JSON produk terkait saja (harga, fitur, FAQ, dsb.).
 *     Tidak perlu menyentuh komponen Vue sama sekali.
 *
 * CARA MENAMBAH PRODUK BARU:
 *   1. Buat src/data/products/<slug>.json dengan struktur yang sama.
 *   2. Daftarkan import-nya di daftar PRODUCTS_JSON di bawah.
 *   3. Buat src/views/products/<slug>/index.vue (lihat contoh erp/index.vue).
 *   Route, menu navbar, dan katalog otomatis mengikuti.
 */
import erpJson from "./erp.json";
import simrsJson from "./simrs.json";
import lmsJson from "./lms.json";
import cmsJson from "./cms.json";
import eventManagementJson from "./event-management.json";
import companyProfileJson from "./company-profile.json";
import landingPageJson from "./landing-page.json";
import webProfileJson from "./web-profile.json";
import ecommerceJson from "./e-commerce.json";

/** Daftar seluruh data produk — urutan = urutan tampil di katalog & menu. */
export const PRODUCTS_JSON = [
  erpJson,
  simrsJson,
  lmsJson,
  cmsJson,
  eventManagementJson,
  companyProfileJson,
  landingPageJson,
  webProfileJson,
  ecommerceJson,
];

/**
 * Format harga ke Rupiah (mis. 3500000 → "Rp 3.500.000").
 * @param {number} value angka harga
 * @param {string} [currency="IDR"]
 */
export function formatPrice(value, currency = "IDR") {
  if (typeof value !== "number" || Number.isNaN(value)) return "";
  return currency === "IDR"
    ? `Rp ${new Intl.NumberFormat("id-ID").format(value)}`
    : `${currency} ${new Intl.NumberFormat("id-ID").format(value)}`;
}

/**
 * Ambil label harga siap tampil dari satu paket.
 * Prioritas: price (angka) → priceLabel (teks) → "Hubungi Kami".
 */
export function priceLabel(plan) {
  if (!plan) return "";
  if (plan.priceLabel) return plan.priceLabel;
  if (plan.price != null) return formatPrice(plan.price, plan.currency);
  return "Hubungi Kami";
}

/**
 * Petakan satu JSON produk menjadi objek yang siap dipakai komponen.
 * Bentuknya superset dari katalog + detail: komponen mana pun bisa
 * membaca field yang sama (name, icon, color, ...) tanpa tahu sumbernya.
 */
export function mapProduct(json) {
  const catalog = {
    slug: json.meta.slug || json.meta.route.replace("/products/", ""),
    name: json.meta.name,
    shortName: json.meta.shortName,
    category: json.meta.category,
    icon: json.meta.icon,
    color: json.meta.color,
    tagline: json.hero.tagline,
    desc: json.hero.description,
    // Ringkasan harga untuk katalog: ambil paket termurah bertipe angka,
    // atau paket "featured" bila labelnya teks (mis. "Hubungi Kami").
    priceFrom: priceFrom(json.pricing),
  };
  return { ...json, ...catalog };
}

/**
 * Ringkasan harga termurah ("Mulai Rp 2,5 Juta") untuk kartu katalog.
 */
export function priceFrom(pricing) {
  const plans = (pricing && pricing.plans) || [];
  const numeric = plans.filter((p) => typeof p.price === "number");
  if (numeric.length === 0) return null;
  const cheapest = numeric.reduce((a, b) => (a.price <= b.price ? a : b));
  return {
    label: formatPrice(cheapest.price, cheapest.currency),
    period: cheapest.period || "",
    name: cheapest.name,
  };
}

/** Semua produk, sudah dimapping (urutan sesuai PRODUCTS_JSON). */
export const products = PRODUCTS_JSON.map(mapProduct);

/** Cari produk berdasarkan slug (mis. "erp"). */
export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

/** Produk lain (untuk "Produk Terkait" di bawah halaman detail). */
export function getOtherProducts(slug, limit = 3) {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}

export default {
  PRODUCTS_JSON,
  products,
  mapProduct,
  formatPrice,
  priceLabel,
  priceFrom,
  getProductBySlug,
  getOtherProducts,
};
