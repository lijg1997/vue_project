export default (axios, api)=>{
    if(!api) throw new Error('api配置必须存在');
    if(!api instanceof Object) throw new Error('api配置必须是对象形式')
    let httpUtil = {};
    for(let name in api){
        let {url, method, isForm, hooks, corsUrl} = api[name];
        httpUtil[name] = async (data) => {
            let flag = data instanceof Object;
            let transformData = {};
            if(data && flag && isForm){
                transformData = new FormData();
                for(let key in data){
                    transformData.append(key, data[key])
                }
            }else transformData = data;
            if(corsUrl){
                url = corsUrl + url;
                corsUrl = ''
            }
            if(hooks){
                httpUtil[name].beforeReq = hooks.beforeReq;
                httpUtil[name].afterReq = hooks.afterReq;
                if(hooks.corsUrl){
                    url = hooks.corsUrl + url;
                    hooks.corsUrl = ''
                }
                /*if(hooks.token){

                }*/
            }
            // console.log(hooks.token, api[name].url);
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
                            lijg:'lijg',
                            Authorization: (hooks && hooks.token && hooks.token()) || ''
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
                            lijg:'lijg',
                            Authorization: (hooks && hooks.token && hooks.token()) || ''
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