<template>
  <!-- PageHero: hero seragam untuk semua halaman dalam (reusable) -->
  <section class="page-hero page-hero-gradient">
    <div class="container" data-aos="fade-up">
      <nav v-if="breadcrumbs && breadcrumbs.length" aria-label="breadcrumb">
        <ol class="product-breadcrumb">
          <template v-for="(crumb, i) in breadcrumbs" :key="i">
            <li>
              <router-link v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</router-link>
              <span v-else aria-current="page">{{ crumb.label }}</span>
            </li>
            <li v-if="i < breadcrumbs.length - 1" aria-hidden="true">
              <i class="bi bi-chevron-right"></i>
            </li>
          </template>
        </ol>
      </nav>

      <div class="row align-items-center gy-4 mt-1">
        <div :class="hasAside ? 'col-lg-8' : 'col-12'">
          <h1>{{ title }}</h1>
          <p v-if="tagline" class="page-hero-tagline">{{ tagline }}</p>
          <p v-if="desc" class="page-hero-desc">{{ desc }}</p>

          <!-- CTA: slot bebas ATAU props terstruktur -->
          <div v-if="$slots.default" class="d-flex flex-wrap gap-3 mt-4">
            <slot></slot>
          </div>
          <div v-else-if="ctaPrimary || ctaSecondary" class="d-flex flex-wrap gap-3 mt-4">
            <router-link v-if="ctaPrimary" :to="ctaPrimary.to" class="btn-hero-primary text-decoration-none">
              <i class="bi me-2" :class="ctaPrimary.icon"></i>{{ ctaPrimary.label }}
            </router-link>
            <router-link v-if="ctaSecondary" :to="ctaSecondary.to" class="btn-hero-outline text-decoration-none">
              <i class="bi me-2" :class="ctaSecondary.icon"></i>{{ ctaSecondary.label }}
            </router-link>
          </div>
        </div>

        <div v-if="hasAside" class="col-lg-4 text-center">
          <div class="page-hero-icon" :style="iconStyle">
            <i class="bi" :class="icon"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * PageHero — komponen reusable untuk hero semua halaman dalam.
 * Pemakaian:
 *   <PageHero title=".." tagline=".." desc=".." :breadcrumbs="[...]">
 *     <router-link class="btn-hero-primary" :to="..">CTA</router-link>
 *   </PageHero>
 * atau via props: :cta-primary="{ label, to, icon }"
 */
export default {
  name: "PageHero",
  props: {
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    desc: { type: String, default: "" },
    breadcrumbs: { type: Array, default: () => [] },
    icon: { type: String, default: "" },
    iconColor: { type: String, default: "#2563eb" },
    ctaPrimary: { type: Object, default: null },
    ctaSecondary: { type: Object, default: null },
  },
  computed: {
    hasAside() {
      return Boolean(this.icon)
    },
    iconStyle() {
      return {
        background: `linear-gradient(135deg, ${this.iconColor}, color-mix(in srgb, ${this.iconColor}, #00205D 55%))`,
      }
    },
  },
}
</script>

<style scoped>
.page-hero-gradient {
  background:
    radial-gradient(ellipse at top left, color-mix(in srgb, var(--accent-color), transparent 82%), transparent 55%),
    linear-gradient(180deg, #00205d 0%, #04307f 100%);
}

.page-hero h1 {
  color: #fff;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 700;
  margin-bottom: 14px;
}

.page-hero-tagline {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  font-weight: 500;
  margin-bottom: 14px;
  color: #e8dcc6;
}

.page-hero-desc {
  font-size: 0.98rem;
  line-height: 1.75;
  opacity: 0.92;
}

.page-hero-icon {
  width: clamp(150px, 22vw, 210px);
  height: clamp(150px, 22vw, 210px);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.page-hero-icon i {
  font-size: clamp(64px, 10vw, 92px);
  color: #fff;
}
</style>
