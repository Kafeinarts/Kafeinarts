<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Web Profil Bisnis
    ============================================================
    Konten  : public/data/products/web-profile.json
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/web-profile (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/web-profile.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "WebProfileProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("web-profile") ||
        mapProduct({ meta: { slug: "web-profile", name: "Web Profil Bisnis" } })
      )
    },
  },
}
</script>
