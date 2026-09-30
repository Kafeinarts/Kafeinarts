<template>
  <!--
    STARTER TEMPLATE — Kafeinarts Event Management System
    ------------------------------------------------------------------
    Halaman single-page produk Event Management. Konten default diambil
    dari siteData.products (slug: "event-management") di src/data/siteData.js.

    Cara modifikasi:
    1. Konten umum (nama, fitur, stats) -> edit entri "event-management" di siteData.js
    2. Konten/layout khusus halaman ini -> tambahkan section/baris baru
       di bawah ini (template sudah siap dikembangkan).
  -->
  <ProductPageView slug="event-management" />
</template>

<script>
import ProductPageView from "@/views/ProductPageView.vue"

export default {
  name: "EventManagementProduct",
  components: { ProductPageView },
}
</script>
