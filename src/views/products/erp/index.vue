<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Kafeinarts ERP
    ============================================================
    Konten  : public/data/products/erp.json (detail, harga, FAQ, dst.)
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/erp (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/erp.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "ErpProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("erp") ||
        // Placeholder minimal (mis. data belum termuat) agar render tetap aman.
        mapProduct({ meta: { slug: "erp", name: "Kafeinarts ERP" } })
      )
    },
  },
}
</script>
