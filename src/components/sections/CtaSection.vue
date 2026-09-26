<template>
  <section id="call-to-action" class="call-to-action section dark-background">
    <img :src="asset(cta.bg)" :alt="cta.bgAlt" loading="lazy" decoding="async" />

    <div class="container">
      <div class="row" data-aos="zoom-in" data-aos-delay="100">
        <div class="col-xl-9 text-center text-xl-start">
          <h2>{{ cta.title }}</h2>
          <p>{{ cta.desc }}</p>
        </div>
        <div class="col-xl-3 cta-btn-container text-center">
          <a class="cta-btn align-middle" :href="cta.button.href">{{ cta.button.label }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { asset } from "@/utils/asset"
import { siteData } from "@/data/siteData"

export default {
  name: "CtaSection",
  data() {
    return {
      cta: siteData.cta,
    }
  },
  methods: {
    asset,
  },
}
</script>
