import {GETSELLERS, GETGOODS, INCREMENT, DECREMENT} from './mutation_types'
export default {
    [GETSELLERS](state, sellers){
        state.sellers = sellers
    },
    [GETGOODS](state, goods){
        state.goods = goods
    },
    [INCREMENT](state, goods){
        state.goods = goods
    },
    [DECREMENT](state, goods){
        state.goods = goods
    },

}