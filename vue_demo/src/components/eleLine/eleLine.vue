<template>
    <div class="lines">
        <i class="line"></i>
        <slot></slot>
        <i class="line"></i>
    </div>
</template>

<script>
    export default {
        name: "eleLine"
    }
</script>

<style scoped lang="stylus">
    .lines
        width 100%
        height 30px
        display flex
        align-items center
        .line
            flex 1
            height 1px
            background-color rgba(255,255,255,.2)
</style>