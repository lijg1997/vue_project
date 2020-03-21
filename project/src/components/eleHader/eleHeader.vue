<template>
<div class="header">
  <div class="top">
    <div class="avatar">
      <img :src="seller.avatar" alt="avatar">
    </div>
    <div class="info">
      <div class="title">
        <i class="brand"></i>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="des">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
      <div class="support"  v-if="seller.supports">
        <EleIcon :size="1" :type="seller.supports[0].type"></EleIcon>
        <span class="text">{{seller.supports[0].content}}</span>
      </div>
    </div>
    <div class="btn" @click="maskShow = true"  v-if="seller.supports">
      <span class="text">{{seller.supports.length}}</span>
      <i class="shop-keyboard_arrow_right right"></i>
    </div>
  </div>
  <div class="bulletin" @click="maskShow = true">
    <div class="left">
      <i class="brand"></i>
      <span class="text">
        {{seller.bulletin}}
      </span>
    </div>
    <i class="shop-keyboard_arrow_right right"></i>
  </div>
  <div class="bg">
    <img :src="seller.bgImg" alt="bg">
  </div>
  <transition name="mask">
    <div class="mask" v-show="maskShow">
      <div class="maskWrap">
        <div class="maskMain">
          <div class="shopName">{{seller.name}}</div>
          <div class="starsWrap">
            <EleStar :size="36" :score="seller.score"></EleStar>
          </div>
          <EleLine class="line"><span>优惠信息</span></EleLine>
          <EleList class="list" :supports="seller.supports"></EleList>
          <EleLine class="line"><span>商家公告</span></EleLine>
          <div class="bulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="btn">
        <i class="shop-close close" @click="maskShow = false"></i>
      </div>
    </div>
  </transition>
  <div class="shop-close close" @click="$router.replace('/msite')"></div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import EleIcon from '../eleIcon/eleIcon'
import EleLine from '../eleLine/eleLine'
import EleList from '../eleList/eleList'
import EleStar from '../eleStar/eleStar'
export default {
  data() {
    return {
      maskShow:false
    };
  },
  computed:{
    ...mapState(['seller'])
  },
  components:{
    EleIcon,
    EleLine,
    EleList,
    EleStar
  }
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.header
  position relative
  font-size 0
  background-color rgba(7, 17, 27, .5)
  overflow hidden
  &>.close
    position: absolute
    right 5px
    top 5px
    font-size 25px
    color white
  &>.top
    padding 24px 0 18px 24px
    position relative
    &>.avatar
      display inline-block
      vertical-align top
      width 64px
      height 64px
      margin-right 16px
      img 
        width 100%
        height 100%
        border-radius 2px
    &>.info
      vertical-align top
      display inline-block
      color rgb(255,255,255)
      .title
        height 18px
        line-height 18px
        margin 2px 0 8px
        .brand
          vertical-align top 
          display inline-block
          bg-image(brand)
          background-size 100%
          width 30px
          height 18px
          margin-right 6px
        .name
          vertical-align top 
          font-size 16px
          font-weight 700         
      .des
        height 12px
        line-height 12px
        font-size 12px
        font-weight 200   
        margin-bottom 10px
      .support    
        height 12px
        line-height 12px
        font-size 10px
        color rgb(255,255,255)
        @media screen and (max-width 360px)
          width 200px
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .text
          vertical-align top 
    &>.btn
      position absolute
      right 12px
      bottom 34px
      width 48px
      height 24px
      line-height 24px
      border-radius 12px
      background-color rgba(0,0,0,.3)
      color rgb(255,255,255)
      font-size 10px
      font-weight 200
      text-align center 
      .text
        margin-left 5px
  &>.bulletin    
    width 100%
    height 28px
    line-height 28px
    background-color rgba(7,17,27,.3)
    font-size 10px
    font-weight 200
    color rgb(255,255,255)
    position relative
    .left
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      height 100%
      padding-right 26px
      .brand
        bg-image(bulletin)
        display inline-block
        width 22px
        height 12px
        background-size 100%
        background-repeat no-repeat
        margin-left 12px
        margin-right 4px
        position relative
        top 2px
    .right
      position absolute 
      right 10px
      top 10px   
  &>.bg
    position absolute
    left 0
    top 0
    z-index -1
    filter blur(3px)
  &>.mask
    position fixed
    left 0
    right  0
    top 0
    bottom  0
    z-index 9
    background-color rgba(7,17,27,.8)
    backdrop-filter blur(2px)
    padding-top 64px
    overflow-y auto
    .maskWrap
      min-height 100%
      .maskMain
        padding-bottom 96px
        .shopName
          height 16px
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700
          color rgb(255,255,255)
        .starsWrap
          height 24px
          margin 16px 0 28px
          display flex
          justify-content center
        .line
          width 80%
          margin 0 auto 24px 
        .list
          width 88%
          margin 0 auto 28px 
        .bulletin
          width 80%
          margin 0 auto 28px   
          font-size 12px
          line-height 24px
          color rgb(255,255,255)
          font-weight 200
    .btn
      height 96px
      line-height 96px
      margin-top -96px  
      font-size 32px
      text-align center
      color rgba(255,255,255,.5)

</style>