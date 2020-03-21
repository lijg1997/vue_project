import {GETADDRESSOBJ, GETCATEGORIES, GETSHOPS,
    USERLOGIN, USERLOGOUT, AUTOLOGIN,
    GETSELLER, GETGOODS} from './mutation_types'
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
    [USERLOGIN](state, user){
        state.user = user;
        state.token = user.token
    },
    [USERLOGOUT](state){
        state.user = '';
        state.token = ''
    },
    [AUTOLOGIN](state, user){
        state.user = user;
    },
    [GETSELLER](state, seller){
        state.seller = seller
    },
    [GETGOODS](state, goods){
        state.goods = goods
    }
}