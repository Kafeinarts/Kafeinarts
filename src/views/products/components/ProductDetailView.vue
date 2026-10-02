<template>
  <main id="main-content" class="main" tabindex="-1">
    <!-- ============================================================
         HERO PRODUK
         ============================================================ -->
    <section class="page-hero product-page-hero">
      <div class="container" data-aos="fade-up">
        <nav aria-label="breadcrumb">
          <ol class="product-breadcrumb">
            <li><router-link :to="{ name: 'home' }">Beranda</router-link></li>
            <li><i class="bi bi-chevron-right"></i></li>
            <li><router-link :to="{ name: 'products' }">Produk</router-link></li>
            <li><i class="bi bi-chevron-right"></i></li>
            <li aria-current="page">{{ product.name }}</li>
          </ol>
        </nav>

        <div class="row align-items-center gy-4 mt-1">
          <div class="col-lg-7">
            <h1>{{ product.name }}</h1>
            <p class="product-tagline">{{ product.tagline }}</p>
            <p class="product-desc">{{ product.hero.description }}</p>

            <!-- Highlight singkat di bawah deskripsi -->
            <ul v-if="product.hero.highlights && product.hero.highlights.length" class="product-highlights">
              <li v-for="item in product.hero.highlights" :key="item">
                <i class="bi bi-check2-circle"></i>{{ item }}
              </li>
            </ul>

            <div class="d-flex flex-wrap gap-3 mt-4">
              <a :href="orderUrl" target="_blank" rel="noopener" class="btn-hero-primary text-decoration-none">
                <i class="bi bi-lightning-charge me-2"></i>Order Sekarang
              </a>
              <button
                v-if="hasDemo"
                type="button"
                class="btn-hero-outline btn-demo-trigger"
                data-bs-toggle="modal"
                data-bs-target="#demoConfirmModal"
              >
                <i class="bi bi-box-arrow-up-right me-2"></i>Lihat Demo
              </button>
              <router-link
                :to="{ name: 'consultation', query: { intent: 'price', product: product.slug } }"
                class="btn-hero-outline text-decoration-none"
              >
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

    <!-- ============================================================
         MODAL KONFIRMASI MENUJU DEMO — dibuka di tab baru (target blank)
         Dirender selalu (tanpa v-if): hanya tombol "Lihat Demo" yang
         v-if="hasDemo". Elemen tetap ada agar watcher slug bisa menutup
         instance Bootstrap dengan bersih saat pindah produk — kalau
         elemennya dicabut saat terbuka, backdrop + body-lock bocor.
         Posisi setelah hero agar konten dialog mudah dijangkau
         tooling (snapshot/a11y); visualnya tetap fixed di tengah.
         ============================================================ -->
    <div
      class="modal fade"
      id="demoConfirmModal"
      tabindex="-1"
      aria-labelledby="demoConfirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content demo-modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="demoConfirmModalLabel">
              <i class="bi bi-box-arrow-up-right me-2"></i>Menuju Halaman Demo
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
          </div>
          <div class="modal-body">
            <p class="mb-2">
              Anda akan membuka demo <strong>{{ product.name }}</strong> di tab browser baru.
            </p>
            <p class="demo-modal-url mb-0">
              <i class="bi bi-link-45deg me-1"></i>{{ product.url_demo }}
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <a
              :href="product.url_demo"
              target="_blank"
              rel="noopener"
              class="btn demo-modal-go"
              @click="closeDemoModal"
            >
              <i class="bi bi-box-arrow-up-right me-1"></i>Buka Demo
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         PAKET HARGA
         ============================================================ -->
    <section id="harga" class="section product-pricing-section">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>{{ pricing.heading }}</h2>
          <p>{{ pricing.subheading }}</p>
        </div>

        <div class="row gy-4 justify-content-center">
          <div
            v-for="(plan, i) in pricing.plans"
            :key="plan.name"
            class="col-lg-4 col-md-6 d-flex"
            data-aos="fade-up"
            :data-aos-delay="(i + 1) * 100"
          >
            <div class="pricing-card" :class="{ featured: plan.featured }" :style="{ '--plan-color': product.color }">
              <span v-if="plan.featured" class="pricing-badge">Paling Populer</span>
              <h4 class="pricing-name">{{ plan.name }}</h4>
              <p class="pricing-tagline">{{ plan.tagline }}</p>

              <div class="pricing-amount">
                <span class="price">{{ priceOf(plan) }}</span>
                <span v-if="plan.price != null && plan.period" class="period">/ {{ plan.period }}</span>
              </div>
              <p class="pricing-desc">{{ plan.description }}</p>

              <ul class="pricing-features">
                <li v-for="item in plan.features" :key="item">
                  <i class="bi bi-check-lg" :style="{ color: product.color }"></i>{{ item }}
                </li>
              </ul>

              <a
                :href="planOrderUrl(plan)"
                target="_blank"
                rel="noopener"
                class="pricing-btn text-decoration-none"
                :class="plan.featured ? 'pricing-btn-solid' : 'pricing-btn-outline'"
              >
                <i class="bi" :class="plan.cta && plan.cta.intent === 'price' ? 'bi-calculator' : 'bi-whatsapp'"></i>
                {{ plan.cta ? plan.cta.label : 'Hubungi Kami' }}
              </a>
            </div>
          </div>
        </div>

        <p v-if="pricing.note" class="pricing-note" data-aos="fade-up">
          <i class="bi bi-info-circle me-1"></i>{{ pricing.note }}
        </p>
      </div>
    </section>

    <!-- ============================================================
         FITUR UTAMA
         ============================================================ -->
    <section class="section product-feature-section light-background">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>{{ product.features.heading }}</h2>
          <p>{{ product.features.subheading }}</p>
        </div>

        <div class="row gy-4">
          <div
            v-for="(feature, i) in product.features.items"
            :key="feature.title"
            class="col-xl-3 col-md-6 d-flex"
            data-aos="fade-up"
            :data-aos-delay="(i % 4 + 1) * 100"
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

    <!-- ============================================================
         SEKILAS TENTANG (overview + poin + stats)
         ============================================================ -->
    <section class="section product-overview-section">
      <div class="container">
        <div class="row gy-5 align-items-center">
          <div class="col-lg-6" data-aos="fade-up">
            <div class="section-title text-start" style="margin-bottom: 18px">
              <h2>{{ product.overview.heading }}</h2>
            </div>
            <p v-for="(paragraph, i) in product.overview.paragraphs" :key="i" class="product-overview-text">
              {{ paragraph }}
            </p>
            <ul class="product-overview-points">
              <li v-for="point in product.overview.points" :key="point">
                <i class="bi bi-patch-check-fill" :style="{ color: product.color }"></i>{{ point }}
              </li>
            </ul>
          </div>
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="150">
            <div class="product-overview-panel">
              <div class="row g-3">
                <div
                  v-for="(stat, i) in product.hero.highlights"
                  :key="'hl-' + i"
                  class="col-12"
                >
                  <div class="product-overview-stat">
                    <i class="bi bi-stars" :style="{ color: product.color }"></i>
                    <span>{{ stat }}</span>
                  </div>
                </div>
              </div>
              <router-link :to="{ name: 'consultation', query: { intent: 'order', product: product.slug } }" class="product-overview-cta">
                Diskusikan kebutuhan Anda <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         ALUR KERJA
         ============================================================ -->
    <section v-if="product.workflow && product.workflow.steps" class="section product-workflow-section light-background">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>{{ product.workflow.heading }}</h2>
          <p>{{ product.workflow.subheading }}</p>
        </div>

        <div class="row gy-4">
          <div
            v-for="(step, i) in product.workflow.steps"
            :key="step.title"
            class="col-lg d-flex"
            data-aos="fade-up"
            :data-aos-delay="(i + 1) * 100"
          >
            <div class="workflow-step">
              <span class="workflow-number" :style="{ background: product.color }">{{ i + 1 }}</span>
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         COCOK UNTUK (use cases)
         ============================================================ -->
    <section v-if="product.useCases && product.useCases.items" class="section product-usecases-section">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>{{ product.useCases.heading }}</h2>
          <p>{{ product.useCases.subheading }}</p>
        </div>

        <div class="row gy-4">
          <div
            v-for="(item, i) in product.useCases.items"
            :key="item.title"
            class="col-xl-3 col-md-6 d-flex"
            data-aos="zoom-in"
            :data-aos-delay="(i % 4 + 1) * 100"
          >
            <div class="usecase-card">
              <div class="usecase-icon" :style="{ color: product.color }">
                <i class="bi" :class="item.icon"></i>
              </div>
              <h5>{{ item.title }}</h5>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         FAQ PRODUK
         ============================================================ -->
    <section v-if="product.faqs && product.faqs.items" class="section product-faq-section light-background">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>{{ product.faqs.heading }}</h2>
          <p>{{ product.faqs.subheading }}</p>
        </div>

        <div class="row justify-content-center" data-aos="fade-up">
          <div class="col-lg-9">
            <div class="accordion product-faq-accordion" :id="'faq-' + product.slug">
              <div v-for="(faq, i) in product.faqs.items" :key="faq.q" class="accordion-item">
                <h3 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: i !== 0 }"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#' + product.slug + '-faq-' + i"
                    :aria-expanded="i === 0 ? 'true' : 'false'"
                  >
                    {{ faq.q }}
                  </button>
                </h3>
                <div
                  :id="product.slug + '-faq-' + i"
                  class="accordion-collapse collapse"
                  :class="{ show: i === 0 }"
                  :data-bs-parent="'#' + product.slug + '-faq'"
                >
                  <div class="accordion-body">{{ faq.a }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CTA AKHIR + PRODUK TERKAIT
         ============================================================ -->
    <section class="section">
      <div class="container" data-aos="fade-up">
        <div class="product-bottom-cta">
          <h3>{{ product.cta.heading }}</h3>
          <p>{{ product.cta.description }}</p>
          <div class="d-flex flex-wrap justify-content-center gap-3">
            <a :href="orderUrl" target="_blank" rel="noopener" class="cta-btn cta-btn-wa text-decoration-none">
              <i class="bi bi-whatsapp"></i>Hubungi via WhatsApp
            </a>
            <router-link :to="{ name: 'products' }" class="cta-btn cta-btn-ghost text-decoration-none">
              <i class="bi bi-grid"></i>Lihat Semua Produk
            </router-link>
          </div>
        </div>

        <!-- Produk terkait -->
        <div v-if="relatedProducts.length" class="related-products mt-5">
          <h4 class="text-center mb-4"><i class="bi bi-collection me-2"></i>Produk Lainnya</h4>
          <div class="row gy-4">
            <div v-for="related in relatedProducts" :key="related.slug" class="col-lg-4 col-md-6 d-flex">
              <router-link :to="{ name: 'product-' + related.slug }" class="related-card text-decoration-none">
                <div class="related-icon" :style="{ background: related.color }">
                  <i class="bi" :class="related.icon"></i>
                </div>
                <div>
                  <h6>{{ related.name }}</h6>
                  <p>{{ related.tagline }}</p>
                </div>
                <i class="bi bi-arrow-right related-arrow"></i>
              </router-link>
            </div>
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
import { priceLabel } from "@/data/products/index.js"

/**
 * ProductDetailView — halaman detail satu produk.
 * ------------------------------------------------------------------
 * SELURUH konten dibaca dari properti `product` yang dipetakan dari
 * public/data/products/<slug>.json oleh index.vue masing-masing produk.
 * Komponen ini tidak tahu isi spesifik produk apa pun (presentational).
 *
 * Struktur section: Hero (dengan tombol Lihat Demo + modal konfirmasi) →
 * Harga → Fitur → Overview → Alur Kerja → Use Case → FAQ → CTA + Produk Terkait.
 */
export default {
  name: "ProductDetailView",
  props: {
    /** Objek produk hasil mapProduct() dari src/data/products/index.js */
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pricing() {
      return this.product.pricing || { heading: "Harga", subheading: "", plans: [] }
    },
    /**
     * Tombol "Lihat Demo" hanya tampil bila produk punya demo nyata:
     * is_demo = true DAN url_demo terisi (kosong = belum ada demonya).
     */
    hasDemo() {
      return Boolean(this.product.is_demo && this.product.url_demo)
    },
    relatedProducts() {
      const slug = this.product.slug
      return (siteData.products || []).filter((p) => p.slug !== slug).slice(0, 3)
    },
    heroStyle() {
      return {
        background: `linear-gradient(135deg, ${this.product.color}, color-mix(in srgb, ${this.product.color}, #00205D 55%))`,
      }
    },
    /** URL WhatsApp untuk tombol Order Sekarang. */
    orderUrl() {
      return this.waUrl("order")
    },
  },
  watch: {
    // Navigasi antar halaman produk memakai komponen yang sama
    "product.slug"() {
      // Modal demo (bila sedang terbuka) ikut ditutup agar tidak
      // tertinggal menampilkan produk sebelumnya.
      this.closeDemoModal()
      this.$nextTick(() => this.syncPage())
    },
  },
  mounted() {
    this.syncPage()
  },
  methods: {
    priceLabel,
    priceOf(plan) {
      return priceLabel(plan)
    },
    waUrl(intent) {
      const primary = getPrimaryWhatsApp()
      const message = buildProductCtaMessage({ productName: this.product.name, intent })
      return buildWaUrl(primary.wa, message)
    },
    planOrderUrl(plan) {
      // CTA paket harga → WhatsApp dengan menyebut nama paketnya.
      const primary = getPrimaryWhatsApp()
      const intent = plan.cta && plan.cta.intent === "price" ? "price" : "order"
      const message = buildProductCtaMessage({
        productName: `${this.product.name} — Paket ${plan.name}`,
        intent,
      })
      return buildWaUrl(primary.wa, message)
    },
    /**
     * Tutup modal demo — dipanggil dari @click "Buka Demo" & watcher slug.
     * "Buka Demo" SENGAJA TIDAK memakai data-bs-dismiss: handler dismiss
     * Bootstrap memanggil preventDefault() untuk <a>/<area>, sehingga
     * navigasi target="_blank"-nya dibatalkan. Dengan @click + navigasi
     * native, tab baru terbuka (ctrl/klik-kanan tetap berfungsi) dan modal
     * ikut tertutup di halaman asal.
     */
    closeDemoModal() {
      const el = document.getElementById("demoConfirmModal")
      if (!el || !window.bootstrap || !window.bootstrap.Modal) return
      const instance = window.bootstrap.Modal.getInstance(el)
      if (instance) instance.hide()
    },
    syncPage() {
      this.$nextTick(() => {
        refreshAosSafely()
        syncSeoForRoute({
          title: `${this.product.name} — ${siteData.seo.name}`,
          description: this.product.hero.description,
          path: `/products/${this.product.slug}`,
        })
      })
    },
  },
}
</script>

<style scoped>
/* ============================================================
   Hero
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

.product-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  font-size: 0.88rem;
}

.product-highlights li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  opacity: 0.95;
}

.product-highlights i {
  color: #7ee2a8;
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

/* ============================================================
   Pricing
   ============================================================ */
.pricing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
  border-radius: 16px;
  padding: 30px 26px;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0, 32, 93, 0.12);
}

