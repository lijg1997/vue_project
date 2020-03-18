<template>
    <div class="goods">
        <div class="goodsWrap" ref="goodsWrap">
            <ul class="goodsList">
                <li class="goodsItem"
                    v-for="(good, index) in goods" :key="index"
                    :class="{active:currentIndex === index}"
                    @click="handleClick(index)">
                    <span class="name">
                        <EleIcon class="icon" v-if="good.type" :size="3" :type="good.type"></EleIcon> {{good.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foodsWrap" ref="foodsWrap"></div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import EleIcon from 'components/eleIcon/eleIcon'
    const OK = 0;
    export default {
        name: "eleGoods",
        data(){
            return {
                goods:[],
                currentIndex:4
            }
        },
        methods:{
            _initScroll(){
                this.goodsScroll = new BScroll(this.$refs.goodsWrap, {click:true})
            },
            handleClick(index){
                this.currentIndex = index
            }
        },
        computed:{

        },
        async mounted() {
            const {errno, data:goods} = await this.axios.get('/api/goods');
            if(errno === OK) this.goods = goods;
            this.$nextTick(()=>{
                this._initScroll()
            })
        },
        components:{EleIcon}
    }
</script>

<style scoped lang="stylus">
    @import '../../common/stylus/mixin.styl'
    @import '../../common/stylus/extends.styl'
    .goods
        position fixed
        left 0
        top 174px
        right 0
        bottom 46px
        margin auto
        display flex
        overflow hidden
        .goodsWrap
            flex 0 0 80px
            .goodsList
                .goodsItem
                    height 54px
                    box-sizing border-box
                    padding-left 12px
                    padding-right 12px
                    background-color #f3f5f7
                    @extend .center
                    one-px(rgba(7,17,27,.1))
                    &:after
                        width 56px
                        right 0
                        margin auto
                    &.active
                        background-color rgb(255,255,255)
                    .name
                        font-size 12px
                        font-weight 200
                        color rgb(7,17,27)
        .foodsWrap
            flex 1 1 0%
            background-color pink


</style>