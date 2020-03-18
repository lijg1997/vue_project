import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes'
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err)
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch(err => err)
};

export default new VueRouter({
    routes,
    mode:'hash',
    linkActiveClass:'active'
})