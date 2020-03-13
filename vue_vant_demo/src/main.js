import Vue from 'vue'
import App from './App.vue'
import axios from './api'
import router from './ruoter'

Vue.config.productionTip = false
Vue.prototype.axios = axios
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
