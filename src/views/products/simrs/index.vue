<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Kafeinarts SIMRS
    ============================================================
    Konten  : public/data/products/simrs.json (detail, harga, FAQ, dst.)
              → di-fetch runtime, terlihat di DevTools → tab Network
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/simrs (didaftarkan otomatis dari data)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → public/data/products/simrs.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Data dibaca dari runtime store (fetch JSON) — bukan import statis.
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"
import { getProductBySlug, mapProduct } from "@/data/products/index.js"

export default {
  name: "SimrsProduct",
  components: { ProductDetailView },
  computed: {
    // Reaktif: otomatis ter-update bila data store berubah.
    product() {
      return (
        getProductBySlug("simrs") ||
        // Placeholder minimal (mis. data belum termuat) agar render tetap aman.
        mapProduct({ meta: { slug: "simrs", name: "Kafeinarts SIMRS" } })
      )
    },
  },
}
</script>
