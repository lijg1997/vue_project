<template>
    <div class="headerTop">
        <slot name="search"></slot>
        <a class="header_title">
            <span class="header_title_text">{{title}}</span>
        </a>
        <slot name="login"></slot>
    </div>
</template>

<script>
    export default {
        name: "headerTop",
        props:{
            title:String
        }
    }
</script>

<style scoped lang="stylus">
    .headerTop
        .header_title
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 50%
            color #fff
            text-align center
            .header_title_text
                font-size 20px
                color #fff
                display block
</style>