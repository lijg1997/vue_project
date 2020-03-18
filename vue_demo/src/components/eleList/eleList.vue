<template>
    <div class="list">
        <ul>
            <li class="item" v-for="(item, index) in supports" :key="index">
                <EleIcon class="icon" :size="1" :type="item.type"></EleIcon>
                <span>{{item.content}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import EleIcon from '../eleIcon/eleIcon'
    export default {
        name: "eleList",
        props:{
            supports:Array
        },
        components:{EleIcon}
    }
</script>

<style scoped lang="stylus">
.list
    .item
        height 16px
        margin-bottom 12px
        font-size 12px
        font-weight 200
        .icon
            margin-right 6px

</style>