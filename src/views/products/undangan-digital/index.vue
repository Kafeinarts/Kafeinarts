<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Undangan Digital
    ============================================================
    Konten  : public/data/products/undangan-digital.json
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/undangan-digital (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/undangan-digital.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "UndanganDigitalProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("undangan-digital") ||
        mapProduct({ meta: { slug: "undangan-digital", name: "Website Undangan Digital" } })
      )
    },
  },
}
</script>
