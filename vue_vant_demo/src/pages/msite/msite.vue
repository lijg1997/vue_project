<template>
    <div class="msite">
        <!--首页头部-->
        <HeaderTop class="header" :title="addressObj.name">
            <template #search>
                <a class="header_search">
                    <i class="iconfont icon-sousuo"></i>
                </a>
            </template>
            <template #login>
                <a class="header_login">
                    <span class="header_login_text">登录 | 注册</span>
                </a>
            </template>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav border-1px">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(categoryArr, index) in categoryArrs" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(category, index) in categoryArr" :key="index">
                            <div class="food_container">
                                <img :src="imgBaseUrl + category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <ShopList :shops="shops" :imgBaseUrl="imgBaseUrl"></ShopList>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/css/swiper.min.css'
    import _ from 'lodash'
    import {mapState, mapActions} from 'vuex'
    import {GETADDRESSOBJ, GETCATEGORIES, GETSHOPS} from 'store/mutation_types'
    import ShopList from 'components/shopList/shopList'
    export default {
        name:'msite',
        computed:{
            ...mapState(['addressObj','categories','shops','imgBaseUrl', 'user']),
            categoryArrs(){
                return _.chunk(this.categories, 8)
            }
        },
        methods:{
            ...mapActions([GETADDRESSOBJ, GETCATEGORIES, GETSHOPS]),
            renderSwiper(){
                this.$nextTick(()=>{
                    new Swiper ('.swiper-container', {
                        // direction: 'vertical', // 垂直切换选项
                        // loop: true, // 循环模式选项
                        pagination: { // 如果需要分页器
                            el: '.swiper-pagination',
                        },
                    })
                })
            }
        },
        async mounted(){
            if(this.user){
                await this[GETADDRESSOBJ]();
                await this[GETCATEGORIES]();
                await this[GETSHOPS]();
                this.renderSwiper()
            }
        },
        components:{ShopList}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .msite
        width 100%
        height 100%
        overflow hidden
        position: relative
        .header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
                position absolute
                left 15px
                top 50%
                transform translateY(-50%)
                width 10%
                height 50%
                .icon-sousuo
                    font-size 25px
                    color #fff
            .header_login
                font-size 14px
                color #fff
                position absolute
                right 15px
                top 50%
                transform translateY(-50%)
                .header_login_text
                    color #fff
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #02a774
</style>