# ☕ Kafeinarts — Landing Page (Vue.js)

![Status](https://img.shields.io/badge/Status-Active-success)
![Vue](https://img.shields.io/badge/Vue-3.2-42b883?logo=vue.js&logoColor=white)
![Vue%20CLI](https://img.shields.io/badge/Vue_CLI-5.0-4fc08d?logo=vuedotjs&logoColor=white)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![Accent](https://img.shields.io/badge/Accent-%2300205D-00205D)

> ## ⚠️ PERINGATAN — Wajib baca sebelum mengubah kode
>
> **DILARANG keras** melakukan `commit` / `push` langsung ke branch `main`.
> **Setiap update (apa pun bentuknya) WAJIB:**
>
> 1. **Buat branch baru** dari `main` (`git checkout -b feat/nama-fitur`).
> 2. **Commit** perubahan ke branch tersebut.
> 3. **Push** branch ke remote → **buka Pull Request (PR)**.
> 4. **Konfirmasi ke [`@itsmebroarif`](https://github.com/itsmebroarif)** untuk meninjau
>    (review) dan **melakukan merge pull request**.
>
> Merge hanya boleh dilakukan oleh **itsmebroarif** setelah review selesai.
> Detail lengkapnya ada di bagian [Alur Kerja Git](#-alur-kerja-git-wajib).

---

## 📌 Deskripsi

Repository ini berisi source code **Landing Page Kafeinarts** — kini berbentuk
**project Vue.js 3** (sebelumnya HTML statis + JavaScript). Halaman ini menerjemahkan
materi presentasi (PPT) Kafeinarts menjadi produk digital yang mencakup:

- **Identitas Kafeinarts:** siapa kami dan apa yang tim Kafeinarts kerjakan.
- **Layanan & Produk:** etalase solusi yang ditawarkan (SaaS, web, mobile, cloud, keamanan).
- **Branding Konsisten:** panduan visual, warna `#00205D`, dan tipografi Kafeinarts.

> **Aksen warna resmi:** `#00205D` (Navy Kafeinarts) — dipakai untuk navbar, tombol, dan
> elemen aksen. Navbar transparan di atas hero dan solid `#00205D` saat scroll;
> tautan aktif diberi **underline putih**.

**Live preview (lokal):**

```bash
yarn install
yarn serve        # buka http://localhost:8080
```

---

## 🧭 Daftar Isi

- [Profil Perusahaan](#-profil-perusahaan--kafeinarts-interactive)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Setup & Perintah](#️-setup--perintah)
- [Struktur Folder](#-struktur-folder)
- [Struktur Halaman & Pemetaan Komponen](#-struktur-halaman--pemetaan-komponen)
- [Central Data Store (`siteData.js`)](#-central-data-store-sitedatajs)
- [Aset, CSS, dan Vendor](#-aset-css-dan-vendor)
- [Fitur Interaktif](#-fitur-interaktif)
- [Alur Kerja Git (Wajib)](#-alur-kerja-git-wajib)
- [Checklist Sebelum Pull Request](#-checklist-sebelum-pull-request)
- [Troubleshooting](#-troubleshooting)
- [Dokumentasi Lainnya](#-dokumentasi-lainnya)

---

## 🏢 Profil Perusahaan — Kafeinarts Interactive

**Kafeinarts Interactive** adalah mitra teknis andal dalam merancang **sistem manajemen**
dan produk **SaaS full-stack** yang tangguh untuk mempercepat operasional serta skalabilitas
bisnis.

> *"Kami percaya arsitektur sistem yang baik harus dibarengi dengan antarmuka yang brilian."*

- **Lokasi:** Depok, Jawa Barat, Indonesia
- **Telepon:** +62 858-1704-8266
- **Email:** halo@kafeinarts.com
- **WhatsApp:** Staff IT `0858-1704-8200` • Staff Customer Service `0895-3318-47715`

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
| :--- | :--- |
| Framework | Vue 3.2 (Options API, konsisten dengan scaffold Vue CLI) |
| Build Tool | Vue CLI 5 (webpack) — `@vue/cli-service` |
| Router | vue-router 4 (`createWebHistory`, one-page + fallback) |
| State | vuex 4 (`src/store/index.js`, masih kosong/opsional) |
| PWA | `@vue/cli-plugin-pwa` (manifest + service worker) |
| Lint | ESLint + `plugin:vue/vue3-essential` |
| CSS | Bootstrap 5.3.3, Bootstrap Icons, `assets/css/main.css` (Arsha) |
| Library UI | AOS (animasi scroll), Swiper 11 (slider tim) |
| Bahasa | HTML5, CSS3, JavaScript ES6+ |

> Vendor CSS/JS **tidak di-install lewat npm**, melainkan memakai file statis yang sama
> dengan versi HTML di `public/assets/vendor` — sehingga hasil visual **1:1**.

---

## ⚙️ Setup & Perintah

```bash
# 1. clone
git clone https://github.com/itsmebroarif/Kafeinarts.git
cd Kafeinarts

# 2. install dependensi
yarn install          # atau: npm install

# 3. jalankan mode development (hot-reload)
yarn serve            # http://localhost:8080

# 4. build produksi (output ke /dist)
yarn build

# 5. lint / auto-fix
yarn lint
yarn lint --fix
```

| Perintah | Fungsi |
| :--- | :--- |
| `yarn serve` | Dev server + hot-reload |
| `yarn build` | Bundle optimasi ke `dist/` (siap deploy) |
| `yarn lint` | Cek kode dengan ESLint (wajib **0 error** sebelum PR) |

---

## 📂 Struktur Folder

```text
Kafeinarts/
├── public/
│   ├── index.html                 # Head halaman: SEO, fonts, vendor CSS & JS
│   ├── favicon.ico
│   ├── img/icons/                 # Ikon PWA (manifest)
│   ├── robots.txt
│   └── assets/                    # Aset statis (di-copy apa adanya ke /dist)
│       ├── css/main.css           # Style global ±4000 baris (hero 100vh, team, lightbox)
│       ├── img/                   # teams/1-5.png, hero-img.png, why-us.png, bg/, blog/, dll.
│       └── vendor/                # bootstrap, bootstrap-icons, aos, swiper
│
├── src/
│   ├── main.js                    # Entry: createApp + store + router
│   ├── App.vue                    # Layout: header, router-view, footer, scroll-top, preloader
│   ├── registerServiceWorker.js   # PWA service worker
│   ├── router/index.js            # Route "/" (landing) + "/about" & catch-all redirect
│   ├── store/index.js             # Vuex (opsional, masih kosong)
│   ├── data/
│   │   └── siteData.js            # ★ SEMUA KONTEN terpusat di sini
│   ├── utils/
│   │   ├── asset.js               # asset('assets/img/x.png') → '/assets/img/x.png'
│   │   ├── aos.js                 # initAOS() / refreshAOS()
│   │   └── whatsapp.js            # resolveWhatsAppNumber(), buildWhatsAppUrl()
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.vue     # Navbar: scrolled, scrollspy, hamburger
│   │   │   ├── SiteFooter.vue     # Newsletter, link, sosmed, copyright
│   │   │   └── ScrollTop.vue      # Tombol back-to-top
│   │   └── sections/
│   │       ├── HeroSection.vue
│   │       ├── AboutSection.vue
│   │       ├── WhyUsSection.vue   # Accordion "Mengapa Memilih Kafeinarts"
│   │       ├── SkillsSection.vue  # Progress bar (IntersectionObserver)
│   │       ├── ServicesSection.vue
│   │       ├── CtaSection.vue
│   │       ├── FaqSection.vue
│   │       ├── TeamSection.vue    # Slider Swiper + flip card
│   │       ├── TeamLightbox.vue   # Popup foto tim (keyboard/swipe/drag)
│   │       └── ContactSection.vue # Form → WhatsApp 2 tujuan + Google Maps
│   └── views/
│       └── HomeView.vue           # Merangkai seluruh section
│
├── docs/
│   └── README-landing-page.md     # Dokumentasi desain & spesifikasi template asli
├── package.json
├── vue.config.js
└── README.md                      # Dokumentasi ini
```

---

## 🧭 Struktur Halaman & Pemetaan Komponen

Landing page adalah **satu halaman** berisi **9 section** + header/footer.
Semua section memakai `AOS` dan grid responsif Bootstrap 5.

| # | Section (`id`) | Komponen Vue | Isi |
| :-- | :--- | :--- | :--- |
| — | `#header` | `layout/SiteHeader.vue` | Logo, 8 menu, hamburger mobile |
| 1 | `#hero` | `sections/HeroSection.vue` | Headline, tagline, 2 CTA, ilustrasi, 100vh |
| 2 | `#about` | `sections/AboutSection.vue` | 2 paragraf + 3 checklist + `read-more` |
| 3 | `#why-us` | `sections/WhyUsSection.vue` | Heading + 3 accordion + gambar |
| 4 | `#skills` | `sections/SkillsSection.vue` | Ilustrasi + 4 progress bar (90/95/85/80%) |
| 5 | `#services` | `sections/ServicesSection.vue` | 4 kartu layanan + ikon |
| 6 | `#call-to-action` | `sections/CtaSection.vue` | Background `bg-8.webp` + tombol konsultasi |
| 7 | `#faq-2` | `sections/FaqSection.vue` | 5 item FAQ accordion |
| 8 | `#team` | `sections/TeamSection.vue` | Swiper slider, flip card, lightbox |
| 9 | `#contact` | `sections/ContactSection.vue` | Info kontak, Maps, form WhatsApp |
| — | `#footer` | `layout/SiteFooter.vue` | Newsletter, 4 kolom, sosmed, copyright |
| — | `#preloader`, `.scroll-top` | `App.vue`, `layout/ScrollTop.vue` | Preloader + back-to-top |

### Pemetaan: kode lama → Vue

| Sebelum (HTML + JS) | Sekarang (Vue) |
| :--- | :--- |
| `loader.js` fetch `components/*.html` | Komponen `src/components/sections/*` |
| `assets/data/data.js` (`window.siteData`) | `src/data/siteData.js` (ES module) |
| FAQ toggle via `classList` | State reaktif `:class="{ 'faq-active': ... }"` |
| Skills animasi via **Waypoints** | `IntersectionObserver` di `SkillsSection` |
| Team lightbox imperative (`main.js`) | `TeamLightbox.vue` (reaktif) |
| Flip card bind manual per elemen | Class binding `:class="{ flipped }"` |
| Scrollspy / `body.scrolled` / scroll-top | Listener di `SiteHeader.vue` & `ScrollTop.vue` |
| `js/script.js` `sendToWhatsApp()` | `ContactSection.vue` + `utils/whatsapp.js` |
| Swiper config JSON di DOM | Config object `siteData.team.swiper` |
| GLightbox / Isotope / php-email-form | Tidak dipakai (tidak ada markupnya) |

---

## 🗂️ Central Data Store (`siteData.js`)

**Semua konten teks/gambar terpusat di `src/data/siteData.js`.**
Jika hanya ingin mengubah konten (teks, foto, nomor, FAQ, tim), cukup edit file itu saja.

```js
import { siteData } from "@/data/siteData"
```

| Key | Isi |
| :--- | :--- |
| `brand` | Nama, logo, favicon, warna aksen |
| `nav[]` | Label & hash menu navbar |
| `hero` | Judul, tagline, 2 tombol CTA, gambar |
| `about` | Judul, intro, 3 fitur, paragraf kanan |
| `whyUs` | Heading, deskripsi, 3 item accordion |
| `skills` | Judul, gambar, 4 item progress (`label`, `value`) |
| `services[]` | 4 layanan (`icon`, `title`, `desc`, `delay`) |
| `cta` | Background, judul, deskripsi, tombol |
| `faq[]` | 5 item (`q`, `a`, `active`, `delay`) |
| `team` | Judul, **config Swiper**, `members[]` (foto, nama, jabatan, bio) |
| `contact` | Alamat, email, Maps, dan **nomor WhatsApp** (`staffIT`/`staffCS`) |
| `footer` | Newsletter, alamat, link, sosmed, copyright |

**Contoh — menambah anggota tim:**

```js
team: {
  members: [
    // ... tambahkan object baru, path gambar relatif terhadap public/
    { name: "Nama Baru", role: "Front End Developer",
      img: "assets/img/teams/6.png", alt: "Nama Baru - Front End Developer",
      bio: "Bio singkat.", delay: 350 },
  ],
},
```

> Field berakhiran HTML (`hero.title`, `about.left.intro`, `faq[].a`, dst.) dirender
> dengan `v-html` — **jangan sisipkan konten dari user** di sana (risiko XSS).

---

## 🎨 Aset, CSS, dan Vendor

| Kebutuhan | Lokasi | Catatan |
| :--- | :--- | :--- |
| Ganti foto tim | `public/assets/img/teams/` | Ukuran portrait, rekomendasi 3:4 |
| Ganti hero/why-us | `public/assets/img/` | `hero-img.png`, `why-us.png` |
| Ganti warna aksen | `public/assets/css/main.css` | Cari `--accent-color` / `#00205D` |
| Tambah font | `public/index.html` | Link Google Fonts |
| Vendor (Bootstrap/AOS/Swiper) | `public/assets/vendor/` | Jangan hapus — dipakai `index.html` |

- Path gambar di `siteData.js` ditulis relatif: `"assets/img/teams/1.png"`.
  Saat dirender gunakan helper `asset()` agar tetap benar bila app di-deploy di sub-folder.
- CSS vendor dirujuk dari `public/index.html` (bukan di-import JS) agar urutan cascade
  sama persis dengan versi HTML.

---

## ✨ Fitur Interaktif

- [x] **Navbar** transparan → solid `#00205D` saat `scrollY > 100`, underline putih link aktif.
- [x] **Scrollspy** — menu otomatis mengikuti section yang sedang dilihat.
- [x] **Menu mobile (hamburger)** — buka/tutup, ikon `bi-list` ↔ `bi-x`, menutup saat link diklik.
- [x] **Hero 100vh** seamless navy dengan 2 CTA (glow saat hover).
- [x] **Accordion** FAQ (5 item) & Why Us (3 item) — satu item aktif dalam satu section.
- [x] **Progress bar Skills** animasi saat masuk viewport (pengganti Waypoints).
- [x] **Slider tim (Swiper)** — loop, autoplay 4 detik, pagination, breakpoint 4 kartu di desktop.
- [x] **Flip card tim** — klik kartu untuk membalik, tombol *Kembali* & *Lihat Foto*.
- [x] **Lightbox tim** — navigasi `←`/`→`, `Esc`, klik foto (next), swipe sentuh, drag mouse, tutup klik backdrop.
- [x] **Form kontak → WhatsApp** 2 tujuan (Staff IT / Staff Customer Service).
- [x] **Newsletter footer** — validasi email + pesan sukses (tanpa backend).
- [x] **Preloader** hilang setelah halaman dimuat (fallback 2,5 detik).
- [x] **Scroll-to-top** muncul setelah `scrollY > 100`.
- [x] **AOS** — seluruh section beranimasi saat masuk viewport.

---

## 🌿 Alur Kerja Git (Wajib)

> ### 🔴 PERINGATAN
> **Jangan pernah** melakukan `git commit` atau `git push` langsung ke branch `main`.
> **Setiap update wajib lewat branch baru + Pull Request, dan wajib konfirmasi ke
> [`@itsmebroarif`](https://github.com/itsmebroarif) untuk review & merge.**

### Alur

```text
(Remote)  [main] -----------------------------------------------------> [main (Updated!)]
             \                                                             ^
(Local)       \--> [git pull origin main]                                  | (Merge oleh
               |                                                           |  itsmebroarif)
               +--> [git checkout -b feat/nama-fitur]                       |
                          |                                                 |
                     (Ngoding)                                              |
                          |                                                 |
                     [git commit -m "..."]                                  |
                          |                                                 |
(Remote)           [git push origin feat/nama-fitur] -------------> [Pull Request]
                                                                    |
                                              [Konfirmasi ke @itsmebroarif]
                                                        |
                                              [Review → Merge ke main]
```

### Langkah detail

```bash
# 1. Selalu mulai dari main yang terbaru
git pull origin main
git checkout main

# 2. Buat branch baru — NAMA BRANCH WAJIB BERPREFIX
git checkout -b feat/navbar-glow          # fitur baru
git checkout -b fix/form-whatsapp         # perbaikan bug
git checkout -b docs/readme-update        # dokumentasi
git checkout -b chore/update-deps         # perawatan/tooling

# 3. Kerjakan perubahan, lalu lint wajib lolos
yarn lint

# 4. Commit dengan pesan konvensional
git add .
git commit -m "feat: tambah anggota tim ke-6 di section team"

# 5. Push ke remote
git push origin feat/navbar-glow

# 6. Buka Pull Request di GitHub
#    → base: main, compare: feat/navbar-glow
#    → isi judul, deskripsi, screenshot perubahan (jika UI)
```

### Konfirmasi ke Reviewer

Setelah PR dibuka, **wajib konfirmasi** ke
[`@itsmebroarif`](https://github.com/itsmebroarif) (DM/GitHub mention) dengan format:

```text
Halo Mas Arif, ada Pull Request baru yang perlu direview & di-merge:

🔗 Link PR   : https://github.com/itsmebroarif/Kafeinarts/pull/XXXX
🌿 Branch    : feat/navbar-glow → main
📋 Isi       : <ringkasan 1-2 kalimat>
✅ Checklist : yarn lint lolos, build sukses, screenshot terlampir

Mohon review dan merge jika sudah sesuai. Terima kasih 🙏
```

> **Merge hanya oleh itsmebroarif.** Anggota tim lain cukup mengirim PR —
> jangan merge PR sendiri.

### Konvensi nama branch & commit

| Tipe | Prefix branch | Prefix commit |
| :--- | :--- | :--- |
| Fitur baru | `feat/` | `feat:` |
| Perbaikan bug | `fix/` | `fix:` |
| Dokumentasi | `docs/` | `docs:` |
| Gaya/style | `style/` | `style:` |
| Refactor | `refactor/` | `refactor:` |
| Perawatan | `chore/` | `chore:` |

---

## ✅ Checklist Sebelum Pull Request

- [ ] Branch dibuat dari `main` terbaru (`git pull origin main` dulu).
- [ ] `yarn lint` → **No lint errors found**.
- [ ] `yarn build` → **Build complete** (warning ukuran aset bawaan itu normal).
- [ ] Tampilan desktop (1440px) dicek: semua section, warna aksen `#00205D`.
- [ ] Tampilan mobile (≤500px) dicek: hamburger, urutan hero, form kontak.
- [ ] Interaksi dicek: FAQ, accordion Why Us, flip card, lightbox, form WhatsApp.
- [ ] Tidak ada file sensitif (`.env`, API key) ikut ter-commit.
- [ ] PR dibuka, lalu **konfirmasi ke @itsmebroarif** untuk review & merge.

---

## 🧯 Troubleshooting

| Masalah | Solusi |
| :--- | :--- |
| Halaman kosong / section tidak muncul | Cek console (F12). Pastikan `assets/css/main.css` & vendor ter-load di `public/index.html` |
| Animasi AOS tidak jalan / konten tak terlihat | Pastikan `window.AOS` ada (cek `<script src=".../aos.js">`), `App.vue` memanggil `initAOS()` |
| Slider tim tidak berputar | Cek `siteData.team.swiper` dan pastikan `<script src=".../swiper-bundle.min.js">` ada |
| Gambar 404 | Path ditulis relatif `"assets/img/..."`, render dengan helper `asset()` |
| ESLint error `v-html` | Field HTML harus berasal dari `siteData` (konten tepercaya), bukan input user |
| Build gagal karena cache | Hapus cache: `rm -rf node_modules/.cache` lalu `yarn serve` |

---

## 📚 Dokumentasi Lainnya

- **Spesifikasi desain & section (versi HTML asli):** [`docs/README-landing-page.md`](docs/README-landing-page.md)
- **Konfigurasi Vue CLI:** [Configuration Reference](https://cli.vuejs.org/config/)
- **Repo:** [https://github.com/itsmebroarif/Kafeinarts](https://github.com/itsmebroarif/Kafeinarts)

---

## 👨‍💻 Tim Pengembang

| Nama | GitHub Profile | Peran / Fokus |
| :--- | :--- | :--- |
| **Arif Permana Putrasuryana** | [@itsmebroarif](https://github.com/itsmebroarif) | Full-stack & UI Integration — **Reviewer / Merge owner** |
| **Mahabbatul Auliya** | [@mhbbtuliyaa](https://github.com/mhbbtuliyaa) | Frontend & Layouting |
| **Fahrul Saputra** | — | Chief Executive Officer (konten tim) |
| **Hanif Wisanggeni P.** | — | Back End Developer |
| **Arief Ramadhan Al-Hazmi** | — | Digital Marketer |
| **Naufal Daffa Bayu P.** | — | Digital Marketer |

---

## 📄 Lisensi

Template awal **Arsha** oleh [BootstrapMade](https://bootstrapmade.com/) — dimodifikasi untuk
Kafeinarts. Konten profil (About, Why Us, Services, Team) © 2026 Kafeinarts.

## 📬 Kontak

- **Email:** halo@kafeinarts.com
- **Telepon:** +62 858-1704-8266
- **Alamat:** Depok, Jawa Barat, Indonesia
- **Maps:** `https://maps.google.com/maps?q=Depok,+West+Java,+Indonesia`

> *“Mitra teknis andal — dari backend tangguh hingga frontend memanjakan mata.”*
