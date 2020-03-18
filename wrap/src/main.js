import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HeaderTop from './components/headerTop/headerTop'
import './util/validate'
import http from './http'

Vue.component('HeaderTop', HeaderTop);
Vue.config.productionTip = false;
Vue.prototype.$http = http

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
