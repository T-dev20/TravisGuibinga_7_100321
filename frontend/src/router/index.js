import Vue from 'vue'
import VueRouter from 'vue-router'
import Inscription from '..views/Inscription.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription,
    meta : {
      requiresAuth: false
    }
  },
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
})

export default router
