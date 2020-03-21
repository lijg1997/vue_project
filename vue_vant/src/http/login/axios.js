import axios from 'axios'
import toast from '@/util/toast'
import config from './config'

const contact = axios.create({
    baseURL:config.baseURL,
    timeout:config.timeout
});

contact.interceptors.request.use(function (reqConfig) {
    config.cancleToast ? '' : toast.loading();
    config.hooks && config.hooks.beforeReq && config.hooks.beforeReq();
    return reqConfig;
});

contact.interceptors.response.use(function (response) {
    config.cancleToast ? '' : toast.success();
    config.hooks && config.hooks.afterReq && config.hooks.afterReq();
    return response.data;
}, function (error) {
    config.cancleToast ? '' : toast.fail();
    config.hooks && config.hooks.afterReq && config.hooks.afterReq();
    return Promise.reject(error)
});

export default contact