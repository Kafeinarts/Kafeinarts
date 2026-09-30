<template>
  <main id="main-content" class="main" tabindex="-1">
    <!-- Breadcrumb -->
    <section class="page-hero product-page-hero">
      <div class="container" data-aos="fade-up">
        <nav aria-label="breadcrumb">
          <ol class="product-breadcrumb">
            <li>
              <router-link :to="{ name: 'home' }">Beranda</router-link>
            </li>
            <li><i class="bi bi-chevron-right"></i></li>
            <li>
              <router-link :to="{ name: 'products' }">Produk</router-link>
            </li>
            <li><i class="bi bi-chevron-right"></i></li>
            <li aria-current="page">{{ product.shortName }}</li>
          </ol>
        </nav>

        <div class="row align-items-center gy-4 mt-1">
          <div class="col-lg-7">
            <h1>{{ product.name }}</h1>
            <p class="product-tagline">{{ product.tagline }}</p>
            <p class="product-desc">{{ product.desc }}</p>
            <div class="d-flex flex-wrap gap-3 mt-4">
              <a :href="orderUrl" target="_blank" rel="noopener" class="btn-hero-primary text-decoration-none">
                <i class="bi bi-lightning-charge me-2"></i>Order Sekarang
              </a>
              <router-link :to="{ name: 'consultation', query: { intent: 'price', product: product.slug } }" class="btn-hero-outline text-decoration-none">
                <i class="bi bi-calculator me-2"></i>Konsultasikan Harga
              </router-link>
            </div>
          </div>
          <div class="col-lg-5 text-center">
            <div class="product-hero-icon" :style="heroStyle">
              <i class="bi" :class="product.icon"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fitur Utama -->
    <section class="section product-feature-section">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>Fitur Utama</h2>
          <p>Semua yang Anda butuhkan untuk menjalankan {{ product.shortName }} secara efektif.</p>
        </div>

        <div class="row gy-4">
          <div
            v-for="(feature, i) in product.features"
            :key="feature.title"
            class="col-xl-3 col-md-6 d-flex"
            data-aos="fade-up"
            :data-aos-delay="(i + 1) * 100"
          >
            <div class="product-feature-card">
              <div class="product-feature-icon" :style="{ background: product.color }">
                <i class="bi" :class="feature.icon"></i>
              </div>
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistik / Highlight -->
    <section class="section product-stats-section light-background">
      <div class="container">
        <div class="row gy-4 text-center">
          <div
            v-for="(stat, i) in product.stats"
            :key="stat.label"
            class="col-4 col-md-4"
            data-aos="zoom-in"
            :data-aos-delay="(i + 1) * 100"
          >
            <div class="product-stat">
              <span class="product-stat-value" :style="{ color: product.color }">{{ stat.value }}</span>
              <span class="product-stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container" data-aos="fade-up">
        <div class="product-bottom-cta">
          <h3>Tertarik dengan {{ product.name }}?</h3>
          <p>
            Tim kami siap mendemokan langsung bagaimana {{ product.shortName }} dapat
            menyesuaikan diri dengan alur kerja bisnis Anda.
          </p>
          <div class="d-flex flex-wrap justify-content-center gap-3">
            <a :href="orderUrl" target="_blank" rel="noopener" class="btn-hero-primary text-decoration-none">
              <i class="bi bi-whatsapp me-2"></i>Hubungi via WhatsApp
            </a>
            <router-link :to="{ name: 'products' }" class="btn-hero-outline text-decoration-none">
              <i class="bi bi-grid me-2"></i>Lihat Produk Lain
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { siteData } from "@/data/siteData"
import { syncSeoForRoute } from "@/utils/seo"
import { refreshAosSafely } from "@/utils/aos"
import { buildProductCtaMessage, buildWaUrl, getPrimaryWhatsApp } from "@/utils/whatsapp"

/**
 * ProductPageView — STARTER TEMPLATE halaman produk.
 * ------------------------------------------------------------------
 * Semua konten diambil dari siteData.products (cari item dengan slug
 * yang sama dengan route /products/:slug). Untuk memodifikasi konten
 * satu produk, cukup ubah entri produk tersebut di src/data/siteData.js
 * ATAU override bagian tertentu lewat slot/komponen di sini.
 */
