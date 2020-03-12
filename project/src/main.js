import Vue from 'vue'
import App from '@/test.vue'
import router from '@/router'
import '@/mock'
import axios from '@/api'
import '@/common/stylus/style.styl'
import '@/common/stylus/transition.styl'

/* import axios from 'axios'
(async function(){
  const body = await axios.get('/api/sellers')
  console.log(body)
})() */
Vue.prototype.bus = new Vue()
Vue.prototype.axios = axios
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
