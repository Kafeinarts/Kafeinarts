<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Tanya Jawab (FAQ)"
      tagline="Temukan jawaban dengan cepat"
      desc="Pertanyaan paling sering diajukan seputar layanan, proses kerja, dan kerja sama dengan Kafeinarts."
      icon="bi-patch-question"
      icon-color="#0d9488"
    />

    <section class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9" data-aos="fade-up">
            <div class="accordion" id="faqAccordion">
              <div v-for="(item, i) in faq.items" :key="i" class="accordion-item">
                <h3 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: !isActive(i) }"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#faq-' + i"
                    :aria-expanded="isActive(i) ? 'true' : 'false'"
                    @click="setActive(i)"
                  >
                    {{ item.q }}
                  </button>
                </h3>
                <div
                  :id="'faq-' + i"
                  class="accordion-collapse collapse"
                  :class="{ show: isActive(i) }"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body" v-html="item.a"></div>
                </div>
              </div>
            </div>

            <div class="text-center mt-5">
              <p class="text-muted mb-3">Tidak menemukan jawaban yang Anda cari?</p>
              <router-link :to="{ name: 'consultation' }" class="btn-hero-primary text-decoration-none">
                <i class="bi bi-chat-dots me-2"></i>Tanyakan Langsung ke Kami
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PageHero from "@/components/ui/PageHero.vue"
import { usePageSeo } from "@/composables/usePageSeo"
import { siteData } from "@/data/siteData"

export default {
  name: "FaqView",
  components: { PageHero },
  setup() {
    usePageSeo({
      title: `FAQ — ${siteData.seo.name}`,
      description: "Pertanyaan yang sering diajukan seputar layanan pengembangan SaaS, website, dan sistem manajemen Kafeinarts.",
      path: "/faq",
    })
  },
  data() {
    return { faq: siteData.faq, activeIndex: 0 }
  },
  methods: {
    isActive(i) {
      return this.activeIndex === i
    },
    setActive(i) {
      this.activeIndex = i
    },
  },
}
</script>
