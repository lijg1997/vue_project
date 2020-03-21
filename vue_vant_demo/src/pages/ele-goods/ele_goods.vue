<template>
  <div class="goods">
    <div class="typeWrap" ref="typeWrap">
      <ul class="typeList" ref="typeList">
        <li class="typeItem" v-for="(item, index) in goods" @click="handleCToTypeItem(index)"
          :key="index" :class="{active:currentIndex===index}">
          <EleIcon class="icon" v-if="item.type>=0"
            :size="3" :type="item.type"></EleIcon>
          <span class="text" v-if="item.name">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foodsWrap" ref="foodsWrap">
      <ul class="foodsList" ref="foodList">
        <li class="foodsItem" v-for="(good, index) in goods" :key="index">
          <div class="title"><span class="text">{{good.name}}</span></div>
          <ul class="foodList">
            <li class="foodItem" v-for="(food, index) in good.foods" :key="index">
              <EleFood class="food" :food="food"></EleFood>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <EleCart :selectedFoods="selectedFoods" :sellers="sellers" @clear="clear"></EleCart>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {GETGOODS} from 'store/mutation_types'
import BScroll from 'better-scroll'
import EleIcon from 'components/ele-icon/ele_icon'
import EleFood from 'components/ele-food/ele_food'
import EleCart from 'components/ele-cart/ele_cart'
export default {
  data() {
    return {
      tops:[],
      scrollY:0
    };
  },
  computed: {
    ...mapState(['sellers', 'goods']),
    currentIndex(){
      let {tops, scrollY} = this
      let index = 0
      index = tops.findIndex((item, index) => scrollY >= item && scrollY < tops[index + 1])
      if(this.oldIndex !== index){
        let targetLi =  this.$refs.typeList && this.$refs.typeList.children[index]
        this.typeScroll && this.typeScroll.scrollToElement(targetLi, 300)
        this.oldIndex = index
      }
      return index
    },
    selectedFoods(){
      let selectedFoods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count > 0) selectedFoods.push(food)
        })
      })
      return selectedFoods
    }
  },
  methods: {
    ...mapActions([GETGOODS]),
    // 初始化滚动条
    _initScroll(){
      this.typeScroll = new BScroll(this.$refs.typeWrap, {click:true})
      this.foodsScroll = new BScroll(this.$refs.foodsWrap, {probeType:3, click:true})
      this.foodsScroll.on('scroll', ({x,y}) => {
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化top
    _initTops(){
      let top = 0
      let tops = [top]
      let foodsItem = this.$refs.foodList && this.$refs.foodList.children
      Array.from(foodsItem).forEach((item) => {
        top += item.offsetHeight
        tops.push(top)
      })
      this.tops = tops
    },
    // 点击左侧导航右侧滑动
    handleCToTypeItem(index){
        let top = this.tops[index]
        this.foodsScroll.scrollTo(0, -top, 500)
    },
    clear(){
      this.selectedFoods.forEach((selectedFood) => {
        selectedFood.count = 0
      })
    }
  },
  async mounted() {
    await this[GETGOODS]()
    this._initScroll()
    this._initTops()
    // 添加商品数量
    this.bus.$on('handleIncrement', (food) => {
      if(food.count) food.count++
      else this.$set(food, 'count', 1)
    })
    this.bus.$on('handleDecrement', (food) => {
      if(food.count) food.count--
    })
  },
  components:{EleIcon, EleFood, EleCart}
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
  .typeWrap
    flex 0 0 80px
    .typeList
      @extend .clearfix
      .typeItem
        one-px(rgba(7,17,27,.2))
        display flex
        align-items center
        justify-content center
        height 54px
        background-color #f3f5f7
        &.active
          background-color #fff
        &:after
          right 0
          margin auto
          width 56px
        .icon
          vertical-align top
        .text
          vertical-align top
  .foodsWrap
    flex 1 1 0%   
    .foodsList
      @extend .clearfix
      .foodsItem
        .title
          height 26px
          line-height 26px
          background-color #f3f5f7
          font-size 12px
          border-left 3px solid #d9dde1
          color rgb(147,153,159)
          .text
            margin-left 14px
        .foodList  
          .foodItem
            .food
              one-px(rgba(7,17,27,.2))  
            &:last-child
              .food
                last-none()
</style>
