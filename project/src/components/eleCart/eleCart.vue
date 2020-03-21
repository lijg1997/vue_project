<template>
<div>
  <div class="cart">
    <div class="left">
      <div class="icon">
        <div class="car" :class="{active:selectedCount > 0}" @click="handleFold">
          <i class="shop-shopping_cart" ></i>
        </div>
        <span class="bubble" v-if="selectedCount > 0">{{selectedCount}}</span>
      </div>
      <div class="ratingCount" :class="{active:selectedMoney > 0}"><span>￥ {{selectedMoney}}</span></div>
      <div class="deliveryPrice"><span>另需配送费￥{{seller.deliveryPrice}}元</span></div>
    </div>
    <div class="right" v-if="redactText" :class="{active: this.selectedMoney >= this.seller.minPrice}">
      <span>{{redactText}}</span>
    </div>
    <div class="balls">
      <transition v-for="(ball, index) in balls" :key="index"
        @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <i class="ball" v-show="ball.show"></i>
      </transition>
    </div>
  </div>
  <transition name="cartMask">
    <div class="list" v-show="listShow">
      <div class="header">
        <span class="cartText">购物车</span>
        <span class="clear" @click="clear">清空</span>
      </div>
      <div class="goodsList" ref="goodsList">
        <ul>
          <li class="item" v-for="(selectedFood, index) in selectedFoodCount" :key="index">
            <span class="text">{{selectedFood.name}}</span>
            <div class="price">
              <span class="priceText">{{selectedFood.price * selectedFood.count}}</span>
              <EleControl :food="selectedFood"></EleControl>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
  <transition name="cartMask">
    <div class="cartMask" v-show="listShow" @click="fold=true"></div>
  </transition>
</div>  
</template>

<script>
import BScroll from 'better-scroll'
import EleControl from '../eleControl/eleControl'
import {transform} from '../../util/transform'
export default {
  props:{
    selectedFoodCount:Array,
    seller:Object
  },
  data() {
    return {
      balls:[
        {show:false},
        {show:false},
        {show:false},
        {show:false},
        {show:false}
      ],
      animationArr:[],
      fold:true
    };
  },
  computed: {
    selectedMoney(){
      let selectedMoney = 0
      this.selectedFoodCount.forEach((food) => {
        selectedMoney += food.price * food.count
      })
      return selectedMoney
    },
    selectedCount(){
      let selectedCount = 0
      this.selectedFoodCount.forEach((food) => {
        selectedCount += food.count
      })
      return selectedCount
    },
    redactText(){
      if(this.selectedMoney === 0) return `￥${this.seller.minPrice}起送`
      else if(this.selectedMoney < this.seller.minPrice) return `还差￥${this.seller.minPrice - this.selectedMoney}起送`
      else return `去结算`
    },
    listShow(){
      if(this.selectedCount <= 0){
        this.fold = true
        return false
      }
      return !this.fold
    }
  },
  methods: {
    ballsAnimation(target){
      for(let i = 0; i < this.balls.length; i++){
        let ball = this.balls[i]
        if(!ball.show){
          ball.show = true
          ball.target = target
          this.animationArr.push(ball)
          return
        }
      }
    },
    beforeEnter(el){
      let count = this.balls.length
      while(count--){
        let ball = this.balls[count]
        if(ball.show){
          let viewH = document.documentElement.clientHeight
          let targetRect = ball.target.getBoundingClientRect()
          let X = targetRect.left - 28
          let Y = -(viewH - targetRect.top - 42)
          transform(el, 'translateX', X)
          transform(el, 'translateY', Y)
          break
        }
      }
    },
    enter(el){
      let hook = el.offsetHeight;
      this.$nextTick(() => {
        transform(el, 'translateX', 0)
        transform(el, 'translateY', 0)
      })
    },
    afterEnter(el){
      let ball = this.animationArr.shift()
      if(ball.show){
        ball.show = false
        el.style.display = 'none'
      }
    },
    clear(){
      this.$emit('clear')
    },
    handleFold(){
      if(this.selectedCount <= 0) return
      this.fold = !this.fold
    }
  },
  mounted() {
    this.bus.$on('ballsAnimation', (target) => {
      this.ballsAnimation(target)
    })
    this.$nextTick(() => {
      new BScroll(this.$refs.goodsList,{click:true})
    })
  },
  components:{EleControl}
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/extends.styl'
@import '../../common/stylus/mixin.styl'
.cart
  flex 0 0 0
  position fixed
  left 0
  bottom 0
  height 46px
  width 100%
  background #141d27
  color rgba(255,255,255,.5)
  display flex
  z-index 3
  .left
    flex 1
    height 100%
    display flex
    .icon
      position relative
      left 12px
      bottom 12px
      width 56px
      height 56px
      border-radius 50%
      background-color #141d27
      @extend .center
      .car
        width 44px
        height 44px
        border-radius 50%
        background-color rgba(255,255,255,.3)
        font-size 24px
        @extend .center
        &.active
          background-color rgb(0,160,220)
          i 
            color rgb(255,255,255)  
      .bubble
        position absolute
        right 0
        top 5px
        width 24px
        height 12px
        border-radius 6px
        background-color rgb(240,20,20)
        box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
        font-size 9px
        font-weight 700
        @extend .center  
    .ratingCount
      font-size 16px
      font-weight 700
      margin 0 12px
      @extend .center
      &.active
        color rgb(255,255,255)
    .deliveryPrice
      font-size 14px
      padding-left 12px
      position relative
      @extend .center
      &:after
        content ""
        display block
        position absolute
        left 0
        top 8px
        width 1px
        height 30px
        background-color rgba(255,255,255,.1)
  .right  
    flex 0 0 105px
    height 100%
    font-size 12px
    font-weight 700
    line-height 46px
    text-align center
    &.active
      background-color green
      color white
  .balls
    .ball
      position absolute
      left 32px
      bottom 23px
      width 16px
      height 16px
      border-radius 50%
      background-color red
      transition transform .3s linear
.list
  width 100%
  max-height 255px
  position fixed
  left 0
  bottom 46px
  z-index 2
  background-color #fff
  padding-bottom 5px
  .header
    one-px(rgba(7,17,27,.1))
    display flex
    justify-content space-between
    align-items center
    width 100%
    height 40px
    background-color #f3f5f7
    .cartText
      font-size 14px
      font-weight 200
      color rgb(7,17,27)
      margin-left 18px
    .clear
      font-size 12px
      font-weight 200
      color rgb(0,160,220)
      margin-right 18px
  .goodsList    
    width 100%
    height 200px
    overflow hidden
    .item
      display flex
      justify-content space-between
      align-items center
      height 48px
      background-color #fff
      padding 0 18px
      one-px(rgba(7,17,27,.1))
      &:after
        width 90%
        right 0
        margin auto
      .text
        font-size 14px
        color rgb(7,17,27)
      .price
        @extend .center
        font-size 14px
        color rgb(7,17,27)
        .priceText
          font-size 14px
          color rgb(220,20,20)
          margin-right 12px
.cartMask
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  margin auto
  z-index 1
  background-color rgba(7,17,27,.6)
  backdrop-filter blur(4px)                
</style>