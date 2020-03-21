<template>
    <div id="app">
        <EleHeader />
        <div class="navs">
            <div class="item">
                <router-link :to="`/main_app/${id}/goods`">商品</router-link>
            </div>
            <div class="item">
                <router-link :to="`/main_app/${id}/ratings`">评价</router-link>
            </div>
            <div class="item">
                <router-link :to="`/main_app/${id}/sellers`">商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {GETSELLERS} from 'store/mutation_types'
    import EleHeader from "components/ele-header/ele_header";
    export default {
        name: "mainApp",
        props:{
            id:String
        },
        computed:{
            ...mapState(['sellers'])
        },
        methods:{
            ...mapActions([GETSELLERS])
        },
        activated() {
            this[GETSELLERS](this.id)
        },
        beforeRouteUpdate(to, from, next){
            // console.log(to.params.id);
            next()
        },
        components: { EleHeader },
    };
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/mixin.styl"
    #app
        position relative
        width 100%
        height 100%
        .navs
            one-px(skyblue)
            display flex
            height 40px
            position relative
            .item
                flex 1
                text-align center
                height 40px
                line-height 40px
                font-size 14px
                a
                    display inline-block
                    width 100%
                    height 100%
                    color rgb(77, 85, 93)
                    &.active
                        color rgb(240, 20, 20)

</style>
