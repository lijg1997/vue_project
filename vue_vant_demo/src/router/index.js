import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes'
import $store from 'store'
import {AUTOLOGIN} from 'store/mutation_types'
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

const router = new VueRouter({
    routes,
    mode:'hash',
    linkActiveClass:'active'
});

//路由守卫
router.beforeEach(async (to, from, next) => {
    if(to.path !== '/login'){
        await $store.dispatch(AUTOLOGIN);
        if($store.state.user._id)next();
        else next('/login')
    } else next() // 像express中中间件
});
router.beforeResolve((to, from, next)=>{
    next() // 像express中中间件
});

router.afterEach((to, from) => {});

export default router