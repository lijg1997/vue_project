<template>
<div class="cart">
  <div class="left">
    <div class="icon">
      <div class="car" :class="{active:selectedCount > 0}">
        <i class="icon-shopping_cart" ></i>
      </div>
      <span class="bubble" v-if="selectedCount > 0">{{selectedCount}}</span>
    </div>
    <div class="ratingCount" :class="{active:selectedMoney > 0}"><span>￥ {{selectedMoney}}</span></div>
    <div class="deliveryPrice"><span>另需配送费￥{{seller.deliveryPrice}}元</span></div>
  </div>
  <div class="right" v-if="redactText" :class="{active: this.selectedMoney >= this.seller.minPrice}"><span>{{redactText}}</span></div>
</div>
</template>

<script>
export default {
  props:{
    selectedFoodCount:Array,
    seller:Object
  },
  data() {
    return {

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
    }
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/extends.styl'
.cart
  color rgba(255,255,255,.5)
  display flex
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

</style>

// /* .clickCar
//       display inline-block
//       width 44px
//       height 44px
//       margin 0 18px 8px 18px
//       font-size 24px
//       line-height 46px
//       text-align center
//       color rgba(255,255,255,.5)
//       background-color rgba(0,0,0,.2)
//       border-radius 50%
//     .num
//       font-size 16px */