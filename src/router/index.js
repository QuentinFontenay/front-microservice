import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Accueil from "../views/Accueil.vue";
import Inscription from "../views/Inscription";
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription
  },
  {
    path: '/accueil',
    name: 'accueil',
    component: Accueil
  }
]

const router = new VueRouter({
  routes
})

export default router
