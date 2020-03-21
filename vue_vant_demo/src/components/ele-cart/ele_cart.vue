<template>
<div>
  <div class="cart">
    <div class="left">
      <div class="icon">
        <div class="logo" :class="{active:selectedCount > 0}" @click="handleFlod">
          <i class="shop-shopping_cart"></i>
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
  <transition name="showCartList">
    <div class="list" v-show="showList">
      <div class="header">
        <span class="cartText">购物车</span>
        <span class="clear" @click="clear">清空</span>
      </div>
      <div class="goodsList" ref="goodsList">
        <ul>
          <li class="item" v-for="(selectedFood, index) in selectedFoods" :key="index">
            <span class="text">{{selectedFood.name}}</span>
            <div class="foodItem">
              <span class="price">{{selectedFood.price * selectedFood.count}}</span>
              <EleControl :food="selectedFood"></EleControl>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
  <transition name="showCartMask">
    <div class="mask" v-show="showList" @click="fold=true"></div>
  </transition>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import {transform} from '../../util/transition'
import EleControl from '../ele-control/ele_control'
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
      animationArr:[],
      fold:true
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
    },
    showList(){
      if(this.selectedCount <= 0){
        this.fold = true
        return false
      }
      return !this.fold
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
    },
    clear(){
      this.$emit('clear')
    },
    handleFlod(){
      if(this.selectedCount <= 0) return
      this.fold = !this.fold

    }
  },
  mounted() {
    this.bus.$on('ballsAnimition', (target) => {
      this.ballsAnimition(target)
    })
    this.$nextTick(() => {
      /* if(!this.scroll){
        this.scroll = new BScroll(this.$refs.goodsList, {probeType:3, click:true})
      }else{
        this.scroll.refresh()
      } */
      new BScroll(this.$refs.goodsList, {probeType:3, click:true})
    })
  },
  components:{EleControl}
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/extends.styl"
@import "../../common/stylus/mixin.styl"
.cart
  flex 0 0 0
  position fixed
  left 0
  bottom 0      
  width 100%
  height 46px
  background-color #141d27  
  display flex
  color rgba(255,255,255,.4)
  z-index 3
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
.list
  width 100%
  max-height 270px
  position fixed
  left 0
  bottom 46px  
  z-index 2 
  padding-bottom 20px 
  background-color #fff 
  .header
    one-px(rgba(7,17,27,.1))
    width 100%
    height 40px
    background-color #f3f5f7
    display flex
    justify-content space-between
    align-items center
    .cartText
      font-size 14px
      color rgb(7,17,27)
      font-weight 200
      margin-left 18px
    .clear
      font-size 12px
      color rgb(0,160,220)
      font-weight 200
      margin-right 18px
  .goodsList
    height 195px
    padding 0 18px  
    overflow hidden
    .item
      width 100%
      height 48px
      display flex
      justify-content space-between
      align-items center
      one-px(rgba(7,17,27,.1))
      &:after
        width 90%
        right 0
        margin auto
      .text
        font-size 14px
        color rgb(7,17,27)
      .foodItem
        @extend .center
        .price
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          margin-right 12px
.mask  
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  margin auto
  z-index 1  
  background-color rgba(7,17,27,.6)   
  backdrop-filter blur(3px) 
</style>