<template>
    <div id="app">

        <section class="content">
            <TakeOut></TakeOut>
            <Search></Search>
            <Order></Order>
            <UserInfo></UserInfo>
        </section>
        <Login></Login>
        <EleFooter></EleFooter>
    </div>
</template>

<script>
    import TakeOut from './components/takeOut/takeOut'
    import Search from './components/search/search'
    import Order from './components/order/order'
    import UserInfo from './components/userInfo/userInfo'
    import EleFooter from './components/eleFooter/eleFooter'
    import Login from './components/login/login'
    export default {
        name: 'App',
        data(){
            return{

            }
        },
        components:{
            TakeOut,
            Search,
            Order,
            UserInfo,
            EleFooter,
            Login
        }
    }
</script>

<style scoped>

</style>
