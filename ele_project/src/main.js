import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import axios from './api'
import '@/mock'
import '@/common/stylus/style.styl'
Vue.config.productionTip = false
Vue.prototype.axios = axios
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
