import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import headerTop from 'components/headerTop/headerTop'

Vue.config.productionTip = false;
Vue.component('headerTop',headerTop);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
