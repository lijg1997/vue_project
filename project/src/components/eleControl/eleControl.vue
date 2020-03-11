<template>
<div class="control">
  <transition name="removeCount">
    <i class="icon-remove_circle_outline remove" 
      @click="handleDecrement" v-show="food.count"></i>
  </transition>
  <transition name="removeCount">
    <span class="count remove" v-show="food.count">{{food.count}}</span>
  </transition>
  <i class="icon-add_circle add" @click="handleIncrement"></i>
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
      this.bus.$emit('ballsAnimation', event.target)
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
  .add
    position relative
    z-index 1    
</style>