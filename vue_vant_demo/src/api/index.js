import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9000/api';

axios.interceptors.request.use((config)=>{
    return config
});

axios.interceptors.response.use((response)=>{
    return response.data
}, (err)=>{
    return new Promise(()=>{})
});

export default axios