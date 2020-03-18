<template>
    <div>
        <van-button type="primary" @click="userLogout">退出登录</van-button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
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
                localStorage.removeItem('ele-token');
                this.$router.replace('/login')
            }
        }
    }
</script>

<style scoped>

</style>