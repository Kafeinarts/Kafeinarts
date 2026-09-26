import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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

export default router
