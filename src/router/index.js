import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{requiresAuth:false},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login-staff',
    name: 'LoginStaff',
    meta:{requiresAuth:false},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginStaff.vue')
  },
  {
    path: '/login-student',
    name: 'LoginStudent',
    meta:{requiresAuth:false},
    component: () => import('../views/LoginStudent.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    meta: { requiresAuth:true, limitedTo:"student" },
    component: () => import('../views/Menu.vue')
  },
  {
    path: '/product',
    name: 'Product',
    meta: { requiresAuth:true, limitedTo:"student" },
    component: () => import('../components/ProductPage.vue')
  },

  {
    path: '/cart',
    name: 'Cart',
    meta: { requiresAuth:true, limitedTo:"student" },
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: { requiresAuth:true, limitedTo:"student" },
    component: () => import('../views/History.vue')
  },

  {
    path: '/profile',
    name: 'Profile',
    meta: { requiresAuth:true, limitedTo:"student" },
    component: () => import('../views/Profile.vue')
  },

  {
    path: '/orders-overview',
    name: 'OrdersOverview',
    meta: { requiresAuth:true, limitedTo:"staff" },
    component: () => import('../views/OrdersOverview.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth:true, limitedTo:"staff" },
    component: () => import('../views/Dashboard.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach(( to,from,next ) => {
  if (to.meta.requiresAuth) {
    
    firebase.auth().onAuthStateChanged( (user) => {
      
      if (user) {
        
        //disallow login student from accessing staff page, vice versa
        if (user.email.charAt(0) == 'e' && to.meta.limitedTo == "student") {
          return next()
        }

        if (user.email.charAt(0) == 's' && to.meta.limitedTo == "staff") {
          return next()
        }

        return next({path: '/' })
        /*
        database.collection("UserInfo").doc(user.email).get().then((snapshot) => {
          if (snapshot.role != to.meta.limitedTo)
            return next({path: '/' })
        })
        */


      } else {
        //user is signed out, show login page
        //alert("Please login first")
        return next({path: '/' })
        
      }
    })
  } else {
    return next()
  }
})


export default router
