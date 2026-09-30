/**
 * Helper inisialisasi AOS (Animate On Scroll) yang dipakai vendor
 * di public/assets/vendor/aos/aos.js (global window.AOS).
 */

/** Status inisialisasi internal modul (AOS.sendiri tidak menyediakannya). */
let aosInitialized = false

export function initAOS(extraOptions = {}) {
  const AOS = window.AOS
  if (!AOS) {
    console.warn("[AOS] library belum ter-load")
    return false
  }
  try {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      ...extraOptions,
    })
    AOS.refresh()
    aosInitialized = true
    return true
  } catch (e) {
    console.warn("[AOS] gagal inisialisasi", e)
    return false
  }
}

export function refreshAOS() {
  try {
    if (window.AOS) window.AOS.refresh()
  } catch (e) {
    /* noop */
  }
}

/**
 * refreshAOS() yang aman dipanggil sebelum AOS.init() pernah dijalankan:
 * elemen data-aos tidak akan "nyangkut" transparan selamanya.
 */
export function refreshAosSafely() {
  const AOS = window.AOS
  if (!AOS) return false
  if (!aosInitialized) {
    return initAOS()
  }
  return refreshAOS()
}
