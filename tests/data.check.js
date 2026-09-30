/**
 * Data integrity check — Kafeinarts
 * ------------------------------------------------------------------
 * Dipakai oleh script "test" (dijalankan GitHub Actions via `npm test`).
 * Memvalidasi tanpa perlu browser/server:
 *   1. Semua file JSON di src/data parse valid.
 *   2. Setiap produk punya field wajib + folder view (src/views/products/<slug>/index.vue).
 *   3. Semua route name di nav.json terdaftar di router.
 *   4. Target WhatsApp valid (format 62xxx) dan defaultTarget tersedia.
 */
const fs = require("fs")
const path = require("path")

const ROOT = path.join(__dirname, "..")
const DATA_DIR = path.join(ROOT, "src", "data")
const PRODUCTS_VIEW_DIR = path.join(ROOT, "src", "views", "products")

const JSON_FILES = [
  "brand.json",
  "nav.json",
  "pages.json",
  "products.json",
  "consultation.json",
  "contact.json",
  "footer.json",
]

const errors = []
const ok = (cond, msg) => {
  if (!cond) errors.push(msg)
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"))
  } catch (e) {
    errors.push(`${file}: JSON tidak valid — ${e.message}`)
    return null
  }
}

// 1. Semua JSON parse valid
const json = {}
JSON_FILES.forEach((file) => {
  const parsed = readJson(file)
  if (parsed) json[file] = parsed
})

// 2. Produk: field wajib + folder view ada
let products = []
if (json["products.json"]) {
  products = json["products.json"].products || []
  ok(products.length > 0, "products.json: daftar produk kosong")

  const slugs = new Set()
  products.forEach((p) => {
    ok(p.slug && !slugs.has(p.slug), `products.json: slug kosong/duplikat ("${p.slug}")`)
    slugs.add(p.slug)
    ;["name", "shortName", "category", "icon", "color", "tagline", "desc"].forEach((f) =>
      ok(p[f], `products.json: produk "${p.slug}" — field "${f}" kosong`)
    )
    ok(Array.isArray(p.features) && p.features.length > 0, `products.json: produk "${p.slug}" — features kosong`)
    ok(Array.isArray(p.stats) && p.stats.length > 0, `products.json: produk "${p.slug}" — stats kosong`)
    ok(
      fs.existsSync(path.join(PRODUCTS_VIEW_DIR, p.slug, "index.vue")),
      `produk "${p.slug}": folder view tidak ditemukan (src/views/products/${p.slug}/index.vue)`
    )
  })
}

// 3. Nav: semua route name terdaftar di router
if (json["nav.json"]) {
  const nav = json["nav.json"]
  const routerSrc = fs.readFileSync(path.join(ROOT, "src", "router", "index.js"), "utf8")
  const definedRoutes = new Set(
    [...routerSrc.matchAll(/name:\s*'([^']+)'/g)].map((m) => m[1])
  )
  // Route produk dibuat dinamis: product-<slug>
  products.forEach((p) => definedRoutes.add(`product-${p.slug}`))

  const navRouteNames = []
  ;(nav.items || []).forEach((item) => {
    if (item.to && item.to.name) navRouteNames.push(item.to.name)
    if (item.dropdown === "products") navRouteNames.push("products")
  })
  if (nav.cta && nav.cta.to && nav.cta.to.name) navRouteNames.push(nav.cta.to.name)

  navRouteNames.forEach((name) =>
    ok(definedRoutes.has(name), `nav.json: route "${name}" tidak terdaftar di router/index.js`)
  )
}

// 4. Contact: target WhatsApp valid
if (json["contact.json"]) {
  const contact = json["contact.json"]
  const wa = contact.whatsapp || {}
  ok(Array.isArray(wa.targets) && wa.targets.length >= 1, "contact.json: whatsapp.targets kosong")
  const keys = new Set((wa.targets || []).map((t) => t.key))
  ok(keys.has(wa.defaultTarget), "contact.json: defaultTarget tidak ada di daftar targets")
  ;(wa.targets || []).forEach((t) => {
    ok(t.wa && /^6[0-9]{8,13}$/.test(t.wa), `contact.json: nomor WA "${t.wa}" tidak valid (harus 62xxx)`)
    ok(t.label && t.display, `contact.json: target "${t.key}" butuh label & display`)
  })
}

if (errors.length > 0) {
  console.error("DATA CHECK GAGAL:")
  errors.forEach((e) => console.error("  - " + e))
  process.exit(1)
} else {
  console.log(
    `DATA CHECK OK: ${JSON_FILES.length} JSON valid, ${products.length} produk + folder view konsisten, nav & WhatsApp targets valid.`
  )
}
