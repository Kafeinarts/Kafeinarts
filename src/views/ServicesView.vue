<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Layanan Kami"
      tagline="Solusi digital menyeluruh"
      desc="Dari website profesional hingga sistem manajemen kompleks — semua dikerjakan in-house oleh tim berpengalaman."
      icon="bi-grid-1x2"
      icon-color="#0e7490"
    />

    <!-- Daftar layanan -->
    <section class="section">
      <div class="container">
        <SectionHeading :title="services.title" :subtitle="services.subtitle" />
        <div class="row gy-4">
          <div v-for="service in services.items" :key="service.title" class="col-xl-3 col-md-6 d-flex" data-aos="fade-up" :data-aos-delay="service.delay">
            <FeatureCard v-bind="service" color="#00205D" />
          </div>
        </div>
      </div>
    </section>

    <!-- Proses kerja -->
    <section class="section light-background">
      <div class="container">
        <SectionHeading :title="services.process.title" :subtitle="services.process.subtitle" />
        <div class="row gy-4">
          <div v-for="(step, i) in services.process.steps" :key="step.step" class="col-md-6 col-xl-3 d-flex" data-aos="fade-up" :data-aos-delay="(i + 1) * 100">
            <div class="process-card h-100 w-100">
              <div class="process-icon">
                <i class="bi" :class="step.icon"></i>
              </div>
              <span class="process-step">{{ step.step }}</span>
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <CtaBanner title="Layanan yang cocok untuk bisnis Anda?" desc="Konsultasikan kebutuhan Anda — kami bantu memilih solusi yang paling tepat dan efisien.">
          <router-link :to="{ name: 'consultation' }" class="btn-hero-primary text-decoration-none">
            <i class="bi bi-calculator me-2"></i>Konsultasikan Harga
          </router-link>
          <router-link :to="{ name: 'products' }" class="btn-hero-outline text-decoration-none">
            <i class="bi bi-box-seam me-2"></i>Lihat Produk
          </router-link>
        </CtaBanner>
      </div>
    </section>
  </main>
</template>

<script>
import PageHero from "@/components/ui/PageHero.vue"
import SectionHeading from "@/components/ui/SectionHeading.vue"
import FeatureCard from "@/components/ui/FeatureCard.vue"
import CtaBanner from "@/components/ui/CtaBanner.vue"
import { usePageSeo } from "@/composables/usePageSeo"
import { siteData } from "@/data/siteData"

export default {
  name: "ServicesView",
  components: { PageHero, SectionHeading, FeatureCard, CtaBanner },
  setup() {
    usePageSeo({
      title: `Layanan — ${siteData.seo.name}`,
      description: "Layanan Kafeinarts: website & sistem bisnis, aplikasi pelanggan, infrastruktur digital, dan perlindungan data.",
      path: "/services",
    })
  },
  data() {
    return { services: siteData.services }
  },
}
</script>

<style scoped>
.process-card {
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 26px 22px;
  position: relative;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.process-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 32, 93, 0.12);
}

.process-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent-color), transparent 90%);
  color: var(--accent-color);
  margin-bottom: 12px;
}

.process-icon i {
  font-size: 22px;
}

.process-step {
  position: absolute;
  top: 18px;
  right: 20px;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  color: color-mix(in srgb, var(--accent-color), transparent 85%);
}

.process-card h4 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.process-card p {
  font-size: 0.9rem;
  margin: 0;
}
</style>
