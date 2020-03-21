<template>
    <div>
        <van-button type="primary" class="exit" @click="logout">退出登录</van-button>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {USERLOGOUT} from 'store/mutation_types'
    import {Button} from 'vant'
    export default {
        name: "userDetail",
        computed:{
            ...mapState(['user'])
        },
        methods:{
            ...mapActions([USERLOGOUT]),
            logout(){
                if(window.confirm(`【${this.user.name || this.user.phone}】，您确定要退出登录吗？`))
                    this[USERLOGOUT]()
            }
        },
        components:{
            [Button.name]:Button
        }
    }
</script>

<style scoped lang="stylus">
    .exit
        position: fixed
        left 0
        right 0
        top 0
        bottom 0
        margin auto
        margin-left 150px
</style>