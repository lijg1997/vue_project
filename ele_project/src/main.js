import Vue from 'vue'
import App from '@/App'
import router from './router'
import axios from './api'
import '@/mock'
import '@/common/stylus/style.styl'
import '@/common/stylus/transition.styl'
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
Vue.prototype.axios = axios
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
