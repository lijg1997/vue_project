<template>
<div class="lineWrap">
  <div class="line"></div>
  <slot>
    <span>xxx</span>
  </slot>
  <div class="line"></div>
</div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style scoped lang="stylus">
.lineWrap
  width 100%
  height 30px
  display flex
  font-size 14px
  font-weight 700
  color rgb(255,255,255)
  align-items center
  .line
    flex 1
    height 1px
    background-color rgba(255,255,255,.3)
  span
    margin 0 12px  
</style>