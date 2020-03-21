import {GETADDRESSOBJ, GETCATEGORIES, GETSHOPS,
    USERLOGIN, USERLOGOUT, AUTOLOGIN,
    GETSELLER, GETGOODS} from './mutation_types'
import $http from '../http'
import toast from '../util/toast'
import $router from '../router'
const OK = 0;
const ERROR = 1;
const NOTOKEN = 1;
function loginSuccess(commit, user, loginWay, getCaptchaImg){
    toast.success('登录成功');
    commit(USERLOGIN,user);
    localStorage.setItem('login-token', user.token);
    $router.replace('/profile');
    if(loginWay === 'password') getCaptchaImg()
}
function loginFail(loginWay,getCaptchaImg, body){
    toast.fail(body.msg);
    if(loginWay === 'password') getCaptchaImg()
}

export default {
    async [GETADDRESSOBJ]({commit}){
        const {code, data} = await $http.msite.getAddress();
        if(code === OK) commit(GETADDRESSOBJ, data)
    },
    async [GETCATEGORIES]({commit}){
        const {code, data} = await $http.msite.getCategory();
        if(code === OK) commit(GETCATEGORIES, data)
    },
    async [GETSHOPS]({commit}){
        const {code, data} = await $http.msite.getShop();
        if(code === OK) commit(GETSHOPS, data)
    },
    async [USERLOGIN]({commit}, {loginWay,phone,code,name,pwd,captcha,getCaptchaImg}){
        let body = {};
        if(loginWay === 'message'){
            body = await $http.login.loginBySMS({phone,code})
        }else if(loginWay === 'password'){
            body = await $http.login.loginByUserAndPsd({name,pwd,captcha})
        }
        if(body.code === OK) loginSuccess(commit, body.data, loginWay, getCaptchaImg);
        else if(body.code === ERROR) loginFail(loginWay, getCaptchaImg, body)
    },
    [USERLOGOUT]({commit}){
        commit(USERLOGOUT);
        localStorage.removeItem('login-token');
        $router.replace('/login')
    },
    async [AUTOLOGIN]({commit}){
        try {
            const body = await $http.login.autoLogin();
            if(body.code === OK){
                commit(AUTOLOGIN, body.data);
            }else if(body.code === NOTOKEN){
                commit(USERLOGOUT);
                localStorage.removeItem('login-token');
                alert(body.msg);
            }
        }catch (e) {
            commit(USERLOGOUT);
            localStorage.removeItem('login-token');
            alert(e.response.data.message);
        }
    },
    async[GETSELLER]({commit},id){
        console.log(id)
        const {errno, data:seller} = await $http.shop.getSeller();
        if(errno === OK) commit(GETSELLER, seller)
    },
    async[GETGOODS]({commit}){
        const {errno, data:goods} = await $http.shop.getGoods()
        if(errno === OK) commit(GETGOODS, goods)
    }
}