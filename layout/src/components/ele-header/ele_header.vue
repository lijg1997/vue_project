<template>
  <div class="header">
    <div class="top">
      <img class="avatar" :src="sellers.avatar" alt="img">
      <div class="info">
        <div class="title">
          <i class="brand"></i>
          <span class="name">{{sellers.name}}</span>
        </div>
        <div class="des">
          <span class="desInfo">{{sellers.description}}/{{sellers.deliveryTime}}分钟</span>
        </div>
        <div class="support" v-if="sellers.supports">
          <!-- <i class="icon"></i> -->
          <EleIcon :size="1" :type="sellers.supports[0].type"></EleIcon>
          <span class="text">{{sellers.supports[0].content}}</span>
        </div>
      </div>
      <div class="btn" @click="show = true" v-if="sellers.supports">
        <span class="text">{{sellers.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right right"></i>
      </div>
    </div>
    <div class="bulletin" @click="show = true">
      <div class="left">
        <i class="icon"></i>
        <span class="text">{{sellers.bulletin}}</span>
      </div>
      <i class="icon-keyboard_arrow_right right"></i>
    </div>
    <div class="bg">
      <img :src="sellers.bgImg" alt="img">
    </div>
    <transition name="mask">
      <div class="mask" v-show="show">
        <div class="main-wrap">
          <div class="main">
            <div class="title">嘉禾一品（温都水城）</div>
            <div class="starsWrap">
              <EleStars :size="36" :score="sellers.score"></EleStars>
            </div>
            <EleLine class="line"><template><span>优惠信息</span></template></EleLine>
            <EleList class="list" :supports="sellers.supports"></EleList>
            <EleLine class="line"><template><span>商家公告</span></template></EleLine>
            <div class="bulletin">
              {{sellers.bulletin}}
            </div>
          </div>
        </div>
        <div class="footer">
          <i class="icon-close" @click="show = false"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import EleIcon from 'components/ele-icon/ele_icon'
import EleLine from 'components/ele-line/ele_line'
import EleList from 'components/ele-list/ele_list'
import EleStars from 'components/ele-stars/ele_stars'
export default {
  props:{
    sellers:Object
  },
  data() {
    return {
      show:false,
    };
  },
  components:{EleIcon, EleLine, EleList, EleStars},
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'
.header
  font-size 0
  background-color rgba(7,17,27,.5)
  position relative
  overflow hidden
  &>.top
    padding 24px 0 18px 24px
    position relative
    .avatar
      display inline-block
      vertical-align top
      width 64px
      height 64px
      border-radius 2px
      margin-right 16px
    
    .info
      vertical-align top
      display inline-block
      color #fff
      @media screen and (mim-width:320px), (max-width 360px)
        max-width 200px
      .title
        font-size 16px
        margin 2px 0 8px
        .brand
          bg-image(brand)
          vertical-align top
          display inline-block
          width 30px
          height 18px
          background-size 100%
          margin-right 3px
        .name
          vertical-align top
          font-weight 900
      .des
        font-size 12px
      .support
        font-size 10px
        margin 10px 0 2px
        overflowHidden()
        .text
          vertical-align top 
    .btn
      position absolute
      right 12px
      bottom 32px
      width 48px
      height 24px
      line-height 24px
      background-color rgba(0,0,0,.2)
      border-radius 12px
      font-size 10px
      color rgba(255,255,255,1)
      text-align center
  
  
  &>.bulletin
    width 100%
    height 28px
    line-height 28px
    background-color rgba(7,17,27,.2)
    font-size 10px
    position relative
    color rgba(255,255,255,1)
    .left
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      height 100%
      margin-right 26px
      .icon
        bg-image(bulletin)
        width 22px
        height 12px
        display inline-block
        background-size 100%
        background-repeat no-repeat
        margin 0 4px 0 12px
        position relative
        top 1px
    .right
      position absolute
      right 12px
      top 8px


  &>.bg
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    z-index -1
    filter blur(10px)
    img
      width 100%
    
  &>.mask
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    padding-top 64px
    overflow-y auto
    background-color rgba(7,17,27,.8)
    z-index 9
    backdrop-filter blur(3px)
    .main-wrap
      min-height 100%
      .main
        padding-bottom 96px
        .title
          height 16px
          line-height 16px
          font-size 16px
          font-weight 700
          text-align center
          color rgba(255,255,255,1)
        .starsWrap
          margin-top  16px
          margin-bottom 28px
          text-align center
        .line
          width 80%
          margin 0 auto  
        .list
          width 80%  
          margin 24px auto 28px
        .bulletin
          width 80%
          margin 24px auto 0
          font-size 12px
          font-weight 200
          line-height 24px
          padding 0 12px
          color white
    .footer
      margin-top -96px
      width 100%
      height 96px
      line-height 96px
      text-align center
      font-size 32px
      color rgba(255,255,255,1)


</style>
