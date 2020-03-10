<template>
<div class="cart">
  <div class="left">
    <div class="icon">
      <div class="logo" :class="{active:selectedCount > 0}">
        <i class="icon-shopping_cart"></i>
      </div>
      <span class="bubble" v-show="selectedCount > 0">{{selectedCount}}</span>
    </div>
    <div class="ratingCount" :class="{active:selectedMoney > 0}"><span>￥{{selectedMoney}}</span></div>
    <div class="deliveryPrice"><span>另需配送费￥{{sellers.deliveryPrice}}元</span></div>
  </div>
  <div class="right" :class="{active:selectedMoney >= sellers.minPrice}">
    <span v-if="rightText">{{rightText}}</span>
  </div>
  <div class="balls">
    <transition name="balls" v-for="(ball, index) in ballsShowArr" :key="index"
      @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <i class="ball" v-show="ball.show"></i>
    </transition>
  </div>
</div>
</template>

<script>
import {transform} from '../../util/transition'
export default {
  props:{
    selectedFoods:Array,
    sellers:Object
  },
  data(){
    return {
      ballsShowArr:[
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      animationArr:[]
    }
  },
  computed: {
    selectedMoney(){
      let selectedMoney = 0
      this.selectedFoods.forEach((item) => {
        selectedMoney += item.price * item.count
      })
      return selectedMoney
    },
    selectedCount(){
      let selectedCount = 0
      this.selectedFoods.forEach((item) => {
        selectedCount += item.count
      })
      return selectedCount
    },
    rightText(){
      if(this.selectedMoney === 0) return `￥${this.sellers.minPrice}起送`
      else if(this.selectedMoney < this.sellers.minPrice) return `还差￥${this.sellers.minPrice - this.selectedMoney}起送`
      else return `去提交`
    }
  },
  methods: {
    ballsAnimition(target){
      for(let i = 0; i < this.ballsShowArr.length; i++){
        let ball = this.ballsShowArr[i]
        if(!ball.show){
          ball.show = true
          ball.target = target
          this.animationArr.push(ball)
          return
        }
      }
    },
    beforeEnter(el){
      let count = this.ballsShowArr.length
      while(count--){
        let ball = this.ballsShowArr[count]
        if(ball.show){
          let viewH = document.documentElement.clientHeight
          let targetRect  = ball.target.getBoundingClientRect()
          let X = targetRect.left - 28
          let Y = -(viewH- targetRect.top - 38)
          transform(el, 'translateX', X)
          transform(el, 'translateY', Y)
          break
        }
      }
    },
    enter(el){
      let hook = el.offsetHeight
      this.$nextTick(() => {
        transform(el, 'translateX', 0)
        transform(el, 'translateY', 0)
      })
    },
    afterEnter(el){
      const ball = this.animationArr.shift()
      if(ball.show){
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  mounted() {
    this.bus.$on('ballsAnimition', (target) => {
      this.ballsAnimition(target)
    })
  },
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/extends.styl"
.cart
  display flex
  color rgba(255,255,255,.4)
  .left
    flex 1 1 0%
    height 100%
    display flex
    .icon
      position relative
      left 12px
      bottom 8px
      width 56px
      height 56px
      border-radius 50%
      background-color #141d27 
      margin-right 18px
      @extend .center
      .logo
        width 44px
        height 44px
        border-radius 50%
        font-size 24px
        background-color rgba(255,255,255,.2)
        @extend .center
        &.active
          background-color rgb(0,160,220)
          color white  
      .bubble 
        position absolute
        right 0
        top 5px
        width 24px
        height 12px 
        border-radius 6px
        background-color red
        color white
        font-size 9px
        @extend .center
    .ratingCount 
      flex 0 0 50px
      margin-right 12px
      font-size 16px
      line-height 24px
      font-weight 700
      @extend .center
      &.active
        color rgb(255,255,255)
    .deliveryPrice
      font-size 14px
      font-weight 700
      position relative
      padding-left 12px
      @extend .center
      &:after
        content ""
        display inline-block
        position absolute
        left 0 
        top 8px
        width 1px
        height 30px
        background-color rgba(255,255,255,.2)
  .right
    flex 0 0 105px
    height 100%  
    font-size 12px
    font-weight 700
    @extend .center
    &.active
      background-color green
      span 
        color rgb(255,255,255)
  .balls 
    .ball
      position absolute
      left 32px
      top 11px
      width 16px
      height 16px
      border-radius 50%
      background-color red
      transition transform .5s linear   
</style>