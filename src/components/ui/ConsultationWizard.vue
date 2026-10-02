<template>
  <!-- ConsultationWizard: wizard multi-step order/konsultasi harga via WhatsApp -->
  <div class="consult-wizard card shadow-sm border-0">
    <div class="card-body p-4 p-md-5">
      <!-- Progress steps -->
      <ol class="wizard-steps list-unstyled d-flex justify-content-between mb-4">
        <li
          v-for="(step, i) in steps"
          :key="step.key"
          class="wizard-step"
          :class="{ 'is-active': i === currentStep, 'is-done': i < currentStep }"
        >
          <span class="wizard-step-dot">{{ i < currentStep ? "✓" : i + 1 }}</span>
          <span class="wizard-step-label d-none d-md-inline">{{ step.label }}</span>
        </li>
      </ol>

      <!-- Step 1: Jenis kebutuhan -->
      <div v-if="currentStep === 0" class="wizard-pane">
        <h4 class="mb-1">Apa yang Anda butuhkan?</h4>
        <p class="text-muted mb-4">Pilih salah satu — dapat diubah nanti saat diskusi.</p>
        <div class="row g-3">
          <div v-for="opt in intentOptions" :key="opt.key" class="col-md-6 d-flex">
            <label class="wizard-option" :class="{ selected: form.intent === opt.key }">
              <input v-model="form.intent" type="radio" :value="opt.key" class="d-none" />
              <i class="bi fs-4" :class="opt.icon"></i>
              <div>
                <strong>{{ opt.label }}</strong>
                <p class="mb-0 small text-muted">{{ opt.desc }}</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Step 2: Profil -->
      <div v-else-if="currentStep === 1" class="wizard-pane">
        <h4 class="mb-1">Profil Anda</h4>
        <p class="text-muted mb-4">Data ini hanya dipakai untuk menghubungi Anda kembali.</p>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nama Lengkap <span class="text-danger">*</span></label>
            <input v-model.trim="form.name" type="text" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Nomor WhatsApp Aktif <span class="text-danger">*</span></label>
            <div class="input-group">
              <span class="input-group-text">+62</span>
              <input v-model.trim="form.phone" type="tel" class="form-control" placeholder="858xxxxxxxx" required />
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Instansi / Perusahaan</label>
            <input v-model.trim="form.org" type="text" class="form-control" placeholder="Opsional" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input v-model.trim="form.email" type="email" class="form-control" placeholder="Opsional" />
          </div>
        </div>
        <div class="mt-3 small text-muted">
          <i class="bi bi-shield-check me-1"></i>
          Data hanya digunakan untuk keperluan konsultasi &amp; penjadwalan meeting.
        </div>
      </div>

      <!-- Step 3: Skala & waktu -->
      <div v-else-if="currentStep === 2" class="wizard-pane">
        <h4 class="mb-1">Skala Proyek &amp; Target Waktu</h4>
        <p class="text-muted mb-4">Membantu kami menyiapkan gambaran estimasi awal.</p>
        <div class="mb-4">
          <label class="form-label fw-semibold">Estimasi Budget</label>
          <div class="row g-2">
            <div v-for="b in budgetRanges" :key="b.key" class="col-md-6">
              <label class="wizard-option wizard-option-compact" :class="{ selected: form.budget === b.label }">
                <input v-model="form.budget" type="radio" :value="b.label" class="d-none" />
                {{ b.label }}
              </label>
            </div>
          </div>
        </div>
        <div>
          <label class="form-label fw-semibold">Target Mulai / Selesai</label>
          <div class="row g-2">
            <div v-for="t in timelineOptions" :key="t.key" class="col-md-6">
              <label class="wizard-option wizard-option-compact" :class="{ selected: form.timeline === t.label }">
                <input v-model="form.timeline" type="radio" :value="t.label" class="d-none" />
                {{ t.label }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Jadwal meeting -->
      <div v-else-if="currentStep === 3" class="wizard-pane">
        <h4 class="mb-1">Jadwal Meeting Persiapan</h4>
        <p class="text-muted mb-4">
          Pilih mode dan waktu yang nyaman — kami konfirmasi ulang via WhatsApp.
        </p>
        <div class="row g-3 mb-4">
          <div v-for="mode in meetingModes" :key="mode.key" class="col-md-6 d-flex">
            <label class="wizard-option" :class="{ selected: form.meetingMode === mode.label }">
              <input v-model="form.meetingMode" type="radio" :value="mode.label" class="d-none" />
              <i class="bi fs-4" :class="mode.icon"></i>
              <div>
                <strong>{{ mode.label }}</strong>
              </div>
            </label>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Tanggal preferensi</label>
            <input v-model="form.meetingDate" type="date" class="form-control" :min="today" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Jam preferensi</label>
            <input v-model="form.meetingTime" type="time" class="form-control" />
          </div>
          <div class="col-12">
            <label class="form-label">Catatan tambahan</label>
            <textarea
              v-model.trim="form.notes"
              class="form-control"
              rows="3"
              placeholder="Ceritakan singkat kebutuhan Anda (opsional)"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Step 5: Ringkasan -->
      <div v-else class="wizard-pane">
        <h4 class="mb-1">Ringkasan Konsultasi</h4>
        <p class="text-muted mb-4">Pastikan data sudah benar, lalu kirim ke WhatsApp kami.</p>
        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item d-flex justify-content-between gap-3">
            <span class="text-muted">Niat</span>
            <strong>{{ intentLabel }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between gap-3">
            <span class="text-muted">Nama</span>
            <strong>{{ form.name || "-" }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between gap-3">
            <span class="text-muted">WhatsApp</span>
            <strong>+62{{ form.phone }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between gap-3">
            <span class="text-muted">Budget</span>
            <strong>{{ form.budget || "-" }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between gap-3">
            <span class="text-muted">Waktu</span>
            <strong>{{ form.timeline || "-" }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between gap-3">
            <span class="text-muted">Meeting</span>
            <strong>{{ meetingSummary || "-" }}</strong>
          </li>
        </ul>
        <div class="alert alert-info small mb-0">
          <i class="bi bi-info-circle me-1"></i>{{ successNote }}
        </div>
      </div>

      <!-- Navigasi wizard -->
      <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
        <button v-if="currentStep > 0" type="button" class="btn btn-outline-secondary" @click="prev">
          <i class="bi bi-arrow-left me-1"></i> Kembali
        </button>
        <span v-else></span>
        <button v-if="currentStep < steps.length - 1" type="button" class="btn btn-primary px-4" @click="next">
          Lanjut <i class="bi bi-arrow-right ms-1"></i>
        </button>
        <button v-else type="button" class="btn btn-success px-4" @click="submit">
          <i class="bi bi-whatsapp me-1"></i> Kirim ke WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { siteData } from "@/data/siteData"
import { buildConsultationMessage, buildWaUrl, getPrimaryWhatsApp } from "@/utils/whatsapp"
import { notifyWarning } from "@/utils/notify"

/**
 * ConsultationWizard — wizard multi-step konsultasi/penawaran.
 * Alur: Niat -> Profil -> Skala & Waktu -> Jadwal Meeting -> Ringkasan.
 * Kirim: pesan tersusun otomatis ke WhatsApp utama Kafeinarts (0858-1704-8266).
 */
export default {
  name: "ConsultationWizard",
  props: {
    /** Slug produk yang diorder/ditanyakan (opsional, dari halaman produk). */
    productSlug: { type: String, default: "" },
  },
  data() {
    const c = siteData
    return {
      steps: c.wizard.steps,
      intentOptions: c.wizard.intentOptions,
      meetingModes: c.meetingModes,
      budgetRanges: c.budgetRanges,
      timelineOptions: c.timelineOptions,
      successNote: c.wizard.successNote,
      currentStep: 0,
      form: {
        intent: "price",
        name: "",
        phone: "",
        org: "",
        email: "",
        budget: "",
        timeline: "",
        meetingMode: c.meetingModes[0].label,
        meetingDate: "",
        meetingTime: "",
        notes: "",
      },
    }
  },
  computed: {
    intentLabel() {
      return this.form.intent === "order" ? "Order Sekarang" : "Konsultasi Harga"
    },
    meetingSummary() {
      const parts = [this.form.meetingMode]
      if (this.form.meetingDate) parts.push(this.form.meetingDate)
      if (this.form.meetingTime) parts.push(this.form.meetingTime)
      return parts.filter(Boolean).join(", ")
    },
    today() {
      return new Date().toISOString().slice(0, 10)
    },
  },
  methods: {
    validateStep() {
      if (this.currentStep === 1) {
        if (!this.form.name) {
          notifyWarning("Mohon isi nama Anda.")
          return false
        }
        if (!/^[0-9]{8,13}$/.test(this.form.phone)) {
          notifyWarning("Mohon isi nomor WhatsApp yang valid (8-13 digit tanpa spasi).")
          return false
        }
      }
      return true
    },
    next() {
      if (!this.validateStep()) return
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
        this.scrollToWizard()
      }
    },
    prev() {
      if (this.currentStep > 0) {
        this.currentStep--
        this.scrollToWizard()
      }
    },
    scrollToWizard() {
      const el = this.$el
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    },
    submit() {
      const primary = getPrimaryWhatsApp()
      const product = this.productSlug
        ? siteData.products.find((p) => p.slug === this.productSlug)
        : null
      const message = buildConsultationMessage({
        ...this.form,
        product: product ? product.name : "",
      })
      window.open(buildWaUrl(primary.wa, message), "_blank")
      this.$emit("sent", { ...this.form })
    },
  },
}
</script>

<style scoped>
.wizard-steps {
  --wizard-line: color-mix(in srgb, var(--default-color), transparent 80%);
}

.wizard-step {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.wizard-step:not(:last-child)::after {
  content: "";
  flex: 1;
  height: 2px;
  background: var(--wizard-line);
  margin: 0 10px;
}

.wizard-step.is-done:not(:last-child)::after,
.wizard-step.is-active:not(:last-child)::after {
  background: var(--accent-color);
}

.wizard-step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--default-color), transparent 88%);
  color: var(--default-color);
  font-weight: 600;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.wizard-step.is-active .wizard-step-dot {
  background: var(--accent-color);
  color: #fff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color), transparent 82%);
}

.wizard-step.is-done .wizard-step-dot {
  background: color-mix(in srgb, var(--accent-color), transparent 75%);
  color: var(--accent-color);
}

.wizard-step-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--default-color);
  white-space: nowrap;
}

.wizard-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 1.5px solid color-mix(in srgb, var(--default-color), transparent 82%);
  border-radius: 12px;
  cursor: pointer;
  height: 100%;
  transition: all 0.25s ease;
}

.wizard-option:hover {
  border-color: color-mix(in srgb, var(--accent-color), transparent 55%);
}

.wizard-option.selected {
  border-color: var(--accent-color);
  background: color-mix(in srgb, var(--accent-color), transparent 94%);
}

.wizard-option-compact {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
}
</style>
