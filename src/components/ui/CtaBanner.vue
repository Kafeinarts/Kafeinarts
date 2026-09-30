<template>
  <!-- CtaBanner: banner ajakan bertindak di bawah halaman (reusable) -->
  <div class="cta-banner" data-aos="fade-up">
    <h3>{{ title }}</h3>
    <p>{{ desc }}</p>
    <div class="d-flex flex-wrap justify-content-center gap-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CtaBanner",
  props: {
    title: { type: String, required: true },
    desc: { type: String, default: "" },
  },
}
</script>

<style scoped>
.cta-banner {
  text-align: center;
  background: linear-gradient(135deg, #00205d, #04307f);
  border-radius: 16px;
  padding: clamp(28px, 5vw, 48px);
  color: #fff;
}

.cta-banner h3 {
  color: #fff;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  margin-bottom: 12px;
}

.cta-banner p {
  max-width: 640px;
  margin: 0 auto 22px;
  opacity: 0.9;
}
</style>
