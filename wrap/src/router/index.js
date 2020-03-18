import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes'
Vue.use(VueRouter);
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
export default new VueRouter({
    routes,
    mode:'hash',
    linkActiveClass:'active'
})