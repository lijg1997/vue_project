<template>
  <div id="app">
    <EleHeader :seller="seller"></EleHeader>
    <div class="navs">
      <div class="item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import EleHeader from 'components/eleHader/eleHeader'
const OK = 0
export default {
  name: 'App',
  data(){
    return {
      seller: {}
    }
  },
  components: {
    EleHeader,
  },
  async mounted() {
    const {errno, data:seller} = await this.axios.get('/api/seller')
    if(errno === OK) this.seller = seller
  },
}
</script>

<style scoped lang="stylus">
@import "./common/stylus/mixin.styl"
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
