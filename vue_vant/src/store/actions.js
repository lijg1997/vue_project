import {GETADDRESSOBJ, GETCATEGORIES, GETSHOPS} from './mutation_types'
import $http from '../http'
const OK = 0;
export default {
    async [GETADDRESSOBJ]({commit}){
        const body = await $http.msite.getAddress();
        if(body.code === OK) commit(GETADDRESSOBJ, body.data)
    },
    async [GETCATEGORIES]({commit}, cb){
        const body = await $http.msite.getCategory();
        if(body.code === OK) commit(GETCATEGORIES, body.data);
        // cb && cb()
    },
    async [GETSHOPS]({commit}){
        const body = await $http.msite.getShop();
        if(body.code === OK) commit(GETSHOPS, body.data);
    }
}