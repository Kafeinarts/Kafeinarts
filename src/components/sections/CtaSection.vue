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
          <router-link class="cta-btn align-middle" :to="{ name: 'consultation' }">{{ cta.button.label }}</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { asset } from "@/utils/asset"

export default {
  name: "CtaSection",
  data() {
    return {
      cta: {
        bg: "assets/img/bg/bg-8.webp",
        bgAlt: "Latar Belakang Kafeinarts",
        title: "Siap Mewujudkan Ide Digital Anda?",
        desc: "Jangan biarkan ide cemerlang Anda hanya menjadi rencana. Baik itu pengembangan aplikasi SaaS, sistem manajemen, hingga solusi cloud, kami siap berkolaborasi merancang teknologi yang mempercepat pertumbuhan bisnis Anda.",
        button: { label: "Mulai Konsultasi" },
      },
    }
  },
  methods: {
    asset,
  },
}
</script>
