/**
 * Helper inisialisasi AOS (Animate On Scroll) yang dipakai vendor
 * di public/assets/vendor/aos/aos.js (global window.AOS).
 */

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
