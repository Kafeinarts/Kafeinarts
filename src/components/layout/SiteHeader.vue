<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">
      <router-link :to="{ name: 'home' }" class="logo d-flex align-items-center me-auto" @click="closeMobileNav">
        <!-- LOGO KAFEINARTS (versi ramping: ukuran dikontrol dari main.css) -->
        <img :src="asset(brand.logo)" :alt="`${brand.name} Logo`" class="logo-img-elegant" />
        <!-- Bukan <h1>: hanya Hero yang boleh punya satu <h1> (hierarki heading SEO) -->
        <div class="sitename">KAFEIN<span>ARTS</span></div>
      </router-link>

      <nav id="navmenu" class="navmenu">
        <ul>
          <template v-for="item in nav" :key="item.label">
            <!-- Item dropdown (menu Produk) -->
            <li v-if="item.dropdown === 'products'" class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                :class="{ active: isProductArea }"
                aria-haspopup="true"
                :aria-expanded="mobileProductsOpen ? 'true' : 'false'"
                @click.prevent="onDropdownClick"
              >
                {{ item.label }}
                <i class="bi bi-chevron-down toggle-dropdown"></i>
              </a>

              <ul :class="{ 'dropdown-active': mobileProductsOpen }">
                <li v-for="product in products" :key="product.slug">
                  <router-link :to="{ name: `product-${product.slug}` }" @click="closeMobileNav">
                    <i class="bi me-2" :class="product.icon"></i>{{ product.name }}
                  </router-link>
                </li>
                <li class="dropdown-divider-item">
                  <router-link :to="{ name: 'products' }" class="dropdown-view-all" @click="closeMobileNav">
                    <i class="bi bi-grid me-2"></i>Lihat Semua Produk
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Item biasa (route terpisah) -->
            <li v-else>
              <router-link
                :to="item.to"
                :class="{ active: $route.name === item.to.name }"
                @click="closeMobileNav"
              >
                {{ item.label }}
              </router-link>
            </li>
          </template>
        </ul>
        <i
          class="mobile-nav-toggle d-xl-none"
          :class="mobileOpen ? 'bi bi-x' : 'bi bi-list'"
          role="button"
          aria-label="Buka menu navigasi"
          @click="toggleMobileNav"
        ></i>
      </nav>

      <!-- CTA Konsultasi -->
      <router-link :to="{ name: 'consultation' }" class="btn-getstarted d-none d-lg-inline-flex" @click="closeMobileNav">
        {{ navCta.label }}
      </router-link>
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
      navCta: siteData.navCta,
      products: siteData.products,
      mobileOpen: false,
      mobileProductsOpen: false,
    }
  },
  computed: {
    isProductArea() {
      const name = String(this.$route.name || "")
      return name.startsWith("product") || name === "products"
    },
  },
  watch: {
    // Tutup menu mobile saat pindah halaman
    $route() {
      if (this.mobileOpen) this.toggleMobileNav()
    },
  },
  mounted() {
    this.toggleScrolled()
    window.addEventListener("scroll", this.toggleScrolled, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.toggleScrolled)
    document.body.classList.remove("scrolled", "mobile-nav-active")
  },
  methods: {
    asset,
    onDropdownClick() {
      // Desktop: hover sudah membuka dropdown; klik = buka katalog produk.
      // Mobile: klik membuka/menutup submenu.
      if (window.innerWidth < 1200) {
        this.mobileProductsOpen = !this.mobileProductsOpen
      } else {
        this.$router.push({ name: "products" })
      }
    },
    closeMobileNav() {
      this.mobileProductsOpen = false
      if (this.mobileOpen) this.toggleMobileNav()
    },
    /** Navbar solid #00205D saat scrollY > 100 (lihat main.css: .index-page.scrolled .header) */
    toggleScrolled() {
      document.body.classList.toggle("scrolled", window.scrollY > 100)
    },
    toggleMobileNav() {
      this.mobileOpen = !this.mobileOpen
      this.mobileProductsOpen = false
      document.body.classList.toggle("mobile-nav-active", this.mobileOpen)
    },
  },
}
</script>
