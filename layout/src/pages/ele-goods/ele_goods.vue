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
import BScroll from 'better-scroll'
import EleIcon from 'components/ele-icon/ele_icon'
import EleFood from 'components/ele-food/ele_food'
import EleCart from 'components/ele-cart/ele_cart'
const OK = 0
export default {
  props:{
    sellers:Object
  },
  data() {
    return {
      goods:[],
      tops:[],
      scrollY:0
    };
  },
  methods: {
    // 初始化滚动条
    initScroll(){
      this.typeScroll = new BScroll(this.$refs.typeWrap, {click:true})
      this.foodsScroll = new BScroll(this.$refs.foodsWrap, {probeType:3, click:true})
      this.foodsScroll.on('scroll', ({x,y}) => {
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化top
    initTops(){
      let top = 0
      let tops = [top]
      let foodsItem = this.$refs.foodList.children
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
  components:{EleIcon, EleFood, EleCart},
  async mounted() {
    const {errno, data:goods} = await this.axios.get('/api/goods')
    if(errno === OK) this.goods = goods
    // 下一次DOM更新时触发的回调，确保所有的DOM节点都可以获取到
    this.$nextTick(() => {
      this.initScroll()
      this.initTops()
    })
    // 添加商品数量
    this.bus.$on('handleIncrement', (food) => {
      if(food.count) food.count++
      else this.$set(food, 'count', 1)
    })
    this.bus.$on('handleDecrement', (food) => {
      if(food.count) food.count--
    })
  },
  computed: {
    currentIndex(){
      let {tops, scrollY} = this
      let index = 0
      index = tops.findIndex((item, index) => scrollY >= item && scrollY < tops[index + 1])
      if(this.oldIndex !== index){
        let targetLi =  this.$refs.typeList.children[index]
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
