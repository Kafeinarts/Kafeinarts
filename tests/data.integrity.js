/**
 * Data integrity test (tanpa dependensi — cukup `node tests/data.integrity.js`).
 *
 * Tujuan: menangkap error klasik yang bikin web crash saat runtime, contohnya
 *     TypeError: Cannot read properties of undefined (reading 'description')
 * yang muncul di src/router/index.js waktu meta halaman produk dibangun.
 *
 * Yang dicek:
 *   1. src/data/products.json TIDAK boleh ada (menyaingi folder src/data/products/
 *      → import "@/data/products" diam-diam jatuh ke file JSON → hero undefined).
 *   2. Setiap public/data/products/<slug>.json valid, slug = nama file, punya
 *      meta.name + hero.description; field demo bertipe benar (is_demo boolean,
 *      url_demo string).
 *   3. Setiap produk punya halaman Vue di src/views/products/<slug>/index.vue.
 *   4. Setiap produk terdaftar di PRODUCT_SLUGS (src/data/products/index.js).
 *   5. Slug unik, dan daftar slug di catalog.json = isi folder products/.
 *   6. Semua file JSON yang di-import siteData.js benar-benar ada.
 *
 * Catatan: JSON produk di-fetch runtime dari public/data/products/ (lihat
 * commit "data produk di-fetch runtime"); folder src/data/products/ hanya
 * berisi index.js (store + PRODUCT_SLUGS).
 *
 * Dipakai oleh `npm test` (juga oleh CI).
 */
const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const DATA = path.join(ROOT, "src", "data")
// JSON produk di-fetch runtime dari public/ (bukan di-bundle dari src/)
const PRODUCT_DATA = path.join(ROOT, "public", "data", "products")
const PRODUCT_VIEWS = path.join(ROOT, "src", "views", "products")

const errors = []
const fail = (msg) => errors.push(msg)

// 1. Jangan ada file yang menyaingi folder src/data/products/
if (fs.existsSync(path.join(DATA, "products.json"))) {
  fail(
    "src/data/products.json tidak boleh ada — menyaingi folder src/data/products/ " +
      "sehingga import '@/data/products' bisa terbaca sebagai file JSON (hero undefined). " +
      "Pindahkan isinya ke src/data/catalog.json."
  )
}

// 2-5. Data tiap produk
const files = fs
  .readdirSync(PRODUCT_DATA)
  .filter((f) => f.endsWith(".json"))
  .sort()

const slugs = []
const indexPath = path.join(DATA, "products", "index.js")
const indexSource = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf8") : ""

if (!indexSource) {
  fail("src/data/products/index.js tidak ditemukan")
}

for (const file of files) {
  const rel = `public/data/products/${file}`
  const slug = file.replace(/\.json$/, "")
  slugs.push(slug)

  let json
  try {
    json = JSON.parse(fs.readFileSync(path.join(PRODUCT_DATA, file), "utf8"))
  } catch (e) {
    fail(`${rel}: JSON tidak valid — ${e.message}`)
    continue
  }

  if (!json.meta || !json.meta.slug) fail(`${rel}: meta.slug kosong`)
  else if (json.meta.slug !== slug) fail(`${rel}: meta.slug "${json.meta.slug}" tidak sama dengan nama file`)
  if (!json.meta || !json.meta.name) fail(`${rel}: meta.name kosong`)
  if (!json.meta || !json.meta.route) fail(`${rel}: meta.route kosong (dipakai router)`)
  if (!json.hero || !json.hero.description) {
    fail(`${rel}: hero.description kosong — ini penyebab error di src/router/index.js`)
  }
  if (!json.pricing || !Array.isArray(json.pricing.plans) || json.pricing.plans.length === 0) {
    fail(`${rel}: pricing.plans kosong`)
  }

  // Field demo: is_demo boolean + url_demo string ("" = belum ada demo)
  if ("is_demo" in json && typeof json.is_demo !== "boolean") {
    fail(`${rel}: is_demo harus boolean (true = punya demo, false = belum)`)
  }
  if ("url_demo" in json && typeof json.url_demo !== "string") {
    fail(`${rel}: url_demo harus string ("" = belum ada, isi URL bila is_demo true)`)
  }

  // 3. Halaman Vue untuk produk ini
  const view = path.join(PRODUCT_VIEWS, slug, "index.vue")
  if (!fs.existsSync(view)) {
    fail(`src/views/products/${slug}/index.vue tidak ada — route /products/${slug} akan error`)
  }

  // 4. Sudah terdaftar di PRODUCT_SLUGS?
  if (indexSource && indexSource.indexOf(`"${slug}"`) === -1) {
    fail(`src/data/products/index.js: PRODUCT_SLUGS belum memuat "${slug}"`)
  }
}

// 5. Slug unik
if (new Set(slugs).size !== slugs.length) {
  fail("Ada slug produk ganda di folder src/data/products/")
}

// 5b. catalog.json sinkron dengan folder products/
const catalogPath = path.join(DATA, "catalog.json")
if (!fs.existsSync(catalogPath)) {
  fail("src/data/catalog.json tidak ditemukan")
} else {
  try {
    const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"))
    const catalogSlugs = (catalog.products || []).map((p) => p.slug)
    const missing = slugs.filter((s) => !catalogSlugs.includes(s))
    const extra = catalogSlugs.filter((s) => !slugs.includes(s))
    if (missing.length) fail(`src/data/catalog.json belum mencantumkan: ${missing.join(", ")}`)
    if (extra.length) fail(`src/data/catalog.json mencantumkan produk yang tidak ada: ${extra.join(", ")}`)
    if (!catalog.catalogPage || !catalog.catalogPage.subtitle) {
      fail("src/data/catalog.json: catalogPage.subtitle kosong (dipakai meta deskripsi route /products)")
    }
  } catch (e) {
    fail(`src/data/catalog.json: JSON tidak valid — ${e.message}`)
  }
}

// 6. Semua file JSON yang di-import siteData.js ada
const siteDataPath = path.join(DATA, "siteData.js")
if (fs.existsSync(siteDataPath)) {
  const src = fs.readFileSync(siteDataPath, "utf8")
  const re = /from\s+["']\.\/([\w.-]+\.json)["']/g
  let m
  while ((m = re.exec(src)) !== null) {
    if (!fs.existsSync(path.join(DATA, m[1]))) {
      fail(`src/data/siteData.js meng-import ./${m[1]} tetapi file itu tidak ada`)
    }
  }
}

// Hasil
if (errors.length) {
  console.log("=== DATA INTEGRITY TEST: GAGAL ===")
  errors.forEach((e) => console.log(" ✗ " + e))
  process.exitCode = 1
} else {
  console.log(`=== DATA INTEGRITY TEST: OK (${slugs.length} produk) ===`)
}
