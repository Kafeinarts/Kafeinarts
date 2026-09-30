<template>
  <!--
    STARTER TEMPLATE — Website E-Commerce
    Konten: src/data/products.json (slug: "e-commerce")
    Modifikasi layout khusus di sini; konten umum lewat JSON.
  -->
  <ProductPageView slug="e-commerce" />
</template>

<script>
import ProductPageView from "@/views/ProductPageView.vue"

export default {
  name: "EcommerceProduct",
  components: { ProductPageView },
}
</script>