.pricing-card.featured {
  border: 2px solid var(--accent-color);
  box-shadow: 0 20px 48px rgba(0, 32, 93, 0.16);
}

.pricing-badge {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-color);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 50px;
  white-space: nowrap;
}

.pricing-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.pricing-tagline {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--heading-color);
  margin-bottom: 14px;
}

.pricing-amount {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 10px;
}

.pricing-amount .price {
  font-family: var(--heading-font);
  font-size: clamp(1.5rem, 3vw, 1.9rem);
  font-weight: 700;
  color: var(--heading-color);
}

.pricing-amount .period {
  font-size: 0.82rem;
  color: var(--default-color);
}

.pricing-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--default-color);
  margin-bottom: 16px;
}

.pricing-features {
  list-style: none;
  margin: 0 0 22px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex-grow: 1;
}

.pricing-features li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.55;
  color: var(--heading-color);
}

.pricing-features i {
  font-size: 1rem;
  margin-top: 1px;
  flex-shrink: 0;
}

.pricing-note {
  text-align: center;
  font-size: 0.88rem;
  color: var(--heading-color);
  margin: 26px auto 0;
  max-width: 720px;
}

/* ============================================================
   Tombol CTA pricing — selalu jelas sebagai tombol di latar putih
   (solid = paket featured, outline berwarna = paket lain)
   ============================================================ */
