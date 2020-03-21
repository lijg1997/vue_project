<template>
  <i class="icon" :class="[`shop-${size}`, `${listArr[type]}`]"></i>
</template>

<script>
export default {
  props:['size', 'type'],
  data() {
    return {
      listArr:['decrease','discount','guarantee','invoice','special']
    };
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl'
.icon
  vertical-align top
  background-size 100%
  background-repeat no-repeat
  display inline-block
  margin-right 4px
  &.shop-1
    width 12px
    height 12px
    &.decrease
      bg-image(decrease_1)
    &.discount
      bg-image(discount_1)
    &.guarantee
      bg-image(guarantee_1)
    &.invoice
      bg-image(invoice_1)
    &.special
      bg-image(special_1)
  &.shop-2
    width 16px
    height 16px
    &.decrease
      bg-image(decrease_2)
    &.discount
      bg-image(discount_2)
    &.guarantee
      bg-image(guarantee_2)
    &.invoice
      bg-image(invoice_2)
    &.special
      bg-image(special_2)
  &.shop-3
    width 12px
    height 12px
    &.decrease
      bg-image(decrease_3)
    &.discount
      bg-image(discount_3)
    &.guarantee
      bg-image(guarantee_3)
    &.invoice
      bg-image(invoice_3)
    &.special
      bg-image(special_3)
  &.shop-4
    width 16px
    height 16px
    &.decrease
      bg-image(decrease_4)
    &.discount
      bg-image(discount_4)
    &.guarantee
      bg-image(guarantee_4)
    &.invoice
      bg-image(invoice_4)
    &.special
      bg-image(special_4)
</style>