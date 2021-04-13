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
    component: Connexion,
    meta : { 
      requiresAuth: false
    }
  },
  {
    path: '/groupomania',
    name: 'Groupomania',
    component: Groupomania,
    meta : { 
      requiresAuth: true
    }
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription,
    meta : { 
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta : {
      requiresAuth: true
    }
  },
  {
    path: '/profileConsulting',
    name: 'ProfileConsulting',
    component: ProfileConsulting,
    meta : { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
