<template>
<div class="food">
  <div class="foodImg">
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
  <EleControl class="controls" :food="food"></EleControl>
</div>
</template>

<script>
import EleControl from '../eleControl/eleControl'
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
  .foodImg
    flex 0 0 60px
    height 60px
    margin-right 10px
    img 
      width 100%
      height 100%
  .info
    flex 1
    font-size 12px
    color rgb(147,153,159)
    display flex
    flex-direction column
    .name
      line-height 14px
      color rgb(7,17,27)
      margin 1px 0 8px
    .ratings  
      margin 8px 0
      .sellCount
        margin-right 12px
    .prices
      .price
        line-height 24px
        font-size 14px
        color red
        font-weight 700
        margin-right 8px
      .oldPrice
        text-decoration line-through
  .controls
    flex 0 0 0

</style>