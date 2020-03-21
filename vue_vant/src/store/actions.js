import {GETADDRESSOBJ, GETCATEGORIES, GETSHOPS, USERLOGIN, USERLOGOUT, AUTOLOGOUT} from './mutation_types'
import $http from '../http'
import $toast from '../util/toast'
import $router from '../router'
const OK = 0;
const NOTOKEN = 1;
function loginSuccess(commit, user, loginWay, changeCaptcha) {
    commit(USERLOGIN, user);
    localStorage.setItem('login_token', user.token);
    $toast.success('登陆成功');
    $router.replace('/profile');
    if(loginWay === 'password') changeCaptcha()
}
function loginFail(loginWay, changeCaptcha, msg) {
    $toast.fail(msg);
    if(loginWay === 'password') changeCaptcha()
}
export default {
    async [GETADDRESSOBJ]({commit}) {
        const body = await $http.msite.getAddress();
        if (body.code === OK) commit(GETADDRESSOBJ, body.data)
    },
    async [GETCATEGORIES]({commit}, cb) {
        const body = await $http.msite.getCategory();
        if (body.code === OK) commit(GETCATEGORIES, body.data);
        // cb && cb()
    },
    async [GETSHOPS]({commit}) {
        const body = await $http.msite.getShop();
        if (body.code === OK) commit(GETSHOPS, body.data);
    },
    async [USERLOGIN]({commit}, {loginWay, phone, code, name, pwd, captcha, changeCaptcha}) {
        let body = {};
        if (loginWay === 'message') body = await $http.login.loginBySMS({phone, code});
        else if (loginWay === 'password') body = await $http.login.loginByUserAndPsd({name, pwd, captcha});
        if(body.code === OK) loginSuccess(commit ,body.data, loginWay, changeCaptcha);
        else loginFail(loginWay, changeCaptcha, body.msg)
    },
    [USERLOGOUT]({commit}){
        commit(USERLOGOUT);
        localStorage.removeItem('login_token');
        $router.replace('/login')
    },
    async [AUTOLOGOUT]({commit}){
        try {
            const body = await $http.login.autoLogin();
            if(body.code === OK){
                commit(AUTOLOGOUT, body.data);
                $router.replace('/profile')
            }
            else if(body.code === NOTOKEN){
                alert(body.msg);
                $router.replace('/login');
                commit(USERLOGOUT)
            }
        }catch(err){
            alert(err.response.data.message);
            $router.replace('/login');
            commit(USERLOGOUT)
        }
    }
}