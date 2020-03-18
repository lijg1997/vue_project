<template>
    <div class="header">
        <div class="top">
            <div class="shopImg">
                <img :src="seller.avatar" alt="img">
            </div>
            <div class="info">
                <div class="name">
                    <i class="brand"></i>
                    <span class="nameText">{{seller.name}}</span>
                </div>
                <div class="description">
                    <span>{{seller.description}} / {{seller.deliveryTime}}分钟送达</span>
                </div>
                <div class="support" v-if="seller.supports">
                    <EleIcon class="icon" :size="1" :type="seller.supports[0].type"></EleIcon>
                    <span class="supportText">{{seller.supports[0].content}}</span>
                </div>
            </div>
            <div class="moreBtn" v-if="seller.supports" @click="showList=true">
                <span>{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bottom" @click="showList=true">
            <div class="bulletin">
                <i class="icon"></i>
                <span class="bulletinText">{{seller.bulletin}}</span>
            </div>
            <i class="icon-keyboard_arrow_right right"></i>
        </div>
        <div class="bg">
            <img :src="seller.bgImg" alt="bgImg">
        </div>
        <transition name="mask">
            <div class="mask" v-show="showList">
                <div class="maskWrap">
                    <div class="maskMain">
                        <h2 class="title">{{seller.name}}</h2>
                        <div class="stars"><EleStar :size="48" :score="seller.score" /></div>
                        <EleLine class="lines"><span class="text">优惠信息</span></EleLine>
                        <EleList class="list" :supports="seller.supports"></EleList>
                        <EleLine class="lines"><span class="text">商家公告</span></EleLine>
                        <div class="bulletin">
                            <span>{{seller.bulletin}}</span>
                        </div>
                    </div>
                </div>
                <div class="closeBtn">
                    <i class="icon-close" @click="showList=false"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import EleIcon from '../eleIcon/eleIcon'
    import EleStar from '../eleStar/eleStar'
    import EleLine from '../eleLine/eleLine'
    import EleList from '../eleList/eleList'
    export default {
        name: "eleHeader",
        props:{
            seller:Object
        },
        data(){
            return {
                showList:false
            }
        },
        components:{
            EleIcon,
            EleStar,
            EleLine,
            EleList
        }
    }
</script>

<style scoped lang="stylus">
    @import '../../common/stylus/mixin.styl'
    .header
        font-size 0
        background-color rgba(7,17,27,.5)
        color rgb(255,255,255)
        position relative
        &>.top
            display flex
            padding 24px 0 18px 24px
            position relative
            .shopImg
                width 64px
                height 64px
                margin-right 16px
                img
                    width 100%
                    height 100%


            .info
                .name
                    margin 2px 0 8px
                    .brand
                        display inline-block
                        width 30px
                        height 18px
                        vertical-align top
                        margin-right 6px
                        bg-image(brand)
                    .nameText
                        font-size 16px
                        font-weight 900
                        vertical-align top
                .description
                    font-size 12px
                    font-weight 200px
                .support
                    margin-top 10px
                    .icon
                        margin-right 4px
                        vertical-align top
                    .supportText
                        font-size 10px
                        vertical-align top
            .moreBtn
                position absolute
                right 12px
                bottom 36px
                width 48px
                height 24px
                border-radius 12px
                line-height 24px
                text-align center
                font-size 12px
                background-color rgba(0,0,0,.2)

        &>.bottom
            height 28px
            background-color rgba(7,17,27,.2)
            display flex
            .bulletin
                width 92%
                line-height 28px
                font-size 12px
                font-weight 200
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                .icon
                    display inline-block
                    width 22px
                    height 12px
                    position relative
                    top 1px
                    margin-left 12px
                    margin-right 4px
                    bg-image(bulletin)
            .right
                margin-left 6px
                font-size 12px
                line-height 28px
        &>.bg
            position absolute
            left 0
            top 0
            width 100%
            height 100%
            z-index -1
            filter blur(3px)
            img
                width 100%

        &>.mask
            position fixed
            left 0
            right 0
            top 0
            bottom 0
            margin auto
            z-index 9
            overflow-y auto
            background-color rgba(7,17,27,.8)
            .maskWrap
                min-height 100%
                .maskMain
                    padding 64px 36px 96px
                    color rgb(255,255,255)
                    .title
                        margin-bottom 16px
                        font-size 16px
                        font-weight 700
                        line-height 16px
                        text-align center
                    .stars
                        width 100%
                        height 24px
                        text-align center
                    .lines
                        margin 28px 0 24px
                        .text
                            margin 0 12px
                            font-size 14px
                            font-weight 700
                            line-height 14px
                    .list
                        padding 0 12px
                        box-sizing border-box
                    .bulletin
                        margin 0 12px
                        font-size 12px
                        font-weight 200
                        line-height 24px
            .closeBtn
                width 100%
                height 96px
                line-height 96px
                text-align center
                font-size 32px
                color rgb(255,255,255)
                font-weight 700
                margin-top -96px

</style>