<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Produk Kami"
      tagline="Sistem, aplikasi, dan website siap pakai"
      desc="Semua produk dapat dikustomisasi penuh — order sekarang atau konsultasikan harga dengan tim Kafeinarts."
      icon="bi-box-seam"
      icon-color="#1d4ed8"
    >
      <router-link :to="{ name: 'consultation', query: { intent: 'price' } }" class="btn-hero-primary text-decoration-none">
        <i class="bi bi-calculator me-2"></i>Konsultasikan Harga
      </router-link>
      <router-link :to="{ name: 'consultation', query: { intent: 'order' } }" class="btn-hero-outline text-decoration-none">
        <i class="bi bi-lightning-charge me-2"></i>Order Sekarang
      </router-link>
    </PageHero>

    <section class="section">
      <div class="container">
        <!-- Filter kategori -->
        <div class="d-flex flex-wrap justify-content-center gap-2 mb-5" data-aos="fade-up">
          <button
            v-for="cat in filterTabs"
            :key="cat.key"
            type="button"
            class="btn filter-btn"
            :class="activeCategory === cat.key ? 'btn-primary' : 'btn-outline-secondary'"
            @click="activeCategory = cat.key"
          >
            <i v-if="cat.icon" class="bi me-1" :class="cat.icon"></i>{{ cat.label }}
          </button>
        </div>

        <!-- Grid produk -->
        <div class="row gy-4">
          <div
            v-for="product in filteredProducts"
            :key="product.slug"
            class="col-xl-4 col-md-6 d-flex"
            data-aos="fade-up"
          >
            <ProductCard :product="product" />
          </div>
        </div>

        <!-- CTA bawah -->
        <div class="row mt-5">
          <div class="col-12">
            <CtaBanner
              title="Butuh sistem yang benar-benar custom?"
              desc="Semua produk di atas dapat dikustomisasi — modul tambahan, integrasi pihak ketiga, hingga migrasi data dari sistem lama Anda."
            >
              <router-link :to="{ name: 'consultation' }" class="btn-hero-primary text-decoration-none">
                <i class="bi bi-chat-dots me-2"></i>Diskusikan Kebutuhan Anda
              </router-link>
            </CtaBanner>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PageHero from "@/components/ui/PageHero.vue"
import ProductCard from "@/components/ui/ProductCard.vue"
import CtaBanner from "@/components/ui/CtaBanner.vue"
import { usePageSeo } from "@/composables/usePageSeo"
import { siteData } from "@/data/siteData"

export default {
  name: "ProductsView",
  components: { PageHero, ProductCard, CtaBanner },
  setup() {
    usePageSeo({
      title: `Produk Kami — ${siteData.seo.name}`,
      description: siteData.catalogPage.subtitle,
      path: "/products",
    })
  },
  data() {
    return {
      categories: siteData.categories,
      products: siteData.products,
      activeCategory: "all",
    }
  },
  computed: {
    filterTabs() {
      const icons = { all: "bi-grid", system: "bi-diagram-3", website: "bi-window" }
      return [{ key: "all", label: "Semua", icon: icons.all }, ...this.categories.map((c) => ({ ...c, icon: icons[c.key] || "bi-tag" }))]
    },
    filteredProducts() {
      if (this.activeCategory === "all") return this.products
      return this.products.filter((p) => p.category === this.activeCategory)
    },
  },
}
</script>

<style scoped>
.filter-btn {
  border-radius: 50px;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 0.88rem;
}
</style>