.pricing-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 22px;
  border-radius: 50px;
  font-family: var(--heading-font);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  white-space: nowrap;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease;
}

/* Tombol utama paket featured: blok penuh warna aksen produk */
.pricing-btn-solid {
  color: #fff;
  background: var(--plan-color, var(--accent-color));
  box-shadow: 0 10px 24px color-mix(in srgb, var(--plan-color, var(--accent-color)), transparent 62%);
}

.pricing-btn-solid:hover {
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 14px 30px color-mix(in srgb, var(--plan-color, var(--accent-color)), transparent 50%);
}

/* Tombol paket lain: outline tegas berwarna aksen produk (bukan abu-abu) */
.pricing-btn-outline {
  color: var(--plan-color, var(--accent-color));
  background: color-mix(in srgb, var(--plan-color, var(--accent-color)), transparent 94%);
  border: 2px solid var(--plan-color, var(--accent-color));
}

.pricing-btn-outline:hover {
  color: #fff;
  background: var(--plan-color, var(--accent-color));
  transform: translateY(-2px);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--plan-color, var(--accent-color)), transparent 62%);
}

.pricing-btn i {
  font-size: 1.05rem;
  line-height: 1;
}

/* ============================================================
   Tombol CTA bawah (latar navy) — WhatsApp hijau khas + ghost putih
   ============================================================ */
