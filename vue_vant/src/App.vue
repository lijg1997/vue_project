<template>
    <div id="app">
        <router-view></router-view>
        <FooterGuide></FooterGuide>
    </div>
</template>

<script>
    import FooterGuide from 'components/footerGuide/footerGuide'
    export default {
        name: "App",
        components:{
            FooterGuide
        }
    }
</script>

<style scoped lang="stylus">
    #app
        width 100%
        height 100%
</style>