import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9000/api'

axios.interceptors.request.use(function (config) {
    /*console.log(config)
    const {method} = config
    if(method.toUpperCase() === 'POST'){
        config.headers.Content-Type='form-data'
    }
    if(method.toUpperCase() === 'PUT'){
        config.headers.Content-Type='application/json'
    }*/

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return new Promise(()=>{})
});

export default axios