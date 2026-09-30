<template>
  <!-- FeatureCard: kartu ikon + judul + deskripsi (reusable) -->
  <div class="feature-card h-100">
    <div class="feature-card-icon" :style="iconBg">
      <i class="bi" :class="icon"></i>
    </div>
    <h4>{{ title }}</h4>
    <p>{{ desc }}</p>
  </div>
</template>

<script>
export default {
  name: "FeatureCard",
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, default: "" },
    color: { type: String, default: "#00205D" },
  },
  computed: {
    iconBg() {
      return { background: this.color }
    },
  },
}
</script>

<style scoped>
.feature-card {
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 26px 22px;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 32, 93, 0.12);
}

.feature-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.feature-card-icon i {
  font-size: 22px;
  color: #fff;
}

.feature-card h4 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 0.9rem;
  line-height: 1.65;
  margin: 0;
}
</style>
