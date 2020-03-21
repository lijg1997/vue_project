import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes'
import $store from 'store'
import {AUTOLOGIN} from 'store/mutation_types'
Vue.use(VueRouter);
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router =  new VueRouter({
  routes,
  mode:'hash',
  linkActiveClass:'active'
});

router.beforeEach(async (to, from, next) => {
  if(to.path !== '/login'){
    await $store.dispatch(AUTOLOGIN);
    if($store.state.user._id) next();
    else next('/login')
  }else next()
});

export default router