.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 28px;
  border-radius: 50px;
  font-family: var(--heading-font);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  white-space: nowrap;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease;
}

.cta-btn-wa {
  color: #fff;
  background: #25d366;
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.35);
}

.cta-btn-wa:hover {
  color: #fff;
  background: #1fb857;
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(37, 211, 102, 0.45);
}

.cta-btn-ghost {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.85);
}

.cta-btn-ghost:hover {
  color: #00205d;
  background: #fff;
  border-color: #fff;
  transform: translateY(-2px);
}

/* ============================================================
   Fitur
   ============================================================ */
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

/* ============================================================
   Overview
   ============================================================ */
.product-overview-text {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--default-color);
}

.product-overview-points {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.product-overview-points li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.92rem;
}

.product-overview-points i {
  flex-shrink: 0;
  margin-top: 2px;
}

.product-overview-panel {
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
  border-radius: 16px;
  padding: 26px;
}

.product-overview-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--accent-color), transparent 94%);
  font-weight: 600;
  font-size: 0.92rem;
}

.product-overview-stat i {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.product-overview-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--accent-color);
  transition: gap 0.3s ease;
}

.product-overview-cta:hover {
  gap: 12px;
}

/* ============================================================
   Workflow
   ============================================================ */
.workflow-step {
  width: 100%;
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 24px 20px;
  position: relative;
}

