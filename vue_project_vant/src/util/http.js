export default (axios, api)=>{
    if(!api) throw new Error('api配置必须存在');
    if(!api instanceof Object) throw new Error('api配置必须是对象形式')
    const httpUtil = {};
    for(let name in api){
        let {url, method, isForm} = api[name];
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
                    body = await axios({
                        url,
                        method,
                        params:transformData
                    });
                    break;
                case 'post':
                case 'put':
                    body = await axios({
                        url,
                        method,
                        data:transformData
                    });
                    break;
            }
            return body
        }
    }
    return httpUtil

}
