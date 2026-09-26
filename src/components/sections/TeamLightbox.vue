<template>
  <div
    id="teamLightbox"
    class="team-lightbox"
    :class="{ active: open }"
    :aria-hidden="open ? 'false' : 'true'"
    @wheel.prevent
  >
    <div class="team-lightbox-backdrop" @click="close"></div>
    <button class="team-lightbox-close" type="button" aria-label="Tutup popup" @click="close">
      <i class="bi bi-x-lg"></i>
    </button>
    <button
      class="team-lightbox-nav prev"
      type="button"
      aria-label="Foto sebelumnya"
      @click.stop="prev"
    >
      <i class="bi bi-chevron-left"></i>
    </button>
    <button
      class="team-lightbox-nav next"
      type="button"
      aria-label="Foto berikutnya"
      @click.stop="next"
    >
      <i class="bi bi-chevron-right"></i>
    </button>

    <div
      class="team-lightbox-content"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      <img
        :src="asset(currentMember.img)"
        :alt="`${currentMember.name} - ${currentMember.role}`"
        :style="imgStyle"
        :title="'Klik untuk foto berikutnya'"
        draggable="false"
        @click.stop="next"
      />
      <div class="team-lightbox-caption">
        <h4>{{ currentMember.name }}</h4>
        <span>{{ currentMember.role }}</span>
        <div class="team-lightbox-counter">{{ current + 1 }} / {{ members.length }}</div>
      </div>
    </div>

    <div class="team-lightbox-hint">
      <i class="bi bi-arrows"></i> swipe / geser untuk ganti foto
    </div>
  </div>
</template>

<script>
import { asset } from "@/utils/asset"

export default {
  name: "TeamLightbox",
  props: {
    members: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  emits: ["close"],
  data() {
    return {
      current: this.index,
      open: true,
      visible: true,
      transitionTimer: null,
      touchStartX: 0,
      touchStartY: 0,
      mouseDownX: 0,
      mouseIsDown: false,
    }
  },
  computed: {
    currentMember() {
      return this.members[this.current] || this.members[0] || {}
    },
    imgStyle() {
      return {
        opacity: this.visible ? 1 : 0,
        transform: this.visible ? "scale(1)" : "scale(0.98)",
        cursor: "pointer",
        transition: "opacity 0.28s ease, transform 0.28s ease",
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.onKeydown)
    document.body.classList.add("team-lightbox-open")
    this.$nextTick(() => {
      const closeBtn = this.$el.querySelector(".team-lightbox-close")
      if (closeBtn) closeBtn.focus({ preventScroll: true })
    })
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.onKeydown)
    document.body.classList.remove("team-lightbox-open")
    if (this.transitionTimer) clearTimeout(this.transitionTimer)
  },
  methods: {
    asset,
    goTo(index) {
      const length = this.members.length
      if (!length) return
      const target = ((index % length) + length) % length
      if (this.transitionTimer) clearTimeout(this.transitionTimer)
      this.visible = false
      this.transitionTimer = setTimeout(() => {
        this.current = target
        this.visible = true
        this.transitionTimer = null
      }, 140)
    },
    next() {
      this.goTo(this.current + 1)
    },
    prev() {
      this.goTo(this.current - 1)
    },
    close() {
      if (!this.open) return
      this.open = false
      setTimeout(() => this.$emit("close"), 320)
    },
    onKeydown(event) {
      if (!this.open) return
      if (event.key === "Escape") this.close()
      if (event.key === "ArrowRight") this.next()
      if (event.key === "ArrowLeft") this.prev()
    },
    onTouchStart(event) {
      if (!this.open) return
      const t = event.changedTouches[0]
      this.touchStartX = t.clientX
      this.touchStartY = t.clientY
    },
    onTouchEnd(event) {
      if (!this.open) return
      const t = event.changedTouches[0]
      const dx = t.clientX - this.touchStartX
      const dy = t.clientY - this.touchStartY
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) this.next()
        else this.prev()
      } else if (Math.abs(dy) > 120 && Math.abs(dy) > Math.abs(dx) && dy > 0) {
        this.close()
      }
    },
    onMouseDown(event) {
      if (!this.open) return
      this.mouseIsDown = true
      this.mouseDownX = event.clientX
    },
    onMouseUp(event) {
      if (!this.mouseIsDown) return
      this.mouseIsDown = false
      const dx = event.clientX - this.mouseDownX
      if (Math.abs(dx) > 60) {
        if (dx < 0) this.next()
        else this.prev()
      }
    },
    onMouseLeave() {
      this.mouseIsDown = false
    },
  },
}
</script>
