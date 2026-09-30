<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Tim Kami"
      tagline="Talenta kreatif & teknis di balik Kafeinarts"
      desc="Orang-orang yang bekerja setiap hari untuk mengubah ide kompleks menjadi produk digital yang berkinerja tinggi."
      icon="bi-people-fill"
      icon-color="#be185d"
    />

    <section class="section">
      <div class="container">
        <SectionHeading :title="team.title" :subtitle="team.subtitle" />
        <div class="row gy-4 justify-content-center">
          <div
            v-for="member in team.members"
            :key="member.name"
            class="col-xl-3 col-md-6 d-flex align-items-stretch"
            data-aos="fade-up"
            :data-aos-delay="member.delay"
          >
            <div class="team-member-card w-100">
              <div class="member-img">
                <img :src="asset(member.img)" :alt="member.alt" class="img-fluid" loading="lazy" />
                <div class="social">
                  <a v-for="s in socials" :key="s.icon" :href="s.href" :aria-label="s.label">
                    <i class="bi" :class="s.icon"></i>
                  </a>
                </div>
              </div>
              <div class="member-info p-4 text-center">
                <h4>{{ member.name }}</h4>
                <span>{{ member.role }}</span>
                <p class="mt-2 mb-0">{{ member.bio }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <CtaBanner title="Ingin bekerja dengan tim ini?" desc="Mulai kolaborasi dengan sesi konsultasi gratis bersama kami.">
          <router-link :to="{ name: 'consultation' }" class="btn-hero-primary text-decoration-none">
            <i class="bi bi-chat-dots me-2"></i>Mulai Konsultasi
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
  name: "TeamView",
  components: { PageHero, SectionHeading, CtaBanner },
  setup() {
    usePageSeo({
      title: `Tim Kami — ${siteData.seo.name}`,
      description: "Kenali tim Kafeinarts: developer, designer, dan digital marketer yang siap mewujudkan produk digital Anda.",
      path: "/team",
    })
  },
  data() {
    return {
      team: siteData.team,
      socials: siteData.footer.social.slice(0, 4),
    }
  },
  methods: {
    asset,
  },
}
</script>

<style scoped>
.team-member-card {
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.team-member-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0, 32, 93, 0.14);
}

.member-img {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: color-mix(in srgb, var(--accent-color), transparent 92%);
}

.member-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-member-card:hover .member-img img {
  transform: scale(1.05);
}

.member-img .social {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: linear-gradient(transparent, rgba(0, 32, 93, 0.85));
  opacity: 0;
  transition: opacity 0.35s ease;
}

.team-member-card:hover .member-img .social {
  opacity: 1;
}

.member-img .social a {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.member-img .social a:hover {
  background: var(--accent-color);
}

.member-info h4 {
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 2px;
}

.member-info span {
  display: block;
  font-size: 0.82rem;
  color: color-mix(in srgb, var(--accent-color), transparent 25%);
  font-weight: 600;
}

.member-info p {
  font-size: 0.85rem;
  line-height: 1.6;
}
</style>
