export default (axios, api)=>{
    if(!api) throw new Error('api配置必须存在');
    if(!api instanceof Object) throw new Error('api配置必须为对象形式');
    let httpUtil = {};
    for(let name in api){
        let {url, method, isForm, hooks} = api[name];
        httpUtil[name] = async (data)=>{
            let transformData = null;
            let flag = data instanceof Object;
            if(data && flag && isForm){
                transformData = new FormData();
                for(let key in data){
                    transformData.append(key, data[key])
                }
            }else transformData = data
            if(hooks){
                httpUtil[name].beforeReq = hooks.beforeReq;
                httpUtil[name].afterReq = hooks.afterReq;
                if(hooks.corsUrl){
                    url = hooks.corsUrl + url;
                    hooks.corsUrl = ''
                }
            }
            let body = {};
            switch (method) {
                case 'get':
                case 'delete':
                    httpUtil[name].beforeReq && httpUtil[name].beforeReq();
                    body = await axios({
                        url,
                        method,
                        params:transformData,
                        headers:{
                            Authorization: hooks && hooks.token && hooks.token || ''
                        }
                    });
                    httpUtil[name].afterReq && httpUtil[name].afterReq();
                    break;
                case 'post':
                case 'put':
                    httpUtil[name].beforeReq && httpUtil[name].beforeReq();
                    body = await axios({
                        url,
                        method,
                        data:transformData,
                        headers:{
                            Authorization: hooks && hooks.token && hooks.token || ''
                        }
                    });
                    httpUtil[name].afterReq && httpUtil[name].afterReq();
                    break
            }
            return body
        }
    }
    return httpUtil
}