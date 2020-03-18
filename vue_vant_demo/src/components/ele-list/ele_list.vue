<template>
<div class="list">
  <ul>
    <li v-for="(item, index) in supports" :key="index" :item="item">
      <EleIcon :size="2" :type="item.type" class="icon"></EleIcon>
      <span class="text">{{item.content}}</span>
    </li>
  </ul>
</div>
</template>

<script>
import EleIcon from '../ele-icon/ele_icon'
export default {
  props:{
    supports:Array
  },
  components:{EleIcon},
};
</script>

<style scoped lang="stylus">
.list
  padding 0 12px
  li
    margin-bottom 12px
    &:last-child
      margin-bottom 0
    .icon 
      margin-right 6px
      margin-left 12px
    .text
      font-size 12px
      line-height 14px
      font-weight 200
      color white  
</style>