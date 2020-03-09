import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './mock';
import axios from './api'
import './common/stylus/style.styl'
import './common/stylus/transition.styl'

Vue.config.productionTip = false;
Vue.prototype.axios = axios
Vue.prototype.bus = new Vue()


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
