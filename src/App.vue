<template>
  <!-- Skip link: aksesibilitas & SEO (lewati navigasi header) -->
  <a href="#main-content" class="skip-link">Lewati ke konten utama</a>

  <SiteHeader />

  <router-view />

  <SiteFooter />

  <ScrollTop />

  <!-- Preloader -->
  <div id="preloader" v-if="loading"></div>
</template>

<script>
import SiteHeader from "@/components/layout/SiteHeader.vue"
import SiteFooter from "@/components/layout/SiteFooter.vue"
import ScrollTop from "@/components/layout/ScrollTop.vue"
import { initAOS, refreshAOS } from "@/utils/aos"
import { initSeo } from "@/utils/seo"

export default {
  name: "App",
  components: {
    SiteHeader,
    SiteFooter,
    ScrollTop,
  },
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    // Kelas halaman dipakai CSS: .index-page .header (navbar transparan)
    // dan .index-page.scrolled .header (navbar solid #00205D)
    document.body.classList.add("index-page")

    // Structured data (JSON-LD) + sinkronisasi <title>/canonical
    initSeo()

    // Preloader dihapus setelah halaman selesai dimuat
    const hidePreloader = () => {
      this.loading = false
    }
    if (document.readyState === "complete") {
      hidePreloader()
    } else {
      window.addEventListener("load", hidePreloader, { once: true })
    }
    // Fallback agar preloader tidak menyangkut
    this.preloaderTimer = setTimeout(hidePreloader, 2500)

    // Seluruh section sudah dirender oleh child components sebelum mounted() ini
    this.$nextTick(() => {
      initAOS()
      // Posisi animasi dihitung ulang setelah gambar selesai dimuat
      window.addEventListener("load", refreshAOS, { once: true })
      this.aosTimer = setTimeout(refreshAOS, 500)
    })
  },
  beforeUnmount() {
    document.body.classList.remove("index-page", "scrolled", "mobile-nav-active")
    if (this.preloaderTimer) clearTimeout(this.preloaderTimer)
    if (this.aosTimer) clearTimeout(this.aosTimer)
    window.removeEventListener("load", refreshAOS)
  },
}
</script>
