import axios from 'axios'
import config from './config'
import toast from '@/util/toast'

const contact = axios.create({
    baseURL:config.baseUrl,
    timeout:config.timeout
});

contact.interceptors.request.use((reqConfig)=>{
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