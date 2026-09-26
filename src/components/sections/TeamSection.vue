<template>
  <section id="team" class="team section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ team.title }}</h2>
      <p>{{ team.subtitle }}</p>
    </div>
    <!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div ref="swiperEl" class="swiper init-swiper team-swiper">
        <div id="team-swiper-wrapper" class="swiper-wrapper">
          <div
            v-for="(member, index) in members"
            :key="index"
            class="swiper-slide"
            data-aos="fade-up"
            :data-aos-delay="member.delay"
          >
            <div
              class="flip-card"
              :class="{ flipped: flippedIndex === index }"
              :data-index="index"
              :data-name="member.name"
              :data-role="member.role"
              :data-img="asset(member.img)"
              tabindex="0"
              role="button"
              :aria-label="`Lihat detail ${member.name}`"
              @click="onCardClick($event, index)"
              @keydown="onCardKeydown($event, index)"
            >
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="team-portrait-img">
                    <img
                      :src="asset(member.img)"
                      :alt="member.alt"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="team-portrait-overlay">
                      <h3>{{ member.name }}</h3>
                      <span>{{ member.role }}</span>
                    </div>
                    <div class="team-portrait-zoom"><i class="bi bi-arrows-angle-expand"></i></div>
                  </div>
                </div>
                <div class="flip-card-back">
                  <h3>{{ member.name }}</h3>
                  <span>{{ member.role }}</span>
                  <p>{{ member.bio || fallbackBio }}</p>
                  <button class="btn-flip-close" type="button" @click.stop="unflip(index)">
                    <i class="bi bi-arrow-left"></i> Kembali
                  </button>
                  <button
                    class="btn-flip-lightbox"
                    type="button"
                    style="
                      margin-top: 8px;
                      background: transparent;
                      border: 1px solid rgba(255, 255, 255, 0.7);
                      color: #fff;
                      border-radius: 50px;
                      padding: 6px 14px;
                      font-size: 12px;
                      cursor: pointer;
                    "
                    @click.stop="openLightbox(index)"
                  >
                    <i class="bi bi-zoom-in"></i> Lihat Foto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>

    <!-- Team Lightbox Popup -->
    <TeamLightbox
      v-if="lightboxIndex !== null"
      :members="members"
      :index="lightboxIndex"
      @close="lightboxIndex = null"
    />
  </section>
</template>

<script>
import TeamLightbox from "@/components/sections/TeamLightbox.vue"
import { asset } from "@/utils/asset"
import { refreshAOS } from "@/utils/aos"
import { siteData } from "@/data/siteData"

export default {
  name: "TeamSection",
  components: { TeamLightbox },
  data() {
    return {
      team: siteData.team,
      members: siteData.team.members,
      fallbackBio: "Talenta Kafeinarts yang berdedikasi untuk inovasi digital.",
      flippedIndex: -1,
      lightboxIndex: null,
      swiper: null,
    }
  },
  mounted() {
    this.initSwiper()
  },
  beforeUnmount() {
    if (this.swiper) {
      this.swiper.destroy(true, true)
      this.swiper = null
    }
  },
  methods: {
    asset,
    onCardClick(event, index) {
      // Klik card = flip (kecuali klik tombol close / lightbox)
      if (
        event.target.closest(".btn-flip-close") ||
        event.target.closest(".btn-flip-lightbox")
      ) {
        return
      }
      this.flippedIndex = this.flippedIndex === index ? -1 : index
    },
    onCardKeydown(event, index) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        this.flippedIndex = this.flippedIndex === index ? -1 : index
      }
      if (event.key === "Escape") {
        this.flippedIndex = -1
      }
    },
    unflip(index) {
      if (this.flippedIndex === index) this.flippedIndex = -1
    },
    openLightbox(index) {
      this.lightboxIndex = index
    },
    initSwiper() {
      const el = this.$refs.swiperEl
      if (!el || !window.Swiper) return
      try {
        this.swiper = new window.Swiper(el, this.team.swiper)
        // Pastikan AOS mengenali slide yang baru disusun Swiper
        this.$nextTick(() => refreshAOS())
      } catch (e) {
        console.warn("[Swiper] gagal inisialisasi", e)
      }
    },
  },
}
</script>
