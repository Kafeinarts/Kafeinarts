<template>
  <section id="about" class="about section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ about.title }}</h2>
      <p>{{ about.subtitle }}</p>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div class="row gy-4">
        <!-- Left Column -->
        <div class="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
          <p v-html="about.intro"></p>
          <ul>
            <li v-for="feature in about.features" :key="feature.title">
              <i class="bi" :class="feature.icon"></i>
              <span><strong>{{ feature.title }}</strong> <span v-html="feature.desc"></span></span>
            </li>
          </ul>
        </div>

        <!-- Right Column -->
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <p v-html="about.story.text"></p>
          <router-link :to="about.story.cta.to" class="read-more">
            <span>{{ about.story.cta.label }}</span><i class="bi bi-arrow-right"></i>
          </router-link>
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
