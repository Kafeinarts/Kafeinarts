<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Keahlian & Teknologi"
      tagline="Ekosistem teknologi modern & andal"
      desc="Kami memadukan arsitektur sistem yang tangguh, framework mutakhir, dan desain visual untuk hasil terbaik."
      icon="bi-cpu"
      icon-color="#6d28d9"
    />

    <!-- Skill bars -->
    <section class="section">
      <div class="container">
        <div class="row gy-4 align-items-center">
          <div class="col-lg-6" data-aos="fade-up">
            <h2 class="fw-bold mb-3">{{ skills.heading }}</h2>
            <p>{{ skills.desc }}</p>
            <div class="skills-content mt-4">
              <div v-for="item in skills.items" :key="item.label" class="skill-item mb-3">
                <div class="d-flex justify-content-between small fw-semibold mb-1">
                  <span>{{ item.label }}</span>
                  <span>{{ item.value }}%</span>
                </div>
                <div class="progress" role="progressbar" :aria-valuenow="item.value" aria-valuemin="0" aria-valuemax="100" style="height: 10px">
                  <div
                    class="progress-bar skills-progress-bar"
                    :style="{ width: item.value + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 text-center" data-aos="zoom-in" data-aos-delay="150">
            <img :src="asset(skills.image)" :alt="skills.imageAlt" class="img-fluid" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Tech stack -->
    <section class="section light-background">
      <div class="container">
        <SectionHeading :title="skills.stack.title" :subtitle="skills.stack.subtitle" />
        <div class="row gy-4">
          <div v-for="(group, i) in skills.stack.groups" :key="group.title" class="col-md-6 col-xl-3 d-flex" data-aos="fade-up" :data-aos-delay="(i + 1) * 100">
            <div class="stack-card h-100 w-100">
              <div class="stack-icon">
                <i class="bi" :class="group.icon"></i>
              </div>
              <h4>{{ group.title }}</h4>
              <div class="d-flex flex-wrap gap-2 mt-3">
                <span v-for="item in group.items" :key="item" class="stack-badge">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <CtaBanner title="Butuh tim dengan keahlian ini?" desc="Manfaatkan keahlian penuh tim Kafeinarts untuk proyek digital Anda berikutnya.">
          <router-link :to="{ name: 'consultation' }" class="btn-hero-primary text-decoration-none">
            <i class="bi bi-chat-dots me-2"></i>Konsultasikan Sekarang
          </router-link>
        </CtaBanner>
      </div>
    </section>
  </main>
</template>

<script>
import PageHero from "@/components/ui/PageHero.vue"
import SectionHeading from "@/components/ui/SectionHeading.vue"
import CtaBanner from "@/components/ui/CtaBanner.vue"
import { usePageSeo } from "@/composables/usePageSeo"
import { siteData } from "@/data/siteData"
import { asset } from "@/utils/asset"

export default {
  name: "SkillsView",
  components: { PageHero, SectionHeading, CtaBanner },
  setup() {
    usePageSeo({
      title: `Keahlian — ${siteData.seo.name}`,
      description: "Keahlian teknis Kafeinarts: backend, frontend, database, UI/UX, dan cloud dengan tech stack modern.",
      path: "/skills",
    })
  },
  data() {
    return { skills: siteData.skills }
  },
  methods: {
    asset,
  },
}
</script>

<style scoped>
.skills-progress-bar {
  background: linear-gradient(90deg, #00205d, #2563eb);
  transition: width 1s ease;
}

.stack-card {
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 26px 22px;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.stack-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 32, 93, 0.12);
}

.stack-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent-color), transparent 90%);
  color: var(--accent-color);
  margin-bottom: 14px;
}

.stack-icon i {
  font-size: 22px;
}

.stack-card h4 {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
}

.stack-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.78rem;
  font-weight: 600;
  background: color-mix(in srgb, var(--accent-color), transparent 92%);
  color: var(--accent-color);
}
</style>
