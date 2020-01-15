import  { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Home from "../../src/views/Home";
import vuetify from "vuetify"
import Vue from 'vue';
import VueRouter from 'vue-router'

describe('Home.vue', () => {
    let wrapper;
    beforeEach(()=>{
        Vue.use(vuetify);
        Vue.use(VueRouter);
        wrapper = shallowMount(Home);
    });
    it("test si l'evenement sur le clique est appeller", async () => {
        const input = wrapper.find('.login-input');
        input.element.value = 'testf';
        input.trigger('input');

        const input2 = wrapper.find('.password-input');
        input2.element.value = 'ree';
        input2.trigger('input2');
        const button = wrapper.find('.tefr');
        button.trigger('click');
        expect(button.text()).toEqual('Validate');
    });
    it("test login", async () => {
        const input = wrapper.find('.login-input');
        input.element.value = 'testf';
        input.trigger('input');

        const input2 = wrapper.find('.password-input');
        input2.element.value = 'ree';
        input2.trigger('input2');
        const button = wrapper.find('.tefr');
        button.trigger('click');
        await wrapper.vm.$nextTick();
        const errorMessage = wrapper.find('.v-alert__wrapper');
        expect(errorMessage.exists()).toBe(false)
       // expect(button.text()).toEqual('Validate');
    });
    it('restitue un message et répond correctement à la saisie du user', function () {
        wrapper.setData({ username: " ".repeat(7) });
        // assert the error has gone away
        expect(wrapper.find(".error").exists()).toBe(false);
    });
    it('renders a vue instance', () => {
        expect(shallowMount(Home).isVueInstance()).toBe(true);
    });
});
