<template>
  <!--
    STARTER TEMPLATE — Kafeinarts CMS
    ------------------------------------------------------------------
    Halaman single-page produk CMS. Konten default diambil dari
    siteData.products (slug: "cms") di src/data/siteData.js.

    Cara modifikasi:
    1. Konten umum (nama, fitur, stats) -> edit entri "cms" di siteData.js
    2. Konten/layout khusus halaman ini -> tambahkan section/baris baru
       di bawah ini (template sudah siap dikembangkan).
  -->
  <ProductPageView slug="cms" />
</template>

<script>
import ProductPageView from "@/views/ProductPageView.vue"

export default {
  name: "CmsProduct",
  components: { ProductPageView },
}
</script>
