<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Kafeinarts CMS
    ============================================================
    Konten  : public/data/products/cms.json (detail, harga, FAQ, dst.)
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/cms (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/cms.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "CmsProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("cms") ||
        // Placeholder minimal (mis. data belum termuat) agar render tetap aman.
        mapProduct({ meta: { slug: "cms", name: "Kafeinarts CMS" } })
      )
    },
  },
}
</script>
