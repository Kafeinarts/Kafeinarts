<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Kafeinarts ERP
    ============================================================
    Konten  : src/data/products/erp.json (detail, harga, FAQ, dst.)
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/erp (otomatis dari src/router/index.js)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → src/data/products/erp.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Import JSON + pemetaan rapi (tertata di satu tempat).
import productJson from "@/data/products/erp.json"
import { mapProduct } from "@/data/products/index.js"
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"

export default {
  name: "ErpProduct",
  components: { ProductDetailView },
  data() {
    return {
      // Pemetaan JSON → objek siap pakai (slug, harga terformat, dsb.)
      product: mapProduct(productJson),
    }
  },
}
</script>
