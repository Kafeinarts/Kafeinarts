<template>
  <!--
    ============================================================
    HALAMAN PRODUK — Web Profil Bisnis
    ============================================================
    Konten  : src/data/products/web-profile.json (detail, harga, FAQ, dst.)
    Layout  : src/views/products/components/ProductDetailView.vue
    Route   : /products/web-profile (otomatis dari src/router/index.js)

    Untuk mengubah isi halaman ini, edit file JSON-nya saja:
    → src/data/products/web-profile.json
    -->
  <ProductDetailView :product="product" />
</template>

<script>
// Import JSON + pemetaan rapi (tertata di satu tempat).
import productJson from "@/data/products/web-profile.json"
import { mapProduct } from "@/data/products/index.js"
import ProductDetailView from "@/views/products/components/ProductDetailView.vue"

export default {
  name: "WebProfileProduct",
  components: { ProductDetailView },
  data() {
    return {
      // Pemetaan JSON → objek siap pakai (slug, harga terformat, dsb.)
      product: mapProduct(productJson),
    }
  },
}
</script>
