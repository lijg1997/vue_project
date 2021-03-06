import axios from 'axios'
import config from './config'
import toast from '@/util/toast'

const contact = axios.create({
    baseURL:config.baseUrl,
    timeout:config.timeout
});

contact.interceptors.request.use((reqConfig)=>{
    /*if(reqConfig.url === '/4000/index_category' || reqConfig.url === '/4000/shops')
        reqConfig.headers.Authorization = localStorage.getItem('ele-token');*/
    config.cancleToast ? '' : toast.loading();
    config.hooks && config.hooks.beforeReq && config.hooks.beforeReq();
    return reqConfig
});

contact.interceptors.response.use((response)=>{
    config.cancleToast ? '' : toast.success();
    config.hooks && config.hooks.afterReq && config.hooks.afterReq();
    return response.data
}, (err)=>{
    config.cancleToast ? '' : toast.fail();
    config.hooks && config.hooks.afterReq && config.hooks.afterReq();
    return Promise.reject(err)
});

export default contact