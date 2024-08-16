import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/glitch',
      name: 'glitch',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GlitchView.vue')
    },
    {
      path: '/adc',
      name: 'adc',
      component: () => import('../views/AdcView.vue')
    },
    {
      path: '/power-analysis',
      name: 'power-analysis',
      component: () => import('../views/PowerAnalysisView.vue')
    }
  ]
})

export default router
