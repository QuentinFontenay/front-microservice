import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Accueil from "../views/Accueil.vue";
import Inscription from "../views/Inscription";
import Commande from "../views/Commande";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

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
  },
  {
    path: '/commande/:idProduit/:idUser',
    name: 'commande',
    component: Commande
  }
]

const router = new VueRouter({
  routes
})

export default router