export default {
  name: "ProductPageView",
  props: {
    slug: {
      type: String,
      default: "",
    },
  },
  computed: {
    product() {
      const slug = this.slug || this.$route.params.slug
      return siteData.products.find((p) => p.slug === slug) || siteData.products[0]
    },
    heroStyle() {
      return {
        background: `linear-gradient(135deg, ${this.product.color}, color-mix(in srgb, ${this.product.color}, #00205D 55%))`,
      }
    },
    /** URL WhatsApp untuk tombol Order Sekarang. */
    orderUrl() {
      const primary = getPrimaryWhatsApp()
      const message = buildProductCtaMessage({ productName: this.product.name, intent: "order" })
      return buildWaUrl(primary.wa, message)
    },
  },
  watch: {
    // Navigasi antar halaman produk memakai komponen yang sama
    $route() {
      this.$nextTick(() => this.syncPage())
    },
  },
  mounted() {
    this.syncPage()
  },
  methods: {
    syncPage() {
      this.$nextTick(() => {
        refreshAosSafely()
        syncSeoForRoute({
          title: `${this.product.name} — ${siteData.seo.name}`,
          description: this.product.desc,
          path: `/products/${this.product.slug}`,
        })
      })
    },
    goHome() {
      // Kembali ke beranda SPA
      this.$router.push({ name: "home" })
    },
  },
}
</script>

<style scoped>
/* ============================================================
   Halaman detail produk — starter template, silakan dimodifikasi
   ============================================================ */
.product-page-hero {
  padding: 130px 0 64px;
  background:
    radial-gradient(ellipse at top left, color-mix(in srgb, var(--accent-color), transparent 82%), transparent 55%),
    linear-gradient(180deg, #00205d 0%, #04307f 100%);
  color: #fff;
}

.product-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.85rem;
  opacity: 0.9;
}

.product-breadcrumb a {
  color: #fff;
  opacity: 0.85;
}

.product-breadcrumb a:hover {
  opacity: 1;
  text-decoration: underline;
}

.product-breadcrumb i {
  font-size: 0.7rem;
  opacity: 0.6;
}

.product-page-hero h1 {
  color: #fff;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 700;
  margin-bottom: 14px;
}

.product-tagline {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  font-weight: 500;
  margin-bottom: 14px;
  color: #e8dcc6;
}

.product-desc {
  font-size: 0.98rem;
  line-height: 1.75;
  opacity: 0.92;
}

.product-hero-icon {
  width: clamp(150px, 22vw, 210px);
  height: clamp(150px, 22vw, 210px);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.product-hero-icon i {
  font-size: clamp(64px, 10vw, 92px);
  color: #fff;
}

.product-feature-card {
  width: 100%;
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 26px 22px;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.product-feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 32, 93, 0.12);
}

.product-feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.product-feature-icon i {
  font-size: 22px;
  color: #fff;
}

.product-feature-card h4 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.product-feature-card p {
  font-size: 0.9rem;
  line-height: 1.65;
  margin: 0;
}

.product-stats-section .product-stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 10px;
  background: var(--surface-color);
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
}

.product-stat-value {
  font-family: var(--heading-font);
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  line-height: 1;
}

.product-stat-label {
  font-size: 0.85rem;
  color: var(--default-color);
}

.product-bottom-cta {
  text-align: center;
  background: linear-gradient(135deg, #00205d, #04307f);
  border-radius: 16px;
  padding: clamp(28px, 5vw, 48px);
  color: #fff;
}

.product-bottom-cta h3 {
  color: #fff;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  margin-bottom: 12px;
}

.product-bottom-cta p {
  max-width: 640px;
  margin: 0 auto 22px;
  opacity: 0.9;
}

@media (max-width: 767px) {
  .product-page-hero {
    padding: 110px 0 50px;
  }

  .product-hero-icon {
    margin-top: 6px;
  }
}
</style>
