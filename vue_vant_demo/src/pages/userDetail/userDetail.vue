<template>
    <div>
        <van-button type="primary" @click="userLogout">退出登录</van-button>
        <i class="shop-close close" @click="$router.back()"></i>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import {LOGOUT} from '../../store/mutation_types'
    import {Button} from 'vant'
    export default {
        name: "userDetail",
        components:{
            [Button.name]:Button
        },
        methods:{
            ...mapActions([LOGOUT]),
            userLogout(){
                this[LOGOUT]();
            }
        }
    }
</script>

<style scoped lang="stylus">
    .close
        font-size 30px
        color skyblue
        position fixed
        right 10px
        top 10px
</style>