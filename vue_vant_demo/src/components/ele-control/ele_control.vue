<template>
<div class="control">
  <transition name="removeCount">
    <i class="shop-remove_circle_outline" v-if="food.count" @click="handleDecrement"></i>
  </transition>
  <transition name="removeCount">
    <span class="count" v-if="food.count">{{food.count}}</span>
  </transition>
  <i class="shop-add_circle active" @click="handleIncrement"></i>
</div>
</template>

<script>
export default {
  props:{
    food:Object
  },
  methods: {
    handleIncrement(event){
      this.bus.$emit('handleIncrement', this.food)
      this.bus.$emit('ballsAnimition', event.target)
    },
    handleDecrement(){
      this.bus.$emit('handleDecrement', this.food)
    }
  },
};
</script>

<style scoped lang="stylus">
.control
  i 
    vertical-align middle
    display inline-block
    color rgb(0,160,220)
    font-size 24px
    line-height 24px
    &.active
      opacity 1
      transform translateX(0) rotate(-720deg)
  .count
    vertical-align middle
    display inline-block
    width 24px
    font-size 10px
    line-height 24px  
    text-align center
    opacity 1
    transform translateX(0) rotate(-720deg)
</style>