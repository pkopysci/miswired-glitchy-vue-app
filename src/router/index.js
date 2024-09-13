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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
})

export default router
