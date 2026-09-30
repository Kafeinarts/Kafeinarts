<template>
  <!-- ProductCard: kartu produk di katalog (reusable) -->
  <router-link :to="productRoute" class="product-card-link text-decoration-none">
    <article class="product-card h-100">
      <div class="product-card-icon" :style="{ background: product.color }">
        <i class="bi" :class="product.icon"></i>
      </div>
      <h3>{{ product.name }}</h3>
      <p class="product-card-tagline">{{ product.tagline }}</p>
      <p class="product-card-desc">{{ product.desc }}</p>
      <!-- Ringkasan harga (dari paket termurah di data/products/<slug>.json) -->
      <p v-if="product.priceFrom" class="product-card-price">
        <i class="bi bi-tag"></i>Mulai <strong>{{ product.priceFrom.label }}</strong>
        <span v-if="product.priceFrom.period" class="price-period">/ {{ product.priceFrom.period }}</span>
      </p>
      <span class="product-card-cta">
        Lihat Detail <i class="bi bi-arrow-right"></i>
      </span>
    </article>
  </router-link>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: { type: Object, required: true },
  },
  computed: {
    productRoute() {
      return { name: `product-${this.product.slug}` }
    },
  },
}
</script>

<style scoped>
.product-card-link {
  display: block;
  height: 100%;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 92%);
  border-radius: 14px;
  padding: 32px 26px;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent-color), transparent 70%);
  box-shadow: 0 18px 40px rgba(0, 32, 93, 0.14);
}

.product-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.product-card-icon i {
  font-size: 26px;
  color: #fff;
}

.product-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.product-card-tagline {
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--heading-color);
  margin-bottom: 10px;
}

.product-card-desc {
  font-size: 0.92rem;
  line-height: 1.65;
  margin-bottom: 12px;
  flex-grow: 1;
}

.product-card-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--default-color);
  margin-bottom: 16px;
}

.product-card-price i {
  color: var(--accent-color);
  align-self: center;
}

.product-card-price strong {
  color: var(--heading-color);
  font-size: 0.95rem;
}

.price-period {
  font-size: 0.78rem;
}

.product-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--accent-color);
  transition: gap 0.3s ease;
}

.product-card:hover .product-card-cta {
  gap: 12px;
}
</style>
