<template>
  <section id="contact" class="contact section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ contact.title }}</h2>
      <p>{{ contact.subtitle }}</p>
    </div>
    <!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row gy-4">
        <div class="col-lg-5">
          <div class="info-wrap">
            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
              <i class="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Alamat</h3>
                <p>{{ contact.info.address }}</p>
              </div>
            </div>
            <!-- End Info Item -->

            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i class="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Hubungi Kami</h3>
                <p>{{ phoneDisplay }}</p>
              </div>
            </div>
            <!-- End Info Item -->

            <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i class="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email</h3>
                <p>{{ contact.info.email }}</p>
              </div>
            </div>
            <!-- End Info Item -->

            <!-- Google Maps iframe yang diarahkan ke Depok -->
            <iframe
              :src="contact.info.mapSrc"
              frameborder="0"
              style="border: 0; width: 100%; height: 270px"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Peta lokasi Kafeinarts - Depok, Jawa Barat"
            ></iframe>
          </div>
        </div>

        <div class="col-lg-7">
          <form class="php-email-form" data-aos="fade-up" data-aos-delay="200" @submit.prevent="submit">
            <div class="row gy-4">
              <div class="col-md-6">
                <label for="name-field" class="pb-2">Nama Anda</label>
                <input
                  id="name-field"
                  v-model.trim="form.name"
                  type="text"
                  name="name"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-md-6">
                <label for="email-field" class="pb-2">Email Anda</label>
                <input
                  id="email-field"
                  v-model.trim="form.email"
                  type="email"
                  name="email"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-md-12">
                <label for="subject-field" class="pb-2">Subjek</label>
                <input
                  id="subject-field"
                  v-model.trim="form.subject"
                  type="text"
                  name="subject"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-md-12">
                <label for="wa-target" class="pb-2">
                  Tujuan WhatsApp <span style="color: #00205d">*</span>
                </label>
                <select
                  id="wa-target"
                  v-model="form.target"
                  class="form-control"
                  required
                  style="
                    padding: 10px 15px;
                    border-color: color-mix(in srgb, var(--default-color), transparent 80%);
                    border-radius: 4px;
                  "
                >
                  <option v-for="target in targets" :key="target.key" :value="target.key">
                    {{ target.label }} — {{ target.display }}
                  </option>
                </select>
                <small class="text-muted" style="font-size: 12px">
                  Pilih <strong>Staff IT</strong> untuk teknis /
                  <strong>Staff Customer Service</strong> untuk layanan pelanggan.
                </small>
              </div>

              <div class="col-md-12">
                <label for="message-field" class="pb-2">Pesan</label>
                <textarea
                  id="message-field"
                  v-model.trim="form.message"
                  class="form-control"
                  name="message"
                  rows="10"
                  required
                ></textarea>
              </div>

              <div class="col-md-12 text-center">
                <button
                  type="submit"
                  style="
                    background: var(--accent-color);
                    border: 0;
                    padding: 10px 30px;
                    color: #fff;
                    transition: 0.4s;
                    border-radius: 4px;
                  "
                >
                  Kirim Pesan via WhatsApp
                </button>
              </div>
            </div>
          </form>
        </div>
        <!-- End Contact Form -->
      </div>
    </div>
  </section>
</template>

<script>
import { siteData } from "@/data/siteData"
import { buildWhatsAppUrl, getWhatsAppTargets } from "@/utils/whatsapp"

export default {
  name: "ContactSection",
  data() {
    const targets = getWhatsAppTargets()
    return {
      contact: siteData.contact,
      targets,
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
        target: siteData.contact.form.defaultTarget,
      },
    }
  },
  computed: {
    phoneDisplay() {
      const [staffIT, staffCS] = this.targets
      return `${staffIT.display} (${staffIT.label}) / ${staffCS.display} (${staffCS.label})`
    },
  },
  methods: {
    submit() {
      const { name, email, subject, message, target } = this.form
      if (!name || !email || !subject || !message) {
        alert("Mohon lengkapi semua field sebelum mengirim.")
        return
      }
      const { url, target: resolved } = buildWhatsAppUrl({
        name,
        email,
        subject,
        message,
        targetKey: target,
      })
      window.open(url, "_blank")
      // Optional: log untuk debug
      console.log(`[WhatsApp] -> ${resolved.label} (${resolved.wa})`)
    },
  },
}
</script>
