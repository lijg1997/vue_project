<template>
<div class="goods">
  <div class="goodsWrap" ref="goodsWrap">
    <ul class="goodsList" ref="goodsList">
      <li class="goodsItem" v-for="(item, index) in goods" :key="index" 
        :class="{active:currentIndex === index}" @click="handleCToGoodsItem(index)">   
        <span class="text"><EleIcon class="icon" v-if="item.type>=0" :size="3" :type="item.type"></EleIcon>{{item.name}}</span>
      </li>
    </ul>
  </div>
  <div class="foodsWrap" ref="foodsWrap">
    <ul class="foodsList" ref="foodsList">
      <li class="foodsItem" v-for="(good, index) in goods" :key="index">
        <div class="foodsName">{{good.name}}</div>
        <ul class="foodList">
          <li class="foodItem" v-for="(food, index) in good.foods" :key="index">
            <EleFood :food="food"></EleFood>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <EleCart class="cart" :selectedFoodCount="selectedFoodCount" :seller="seller"></EleCart>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import EleIcon from 'components/eleIcon/eleIcon'
import EleFood from 'components/eleFood/eleFood'
import EleCart from 'components/eleCart/eleCart'
const OK = 0
export default {
  props:{
    seller:Object
  },
  data() {
    return {
      goods:[],
      tops:[],
      scrollY:0
    };
  },
  computed: {
    currentIndex(){
      let {tops, scrollY} = this
      let index = 0
      index = tops.findIndex((item, index) => scrollY >= item && scrollY < tops[index + 1])
      if(this.oldIndex !== index){
        this.oldIndex = index
        let goodsItem = this.$refs.goodsList.children[index]
        this.goodsScroll && this.goodsScroll.scrollToElement(goodsItem, 300)
      }
      return index
    },
    selectedFoodCount(){
      let selectedFoodCount = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count > 0) selectedFoodCount.push(food)
        })
      })
      return selectedFoodCount
    }
  },
  components:{
    EleIcon, 
    EleFood,
    EleCart
  },
  methods: {
    handleCToGoodsItem(index){
      let top = this.tops[index]
      this.foodsScroll.scrollTo(0, -top, 500)
    },
    initScroll(){
      this.goodsScroll = new BScroll(this.$refs.goodsWrap, {click: true})
      this.foodsScroll = new BScroll(this.$refs.foodsWrap, {probeType: 3, click: true})
      this.foodsScroll.on('scroll', ({x,y}) => {
        this.scrollY = Math.abs(y)
      })
    },
    initTop(){
      let top = 0
      let tops = [top]
      let foodsItem = this.$refs.foodsList.children
      Array.from(foodsItem).forEach((item) => {
        top += item.offsetHeight
        tops.push(top)
      })
      this.tops = tops
    }
  },
  async mounted() {
    const {errno, data:goods} = await this.axios.get('/api/goods')
    if(errno === OK) this.goods = goods
    // 当DOM再次更新的时候触发，确保能获取所有DOM数据
    this.$nextTick(() => {
      this.initScroll()
      this.initTop()
    })
    // 增加count
    this.bus.$on('handleIncrement', (food) => {
      if(food.count){
        food.count++
      }else{
        this.$set(food, 'count', 1)
      }
    })
    this.bus.$on('handleDecrement', (food) => {
      if(food.count){
        food.count--
      }
    })
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/extends.styl'
.goods
  position absolute
  top 174px
  left 0
  right 0
  bottom 46px
  display flex
  overflow hidden
  .goodsWrap
    flex 0 0 80px
    .goodsList
      @extend .clearfix
      .goodsItem
        display flex
        justify-content center
        align-items center
        height 54px
        padding 0 12px        
        color rgb(20,20,20)
        background-color #f3f5f7
        one-px(rgba(7,17,27,.3))
        &:after
          width 58px
          right 0
          margin auto
        &.active
          background-color rgb(255,255,255)  
        .text
          vertical-align top
          font-size 12px
          font-weight 200
          line-height 14px
          .icon
            vertical-align top
  .foodsWrap  
    flex 1 1 0%
    .foodsList
      @extend .clearfix
      .foodsItem
        .foodsName
          height 26px
          line-height 26px
          background-color #f3f5f7
          border-left 3px solid #d9dde1
          padding-left 14px
          font-size 12px
          color rgb(147,153,159)
        .foodList
          .foodItem
            .food
              one-px(rgb(147,153,159))
            &:last-child
              .food
                last-none()  
  .cart
    flex 0 0 0
    position fixed
    left 0
    bottom 0
    height 46px
    width 100%
    background #141d27
</style>