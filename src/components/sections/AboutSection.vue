<template>
  <section id="about" class="about section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ about.title }}</h2>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div class="row gy-4">
        <!-- Left Column -->
        <div class="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
          <p v-html="about.left.intro"></p>
          <ul>
            <li v-for="(feature, i) in about.left.features" :key="i">
              <i class="bi" :class="feature.icon"></i>
              <span><strong>{{ feature.title }}</strong> <span v-html="feature.desc"></span></span>
            </li>
          </ul>
        </div>

        <!-- Right Column -->
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <p v-html="about.right.text"></p>
          <a :href="about.right.cta.href" class="read-more">
            <span>{{ about.right.cta.label }}</span><i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { siteData } from "@/data/siteData"

export default {
  name: "AboutSection",
  data() {
    return {
      about: siteData.about,
    }
  },
}
</script>
