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
            v-for="(member, i) in team.members"
            :key="member.name"
            class="col-xl-3 col-md-6 d-flex align-items-stretch"
            data-aos="fade-up"
            :data-aos-delay="member.delay"
          >
            <!-- Kartu berfungsi sebagai tombol: klik/Enter/Spasi = buka lightbox -->
            <div
              class="team-member-card w-100"
              role="button"
              tabindex="0"
              :aria-label="'Lihat detail ' + member.name"
              @click="openLightbox(i)"
              @keydown.enter.prevent="openLightbox(i)"
              @keydown.space.prevent="openLightbox(i)"
            >
              <div class="member-img">
                <img
                  :src="asset(member.img)"
                  :alt="member.alt"
                  width="324"
                  height="504"
                  loading="lazy"
                />
                <span class="member-zoom" aria-hidden="true">
                  <i class="bi bi-zoom-in"></i>
                </span>
                <div class="social">
                  <a
                    v-for="s in socials"
                    :key="s.icon"
                    :href="s.href"
                    :aria-label="s.label"
                    @click.stop
                  >
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

    <!-- ============================================================
         Lightbox detail anggota tim
         - Terbuka saat kartu diklik (openLightbox) lewat Modal Bootstrap.
         - Navigasi: panah kiri/kanan (tap zone), swipe touch, keyboard ←/→.
         - Foto memakai rasio asli 324x504 (contain) — tidak ter-crop.
         ============================================================ -->
    <div
      id="teamLightbox"
      ref="lightbox"
      class="modal fade team-lightbox"
      tabindex="-1"
      aria-labelledby="teamLightboxLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content team-lightbox-content">
          <button
            type="button"
            class="btn-close team-lightbox-close"
            data-bs-dismiss="modal"
            aria-label="Tutup"
          ></button>

          <div
            class="lightbox-stage"
            @touchstart.passive="onTouchStart"
            @touchend="onTouchEnd"
          >
            <!-- Tap zone setengah kiri = sebelumnya -->
            <button
              type="button"
              class="lightbox-zone lightbox-zone-prev"
              aria-label="Anggota sebelumnya"
              @click="zoneNav('prev')"
            >
              <span class="lightbox-arrow"><i class="bi bi-chevron-left" aria-hidden="true"></i></span>
            </button>
            <!-- Tap zone setengah kanan = berikutnya -->
            <button
              type="button"
              class="lightbox-zone lightbox-zone-next"
              aria-label="Anggota berikutnya"
              @click="zoneNav('next')"
            >
              <span class="lightbox-arrow"><i class="bi bi-chevron-right" aria-hidden="true"></i></span>
            </button>

            <figure
              :key="activeIndex"
              class="lightbox-figure"
              :class="slideDir === 'prev' ? 'anim-prev' : 'anim-next'"
            >
              <img :src="asset(activeMember.img)" :alt="activeMember.alt" />
            </figure>

            <span class="lightbox-counter">
              {{ activeIndex + 1 }} / {{ team.members.length }}
            </span>
          </div>

          <div class="lightbox-info text-center">
            <h4 id="teamLightboxLabel">{{ activeMember.name }}</h4>
            <span class="lightbox-role">{{ activeMember.role }}</span>
            <p>{{ activeMember.bio }}</p>
          </div>
        </div>
      </div>
    </div>

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
      // ── State lightbox ──
      activeIndex: 0, // indeks anggota yang sedang ditampilkan
      slideDir: "next", // arah animasi slide (next | prev)
      touchX: 0, // titik awal touch (deteksi swipe kiri/kanan)
      touchY: 0,
      swiped: false, // swipe baru terjadi → tolak click zone berikutnya
      lightboxOpen: false, // status modal, untuk filter event keyboard
    }
  },
  computed: {
    activeMember() {
      return this.team.members[this.activeIndex] || this.team.members[0]
    },
  },
  methods: {
    asset,

    /**
     * Buka lightbox pada anggota ke-i (dipanggil dari kartu: klik/Enter/Spasi).
     * Memakai Modal Bootstrap global — sama seperti modal demo produk.
     */
    openLightbox(i) {
      this.goTo(i, "next")
      const el = this.$refs.lightbox
      if (!el || !window.bootstrap || !window.bootstrap.Modal) return
      window.bootstrap.Modal.getOrCreateInstance(el).show()
    },

    /** Pindah ke indeks ke-i (wrap-around 0..n-1) dengan arah animasi. */
    goTo(i, dir) {
      const n = this.team.members.length
      this.activeIndex = ((i % n) + n) % n
      this.slideDir = dir
    },

    next() {
      this.goTo(this.activeIndex + 1, "next")
    },

    prev() {
      this.goTo(this.activeIndex - 1, "prev")
    },

    /** Handler tap zone / tombol panah — diabaikan bila itu sisa swipe. */
    zoneNav(dir) {
      if (this.swiped) return
      if (dir === "next") {
        this.next()
      } else {
        this.prev()
      }
    },

    onTouchStart(e) {
      const t = e.touches[0]
      this.touchX = t.clientX
      this.touchY = t.clientY
      this.swiped = false
    },

    /** Swipe horizontal > 45px → next (kiri) / prev (kanan). */
    onTouchEnd(e) {
      const t = e.changedTouches[0]
      const dx = t.clientX - this.touchX
      const dy = t.clientY - this.touchY
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        this.swiped = true
        if (dx < 0) {
          this.next()
        } else {
          this.prev()
        }
        window.setTimeout(() => {
          this.swiped = false
        }, 400)
      }
    },

    /** Keyboard ←/→ hanya saat lightbox terbuka (Esc ditangani Bootstrap). */
    onLightboxKey(e) {
      if (!this.lightboxOpen) return
      if (e.key === "ArrowRight") {
        e.preventDefault()
        this.next()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        this.prev()
      }
    },

    onModalShown() {
      this.lightboxOpen = true
    },

    onModalHidden() {
      this.lightboxOpen = false
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onLightboxKey)
    const el = this.$refs.lightbox
    if (el) {
      el.addEventListener("shown.bs.modal", this.onModalShown)
      el.addEventListener("hidden.bs.modal", this.onModalHidden)
    }
  },
  beforeUnmount() {
    // Tutup modal & lepas listener saat pindah route
    // (mencegah backdrop/body-lock Bootstrap tertinggal).
    window.removeEventListener("keydown", this.onLightboxKey)
    const el = this.$refs.lightbox
    if (el) {
      el.removeEventListener("shown.bs.modal", this.onModalShown)
      el.removeEventListener("hidden.bs.modal", this.onModalHidden)
      if (window.bootstrap && window.bootstrap.Modal) {
        const instance = window.bootstrap.Modal.getInstance(el)
        if (instance) instance.hide()
      }
    }
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
  cursor: pointer;
}

