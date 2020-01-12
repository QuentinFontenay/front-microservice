import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store/login'
import {TrackJS} from 'trackjs'

TrackJS.install({
    token: "37f451bde1154cb38e8535712c658d7b"
});
Vue.config.errorHandler = (err, vm, info) => {

    // Log properties passed to the component if there are any
    if(vm.$options.propsData) {
        console.log("Props passed to component", vm.$options.propsData);
    }

    // Emit component name and also the lifecycle hook the error occurred in if present
    var infoMessage = `Error in component: <${vm.$options.name} />\n`;
    if (info){
        infoMessage += `Error occurred during lifecycle hook: ${info}\n`;
    }

    // This puts the additional error information in the Telemetry Timeline
    console.log(infoMessage);

    // Track the native JS error
    window.TrackJS && TrackJS.track(err);
}


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
