<template>
  <!-- SectionHeading: judul section seragam (reusable) -->
  <div class="section-title" data-aos="fade-up">
    <h2>{{ title }}</h2>
    <p v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "SectionHeading",
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
  },
}
</script>
