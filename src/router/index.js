import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import AboutView from "../views/AboutView.vue";
import WhyUsView from "../views/WhyUsView.vue";
import SkillsView from "../views/SkillsView.vue";
import ServicesView from "../views/ServicesView.vue";
import FaqView from "../views/FaqView.vue";
import TeamView from "../views/TeamView.vue";
import ContactView from "../views/ContactView.vue";
import ConsultationView from "../views/ConsultationView.vue";
import { siteData } from "@/data/siteData";
import { products as productDetails } from "@/data/products/index.js";
import { syncSeoForRoute } from "@/utils/seo";

const seo = siteData.seo;

// Halaman tiap produk dibaca otomatis dari folder masing-masing:
// src/views/products/<slug>/index.vue — kontennya dari src/data/products/<slug>.json.
// Tambah produk baru cukup dengan: JSON baru di data/products + folder index.vue di sini.
const productRoutes = productDetails.map((product) => ({
  path: `/products/${product.slug}`,
  name: `product-${product.slug}`,
  component: () => import(`../views/products/${product.slug}/index.vue`),
  meta: {
    title: `${product.name} — ${seo.name}`,
    description: product.hero.description,
    path: `/products/${product.slug}`,
  },
}));

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: seo.title, path: "/" },
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
    meta: {
      title: `Produk Kami — ${seo.name}`,
      description: siteData.catalogPage.subtitle,
      path: "/products",
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { title: `Tentang Kami — ${seo.name}`, path: "/about" },
  },
  {
    path: "/why-us",
    name: "why-us",
    component: WhyUsView,
    meta: { title: `Kelebihan Kami — ${seo.name}`, path: "/why-us" },
  },
  {
    path: "/skills",
    name: "skills",
    component: SkillsView,
    meta: { title: `Keahlian — ${seo.name}`, path: "/skills" },
  },
  {
    path: "/services",
    name: "services",
    component: ServicesView,
    meta: { title: `Layanan — ${seo.name}`, path: "/services" },
  },
  {
    path: "/faq",
    name: "faq",
    component: FaqView,
    meta: { title: `FAQ — ${seo.name}`, path: "/faq" },
  },
  {
    path: "/team",
    name: "team",
    component: TeamView,
    meta: { title: `Tim Kami — ${seo.name}`, path: "/team" },
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
    meta: { title: `Kontak — ${seo.name}`, path: "/contact" },
  },
  {
    path: "/consultation",
    name: "consultation",
    component: ConsultationView,
    meta: {
      title: `Konsultasi & Penawaran — ${seo.name}`,
      path: "/consultation",
    },
  },
  ...productRoutes,
  { path: "/about-company", redirect: { name: "about" } },
  { path: "/:pathMatch(.*)*", redirect: { name: "home" } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // Kembali ke posisi atas saat pindah halaman (anchor hash tetap dihormati)
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

// SEO: selaraskan <title> & <link rel="canonical"> setiap kali route berubah.
router.afterEach((to) => {
  syncSeoForRoute({
    title: to.meta.title,
    description: to.meta.description,
    path: to.meta.path,
  });
});

export default router;
