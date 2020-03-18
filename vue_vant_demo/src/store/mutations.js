import {GETADDRESSOBJ, GETCATEGORIES, GETSHOPS,
    LOGIN, LOGOUT, AUTOLOGIN, GETSELLERS, GETGOODS} from './mutation_types'
export default {
    [GETADDRESSOBJ](state, addressObj){
        state.addressObj = addressObj
    },
    [GETCATEGORIES](state, categories){
        state.categories = categories
    },
    [GETSHOPS](state, shops){
        state.shops = shops
    },
    [LOGIN](state, user){
        state.user = user;
        state.token = user.token
    },
    [LOGOUT](state){
        state.user = '';
        state.token = ''
    },
    [AUTOLOGIN](state, user){
        state.user = user;
    },
    [GETSELLERS](state, sellers){
        state.sellers = sellers
    },
    [GETGOODS](state, goods){
        state.goods = goods
    },
}