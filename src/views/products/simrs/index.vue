<template>
  <!--
    STARTER TEMPLATE — Kafeinarts SIMRS
    ------------------------------------------------------------------
    Halaman single-page produk SIMRS. Konten default diambil dari
    siteData.products (slug: "simrs") di src/data/siteData.js.

    Cara modifikasi:
    1. Konten umum (nama, fitur, stats) -> edit entri "simrs" di siteData.js
    2. Konten/layout khusus halaman ini -> tambahkan section/baris baru
       di bawah ini (template sudah siap dikembangkan).
  -->
  <ProductPageView slug="simrs" />
</template>

<script>
import ProductPageView from "@/views/ProductPageView.vue"

export default {
  name: "SimrsProduct",
  components: { ProductPageView },
}
</script>
