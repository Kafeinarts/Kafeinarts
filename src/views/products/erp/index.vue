<template>
  <!--
    STARTER TEMPLATE — Kafeinarts ERP
    ------------------------------------------------------------------
    Halaman single-page produk ERP. Konten default diambil dari
    siteData.products (slug: "erp") di src/data/siteData.js.

    Cara modifikasi:
    1. Konten umum (nama, fitur, stats) -> edit entri "erp" di siteData.js
    2. Konten/layout khusus halaman ini -> tambahkan section/baris baru
       di bawah ini (template sudah siap dikembangkan).
  -->
  <ProductPageView slug="erp" />
</template>

<script>
import ProductPageView from "@/views/ProductPageView.vue"

export default {
  name: "ErpProduct",
  components: { ProductPageView },
}
</script>
