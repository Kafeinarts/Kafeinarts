import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { syncSeoForRoute } from '@/utils/seo'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    // Landing page bersifat satu halaman (one-page) — semua section
    // diakses lewat anchor (#about, #services, dst.) di halaman utama.
    path: '/about',
    redirect: { name: 'home' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// SEO: selaraskan <title> & <link rel="canonical"> setiap kali route berubah.
// Landing page bersifat one-page, sehingga selalu mengarah ke halaman utama.
router.afterEach(() => {
  syncSeoForRoute()
})

export default router
