// const token = localStorage.getItem('ele-token');
export default {
    // baseUrl:'http://localhost:4000',
    timeout:10000,
    api: {
        getAddress: {
            url: '/position/40.10038,116.36867',
            method: 'get',
            // corsUrl:'/4000',
            hooks: {
                corsUrl: '/4000',
            }
        },
        getCategory: {
            url: '/index_category',
            method: 'get',
            hooks: {
                corsUrl: '/4000',
                token:()=>localStorage.getItem('ele-token')
            }
        },
        getShop: {
            url: '/shops',
            method: 'get',
            hooks: {
                corsUrl: '/4000',
                token:()=>localStorage.getItem('ele-token')
            }
        }
    }
}