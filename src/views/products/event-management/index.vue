<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Kafeinarts EMS (Event Management System)
    ============================================================
    Konten  : public/data/products/event-management.json
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/event-management (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/event-management.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "EventManagementProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("event-management") ||
        mapProduct({ meta: { slug: "event-management", name: "Kafeinarts EMS" } })
      )
    },
  },
}
</script>
