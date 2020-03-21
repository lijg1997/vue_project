import Vue from 'vue'
import App from '@/App'

import http from '@/http'
import router from '@/router'
import store from '@/store'

import HeaderTop from './components/headerTop/headerTop'
import './util/validate'
import '@/mock'
import '@/common/stylus/style.styl'
import '@/common/stylus/transition.styl'

Vue.component('HeaderTop', HeaderTop);
Vue.prototype.bus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$http = http


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

