<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Kelebihan Kami"
      tagline="Mitra tepat untuk transformasi digital"
      desc="Bukan sekadar kode dan desain — kami merancang solusi yang berdampak langsung pada efisiensi bisnis Anda."
      icon="bi-award"
      icon-color="#b45309"
    />

    <!-- Penjelasan utama (accordion interaktif dari data JSON) -->
    <section class="section">
      <div class="container">
        <div class="row gy-4 align-items-center">
          <div class="col-lg-6" data-aos="fade-up">
            <h2 class="fw-bold mb-3" v-html="whyUs.heading"></h2>
            <p>{{ whyUs.desc }}</p>
            <div class="accordion mt-4" id="whyUsAccordion">
              <div v-for="(item, i) in whyUs.items" :key="item.id" class="accordion-item">
                <h3 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: !isActive(i) }"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#whyus-' + item.id"
                    :aria-expanded="isActive(i) ? 'true' : 'false'"
                    @click="setActive(i)"
                  >
                    <span class="me-2 fw-bold">{{ item.id }}.</span>{{ item.title }}
                  </button>
                </h3>
                <div
                  :id="'whyus-' + item.id"
                  class="accordion-collapse collapse"
                  :class="{ show: isActive(i) }"
                  data-bs-parent="#whyUsAccordion"
                >
                  <div class="accordion-body" v-html="item.desc"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 text-center" data-aos="zoom-in" data-aos-delay="150">
            <img :src="asset(whyUs.image)" :alt="whyUs.imageAlt" class="img-fluid" loading="lazy" />
          </div>
          </div>
      </div>
    </section>

    <!-- Highlight keunggulan -->
    <section class="section light-background">
      <div class="container">
        <SectionHeading :title="'Keunggulan yang Kami Berikan'" :subtitle="'Empat alasan yang paling sering disebutkan oleh klien kami.'" />
        <div class="row gy-4">
          <div v-for="(h, i) in whyUs.highlights" :key="h.title" class="col-md-6 col-xl-3 d-flex" data-aos="fade-up" :data-aos-delay="(i + 1) * 100">
            <FeatureCard v-bind="h" color="#00205D" />
          </div>
        </div>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <CtaBanner title="Pengalaman berbeda bersama Kafeinarts" desc="Diskusikan tantangan digital Anda dan rasakan proses yang transparan sejak meeting pertama.">
          <router-link :to="{ name: 'consultation' }" class="btn-hero-primary text-decoration-none">
            <i class="bi bi-chat-dots me-2"></i>Jadwalkan Diskusi
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
import { asset } from "@/utils/asset"

export default {
  name: "WhyUsView",
  components: { PageHero, SectionHeading, FeatureCard, CtaBanner },
  setup() {
    usePageSeo({
      title: `Kelebihan Kami — ${siteData.seo.name}`,
      description: "Kelebihan Kafeinarts: full-stack & estetis, SaaS skalabel, teknologi modern, dukungan jangka panjang.",
      path: "/why-us",
    })
  },
  data() {
    return { whyUs: siteData.whyUs, activeIndex: 0 }
  },
  methods: {
    asset,
    isActive(i) {
      return this.activeIndex === i
    },
    setActive(i) {
      this.activeIndex = i
    },
  },
}
</script>
