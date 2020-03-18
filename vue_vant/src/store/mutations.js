import {GETADDRESSOBJ, GETCATEGORIES, GETSHOPS} from './mutation_types'
export default {
    [GETADDRESSOBJ](state, addressObj){
        state.addressObj = addressObj
    },
    [GETCATEGORIES](state, categories){
        state.categories = categories
    },
    [GETSHOPS](state, shops){
        state.shops = shops
    }
}