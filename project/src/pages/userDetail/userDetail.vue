<template>
    <div>
        <van-button type="primary" class="logout" @click="logout">退出登录</van-button>
    </div>
</template>

<script>
    import {Button} from 'vant'
    import {mapState, mapActions} from 'vuex'
    import {USERLOGOUT} from '../../store/mutation_types'
    export default {
        name: "userDetail",
        computed:{
            ...mapState(['user'])
        },
        methods:{
            ...mapActions([USERLOGOUT]),
            logout(){
                if(window.confirm(`【${this.user.name || this.user.phone}】，您确定要退出登录吗`)){
                    this[USERLOGOUT]()
                }
            }
        },
        components:{
            [Button.name]:Button
        },
    }
</script>

<style scoped lang="stylus">
    .logout
        margin 200px 0 0 150px
</style>