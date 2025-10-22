import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '@/page/LoginPage/LoginPage.vue'
import DashboardPage from '@/page/DashboardPage/DashboardPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },  
  { 
    path: '/',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  }  
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')

  if (to.path === '/') {
    if (!token) return next('/login')
    return next()
  }

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.path === '/login' && token) {
    return next('/')
  }
  
  next()
})

export default router
