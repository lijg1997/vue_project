<template>
<div class="foodWrap">
  <div class="foodImg">
    <img :src="food.image" alt="img">
  </div>
  <div class="foodInfo">
    <span class="name">{{food.name}}</span>
    <span class="description" v-if="food.description">{{food.description}}</span>
    <span class="ratings">
      <span class="sellCount">月售{{food.sellCount}}份</span>
      <span class="rating">好评率{{food.rating}}%</span>
    </span>
    <span class="prices">
      <span class="price">{{food.price}}</span>
      <span class="oldPrice" v-if="food.oldPrice">{{food.oldPrice}}</span>
    </span>
  </div>
  <EleControl class="control" :food="food"></EleControl>
</div>
</template>

<script>
import EleControl from '../eleControl/eleControl'
export default {
  props:{
    food:Object
  },
  data() {
    return {

    };
  },
  components:{EleControl}
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'
.foodWrap
  one-px(rgba(7,17,27,.3))
  padding 18px
  display flex
  overflow hidden
  &:after
    width 90%
    right 0
    margin auto
  .foodImg
    width 60px
    height 60px
    margin-right 10px
    img 
      width 100%
      height 100%
  .foodInfo
    display flex
    flex-direction column
    font-size 10px
    color rgb(147,153,159)
    .name
      margin 2px 0 8px
      font-size 14px
      line-height 14px
      color rgb(7,17,27)
    .ratings
      margin 8px 0 8px
      .sellCount
        margin-right 12px
    .prices
      .price
        font-size 14px
        font-weight 700
        color red
      .oldPrice
        text-decoration line-through
  .control  
    position absolute
    right 10px
    bottom 15px    
</style>