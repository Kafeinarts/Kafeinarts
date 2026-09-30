<template>
  <!--
    STARTER TEMPLATE — Landing Page
    Konten: src/data/products.json (slug: "landing-page")
    Modifikasi layout khusus di sini; konten umum lewat JSON.
  -->
  <ProductPageView slug="landing-page" />
</template>

<script>
import ProductPageView from "@/views/ProductPageView.vue"

export default {
  name: "LandingPageProduct",
  components: { ProductPageView },
}
</script>
