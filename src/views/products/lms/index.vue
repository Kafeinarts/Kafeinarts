<template>
  <!--
    STARTER TEMPLATE — Kafeinarts LMS
    ------------------------------------------------------------------
    Halaman single-page produk LMS. Konten default diambil dari
    siteData.products (slug: "lms") di src/data/siteData.js.

    Cara modifikasi:
    1. Konten umum (nama, fitur, stats) -> edit entri "lms" di siteData.js
    2. Konten/layout khusus halaman ini -> tambahkan section/baris baru
       di bawah ini (template sudah siap dikembangkan).
  -->
  <ProductPageView slug="lms" />
</template>

<script>
import ProductPageView from "@/views/ProductPageView.vue"

export default {
  name: "LmsProduct",
  components: { ProductPageView },
}
</script>
