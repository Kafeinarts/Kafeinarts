<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Konsultasi & Penawaran"
      tagline="Order sekarang atau konsultasikan harga"
      desc="Lengkapi wizard singkat ini — kami jadwalkan meeting persiapan (online/offline) dan konfirmasi via WhatsApp."
      icon="bi-calendar2-check"
      icon-color="#15803d"
    />

    <section class="section">
      <div class="container">
        <div class="row gy-4">
          <!-- Wizard -->
          <div class="col-lg-7" data-aos="fade-up">
            <ConsultationWizard :product-slug="wizardProductSlug" @sent="onSent" />

            <div v-if="sent" class="alert alert-success mt-3 mb-0" role="alert">
              <i class="bi bi-check-circle me-1"></i>
              Pesan tersusun! Jika tab WhatsApp tidak terbuka otomatis,
              <a :href="sentUrl" target="_blank" rel="noopener">klik di sini</a>.
            </div>
          </div>

          <!-- Sidebar info -->
          <div class="col-lg-5">
            <div class="card border-0 shadow-sm mb-4" data-aos="fade-up" data-aos-delay="100">
              <div class="card-body p-4">
                <h3 class="h6 fw-bold text-uppercase mb-3">Alur Setelah Anda Kirim</h3>
                <ul class="list-unstyled d-flex flex-column gap-3 mb-0">
                  <li v-for="step in afterSteps" :key="step.title" class="d-flex gap-3">
                    <i class="bi fs-5" :class="step.icon"></i>
                    <div>
                      <strong>{{ step.title }}</strong>
                      <p class="mb-0 small text-muted">{{ step.desc }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="card border-0 shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <div class="card-body p-4">
                <h3 class="h6 fw-bold text-uppercase mb-3">Kontak Langsung</h3>
                <p class="small text-muted mb-2">
                  <i class="bi bi-whatsapp me-1 text-success"></i>
                  WhatsApp: <strong>{{ primaryWa.display }}</strong>
                </p>
                <p class="small text-muted mb-2">
                  <i class="bi bi-envelope me-1"></i>
                  Email: <strong>{{ contact.info.email }}</strong>
                </p>
                <p class="small text-muted mb-0">
                  <i class="bi bi-clock me-1"></i>
                  Senin–Jumat, 09.00–17.00 WIB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PageHero from "@/components/ui/PageHero.vue"
import ConsultationWizard from "@/components/ui/ConsultationWizard.vue"
import { usePageSeo } from "@/composables/usePageSeo"
import { siteData } from "@/data/siteData"
import { buildConsultationMessage, buildWaUrl, getPrimaryWhatsApp } from "@/utils/whatsapp"

export default {
  name: "ConsultationView",
  components: { PageHero, ConsultationWizard },
  setup() {
    usePageSeo({
      title: `Konsultasi & Penawaran — ${siteData.seo.name}`,
      description: "Isi wizard konsultasi Kafeinarts: order sekarang atau konsultasi harga, lalu jadwalkan meeting persiapan via WhatsApp.",
      path: "/consultation",
    })
  },
  data() {
    return {
      contact: siteData.contact,
      primaryWa: getPrimaryWhatsApp(),
      wizardProductSlug: "",
      sent: false,
      sentUrl: "",
      afterSteps: [
        { icon: "bi-1-circle", title: "Konfirmasi", desc: "Tim kami menghubungi Anda via WhatsApp untuk konfirmasi kebutuhan." },
        { icon: "bi-2-circle", title: "Meeting Persiapan", desc: "Meeting online/offline dijadwalkan sesuai kenyamanan Anda." },
        { icon: "bi-3-circle", title: "Proposal", desc: "Rancangan solusi, timeline, dan estimasi investasi dikirim." },
        { icon: "bi-4-circle", title: "Eksekusi", desc: "Proyek dimulai dengan milestone dan laporan berkala." },
      ],
    }
  },
  watch: {
    // ?product=slug dari tombol di halaman produk
    "$route.query.product": {
      immediate: true,
      handler(slug) {
        if (slug && siteData.products.some((p) => p.slug === slug)) {
          this.wizardProductSlug = slug
        }
      },
    },
  },
  methods: {
    onSent(form) {
      const product = this.wizardProductSlug
        ? siteData.products.find((p) => p.slug === this.wizardProductSlug)
        : null
      const message = buildConsultationMessage({ ...form, product: product ? product.name : "" })
      this.sentUrl = buildWaUrl(this.primaryWa.wa, message)
      this.sent = true
    },
  },
}
</script>
