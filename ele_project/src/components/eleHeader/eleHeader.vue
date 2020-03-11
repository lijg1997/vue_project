<template>
<div id="header">
  <div class="top">
    <div class="shopImg">
      <img :src="seller.avatar" alt="img">
    </div>
    <div class="info">
      <div class="shopName">
        <i class="brand"></i>
        <span class="text">{{seller.name}}</span>
      </div>
      <div class="description">
        <span>{{seller.description}} / {{seller.deliveryTime}}分钟送达</span>
      </div>
      <div class="support" v-if="seller.supports">
        <EleIcon :size="1" :type="seller.supports[0].type"></EleIcon>   
        <span class="text">{{seller.supports[0].content}}</span>
      </div>
      <div class="btn" v-if="seller.supports" @click="maskShow=true">
        <span>{{seller.supports.length}}</span>
        <i class="icon-keyboard_arrow_right right"></i>
      </div>
    </div>
  </div>
  <div class="bottom" @click="maskShow=true">
    <div class="bulletin">
      <i class="brand"></i>
      <span class="text">{{seller.bulletin}}</span>
    </div>
    <i class="icon-keyboard_arrow_right right"></i>
  </div>
  <div class="bg">
    <img :src="seller.bgImg" alt="bg">
  </div>
  <transition name="maskShow">
    <div v-show="maskShow" class="mask">
      <div class="maskWrap">
        <div class="maskMain">
          <div class="title">{{seller.name}}</div>
          <div class="starsWrap">
            <EleStar :size="48" :score="seller.score"></EleStar>
          </div>
          <EleLine class="line"><span class="text">优惠信息</span></EleLine>
          <EleList class="list" :supports="seller.supports"></EleList>
          <EleLine class="line"><span class="text">商家公告</span></EleLine>
          <div class="bulletin"><span class="text">{{seller.bulletin}}</span></div>
        </div>
      </div>
      <div class="closeBtn">
        <i class="icon-close" @click="maskShow=false"></i>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import EleIcon from '../eleIcon/eleIcon'
import EleLine from '../eleLine/eleLine'
import EleList from '../eleList/eleList'
import EleStar from '../eleStar/eleStar'
export default {
  props:{
    seller:Object
  },
  data() {
    return {
      maskShow:false
    };
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
@import "../../common/stylus/extends.styl"
#header
  font-size 0
  background-color rgba(7,17,27,.5)
  position relative
  overflow hidden
  &>.top
    padding 24px 0 18px 24px
    display flex
    .shopImg
      width 64px
      height 64px
      margin-right 16px
      img 
        width 100%
        height 100%
    .info
      flex 1 1 0%
      color rgb(255,255,255)
      position relative
      .shopName
        margin 2px 0 8px
        font-size 16px
        font-weight 900
        line-height 18px
        .brand
          display inline-block
          width 30px
          height 18px
          margin-right 6px
          vertical-align top
          bg-image(brand) 
        .text
          vertical-align top
      .description   
        font-size 12px
        font-weight 200
        line-height 12px
        margin-bottom 10px
      .support
        font-size 10px
        font-weight 200
        line-height 12px
        .text
          vertical-align top  
      .btn  
        position absolute
        right 12px
        top 22px
        width 48px
        height 24px
        background-color rgba(0,0,0,.2)
        border-radius 12px
        font-size 10px
        font-weight 200
        line-height 12px
        @extend .center
  &>.bottom 
    width 100% 
    height 28px
    line-height 28px
    background-color rgba(7,17,27,.2) 
    // position relative   
    font-size 10px
    font-weight 200
    color rgb(255,255,255)
    @extend .center
    .bulletin
      position relative
      left 0
      top 0
      right 0
      bottom 0
      margin-right 4px
      @extend .ellipsis
      .brand
        display inline-block
        width 22px
        height 12px
        margin-left 12px
        margin-right 4px
        position relative
        top 1px
        bg-image(bulletin)
    .right
      margin-right 12px
  &>.bg      
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    filter blur(3px)
    z-index -1
    img 
      width 100%
      height 100%
  &>.mask
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    z-index 9
    background-color rgba(0,0,0,.8)
    backdrop-filter blur(3px)
    overflow-y auto
    .maskWrap
      min-height 100%
      .maskMain
        padding 64px 36px 96px
        color rgb(255,255,255)
        .title
          font-size 16px
          font-weight 700px
          line-height 16px
          text-align center
        .starsWrap
          width 100%
          height 24px
          margin-top 16px
        .line
          width 100%
          margin 28px 0 24px
          .text
            margin 0 12px
            font-size 14px
            font-weight 700
            color rgb(255,255,255)  
        .list
          width 95%
          margin 0 auto
        .bulletin
          width 95%
          margin 0 auto
          .text
            font-size 12px
            font-weight 200
            color rgb(255,255,255)
            line-height 24px  
    .closeBtn
      @extend .center
      width 100%
      height 96px
      font-size 32px
      font-weight 700
      margin-top -96px
      color rgb(255,255,255)


</style>