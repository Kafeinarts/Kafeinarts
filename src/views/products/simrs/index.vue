<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Kafeinarts SIMRS
    ============================================================
    Konten  : src/data/products/simrs.json (detail, harga, FAQ, dst.)
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/simrs (otomatis dari src/router/index.js)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → src/data/products/simrs.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Import JSON + pemetaan rapi (tertata di satu tempat).
import productJson from "@/data/products/simrs.json"
import { mapProduct } from "@/data/products/index.js"
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"

export default {
  name: "SimrsProduct",
  components: { ProductDetailView },
  data() {
    return {
      // Pemetaan JSON → objek siap pakai (slug, harga terformat, dsb.)
      product: mapProduct(productJson),
    }
  },
}
</script>
