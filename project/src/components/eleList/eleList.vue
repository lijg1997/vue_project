<template>
  <ul class="list">
    <li class="item" v-for="(item, index) in supports" :key="index">
      <EleIcon class="icon" :size="1" :type="item.type"></EleIcon>
      <span>{{item.content}}</span>
    </li>
  </ul>
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
.list
  .item
    height 16px
    margin-bottom 12px
    padding 0 12px
    font-size 12px
    font-weight 200
    color rgb(255,255,255)
    line-height 16px
    &:last-child
      margin-bottom 0
    .icon
      margin-right 6px
      margin-top 2px
</style>