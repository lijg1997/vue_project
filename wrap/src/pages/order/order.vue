<template>
    <section class="order">
        <HeaderTop class="header" title="-订单列表-"></HeaderTop>
        <section class="order_no_login">
            <img src="./images/person.png">
            <h3>登录后查看外卖订单</h3>
            <button @click="goto(`/login`)">立即登陆</button>
        </section>
    </section>
</template>

<script>
    export default {
        name:'order',
        methods:{
            goto(path){
                this.$router.push(path)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .order  //订单
        width 100%
        .header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
        .order_no_login
            padding-top 140px
            width 60%
            margin 0 auto
            text-align center
            >img
                display block
                width 100%
                height 30%
            >h3
                padding 10px 0
                font-size 17px
                color #6a6a6a
            >button
                display inline-block
                background #02a774
                font-size 14px
                color #fff
                border 0
                outline none
                border-radius 5px
                padding 10px 20px
</style>
