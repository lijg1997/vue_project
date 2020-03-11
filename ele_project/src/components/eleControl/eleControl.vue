<template>
  <div class="controlWrap">
    <transition name="removeCount">
      <i class="icon-remove_circle_outline icon" 
        v-if="food.count" @click="handleSubCount"></i>
    </transition>
    <transition name="removeCount">
      <span class="text" v-if="food.count">{{food.count}}</span>
    </transition> 
    <i class="icon-add_circle add" @click="handleAddCount"></i>
  </div>
</template>

<script>
  export default {
    name: "eleControl",
    props:{
      food:Object
    },
    methods:{
      handleAddCount(event){
        this.bus.$emit('handleAddCount', this.food)
        this.bus.$emit('ballAnimition', event.target)
      },
      handleSubCount(){
        this.bus.$emit('handleSubCount', this.food)
      }
    }
  }
</script>

<style scoped lang="stylus">
@import '../../common/stylus/extends.styl'
.controlWrap
  @extend .center
  i
    display inline-block
    font-size 24px
    color rgb(0,160,220)
    &.icon
      opacity 1
      transform translateX(0) rotate(-360deg)
    &.add
      position relative
      z-index 1  
  .text
    display inline-block
    width 24px
    text-align center
    font-size 10px
    color: rgb(147,153,159)


</style>