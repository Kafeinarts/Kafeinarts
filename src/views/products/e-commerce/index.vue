<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Website E-Commerce
    ============================================================
    Konten  : public/data/products/e-commerce.json
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/e-commerce (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/e-commerce.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "ECommerceProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("e-commerce") ||
        mapProduct({ meta: { slug: "e-commerce", name: "Website E-Commerce" } })
      )
    },
  },
}
</script>
