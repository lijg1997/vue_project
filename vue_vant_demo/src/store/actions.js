import Swal from 'sweetalert2'
import {GETADDRESSOBJ, GETCATEGORIES, GETSHOPS,
    LOGIN, LOGOUT, AUTOLOGIN, GETSELLERS, GETGOODS} from './mutation_types'
import $http from '../http'
import toast from '../util/toast'
import $router from '../router'
const OK = 0;
const ERROR = 1;
const NOTOKEN = 1;
function loginSuccess(commit, user, loginWay, changeCaptcha) {
    commit(LOGIN, user);
    localStorage.setItem('ele-token', user.token);
    $router.replace('/profile');
    if(loginWay === 'password') changeCaptcha();
    toast.success('登录成功')
}
function loginFail(msg, loginWay, changeCaptcha) {
    if(loginWay === 'password') changeCaptcha();
    toast.fail(msg)
}
export default {
    async [GETADDRESSOBJ]({commit}){
        const body = await $http.msite.getAddress();
        if(body.code === OK) commit(GETADDRESSOBJ,body.data)
    },
    async [GETCATEGORIES]({commit}){
        const body = await $http.msite.getCategory();
        if(body.code === OK) commit(GETCATEGORIES,body.data)
    },
    async [GETSHOPS]({commit}){
        const body = await $http.msite.getShop();
        if(body.code === OK) commit(GETSHOPS,body.data)
    },
    async [LOGIN]({commit},{loginWay,phone,code,name,pwd,captcha,changeCaptcha}){
        let body = {};
        if(loginWay === 'message') body = await $http.login.loginBySMS({phone,code});
        else if(loginWay === 'password') body = await $http.login.loginByUserAndPsd({name,pwd,captcha});
        if(body.code === OK) loginSuccess(commit, body.data, loginWay, changeCaptcha);
        else if(body.code === ERROR) loginFail(body.msg, loginWay, changeCaptcha)
    },
    [LOGOUT]({commit}){
        localStorage.removeItem('ele-token');
        $router.replace('/login')
        commit(LOGOUT)
    },
    async [AUTOLOGIN]({commit}){
        try {
            const body = await $http.login.autoLogin();
            if(body.code === OK) commit(AUTOLOGIN, body.data);
            else if(body.code === NOTOKEN){
                localStorage.removeItem('ele-token');
                commit(LOGOUT);
                if($router.history.current.path !== '/login')
                    Swal.fire(body.msg);
            }
        }catch (e) {
            localStorage.removeItem('ele-token');
            commit(LOGOUT);
            Swal.fire(e.response.data.message);
        }
    },
    async [GETSELLERS]({commit},id){
        console.log(id);
        const body = await $http.mock.getSellers();
        if(body.errno === OK) commit(GETSELLERS, body.data)
    },
    async [GETGOODS]({commit}){
        const body = await $http.mock.getGoods();
        if(body.errno === OK) commit(GETGOODS, body.data)
    },
}