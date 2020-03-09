<template>
<div class="control">
  <transition name="removeCount">
    <i class="icon-remove_circle_outline remove" 
      @click="handleDecrement" v-show="food.count"></i>
  </transition>
  <transition name="removeCount">
    <span class="count remove" v-show="food.count">{{food.count}}</span>
  </transition>
  <i class="icon-add_circle" @click="handleIncrement"></i>
</div>
</template>

<script>
export default {
  props:{
    food:Object
  },
  methods: {
    handleIncrement(){
      this.bus.$emit('handleIncrement', this.food)
    },
    handleDecrement(){
      this.bus.$emit('handleDecrement', this.food)
    }
  },
};
</script>

<style scoped lang="stylus">
.control
  position absolute
  right 0
  bottom 18px
  i 
    display inline-block
    font-size 24px
    color rgb(0,160,220)
    line-height 24px
    vertical-align middle
    &.remove
      opacity 1
      transform translateX(0) rotate(-720deg)
  .count
    display inline-block
    width 24px  
    text-align center
    vertical-align margin 
    &.remove
      opacity 1
      transform translateX(0) rotate(-720deg)
</style>