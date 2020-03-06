<template>
<div class="stars">
  <i class="on"></i>
  <i class="on"></i>
  <i class="on"></i>
  <i class="half"></i>
  <i class="off"></i>
</div>
</template>

<script>
export default {
  props:['score'],
  mounted() {
    console.log(this.score)
  },
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.stars
  width 100%
  text-align center
  i 
    display inline-block
    width 24px
    height 24px
    background-repeat no-repeat
    margin-right 18px
    &:last-child
      margin-right 0
    &.half
      bg-image(star24_half)  
    &.off
      bg-image(star24_off)  
    &.on
      bg-image(star24_on)  

</style>