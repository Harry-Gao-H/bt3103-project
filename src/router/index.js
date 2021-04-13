import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login-staff',
    name: 'LoginStaff',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginStaff.vue')
  },
  {
    path: '/login-student',
    name: 'LoginStudent',
    component: () => import('../views/LoginStudent.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../components/ProductPage.vue')
  },

  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue')
  },

  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },

  {
    path: '/orders-overview',
    name: 'OrdersOverview',
    component: () => import('../views/OrdersOverview.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
