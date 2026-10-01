<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Kafeinarts LMS
    ============================================================
    Konten  : public/data/products/lms.json (detail, harga, FAQ, dst.)
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/lms (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/lms.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "LmsProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("lms") ||
        // Placeholder minimal (mis. data belum termuat) agar render tetap aman.
        mapProduct({ meta: { slug: "lms", name: "Kafeinarts LMS" } })
      )
    },
  },
}
</script>
