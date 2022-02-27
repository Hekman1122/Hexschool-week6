import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'front',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '/customerProducts',
        component: () => import('../views/CustomerProducts.vue')
      },
      {
        path: '/customerProducts/:id',
        component: () => import('../views/ProductDetail.vue')
      },
      {
        path: '/carts',
        component: () => import('../views/CartsView.vue')
      },
      {
        path: '/',
        component: () => import('../views/HomePage.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'back',
    component: () => import('../views/BackView.vue'),
    children: [
      {
        path: '/admin/products',
        component: () => import('../views/BackProducts.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'now'
})

export default router
