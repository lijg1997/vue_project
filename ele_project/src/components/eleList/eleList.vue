<template>
<div class="listWrap">
  <ul>
    <li class="item" v-for="(support, index) in supports" :key="index">
      <EleIcon class="icon" :size="1" :type="support.type"></EleIcon>
      <span class="text">{{support.content}}</span>
    </li>
  </ul>
</div>
</template>

<script>
import EleIcon from '../eleIcon/eleIcon'
export default {
  props:{
    supports:Array
  },
  components:{EleIcon}
};
</script>

<style scoped lang="stylus">
.listWrap
  width 100%
  .item
    width 100%
    height 16px
    display flex
    align-items center
    .icon
      margin-right 6px
    .text
      font-size 12px
      font-weight 200
      color rgb(255,255,255)  

</style>