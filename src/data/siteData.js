/**
 * Kafeinarts - Central Data Index (Vue)
 * ------------------------------------------------------------------
 * Seluruh konten situs dipisah per-modul JSON di folder src/data/:
 *   - brand.json         : identitas brand & SEO
 *   - nav.json           : struktur menu navbar
 *   - pages.json         : konten halaman (hero, about, whyUs, skills, services, faq, team)
 *   - catalog.json       : halaman katalog produk (title, kategori, urutan)
 *   - products/index.js  : agregator seluruh produk (jangan diubah manual)
 *   - products/<slug>.json : KONTEN LENGKAP tiap produk (detail, harga, FAQ)
 *   - consultation.json  : wizard konsultasi/penawaran
 *   - contact.json       : kontak & tujuan WhatsApp
 *   - footer.json        : newsletter, link, sosial media
 *
 * Cara menambah/mengubah data: edit file JSON terkait — tidak perlu
 * menyentuh komponen. Import dari file ini (index) agar konsisten.
 * Untuk produk: edit src/data/products/<slug>.json (satu file per produk).
 */
import brandJson from "./brand.json";
import navJson from "./nav.json";
import pagesJson from "./pages.json";
import catalogJson from "./catalog.json";
import { products as productDetails } from "./products/index.js";
import consultationJson from "./consultation.json";
import contactJson from "./contact.json";
import footerJson from "./footer.json";

/** Objek gabungan dengan shape mirip siteData lama (kompatibilitas). */
export const siteData = {
  ...brandJson,
  nav: navJson.items,
  navCta: navJson.cta,
  ...pagesJson,
  ...catalogJson,
  // products dari catalog.json hanya berisi slug+shortName (urutan katalog);
  // digantikan detail lengkap hasil mapping dari folder data/products/.
  products: productDetails,
  ...consultationJson,
  // contact dibungkus agar aksesnya siteData.contact.info / .whatsapp
  contact: contactJson,
  footer: footerJson,
};

export const {
  brand,
  seo,
  nav,
  navCta,
  hero,
  about,
  whyUs,
  skills,
  services,
  faq,
  team,
  catalogPage,
  categories,
  products,
  page: consultationPage,
  meetingModes,
  serviceTypes,
  budgetRanges,
  timelineOptions,
  wizard,
  contact,
} = siteData;

export default siteData;
