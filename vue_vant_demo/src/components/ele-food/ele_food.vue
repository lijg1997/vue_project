<template>
<div class="food">
  <div class="picture">
    <img :src="food.image" alt="img">
  </div>
  <div class="info">
    <span class="name">{{food.name}}</span>
    <span v-if="food.description" class="description">{{food.description}}</span>
    <span class="ratings">
      <span class="sellCount">月售{{food.sellCount}}份</span>
      <span class="rating">好评率{{food.rating}}%</span>
    </span>
    <span class="prices">
      <span class="price">{{food.price}}</span>
      <span class="oldPrice">{{food.oldPrice}}</span>
    </span>
  </div>
  <EleControl class="control" :food="food"></EleControl>
</div>
</template>

<script>
import EleControl from '../ele-control/ele_control'
export default {
  props:{
    food:Object
  },
  components:{EleControl}
};
</script>

<style scoped lang="stylus">
.food
  padding 18px
  display flex
  .picture
    flex 0 0 60px
    height 60px
    margin-right 10px
    img 
      width 100%
      height 100%
  .info
    display flex
    flex-direction column
    font-size 10px
    color rgb(147,153,159)
    .name
      margin 2px 0 8px
      line-height 14px
      font-size 14px
      color rgb(7,17,27)
    .description 
      line-height 14px
    .ratings 
      margin 8px 0
      .sellCount
        margin-right 12px
    .prices  
      font-weight 700
      line-height 24px
      .price
        font-size 14px
        color red
        margin-right 8px  
      .oldPrice
        text-decoration line-through
  .control
    flex 0 0 0
    position absolute
    right 5px
    bottom 18px

</style>