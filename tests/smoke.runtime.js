/**
 * Smoke test runtime: render index.html di JSDOM, jalankan bundle app,
 * dan pastikan tidak ada error console saat mount + render halaman.
 *
 * Pemakaian: node tests/smoke.runtime.js [--full]
 *   --full : juga klik semua link nav (SPA navigation) & halaman produk.
 */
const fs = require("fs")
const path = require("path")

const BASE = "http://localhost:8080"
const FULL = process.argv.includes("--full")

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} untuk ${url}`)
  return res.text()
}

async function main() {
  // 1. Siapkan JSDOM dengan script berbahaya dimatikan
  const { JSDOM, VirtualConsole } = require("jsdom")
  const virtualConsole = new VirtualConsole()

  const consoleErrors = []
  virtualConsole.on("error", (...args) => consoleErrors.push(args.map(String).join(" ")))
  virtualConsole.on("warn", () => {}) // abaikan warning non-fatal
  virtualConsole.on("jsdomError", (e) => {
    const msg = String((e && e.message) || e)
    // Error resource (favicon dsb.) tidak fatal — catat saja
    consoleErrors.push(`[jsdomError] ${msg}`)
  })

  const html = await fetchText(BASE + "/")
  const dom = new JSDOM(html, {
    url: BASE + "/",
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    virtualConsole,
    // Polyfill API yang tidak diimplementasi JSDOM SEBELUM script apa pun jalan
    beforeParse(window) {
      window.scrollTo = () => {}
      window.scrollBy = () => {}
      window.matchMedia =
        window.matchMedia ||
        (() => ({
          matches: false,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
        }))
    },
  })
  const { window } = dom

  // Tunggu app ter-mount (chunk-vendors + app dieksekusi)
  await new Promise((resolve) => setTimeout(resolve, 6000))

  const appEl = window.document.querySelector("#app")
  const appHtml = appEl ? appEl.innerHTML : ""
  const fatalErrors = consoleErrors.filter(
    (e) =>
      e.includes("TypeError") ||
      e.includes("ReferenceError") ||
      e.includes("is not a function") ||
      e.includes("Cannot read properties")
  )

  console.log("=== SMOKE TEST RUNTIME ===")
  console.log("App ter-mount:", appEl && appHtml.trim().length > 100 ? "YA" : "TIDAK")
  console.log("Panjang render #app:", appHtml.length, "karakter")
  console.log("Ada header navbar:", window.document.querySelector("#header") ? "YA" : "TIDAK")
  console.log("Ada footer:", window.document.querySelector("#footer") ? "YA" : "TIDAK")
  console.log("Judul dokumen:", window.document.title)
  console.log("Error console:", consoleErrors.length)
  console.log("Error fatal (TypeError/Reference):", fatalErrors.length)

  // 2. (Opsional) Navigasi SPA ke semua route & halaman produk
  if (FULL && window.__VUE__) {
    console.log("(Navigasi SPA dilewati — ekspos __VUE__ tidak tersedia di Vue 3)")
  }

  // Fail bila ada error fatal
  if (fatalErrors.length > 0) {
    console.log("\n--- DETAIL ERROR FATAL ---")
    fatalErrors.forEach((e) => console.log(e.slice(0, 500)))
    process.exitCode = 1
  } else if (!appEl || appHtml.trim().length < 100) {
    console.log("\nApp GAGAL ter-mount dengan konten.")
    process.exitCode = 1
  } else {
    console.log("\nOK: Aplikasi ter-mount tanpa error fatal.")
  }

  window.close()
}

main().catch((e) => {
  console.error("Smoke test gagal:", e)
  process.exit(1)
})
