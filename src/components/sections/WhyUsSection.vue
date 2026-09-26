<template>
  <section id="why-us" class="section why-us light-background" data-builder="section">
    <div class="container-fluid">
      <div class="row gy-4">
        <div class="col-lg-7 d-flex flex-column justify-content-center order-2 order-lg-1">
          <div class="content px-xl-5" data-aos="fade-up" data-aos-delay="100">
            <h2 v-html="whyUs.heading"></h2>
            <p>{{ whyUs.desc }}</p>
          </div>

          <div class="faq-container px-xl-5" data-aos="fade-up" data-aos-delay="200">
            <div
              v-for="(item, i) in whyUs.items"
              :key="item.id"
              class="faq-item"
              :class="{ 'faq-active': activeIndex === i }"
            >
              <h3 @click="toggle(i)">
                <span>{{ item.id }}</span> {{ item.title }}
              </h3>
              <div class="faq-content">
                <p v-html="item.desc"></p>
              </div>
              <i class="faq-toggle bi bi-chevron-right" @click="toggle(i)"></i>
            </div>
          </div>
        </div>

        <div class="col-lg-5 order-1 order-lg-2 why-us-img">
          <img
            :src="asset(whyUs.image)"
            class="img-fluid"
            :alt="whyUs.imageAlt"
            loading="lazy"
            decoding="async"
            data-aos="zoom-in"
            data-aos-delay="100"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { asset } from "@/utils/asset"
import { siteData } from "@/data/siteData"

export default {
  name: "WhyUsSection",
  data() {
    const initial = siteData.whyUs.items.findIndex((item) => item.active)
    return {
      whyUs: siteData.whyUs,
      activeIndex: initial >= 0 ? initial : 0,
    }
  },
  methods: {
    asset,
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? -1 : index
    },
  },
}
</script>
