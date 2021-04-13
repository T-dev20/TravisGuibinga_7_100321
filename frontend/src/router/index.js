import Vue from 'vue'
import VueRouter from 'vue-router'
import Groupomania from '../views/Groupomania.vue'
import Inscription from '../views/Inscription.vue'
import Connexion from '../views/Connexion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/groupomania',
    name: 'Groupomania',
    component: Groupomania
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription
  }
]

const router = new VueRouter({
  routes
})

export default router
