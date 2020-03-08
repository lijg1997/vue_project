<template>
  <div class="goods">
    <div class="typeWrap" ref="typeWrap">
      <ul class="typeList">
        <li class="typeItem" v-for="(item, index) in goods" @click="handleClick(index)"
          :key="index" :class="{active:currentIndex===index}">
          <EleIcon class="icon" v-if="item.type>=0"
            :size="3" :type="item.type"></EleIcon>
          <span class="text" v-if="item.name">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foodsWrap" ref="foodsWrap">
      <ul class="foodsList">
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
  </div>
</template>

<script>
import EleIcon from 'components/ele-icon/ele_icon'
import EleFood from 'components/ele-food/ele_food'
import BScroll from 'better-scroll'

const OK = 0
export default {
  data() {
    return {
      goods:[]
    };
  },
  methods: {
    handleClick(index){
      console.log(1111)
      this.currentIndex = index
      console.log(index)
    }
  },
  components:{EleIcon, EleFood},
  async mounted() {
    const {errno, data:goods} = await this.axios.get('/api/goods')
    if(errno === OK) this.goods = goods
    new BScroll(this.$refs.typeWrap)
    new BScroll(this.$refs.foodsWrap)
  },
  computed: {
    currentIndex:{
      get(){
        
        return 3
      },
      set(val){
        console.log(val)
      }    
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
