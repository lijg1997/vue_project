<template>
    <!--首页外卖-->
    <div class="on">
        <section class="msite">
            <EleHeader></EleHeader>
            <EleNav></EleNav>
            <ShopList></ShopList>
        </section>
    </div>
</template>

<script>
    import EleHeader from '../eleHeader/eleHeader'
    import EleNav from '../eleNav/eleNav'
    import ShopList from '../shopList/shopList'
    export default {
        name: "takeOut",
        components:{
            EleHeader,
            EleNav,
            ShopList,
        }
    }
</script>

<style scoped>

</style>