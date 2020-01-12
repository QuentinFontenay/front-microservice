import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import vuetify from "vuetify"
import Vue from 'vue';
import VueRouter from 'vue-router'
import DetailProduct from "../../src/views/DetailProduct";
import Accueil from "../../src/views/Accueil";

//const MockAdapter = require("axios-mock-adapter");

describe('Accueil.vue', () => {
    let wrapper;
    beforeEach(()=>{
        Vue.use(vuetify);
        Vue.use(VueRouter);
        wrapper = shallowMount(DetailProduct);
    });
    it('should autocomplete clients', (done) => {
        const vm = new Vue(Accueil)

        vm.getDateMin('2020-10-11', (data)=>{
            expect(data).a("Array")
            expect(data.length).least(6)
            expect(data).property("text")
            expect(data).property("value")
            done()
        })
    })
});
