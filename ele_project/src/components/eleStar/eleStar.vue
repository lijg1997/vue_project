<template>
<div class="starWrap">
  <i class="star" v-for="(item, index) in scoreArr" :key="index" :class="[`star-${size}`, `${item}`]"></i>
</div>
</template>

<script>
const ON = 'on'
const HALF = 'half'
const OFF = 'off'
const LENGTH = 5
export default {
  props:{
    size:Number,
    score:Number
  },
  computed: {
    scoreArr() {
      let scoreArr = []
      let score = Math.floor(this.score * 2) / 2
      let hasHalf = (score % 1 === 0) ? false : true
      let onCount = Math.floor(this.score)
      for(let i = 0; i < onCount; i++){
        if(i > LENGTH) return
        scoreArr.push(ON)
      }
      hasHalf ? scoreArr.push(HALF) : ''
  
      while(scoreArr.length < LENGTH){
        scoreArr.push(OFF)
      }
      return scoreArr
    }
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/extends.styl'
@import '../../common/stylus/mixin.styl'
.starWrap
  @extend .center
  .star
    &.star-24
      width 10px
      height 10px
      margin-right 10px
      &:last-child
        margin-right 0
      &.on
        bg-image(star24_on)
      &.half
        bg-image(star24_half)
      &.off
        bg-image(star24_off)
    &.star-36
      width 15px
      height 15px
      margin-right 15px
      &:last-child
        margin-right 0
      &.on
        bg-image(star36_on)
      &.half
        bg-image(star36_half)
      &.off
        bg-image(star36_off)
    &.star-48
      width 20px
      height 20px
      margin-right 20px
      &:last-child
        margin-right 0
      &.on
        bg-image(star48_on)
      &.half
        bg-image(star48_half)
      &.off
        bg-image(star48_off)
</style>