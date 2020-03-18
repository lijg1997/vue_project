export default (axios, api)=>{
    if(!api) throw new Error('api配置必须存在');
    if(!api instanceof Object) throw new Error('api配置必须是对象形式');
    const httpUtil = {};
    for(let name in api){
        let {url, method, isForm, corsUrl, hooks} = api[name];
        if(hooks){
            api[name].beforeReq = hooks.beforeReq;
            api[name].afterReq = hooks.afterReq;
            if(hooks.corsUrl) url = hooks.corsUrl + url
        }
        /*if(corsUrl){
            url = corsUrl + url
        }*/
        httpUtil[name] = async (data={}) => {
            let transformData = null;
            let flag = data instanceof Object;
            if(data && flag && isForm){
                transformData = new FormData();
                for(let key in data){
                    transformData.append(key, data[key])
                }
            }else transformData = data;
            let body = '';
            switch (method) {
                case 'get':
                case 'delete':
                    api[name].beforeReq && api[name].beforeReq();
                    body = await axios({
                        url,
                        method,
                        params:transformData,
                        headers:{
                            Authorization:(hooks && hooks.token && hooks.token()) || ''
                        }
                    });
                    api[name].afterReq && api[name].afterReq();
                    break;
                case 'post':
                case 'put':
                    api[name].beforeReq && api[name].beforeReq();
                    body = await axios({
                        url,
                        method,
                        data:transformData,
                        headers:{
                            Authorization:(hooks && hooks.token && hooks.token()) || ''
                        }
                    });
                    api[name].afterReq && api[name].afterReq();
                    break;
            }
            return body
        }
    }
    return httpUtil

}
