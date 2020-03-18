export default {
    // baseUrl:'http://localhost:4000',
    timeout:10000,
    api: {
        getCode: {
            url: '/sendcode',
            method: 'get',
            hooks: {
                corsUrl:'/4000'
            }
        },
        loginBySMS: {
            url: '/login_sms',
            method: 'post',
            hooks: {
                corsUrl:'/4000'
            }
        },
        loginByUserAndPsd: {
            url: '/login_pwd',
            method: 'post',
            hooks: {
                corsUrl:'/4000'
            }
        },
        autoLogin: {
            url: '/auto_login',
            method: 'get',
            hooks: {
                corsUrl:'/4000',
                token:()=>localStorage.getItem('ele-token')
            }
        },
    }
}