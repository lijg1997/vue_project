import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HeaderTop from './components/headerTop/headerTop'
import http from './http'
import './util/validate'
import './mock';
import './common/stylus/style.styl'
import './common/stylus/transition.styl'

Vue.component('HeaderTop',HeaderTop);
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
