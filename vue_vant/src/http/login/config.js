const token = localStorage.getItem('login_token');
export default {
    baseUrl:'',
    timeout:10000,
    api: {
        getCode:{
            url:'/sendcode',
            method:'get',
            hooks:{
                corsUrl:'/4000'
            }
        },
        loginBySMS:{
            url:'/login_sms',
            method:'post',
            hooks:{
                corsUrl: '/4000',
                token,
            }
        },
        loginByUserAndPsd:{
            url:'/login_pwd',
            method:'post',
            hooks:{
                corsUrl: '/4000',
                token
            }
        },
        autoLogin:{
            url:'/auto_login',
            method:'get',
            hooks:{
                corsUrl: '/4000',
                token
            }
        }
    },
    cancleToast: false
}
