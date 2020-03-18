import {GETSELLERS, GETGOODS} from './mutation_types'
import $http from '../http'
const OK = 0;
export default{
    async [GETSELLERS]({commit}){
        const body = await $http.mock.getSellers();
        console.log(body)
        if(body.errno === OK) commit(GETSELLERS, body.data)
    },
    async [GETGOODS]({commit}){
        const body = await $http.mock.getGoods();
        console.log(body)
        if(body.errno === OK) commit(GETGOODS, body.data)
    },
}