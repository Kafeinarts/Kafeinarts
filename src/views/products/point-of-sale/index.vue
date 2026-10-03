<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Point of Sales
    ============================================================
    Konten  : public/data/products/point-of-sale.json
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/point-of-sale (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/point-of-sale.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "PointOfSaleProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("point-of-sale") ||
        mapProduct({ meta: { slug: "point-of-sale", name: "Point of Sales" } })
      )
    },
  },
}
</script>
