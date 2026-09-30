<template>
  <main id="main-content" class="main" tabindex="-1">
    <!-- Hero - 100vh full screen -->
    <HeroSection />

    <!-- About (ringkas, detail di /about) -->
    <AboutSection />

    <!-- Why Us (ringkas, detail di /why-us) -->
    <WhyUsSection />

    <!-- Services (ringkas, detail di /services) -->
    <ServicesSection />

    <!-- Produk unggulan -->
    <section class="section light-background">
      <div class="container">
        <SectionHeading title="Produk Unggulan" subtitle="Sistem dan website siap pakai — dapat diorder atau dikonsultasikan dulu." />
        <div class="row gy-4">
          <div v-for="product in featuredProducts" :key="product.slug" class="col-xl-4 col-md-6 d-flex" data-aos="fade-up">
            <ProductCard :product="product" />
          </div>
        </div>
        <div class="text-center mt-5">
          <router-link :to="{ name: 'products' }" class="btn-hero-primary text-decoration-none">
            <i class="bi bi-grid me-2"></i>Lihat Semua Produk
          </router-link>
        </div>
      </div>
    </section>

    <!-- Call To Action -->
    <CtaSection />
  </main>
</template>

<script>
import HeroSection from "@/components/sections/HeroSection.vue"
import AboutSection from "@/components/sections/AboutSection.vue"
import WhyUsSection from "@/components/sections/WhyUsSection.vue"
import ServicesSection from "@/components/sections/ServicesSection.vue"
import CtaSection from "@/components/sections/CtaSection.vue"
import SectionHeading from "@/components/ui/SectionHeading.vue"
import ProductCard from "@/components/ui/ProductCard.vue"
import { siteData } from "@/data/siteData"

export default {
  name: "HomeView",
  components: {
    HeroSection,
    AboutSection,
    WhyUsSection,
    ServicesSection,
    CtaSection,
    SectionHeading,
    ProductCard,
  },
  data() {
    return {
      featuredProducts: siteData.products.slice(0, 6),
    }
  },
}
</script>
