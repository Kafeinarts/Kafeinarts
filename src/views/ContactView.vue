<template>
  <main id="main-content" class="main" tabindex="-1">
    <PageHero
      title="Hubungi Kami"
      tagline="Kami siap membantu proyek Anda"
      desc="Pilih saluran yang paling nyaman — WhatsApp, email, atau form. Respon cepat di jam kerja."
      icon="bi-headset"
      icon-color="#0369a1"
    />

    <section class="contact section">
      <div class="container">
        <div class="row gy-4">
          <!-- Info kontak -->
          <div class="col-lg-5">
            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="100">
              <i class="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Alamat</h3>
                <p>{{ contact.info.address }}</p>
              </div>
            </div>
            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
              <i class="bi bi-whatsapp flex-shrink-0"></i>
              <div>
                <h3>WhatsApp Utama</h3>
                <p>{{ primaryWa.label }} — {{ primaryWa.display }}</p>
              </div>
            </div>
            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i class="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email</h3>
                <p>{{ contact.info.email }}</p>
              </div>
            </div>
            <iframe
              :src="contact.info.mapSrc"
              class="contact-map"
              frameborder="0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Peta lokasi Kafeinarts - Depok, Jawa Barat"
            ></iframe>
          </div>

          <!-- Form kontak -->
          <div class="col-lg-7">
            <form class="php-email-form card border-0 shadow-sm" data-aos="fade-up" data-aos-delay="150" @submit.prevent="submit">
              <div class="card-body p-4 p-lg-5">
                <h3 class="h5 fw-bold mb-4">Kirim Pesan via WhatsApp</h3>
                <div class="row gy-3">
                  <div class="col-md-6">
                    <label for="name-field" class="pb-2">Nama Anda</label>
                    <input id="name-field" v-model.trim="form.name" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-6">
                    <label for="email-field" class="pb-2">Email Anda</label>
                    <input id="email-field" v-model.trim="form.email" type="email" class="form-control" required />
                  </div>
                  <div class="col-md-12">
                    <label for="subject-field" class="pb-2">Subjek</label>
                    <input id="subject-field" v-model.trim="form.subject" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-12">
                    <label for="wa-target" class="pb-2">Tujuan WhatsApp</label>
                    <select id="wa-target" v-model="form.target" class="form-select" required>
                      <option v-for="t in targets" :key="t.key" :value="t.key">
                        {{ t.label }} — {{ t.display }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-12">
                    <label for="message-field" class="pb-2">Pesan</label>
                    <textarea id="message-field" v-model.trim="form.message" class="form-control" rows="6" required></textarea>
                  </div>
                  <div class="col-md-12 text-center">
                    <button type="submit" class="btn btn-success px-4">
                      <i class="bi bi-whatsapp me-1"></i> Kirim via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PageHero from "@/components/ui/PageHero.vue"
import { usePageSeo } from "@/composables/usePageSeo"
import { siteData } from "@/data/siteData"
import { buildWhatsAppUrl, getPrimaryWhatsApp, getWhatsAppTargets } from "@/utils/whatsapp"

export default {
  name: "ContactView",
  components: { PageHero },
  setup() {
    usePageSeo({
      title: `Kontak — ${siteData.seo.name}`,
      description: "Hubungi Kafeinarts via WhatsApp, email, atau form. Kantor di Depok, Jawa Barat, Indonesia.",
      path: "/contact",
    })
  },
  data() {
    return {
      contact: siteData.contact,
      targets: getWhatsAppTargets(),
      primaryWa: getPrimaryWhatsApp(),
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
        target: siteData.contact.whatsapp.defaultTarget,
      },
    }
  },
  methods: {
    submit() {
      const { name, email, subject, message, target } = this.form
      const { url } = buildWhatsAppUrl({ name, email, subject, message, targetKey: target })
      window.open(url, "_blank")
    },
  },
}
</script>

<style scoped>
.contact-map {
  border: 0;
  width: 100%;
  height: 270px;
  border-radius: 14px;
  margin-top: 8px;
}
</style>
