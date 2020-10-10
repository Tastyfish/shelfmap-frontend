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
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '@/views/Signin.vue')
  },
  {
    path: '/signout',
    name: 'signout',
    component: () => import(/* webpackChunkName: "signin" */ '@/views/Signout.vue')
  },
  {
    path: '/create',
    name: 'create-account',
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
