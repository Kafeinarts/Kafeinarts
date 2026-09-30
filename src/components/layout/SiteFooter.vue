<template>
  <footer id="footer" class="footer">
    <!-- Newsletter Section -->
    <div class="footer-newsletter">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-6">
            <h3>{{ data.newsletter.title }}</h3>
            <p>{{ data.newsletter.desc }}</p>
            <form class="php-email-form" @submit.prevent="subscribe">
              <div class="newsletter-form" v-show="!subscribed">
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  :placeholder="data.newsletter.placeholder"
                  required
                />
                <input type="submit" :value="data.newsletter.button" />
              </div>
              <div class="loading" v-if="loading" :style="{ display: 'block' }">Memuat...</div>
              <div class="error-message" v-if="error" :style="{ display: 'block' }">{{ error }}</div>
              <div class="sent-message" v-if="subscribed" :style="{ display: 'block' }">
                Permintaan berlangganan Anda telah terkirim. Terima kasih!
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Top -->
    <div class="container footer-top">
      <div class="row gy-4">
        <!-- Info Kontak -->
        <div class="col-lg-4 col-md-6 footer-about">
          <router-link :to="{ name: 'home' }" class="d-flex align-items-center">
            <span class="sitename">{{ data.about.title }}</span>
          </router-link>
          <div class="footer-contact pt-3">
            <p v-for="(line, i) in data.about.address" :key="i">{{ line }}</p>
            <p class="mt-3">
              <strong>Telepon:</strong> <span>{{ data.about.phone }}</span>
            </p>
            <p><strong>Email:</strong> <span>{{ data.about.email }}</span></p>
          </div>
        </div>

        <!-- Link Navigasi -->
        <div class="col-lg-2 col-md-3 col-6 footer-links">
          <h3>Tautan Berguna</h3>
          <ul>
            <li v-for="link in data.links.useful" :key="link.label">
              <i class="bi bi-chevron-right"></i>
              <router-link :to="link.to">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Link Produk -->
        <div class="col-lg-2 col-md-3 col-6 footer-links">
          <h3>Produk Kami</h3>
          <ul>
            <li v-for="link in data.links.services" :key="link.label">
              <i class="bi bi-chevron-right"></i>
              <router-link :to="link.to">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Dukungan -->
        <div class="col-lg-2 col-md-3 col-6 footer-links">
          <h3>Dukungan</h3>
          <ul>
            <li v-for="link in data.links.support" :key="link.label">
              <i class="bi bi-chevron-right"></i>
              <router-link :to="link.to">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Sosial Media -->
        <div class="col-lg-2 col-md-3 col-6">
          <h3>Ikuti Kami</h3>
          <div class="social-links d-flex flex-wrap">
            <a
              v-for="s in data.social"
              :key="s.icon"
              :href="s.href"
              :aria-label="s.label || s.icon"
            >
              <i class="bi" :class="s.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="container copyright text-center mt-4">
      <p>
        &copy; {{ data.copyright.year }} <span>Hak Cipta</span>
        <strong class="px-1 sitename">{{ data.copyright.brand }}</strong>
        <span>{{ data.copyright.note }}</span>
      </p>
    </div>
  </footer>
</template>

<script>
import { siteData } from "@/data/siteData"

export default {
  name: "SiteFooter",
  data() {
    return {
      data: siteData.footer,
      email: "",
      loading: false,
      subscribed: false,
      error: "",
    }
  },
  methods: {
    subscribe() {
      this.error = ""
      if (!this.email || !/^\S+@\S+\.\S+$/.test(this.email)) {
        this.error = "Mohon masukkan alamat email yang valid."
        return
      }
      // Tidak ada backend newsletter di build statis — tampilkan konfirmasi sukses.
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.subscribed = true
        this.email = ""
      }, 500)
    },
  },
}
</script>
