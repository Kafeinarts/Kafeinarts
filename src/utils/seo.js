/**
 * SEO utils - Kafeinarts
 * ------------------------------------------------------------------
 * Bertanggung jawab atas:
 *   1. SITE_URL  -> sumber kebenaran URL produksi untuk JSON-LD.
 *   2. buildJsonLd() -> menyusun structured data (schema.org) dari siteData:
 *      Organization, ProfessionalService/LocalBusiness, WebSite,
 *      FAQPage (dari siteData.faq) dan ItemList layanan (siteData.services).
 *   3. injectJsonLd() -> menyisipkan <script type="application/ld+json">.
 *   4. syncSeoForRoute() -> menyesuaikan <title> & <link rel="canonical">
 *      mengikuti route yang sedang dibuka.
 *
 * Meta deskripsi/keywords/Open Graph TIDAK dikelola di sini agar tetap
 * bisa dibaca crawler tanpa JavaScript — semuanya ada di public/index.html.
 */
import { siteData } from "@/data/siteData"

/** URL produksi. Ganti di sini + public/index.html + sitemap.xml + robots.txt */
export const SITE_URL = "https://kafeinarts.vercel.app"
export const SITE_TITLE = siteData.seo.title

/** Buang semua tag HTML agar aman dipakai sebagai teks schema.org */
export const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

/** "assets/img/x.png" -> "https://kafeinarts.vercel.app/assets/img/x.png" */
export const absoluteUrl = (path = "") =>
  `${SITE_URL}/${String(path).replace(/^\/+/, "")}`

/**
 * Susun seluruh objek structured data.
 * @returns {Array<Object>} daftar objek schema.org (siap di-JSON.stringify)
 */
export function buildJsonLd() {
  const { contact, faq, seo, services } = siteData

  const organizationId = `${SITE_URL}/#organization`
  const imageUrl = absoluteUrl(seo.image)
  const logoUrl = absoluteUrl(seo.logo)
  const waIT = contact.form.whatsapp.staffIT.wa
  const waCS = contact.form.whatsapp.staffCS.wa

  const address = {
    "@type": "PostalAddress",
    addressLocality: "Depok",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  }

  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: seo.name,
    legalName: seo.name,
    url: `${SITE_URL}/`,
    logo: logoUrl,
    image: imageUrl,
    description: seo.description,
    inLanguage: seo.inLanguage,
    email: contact.info.email,
    telephone: contact.info.phone,
    address,
    areaServed: seo.areaServed,
    sameAs: seo.sameAs.filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${waCS}`,
        areaServed: seo.areaServed,
        availableLanguage: ["id", "en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "technical support",
        telephone: `+${waIT}`,
        areaServed: seo.areaServed,
        availableLanguage: ["id", "en"],
      },
    ],
  }

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: seo.name,
    description: seo.description,
    inLanguage: seo.inLanguage,
    publisher: { "@id": organizationId },
  }

  const localBusiness = {
    // LocalBusiness (dipahami Google) + subtype ProfessionalService
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: seo.name,
    url: `${SITE_URL}/`,
    image: imageUrl,
    logo: logoUrl,
    description: seo.description,
    telephone: contact.info.phone,
    email: contact.info.email,
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: seo.geo.latitude,
      longitude: seo.geo.longitude,
    },
    areaServed: seo.areaServed,
    knowsLanguage: ["id", "en"],
    sameAs: seo.sameAs.filter(Boolean),
    parentOrganization: { "@id": organizationId },
  }

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.a),
      },
    })),
  }

  const serviceList = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#services`,
    name: "Layanan Kafeinarts",
    description: "Daftar layanan digital yang ditawarkan Kafeinarts Interactive",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        description: stripHtml(service.desc),
        areaServed: seo.areaServed,
        provider: { "@id": organizationId },
      },
    })),
  }

  return [organization, website, localBusiness, faqPage, serviceList]
}

/** Sisipkan (atau timpa) tag JSON-LD di <head>. */
export function injectJsonLd() {
  if (typeof document === "undefined") return false
  const existing = document.getElementById("seo-jsonld")
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing)

  const script = document.createElement("script")
  script.id = "seo-jsonld"
  script.type = "application/ld+json"
  script.text = JSON.stringify(buildJsonLd(), null, 2)
  document.head.appendChild(script)
  return true
}

/** Set <title> & <link rel="canonical"> sesuai route yang dibuka. */
export function syncSeoForRoute() {
  if (typeof document === "undefined") return
  const canonicalUrl = `${SITE_URL}/`

  document.title = SITE_TITLE

  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", "canonical")
    document.head.appendChild(link)
  }
  link.setAttribute("href", canonicalUrl)
}

/** Jalankan semuanya (dipanggil dari App.vue). */
export function initSeo() {
  injectJsonLd()
  syncSeoForRoute()
}

export default { SITE_URL, SITE_TITLE, buildJsonLd, injectJsonLd, syncSeoForRoute, initSeo }
