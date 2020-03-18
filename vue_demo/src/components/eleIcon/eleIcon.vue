<template>
    <i class="icon" :class="[`icon_${size}`, `${typeArr[type]}`]"></i>
</template>

<script>
    export default {
        name: "eleIcon",
        props:{
            size:Number,
            type:Number
        },
        data(){
            return {
                typeArr:['decrease', 'discount', 'guarantee', 'invoice', 'special']
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import '../../common/stylus/mixin.styl'
    .icon
        display inline-block
        &.icon_1
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
        &.icon_2
            width 18px
            height 18px
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
        &.icon_3
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
        &.icon_4
            width 18px
            height 18px
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