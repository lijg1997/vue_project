<template>
  <div id="app">
    <EleHeader></EleHeader>
    <div class="navs">
      <div class="item">
        <router-link :to="`/shop/${id}/goods`">商品</router-link>
      </div>
      <div class="item">
        <router-link :to="`/shop/${id}/ratings`">评价</router-link>
      </div>
      <div class="item">
        <router-link :to="`/shop/${id}/seller`">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {GETSELLER} from 'store/mutation_types'
import EleHeader from 'components/eleHader/eleHeader'
const OK = 0;
export default {
  name: 'eleShop',
  props:{
      id:String
  },
  computed:{
    ...mapState(['seller'])
  },
  methods:{
    ...mapActions([GETSELLER])
  },
  async mounted() {
    console.log(this.id)
    this[GETSELLER](this.id)
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log(this.id)
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log(to.params.id)
    next()
  },
  components: {
    EleHeader,
  },
}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
#app
  position relative
  width 100%
  height 100%
  .navs
    one-px(rgba(7,17,27,.2))
    display flex
    height 40px
    line-height 40px
    .item
      flex 1
      text-align center
      a
        display inline-block
        width 100%
        height 100%
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
