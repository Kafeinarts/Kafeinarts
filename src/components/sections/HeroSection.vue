<template>
  <section id="hero" class="hero section dark-background">
    <div class="container">
      <div class="row gy-4">
        <div
          class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
          data-aos="zoom-out"
        >
          <!-- Headline Utama -->
          <h1 v-html="hero.title"></h1>

          <!-- Sub-headline / Tagline -->
          <p v-html="hero.subtitle"></p>

          <!-- Tombol Call-to-Action -->
          <div class="d-flex flex-wrap gap-3 hero-cta">
            <a :href="hero.ctaPrimary.href" class="btn-hero-primary">
              <i class="bi me-2" :class="hero.ctaPrimary.icon"></i>{{ hero.ctaPrimary.label }}
            </a>
            <a :href="hero.ctaSecondary.href" class="btn-hero-outline">
              <i class="bi me-2" :class="hero.ctaSecondary.icon"></i>{{ hero.ctaSecondary.label }}
            </a>
          </div>
        </div>

        <div
          class="col-lg-6 order-1 order-lg-2 hero-img"
          data-aos="zoom-out"
          data-aos-delay="200"
        >
          <img :src="asset(hero.image)" class="img-fluid animated" :alt="hero.imageAlt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { asset } from "@/utils/asset"
import { siteData } from "@/data/siteData"

export default {
  name: "HeroSection",
  data() {
    return {
      hero: siteData.hero,
    }
  },
  methods: {
    asset,
  },
}
</script>
