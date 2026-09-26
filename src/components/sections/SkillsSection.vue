<template>
  <section id="skills" class="skills section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center">
          <img
            :src="asset(skills.image)"
            class="img-fluid"
            :alt="skills.imageAlt"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div class="col-lg-6 pt-4 pt-lg-0 content">
          <h2>{{ skills.heading }}</h2>
          <p class="fst-italic">{{ skills.desc }}</p>

          <div ref="animationRoot" class="skills-content skills-animation">
            <div v-for="(item, i) in skills.items" :key="i" class="progress">
              <span class="skill">
                <span>{{ item.label }}</span>
                <i class="val">{{ item.value }}%</i>
              </span>
              <div class="progress-bar-wrap">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :aria-valuenow="item.value"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :style="{ width: revealed ? item.value + '%' : '' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { asset } from "@/utils/asset"
import { siteData } from "@/data/siteData"

export default {
  name: "SkillsSection",
  data() {
    return {
      skills: siteData.skills,
      revealed: false,
      observer: null,
    }
  },
  mounted() {
    this.startObserve()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  },
  methods: {
    asset,
    /**
     * Pengganti Waypoint (offset 80%) dari template: animasi progress bar
     * dijalankan saat section masuk viewport.
     */
    startObserve() {
      const root = this.$refs.animationRoot
      if (!root) return
      if (!("IntersectionObserver" in window)) {
        this.revealed = true
        return
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.revealed = true
              this.observer.disconnect()
              this.observer = null
            }
          })
        },
        { root: null, rootMargin: "0px 0px -20% 0px", threshold: 0 },
      )
      this.observer.observe(root)
    },
  },
}
</script>
