import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import vuetify from "vuetify"
import Vue from 'vue';
import VueRouter from 'vue-router'
import Accueil from "../../src/views/Accueil";

describe('Accueil.vue', () => {
  let wrapper;
  beforeEach(()=>{
    Vue.use(vuetify);
    Vue.use(VueRouter);
    wrapper = shallowMount(Accueil);
  });
  it("renders many children", () => {
    expect(wrapper.findAll(Child).length).toBe(3)
  })
});
