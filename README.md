# Kafeinarts — Landing Page (Vue.js)

Landing page **Kafeinarts Interactive** yang sudah dimigrasi dari HTML statis
(`public/templates` pada versi sebelumnya) menjadi project **Vue 3 + Vue Router + Vuex**
menggunakan Vue CLI.

> Dokumentasi desain/template asli (Arsha by BootstrapMade) tersimpan di
> [`docs/README-landing-page.md`](docs/README-landing-page.md).

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

## Struktur

```
public/
├── index.html              # Head halaman: SEO, fonts, vendor CSS/JS (AOS, Swiper, Bootstrap)
└── assets/                 # Aset statis hasil pindahan dari template
    ├── css/main.css        # Style global (hero 100vh, team card, navbar, lightbox, dll.)
    ├── img/                # Foto tim, ilustrasi, logo, background
    └── vendor/             # bootstrap, bootstrap-icons, aos, swiper

src/
├── App.vue                 # Layout utama: header + router-view + footer + scroll-top + preloader
├── main.js
├── router/index.js         # One-page: route "/" (halaman utama) + fallback redirect
├── store/index.js
├── data/
│   └── siteData.js         # Central data store (teks, layanan, FAQ, tim, kontak, footer)
├── utils/
│   ├── asset.js            # Helper URL aset (mengikuti BASE_URL)
│   ├── aos.js              # Inisialisasi/refresh AOS
│   └── whatsapp.js         # Logika form → wa.me (Staff IT / Staff CS)
├── components/
│   ├── layout/             # SiteHeader, SiteFooter, ScrollTop
│   └── sections/           # Hero, About, WhyUs, Skills, Services, Cta, Faq,
│                           # Team (+ TeamLightbox), Contact
└── views/
    └── HomeView.vue        # Merangkai seluruh section landing page
```

## Perilaku yang dipindahkan dari JS template ke Vue

| Sebelum (HTML + JS)                          | Sekarang (Vue) |
| :------------------------------------------- | :------------- |
| `loader.js` fetch `components/*.html`        | Komponen `src/components/sections/*` |
| `data.js` (`window.siteData`)                | `src/data/siteData.js` (ES module) |
| FAQ toggle via `classList`                   | State reaktif (`faq-active`) |
| Skills animasi via Waypoints                 | `IntersectionObserver` di `SkillsSection` |
| Team lightbox imperative (`main.js`)         | `TeamLightbox.vue` (state reaktif, keyboard/swipe) |
| Flip card bind manual                        | Class binding `:class="{ flipped }"` |
| Scrollspy / navbar scrolled / scroll-top     | Listener di `SiteHeader.vue` & `ScrollTop.vue` |
| `js/script.js` `sendToWhatsApp()`            | `ContactSection.vue` + `src/utils/whatsapp.js` |
| Swiper config JSON di DOM                    | Config di `siteData.team.swiper` |

Vendor CSS/JS (Bootstrap, Bootstrap Icons, AOS, Swiper) tetap memakai file yang sama
di `public/assets/vendor` sehingga tampilan 1:1 dengan versi HTML.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
