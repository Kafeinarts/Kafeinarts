<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Website Company Profile
    ============================================================
    Konten  : public/data/products/company-profile.json
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/company-profile (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/company-profile.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "CompanyProfileProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("company-profile") ||
        mapProduct({ meta: { slug: "company-profile", name: "Website Company Profile" } })
      )
    },
  },
}
</script>
