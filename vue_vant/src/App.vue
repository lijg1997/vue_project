<template>
    <div id="app">
        <router-view></router-view>
        <FooterGuide></FooterGuide>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {AUTOLOGOUT} from 'store/mutation_types'
    import FooterGuide from 'components/footerGuide/footerGuide'
    export default {
        name: "App",
        methods:{
            ...mapActions([AUTOLOGOUT])
        },
        async mounted(){
            await this[AUTOLOGOUT]()
        },
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