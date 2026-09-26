<template>
  <a
    href="#"
    class="scroll-top d-flex align-items-center justify-content-center"
    :class="{ active: active }"
    aria-label="Kembali ke atas"
    @click.prevent="scrollUp"
  >
    <i class="bi bi-arrow-up-short"></i>
  </a>
</template>

<script>
export default {
  name: "ScrollTop",
  data() {
    return {
      active: false,
    }
  },
  mounted() {
    this.toggle()
    window.addEventListener("scroll", this.toggle, { passive: true })
    window.addEventListener("load", this.toggle)
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.toggle)
    window.removeEventListener("load", this.toggle)
  },
  methods: {
    toggle() {
      this.active = window.scrollY > 100
    },
    scrollUp() {
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
  },
}
</script>
