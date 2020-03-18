<template>
    <div id="app">
        <router-view></router-view>
        <FooterGuide></FooterGuide>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {AUTOLOGIN} from './store/mutation_types'
    import FooterGuide from './components/footerGuide/footerGuide'
    export default {
        name: 'App',
        methods:{
            ...mapActions([AUTOLOGIN])
        },
        components:{
            FooterGuide
        },
        created(){
            this[AUTOLOGIN]()
        }
    }
</script>

<style scoped lang="stylus">
    #app
        width 100%
        height 100%
        overflow hidden
</style>
