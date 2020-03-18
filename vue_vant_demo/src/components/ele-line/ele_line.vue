<template>
<div class="lineWrap">
  <div class="line"></div>
  <slot class="text"></slot>
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
  align-items center
  font-size 15px
  font-weight 700
  color rgba(255,255,255,1)
  .line
    height 1px
    background-color rgba(255,255,255,.3)
    flex 1
  .text
    margin 0 12px

</style>