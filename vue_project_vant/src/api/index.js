import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9000/api'

axios.interceptors.request.use(function (config) {
    return config;
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return new Promise(()=>{})
});

export default axios