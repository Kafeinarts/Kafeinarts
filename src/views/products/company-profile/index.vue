<template>
  <!--
    STARTER TEMPLATE — Website Company Profile
    Konten: src/data/products.json (slug: "company-profile")
    Modifikasi layout khusus di sini; konten umum lewat JSON.
  -->
  <ProductPageView slug="company-profile" />
</template>

<script>
import ProductPageView from "@/views/ProductPageView.vue"

export default {
  name: "CompanyProfileProduct",
  components: { ProductPageView },
}
</script>
