<template>
  <div id="app">
    <EleHeader :seller="seller"></EleHeader>
    <div class="navs">
      <div>
        <router-link to="/goods">商品</router-link>
      </div>
      <div>
        <router-link to="/ratings">评价</router-link>
      </div>
      <div>
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import EleHeader from 'components/eleHeader/eleHeader'
const OK = 0
export default {
  name: 'App',
  components: {
    EleHeader
  },
  data(){
    return {
      seller:{}
    }
  },
  async mounted() {
    const {errno, data:seller} = await this.axios.get('/api/seller')
    if(errno === OK) this.seller = seller
  },
}
</script>

<style scoped lang="stylus">
@import './common/stylus/mixin.styl'
#app
  width 100%
  height 100%
  position relative
  .navs
    width 100%
    height 40px
    display flex
    justify-content space-around
    align-items center
    color rgb(77,85,93)
    line-height 14px
    font-size 14px
    box-sizing border-box
    one-px(rgba(7,17,27,.1))   
    .active
      color rgb(240, 20, 20)
</style>
