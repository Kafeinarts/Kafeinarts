<template>
  <section id="faq-2" class="faq-2 section light-background">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Pertanyaan yang Sering Diajukan (FAQ)</h2>
      <p>
        Temukan jawaban atas pertanyaan umum seputar layanan, proses kerja, dan bagaimana
        Kafeinarts dapat membantu mewujudkan visi digital bisnis Anda.
      </p>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="faq-container">
            <div
              v-for="(item, i) in faqs"
              :key="i"
              class="faq-item"
              :class="{ 'faq-active': activeIndex === i }"
              data-aos="fade-up"
              :data-aos-delay="item.delay"
            >
              <i class="faq-icon bi bi-question-circle"></i>
              <h3 @click="toggle(i)">{{ item.q }}</h3>
              <div class="faq-content">
                <p v-html="item.a"></p>
              </div>
              <i class="faq-toggle bi bi-chevron-right" @click="toggle(i)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { siteData } from "@/data/siteData"

export default {
  name: "FaqSection",
  data() {
    const initial = siteData.faq.findIndex((item) => item.active)
    return {
      faqs: siteData.faq,
      activeIndex: initial >= 0 ? initial : 0,
    }
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? -1 : index
    },
  },
}
</script>
