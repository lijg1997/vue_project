export default {
    // baseUrl:'http://localhost:4000',
    timeout:10000,
    api: {
        getSellers: {
            url: '/api/sellers',
            method: 'get',
        },
        getGoods: {
            url: '/api/goods',
            method: 'get',
        }
    }
}