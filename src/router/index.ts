import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

// Always load these 2 immediately.
import Map from '@/views/Map.vue'
import PageNotFoundErrorPage from '@/views/PageNotFoundError.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'map',
    component: Map,
    meta: { productSelectionEnabled: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signin" */ '@/views/Signin.vue')
  },
  {
    path: '/create',
    name: 'create-account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create-account" */ '@/views/CreateAccount.vue')
  },
  {
    path: '/admin',
    name: 'admin-site',
    component: () => import(/* webpackChunkName: "admin-site" */ '@/views/AdminSite.vue')
  },
  {
    path: '/admin/shelf',
    name: 'admin-shelf',
    component: () => import(/* webpackChunkName: "admin-shelf" */ '@/views/AdminShelf.vue')
  },
  {
    path: '/admin/product',
    name: 'admin-product',
    component: () => import(/* webpackChunkName: "admin-product" */ '@/views/AdminProduct.vue')
  },
  {
    path: '*',
    component: PageNotFoundErrorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
