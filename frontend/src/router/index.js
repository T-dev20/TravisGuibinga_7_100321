import { createRouter, createWebHashHistory } from 'vue-router'
import Connexion from '../views/Connexion.vue'
import Inscription from '../views/Inscription.vue'

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
