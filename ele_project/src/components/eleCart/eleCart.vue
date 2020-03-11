<template>
<div>
  <div class="cartWrap">
    <div class="left">
      <div class="buyCar">
        <i class="icon-shopping_cart icon" :class="{active:selectedCount>0}" @click="show"></i>
        <i class="bubble" v-show="selectedCount>0">{{selectedCount}}</i>
        <transition v-for="(ball, index) in ballArr" :key="index"
          v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
          <i class="ball" v-show="ball.show"></i>
        </transition>
      </div>
      <span class="allPrice" :class="{active:selectedCount>0}">￥{{selectedPrice}}</span>
      <span class="deliveryPrice">另需配送费￥{{seller.deliveryPrice}}元</span>
    </div>
    <div class="right" :class="{active:selectedPrice>=seller.minPrice}">
      <span>{{rightText}}</span>
    </div>
  </div>
  <div class="list" v-show="listShow">
    <div class="listHeader">
      <span class="listText">购物车</span>
      <span class="clear" @click="clear">清空</span>
    </div>
    <div class="listWrap" ref="listWrap">
      <ul>
        <li class="listItem" v-for="(food, index) in selectedFoods" :key="index">
          <span class="foodText">{{food.name}}</span>
          <div class="foodControl">
            <span class="priceText">{{food.price * food.count}}</span>
            <EleControl :food="food"></EleControl>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <transition name="cartMask">
    <div class="maskWrap" v-show="listShow" @click="fold=true"></div>
  </transition>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import EleControl from '../eleControl/eleControl'
import {transform} from '../../util/transform'
export default {
  name: "eleCart",
  props:{
    seller:Object,
    selectedFoods:Array
  },
  data() {
    return {
      ballArr:[
        {show:false},
        {show:false},
        {show:false},
        {show:false},
        {show:false}
      ],
      finishBall:[],
      fold:true
    };
  },
  computed: {
    selectedPrice(){
      let selectedPrice = 0
      this.selectedFoods.forEach((food) => {
        selectedPrice += food.price * food.count
      })
      return selectedPrice
    },
    selectedCount(){
      let selectedCount = 0
      this.selectedFoods.forEach((food) => {
        selectedCount += food.count
      })
      return selectedCount
    },
    rightText(){
      if(this.selectedPrice === 0) return `￥${this.seller.minPrice}起送`
      else if(this.selectedPrice < this.seller.minPrice) return `还差￥${this.seller.minPrice - this.selectedPrice}起送`
      else return `去提交`
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
    ballAnimition(target){
      for(let i = 0; i < this.ballArr.length; i++){
        let ball = this.ballArr[i]
        if(!ball.show){
          ball.show = true
          ball.target = target
          this.finishBall.push(ball)
          return
        }
      }
    },
    beforeEnter(el){
      let count = this.ballArr.length
      while(count--){
        let ball = this.ballArr[count]
        if(ball.show){
          let viewH = document.documentElement.clientHeight
          let targetRect = ball.target.getBoundingClientRect()
          let X = targetRect.left - 28
          let Y = -(viewH - targetRect.top - 42)
          transform(el,'translateX',X)
          transform(el,'translateY',Y)
          break
        }
      }
    },
    enter(el){
      let hook = el.offsetHeight
      this.$nextTick(() => {
        transform(el,'translateX',0)
        transform(el,'translateY',0)
      })
    },
    afterEnter(el){
      /* for(let i = 0; i < this.finishBall.length; i++){
        let ball = this.finishBall[i]
        if(ball.show){
          el.style.display = 'none'
          ball.show = false
        }
      } */
      let ball = this.finishBall.shift()
      if(ball.show){
        el.style.display = 'none'
        ball.show = false
      }
    },
    clear(){
      this.$emit('clear')
    },
    show(){
      if(this.selectedCount <= 0) return
      this.fold = !this.fold
    }
  },
  mounted() {
    this.bus.$on('ballAnimition', (target) => {
      this.ballAnimition(target)
    })
    this.$nextTick(() => {
      new BScroll(this.$refs.listWrap, {click:true})
    })
  },
  components:{EleControl}
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/extends.styl'
@import '../../common/stylus/mixin.styl'
.cartWrap
  position fixed
  left 0
  bottom 0
  width 100%
  height 46px
  color rgba(255,255,255,.4)
  z-index 3
  display flex
  background-color #141d27
  .left
    flex 1
    height 100%
    display flex
    align-items center
    .buyCar
      margin -12px 12px 0
      width 56px
      height 56px
      border-radius 50%
      background-color #141d27
      position relative
      @extend .center
      .icon
        display inline-block
        width 44px
        height 44px
        line-height 44px
        text-align center
        border-radius 50%
        font-size 24px
        background-color rgba(255,255,255,.2)  
        &.active
          background-color rgb(0,160,240)
          color rgb(255,255,255)
      .bubble
        position absolute    
        right 0
        top 0
        width 24px
        height 12px
        border-radius 6px
        background-color rgb(240,20,20)
        // box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
        line-height 12px
        text-align center
        font-size 9px
        color rgb(255,255,255)
      .ball  
        position absolute
        left 20px
        top 18px
        width 16px
        height 16px
        border-radius 50%
        background-color deeppink
        transition .3s transform linear
    .allPrice
      font-size 16px
      font-weight 700
      margin-right 12px
      &.active
        color rgb(255,255,255)
    .deliveryPrice
      font-size 12px
      font-weight 700
      padding-left 12px
      position relative
      &:after
        content ""
        display inline-block
        position absolute
        left 0
        top -8px
        width 1px 
        height 30px
        background-color rgba(255,255,255,.1) 
  .right
    @extend .center
    flex 0 0 105px
    background-color rgba(255,255,255,.1)
    font-size 15px
    font-weight 700px
    &.active
      background-color green
      color rgb(255,255,255)
.list
  position fixed
  left 0
  bottom 46px
  width 100%
  max-height 255px
  background-color rgb(255,255,255)
  padding-bottom 20px
  z-index 2
  .listHeader
    width 100%
    height 40px
    box-sizing border-box
    background-color #f3f5f7
    one-px(rgba(7,17,27,.3))
    padding 0 18px
    display flex
    justify-content space-between
    align-items center
    .listText
      font-size 14px
      font-weight 200
      color rgb(7,17,27)
    .clear
      font-size 12px
      font-weight 200
      color rgb(0,160,220)
  .listWrap
    max-height 195px
    overflow hidden 
    .listItem
      one-px(rgba(7,17,27,.1))
      width 100%
      height 48px
      padding 0 18px
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      background-color rgb(255,255,255)
      &:after
        width 90%
        right 0
        margin auto
      .foodText
        font-size 14px
        color rgb(7,17,27)
.maskWrap
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