.workflow-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-family: var(--heading-font);
  margin-bottom: 14px;
}

.workflow-step h4 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.workflow-step p {
  font-size: 0.87rem;
  line-height: 1.65;
  color: var(--default-color);
  margin: 0;
}

/* ============================================================
   Use cases
   ============================================================ */
.usecase-card {
  width: 100%;
  text-align: center;
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 28px 20px;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.usecase-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 32, 93, 0.12);
}

.usecase-icon i {
  font-size: 34px;
}

.usecase-card h5 {
  font-size: 1rem;
  font-weight: 700;
  margin: 14px 0 8px;
}

.usecase-card p {
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--default-color);
  margin: 0;
}

/* ============================================================
   FAQ
   ============================================================ */
.product-faq-accordion {
  --bs-accordion-border-color: color-mix(in srgb, var(--default-color), transparent 90%);
  --bs-accordion-btn-focus-box-shadow: none;
  --bs-accordion-active-color: var(--heading-color);
  --bs-accordion-active-bg: var(--surface-color);
}

.product-faq-accordion .accordion-item {
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
  background: var(--surface-color);
}

.product-faq-accordion .accordion-button {
  font-weight: 600;
  font-size: 0.95rem;
  padding: 16px 20px;
}

/* ============================================================
   CTA akhir & produk terkait
   ============================================================ */
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

.related-products h4 {
  font-weight: 700;
}

.related-card {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 18px 20px;
  color: inherit;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.related-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--accent-color), transparent 70%);
  box-shadow: 0 14px 30px rgba(0, 32, 93, 0.12);
}

.related-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.related-icon i {
  font-size: 22px;
  color: #fff;
}

.related-card h6 {
  font-weight: 700;
  margin-bottom: 4px;
}

.related-card p {
  font-size: 0.82rem;
  color: var(--default-color);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-arrow {
  margin-left: auto;
  color: var(--accent-color);
  flex-shrink: 0;
}

/* ============================================================
   Tombol & modal "Lihat Demo"
   ============================================================ */
/* <button> butuh cursor & reset kecil agar selaras dengan <a> hero */
.btn-demo-trigger {
  cursor: pointer;
}

.demo-modal-content {
  border: none;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 32, 93, 0.28);
}

.demo-modal-content .modal-header {
  background: linear-gradient(135deg, #00205d, #04307f);
  border-bottom: none;
}

.demo-modal-content .modal-title {
  color: #fff;
  font-weight: 700;
  font-size: 1.02rem;
}

.demo-modal-content .btn-close {
  filter: invert(1) grayscale(1) brightness(2);
  opacity: 0.85;
}

.demo-modal-url {
  background: color-mix(in srgb, var(--accent-color), transparent 94%);
  border: 1px dashed color-mix(in srgb, var(--accent-color), transparent 70%);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.88rem;
  color: var(--accent-color);
  word-break: break-all;
}

.demo-modal-go {
  color: #fff;
  background: var(--accent-color);
  border-color: var(--accent-color);
  font-weight: 600;
}

.demo-modal-go:hover {
  color: #fff;
  background: #04307f;
  border-color: #04307f;
}

/* ============================================================
   Responsif
   ============================================================ */
@media (max-width: 767px) {
  .product-page-hero {
    padding: 110px 0 50px;
  }

  .product-hero-icon {
    margin-top: 6px;
  }
}
</style>
