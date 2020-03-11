<template>
<div class="goods">
  <div class="goodsWrap" ref="goodsWrap">
    <ul class="goodsList" ref="goodsList">
      <li class="goodsItem" v-for="(good, index) in goods" :key="index" 
        @click="handleActive(index)" :class="{active:currentIndex === index}">
        <span class="text">
          <EleIcon v-if="good.type>=0" :size="3" :type="good.type"></EleIcon>{{good.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foodsWrap" ref="foodsWrap">
    <ul class="foodsList" ref="foodsList">
      <li class="foodsItem" v-for="(good, index) in goods" :key="index">
        <h2 class="foodsTitle">{{good.name}}</h2>
        <ul class="foodList">
          <li class="foodItem" v-for="(food, index) in good.foods" :key="index">
            <eleFood :food="food"></eleFood>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <EleCart :seller="seller" :selectedFoods="selectedFoods"
    @clear="clear">
  </EleCart>
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
  methods: {
    handleActive(index){
      let top = -(this.tops[index])
      this.foodsScroll.scrollTo(0, top, 300)
    },
    _initScroll(){
      this.goodsScroll = new BScroll(this.$refs.goodsWrap, {probeType: 3, click:true})
      this.foodsScroll = new BScroll(this.$refs.foodsWrap, {probeType: 3, click:true})
      
      this.foodsScroll.on('scroll', ({x, y}) => {
        this.scrollY = Math.abs(y)
      }) 
    },
    _initTop(){
      let top = 0
      let tops = []
      tops.push(top)
      let foodsLi = this.$refs.foodsList.children
      Array.from(foodsLi).forEach((LiItem) => {
        top += LiItem.offsetHeight
        tops.push(top)
      })
      this.tops = tops
    },
    clear(){
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          food.count = 0
        })
      })
    }
  },
  computed: {
    currentIndex(){
      let {tops, scrollY} = this
      let index = tops.findIndex((top,index) => {
        return scrollY >= top && scrollY < tops[index + 1]
      })
      if(this.oldIndex !== index){
        this.oldIndex = index
        let currentLi = this.$refs.goodsList.children[index]
        this.goodsScroll && this.goodsScroll.scrollToElement(currentLi, 300)
      }
      return index
    },
    selectedFoods(){
      let selectedFoods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count > 0){
            selectedFoods.push(food)
          }
        })
      })
      return selectedFoods
    }
  },
  async mounted() {
    const {errno, data:goods} = await this.axios.get('/api/goods')
    if(errno === OK) this.goods = goods

    this.$nextTick(() => {
      this._initScroll()
      this._initTop()
    })

    this.bus.$on('handleAddCount', (food) => {
      if(food.count){
        food.count++
      }else{
        this.$set(food, 'count', 1)
      }
    })
    this.bus.$on('handleSubCount', (food) => {
      if(food.count) food.count--
    })
  },
  components:{
    EleIcon,
    EleFood,
    EleCart
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/extends.styl'
.goods
  position absolute
  left 0
  right 0
  top 174px
  bottom 46px
  display flex
  font-size 0
  .goodsWrap
    flex 0 0 80px
    overflow hidden
    .goodsList
      @extend .clearfix
      .goodsItem
        one-px(rgba(7,17,27,.1))
        @extend .center
        width 80px
        height 54px
        background-color #f3f5f7
        &.active
          background-color rgb(255,255,255)
        &:after
          width 56px
          right 0
          margin auto  
        .text
          margin 0 12px
          font-size 12px
          font-weight 700px
          line-height 14px
          color rgb(7,17,27)
  .foodsWrap
    flex 1 1 0%
    overflow hidden
    .foodsList
      .foodsItem
        .foodsTitle
          width 100%
          height 26px
          line-height 26px
          font-size 12px
          color rgb(147,153,159)
          background-color #f3f5f7
          border-left 3px solid #d9dde1
          padding-left 14px

</style>