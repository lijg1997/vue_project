// const token = localStorage.getItem('login-token');
export default {
    baseURL:'',
    timeout:15000,
    api:{
        getAddress:{
            url:'/position/40.10038,116.36867',
            method:'get',
            hooks:{
                corsUrl:'/4000',
            }
        },
        getCategory:{
            url:'/index_category',
            method:'get',
            hooks:{
                corsUrl:'/4000',
                token:() => localStorage.getItem('login-token')
            }
        },
        getShop:{
            url:'/shops',
            method:'get',
            hooks:{
                corsUrl:'/4000',
                token:() => localStorage.getItem('login-token')
            }
        }
    }
}