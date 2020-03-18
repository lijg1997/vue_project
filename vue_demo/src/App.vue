<template>
    <div id="app">
        <EleHeader :seller="seller"></EleHeader>
        <div class="navs">
            <div>
                <router-link to="/goods" class="link">商品</router-link>
            </div>
            <div>
                <router-link to="/ratings" class="link">評論</router-link>
            </div>
            <div>
                <router-link to="/seller" class="link">店家</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import EleHeader from './components/eleHeader/eleHeader'
    const OK = 0
    export default {
        name: "App",
        data(){
            return {
                seller:{}
            }
        },
        async mounted(){
            const {errno, data:seller} = await this.axios.get('/api/seller')
            if(errno === OK) this.seller = seller
        },
        components:{
            EleHeader
        }
    }
</script>

<style scoped lang="stylus">
@import './common/stylus/mixin.styl'
#app
    width 100%
    height 100%
    .navs
        one-px(rgba(7,17,27,.1))
        width 100%
        height 40px
        background-color rgb(255,255,255)
        display flex
        justify-content space-around
        align-items center
        .link
            font-size 14px
            color rgb(77,85,93)
            &.active
                color: rgb(220,20,20)

</style>