<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">
      <a
        :href="homeHash"
        class="logo d-flex align-items-center me-auto"
        style="--logo-size: 40px; --logo-img-height: 62px"
        @click="handleNavClick(homeHash)"
      >
        <!-- LOGO KAFEINARTS -->
        <img
          :src="asset(brand.logo)"
          :alt="`${brand.name} Logo`"
          class="logo-img-elegant"
          style="max-height: 85px; height: 85px"
        />
        <h1 class="sitename" style="font-size: 34px; letter-spacing: 3px">
          KAFEIN<span>ARTS</span>
        </h1>
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li v-for="item in nav" :key="item.href">
            <a :href="item.href" :class="{ active: activeHash === item.href }" @click="handleNavClick(item.href)">
              {{ item.label }}
            </a>
          </li>
        </ul>
        <i
          class="mobile-nav-toggle d-xl-none"
          :class="mobileOpen ? 'bi bi-x' : 'bi bi-list'"
          role="button"
          aria-label="Buka menu navigasi"
          @click="toggleMobileNav"
        ></i>
      </nav>
    </div>
  </header>
</template>

<script>
import { asset } from "@/utils/asset"
import { siteData } from "@/data/siteData"

export default {
  name: "SiteHeader",
  data() {
    return {
      brand: siteData.brand,
      nav: siteData.nav,
      activeHash: siteData.nav.length ? siteData.nav[0].href : "",
      mobileOpen: false,
      homeHash: "#hero",
    }
  },
  mounted() {
    this.handleScroll()
    window.addEventListener("scroll", this.handleScroll, { passive: true })
    window.addEventListener("load", this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("load", this.handleScroll)
    document.body.classList.remove("scrolled", "mobile-nav-active")
  },
  methods: {
    asset,
    /** Navbar solid #00205D saat scrollY > 100 (lihat main.css: .index-page.scrolled .header) */
    toggleScrolled() {
      document.body.classList.toggle("scrolled", window.scrollY > 100)
    },
    /** Scrollspy: tandai link nav yang section-nya sedang aktif di viewport. */
    updateScrollspy() {
      let active = ""
      const position = window.scrollY + 200
      for (const item of this.nav) {
        const section = document.querySelector(item.href)
        if (!section) continue
        if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
          active = item.href
        }
      }
      this.activeHash = active
    },
    handleScroll() {
      this.toggleScrolled()
      this.updateScrollspy()
    },
    handleNavClick(href) {
      // Aktifkan underline langsung saat klik (tidak menunggu scroll)
      this.activeHash = href
      if (this.mobileOpen) this.toggleMobileNav()
    },
    toggleMobileNav() {
      this.mobileOpen = !this.mobileOpen
      document.body.classList.toggle("mobile-nav-active", this.mobileOpen)
    },
  },
}
</script>
