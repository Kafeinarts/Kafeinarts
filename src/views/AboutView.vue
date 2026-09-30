<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Tentang Kafeinarts"
      tagline="Perpaduan energi kreatif dan keahlian teknis"
      desc="Kami membangun produk digital yang fungsional sekaligus estetis — dari arsitektur backend yang tangguh hingga antarmuka yang memanjakan mata."
      icon="bi-people"
      icon-color="#00205D"
    />

    <!-- Intro + Fitur -->
    <section class="section">
      <div class="container">
        <div class="row gy-4 align-items-center">
          <div class="col-lg-6" data-aos="fade-up">
            <h2 class="fw-bold mb-3">Siapa Kami?</h2>
            <!-- intro dari JSON (boleh mengandung <em>/<strong>) -->
            <p class="lead" v-html="about.intro"></p>
            <ul class="list-unstyled d-flex flex-column gap-3 mt-4 mb-0">
              <li v-for="feature in about.features" :key="feature.title" class="d-flex gap-3">
                <i class="bi fs-5" :class="feature.icon"></i>
                <div>
                  <strong>{{ feature.title }}</strong>
                  <p class="mb-0" v-html="feature.desc"></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="150">
            <div class="about-story card border-0 shadow-sm h-100">
              <div class="card-body p-4 p-lg-5">
                <h3 class="h5 fw-bold mb-3">
                  <i class="bi bi-bookmark-heart me-2"></i>{{ about.story.title }}
                </h3>
                <p class="mb-4" v-html="about.story.text"></p>
                <router-link :to="about.story.cta.to" class="btn btn-primary">
                  {{ about.story.cta.label }} <i class="bi bi-arrow-right ms-1"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nilai kerja -->
    <section class="section light-background">
      <div class="container">
        <SectionHeading :title="about.values.title" :subtitle="about.values.subtitle" />
        <div class="row gy-4">
          <div v-for="(value, i) in about.values.items" :key="value.title" class="col-md-6 col-xl-3 d-flex" data-aos="fade-up" :data-aos-delay="(i + 1) * 100">
            <FeatureCard v-bind="value" />
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline cara kerja -->
    <section class="section">
      <div class="container">
        <SectionHeading :title="about.timeline.title" :subtitle="about.timeline.subtitle" />
        <div class="row gy-4">
          <div v-for="(step, i) in about.timeline.steps" :key="step.step" class="col-md-6 col-xl-3" data-aos="fade-up" :data-aos-delay="(i + 1) * 100">
            <div class="timeline-card h-100">
              <span class="timeline-step">{{ step.step }}</span>
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <CtaBanner :title="'Siap berkolaborasi dengan kami?'" :desc="'Ceritakan proyek Anda — tim kami siap membantu dari tahap perencanaan.'">
          <router-link :to="{ name: 'consultation' }" class="btn-hero-primary text-decoration-none">
            <i class="bi bi-chat-dots me-2"></i>Mulai Konsultasi
          </router-link>
          <router-link :to="{ name: 'team' }" class="btn-hero-outline text-decoration-none">
            <i class="bi bi-people me-2"></i>Lihat Tim
          </router-link>
        </CtaBanner>
      </div>
    </section>
  </main>
</template>

<script>
import PageHero from "@/components/ui/PageHero.vue"
import SectionHeading from "@/components/ui/SectionHeading.vue"
import FeatureCard from "@/components/ui/FeatureCard.vue"
import CtaBanner from "@/components/ui/CtaBanner.vue"
import { usePageSeo } from "@/composables/usePageSeo"
import { siteData } from "@/data/siteData"

export default {
  name: "AboutView",
  components: { PageHero, SectionHeading, FeatureCard, CtaBanner },
  setup() {
    usePageSeo({
      title: `Tentang Kami — ${siteData.seo.name}`,
      description: "Profil Kafeinarts Interactive: mitra teknis pengembangan SaaS, website, dan sistem manajemen di Depok.",
      path: "/about",
    })
  },
  data() {
    return { about: siteData.about }
  },
}
</script>

<style scoped>
.about-story {
  background: linear-gradient(160deg, #00205d, #04307f);
  color: #fff;
  border-radius: 16px;
}

.about-story h3 {
  color: #fff;
}

.about-story .btn-primary {
  background: #fff;
  border-color: #fff;
  color: #00205d;
  font-weight: 600;
}

.about-story .btn-primary:hover {
  background: #e8dcc6;
  border-color: #e8dcc6;
  color: #00205d;
}

.timeline-card {
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 26px 22px;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.timeline-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 32, 93, 0.12);
}

.timeline-step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent-color), transparent 88%);
  color: var(--accent-color);
  font-weight: 700;
  margin-bottom: 14px;
}

.timeline-card h4 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.timeline-card p {
  font-size: 0.9rem;
  margin: 0;
}
</style>