.team-member-card:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 3px;
}

.team-member-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0, 32, 93, 0.14);
}

.member-img {
  position: relative;
  overflow: hidden;
  /* Rasio ASLI foto tim (324x504) — seluruh desain foto tampil, tanpa crop */
  aspect-ratio: 324 / 504;
  background: color-mix(in srgb, var(--accent-color), transparent 92%);
}

.member-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.5s ease;
}

/* Petunjuk visual bahwa kartu bisa diklik (buka lightbox) */
.member-zoom {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: #00205d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.team-member-card:hover .member-zoom,
.team-member-card:focus-visible .member-zoom {
  opacity: 1;
  transform: scale(1);
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

/* ============================================================
   Lightbox detail anggota tim
   ============================================================ */
.team-lightbox-content {
  position: relative;
  background: linear-gradient(160deg, #00205d, #04307f);
  border: none;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 32, 93, 0.4);
}

.team-lightbox-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 6;
  filter: invert(1) grayscale(1) brightness(2);
  opacity: 0.85;
}

.lightbox-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  background: rgba(0, 10, 35, 0.45);
}

.lightbox-figure {
  margin: 0;
  padding: 20px 58px 44px;
  display: flex;
  justify-content: center;
  max-width: 100%;
}

.lightbox-figure img {
  width: auto;
  height: auto;
  max-width: 100%;
  /* Batas tinggi viewport agar foto selalu muat — rasio asli dipertahankan */
  max-height: min(62vh, 540px);
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

/* Tap zone setengah area foto: kiri = previous, kanan = next */
.lightbox-zone {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  z-index: 3;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  transition: background 0.25s ease;
}

.lightbox-zone-prev {
  left: 0;
  justify-content: flex-start;
  padding-left: 14px;
}

.lightbox-zone-next {
  right: 0;
  justify-content: flex-end;
  padding-right: 14px;
}

.lightbox-zone:hover {
  background: rgba(255, 255, 255, 0.07);
}

.lightbox-zone:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.7);
  outline-offset: -4px;
}

.lightbox-arrow {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.35);
  transition: background 0.25s ease, transform 0.25s ease;
}

.lightbox-zone:hover .lightbox-arrow {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.08);
}

.lightbox-counter {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  padding: 4px 13px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  pointer-events: none;
}

.lightbox-info {
  padding: 14px 26px 26px;
  color: #fff;
}

.lightbox-info h4 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
}

.lightbox-role {
  display: inline-block;
  margin-top: 2px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #9ec1ff;
}

.lightbox-info p {
  margin: 10px auto 0;
  max-width: 560px;
  font-size: 0.92rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.78);
}

/* Animasi slide mengikuti arah navigasi (next → dari kanan, prev → dari kiri) */
@keyframes teamLightboxInNext {
  from {
    opacity: 0;
    transform: translateX(38px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes teamLightboxInPrev {
  from {
    opacity: 0;
    transform: translateX(-38px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.lightbox-figure.anim-next {
  animation: teamLightboxInNext 0.28s ease both;
}

.lightbox-figure.anim-prev {
  animation: teamLightboxInPrev 0.28s ease both;
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-figure.anim-next,
  .lightbox-figure.anim-prev {
    animation: none;
  }
}

@media (max-width: 575.98px) {
  .lightbox-figure {
    padding: 16px 48px 40px;
  }

  .lightbox-zone-prev {
    padding-left: 8px;
  }

  .lightbox-zone-next {
    padding-right: 8px;
  }

  .lightbox-arrow {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
  }

  .lightbox-info {
    padding: 12px 18px 20px;
  }
}
</style>
