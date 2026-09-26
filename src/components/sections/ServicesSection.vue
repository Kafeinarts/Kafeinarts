<template>
  <section id="services" class="services section light-background">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Layanan Kami</h2>
      <p>Solusi teknologi end-to-end untuk mendukung pertumbuhan dan efisiensi bisnis Anda</p>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div class="row gy-4">
        <div
          v-for="service in services"
          :key="service.title"
          class="col-xl-3 col-md-6 d-flex"
          data-aos="fade-up"
          :data-aos-delay="service.delay"
        >
          <div class="service-item position-relative text-center h-100 w-100 p-4">
            <div class="icon mx-auto mb-4 d-flex align-items-center justify-content-center">
              <i class="bi fs-1" :class="service.icon"></i>
            </div>
            <h3><a href="#contact" class="stretched-link">{{ service.title }}</a></h3>
            <p>{{ service.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { siteData } from "@/data/siteData"

export default {
  name: "ServicesSection",
  data() {
    return {
      services: siteData.services,
    }
  },
}
</script>
