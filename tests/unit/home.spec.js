import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import vuetify from "vuetify"
import Vue from 'vue';
import VueRouter from 'vue-router'
import Accueil from "../../src/views/Accueil";

//const MockAdapter = require("axios-mock-adapter");

describe('Accueil.vue', () => {
  let wrapper;
  beforeEach(()=>{
    Vue.use(vuetify);
    Vue.use(VueRouter);
    wrapper = shallowMount(Accueil);
  });
});
