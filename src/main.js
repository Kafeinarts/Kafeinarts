import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router, { registerProductRoutes } from './router'
import store from './store'
import { loadProducts } from './data/products/index.js'

/**
 * Data produk di-fetch dulu (dari /data/products/*.json) sebelum app
 * di-mount, karena router & menu navbar menyusun daftar dari data itu.
 * Setiap JSON terlihat di DevTools → Network sebagai request terpisah.
 */
loadProducts()
  .then(() => {
    registerProductRoutes()
    createApp(App).use(store).use(router).mount('#app')
  })
  .catch(() => {
    // Tetap mount agar halaman tidak kosong; store mencatat error-nya.
    createApp(App).use(store).use(router).mount('#app')
  })
