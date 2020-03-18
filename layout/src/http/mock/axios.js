import axios from 'axios'
import config from './config'
import toast from '@/util/toast'

const contact = axios.create({
    baseURL:config.baseUrl,
    timeout:config.timeout
});

contact.interceptors.request.use((reqConfig)=>{
    toast.loading();
    config.hooks && config.hooks.beforeReq && config.hooks.beforeReq();
    return reqConfig
});

contact.interceptors.response.use((response)=>{
    toast.success();
    config.hooks && config.hooks.afterReq && config.hooks.afterReq();
    return response.data
}, (err)=>{
    toast.fail();
    config.hooks && config.hooks.afterReq && config.hooks.afterReq();
    return new Promise(()=>{})
});

export default contact