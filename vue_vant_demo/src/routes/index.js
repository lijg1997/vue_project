// import Msite from 'pages/msite/msite'
// import Search from 'pages/search/search'
// import Order from 'pages/order/order'
// import Profile from 'pages/profile/profile'
// import Login from 'pages/login/login'
// import UserDetail from 'pages/userDetail/userDetail'
// import MainApp from 'pages/mainApp/mainApp'
// import EleGoods from 'pages/ele-goods/ele_goods'
// import EleRatings from 'pages/ele-ratings/ele_ratings'
// import EleSellers from 'pages/ele-sellers/ele_sellers'
import $store from 'store'


const Msite =  () => import(/* webpackChunkName: 'Msite' */ 'pages/msite/msite');
const Search = () => import(/* webpackChunkName: 'Search' */ 'pages/search/search');
const Order = () => import(/* webpackChunkName: 'Order' */ 'pages/order/order');
const Profile = () => import(/* webpackChunkName: 'Profile' */ 'pages/profile/profile');
const Login = () => import(/* webpackChunkName: 'Login' */ 'pages/login/login');
const UserDetail = () => import(/* webpackChunkName: 'UserDetail' */ 'pages/userDetail/userDetail');
const MainApp = () => import(/* webpackChunkName: 'MainApp' */ 'pages/mainApp/mainApp');
const EleGoods = () => import(/* webpackChunkName: 'EleGoods' */ 'pages/ele-goods/ele_goods');
const EleRatings = () => import(/* webpackChunkName: 'EleRatings' */ 'pages/ele-ratings/ele_ratings');
const EleSellers = () => import(/* webpackChunkName: 'EleSellers' */ 'pages/ele-sellers/ele_sellers');


export default [
    {path:'/msite', component:Msite, meta:{showFooter:true},},
    {path:'/search', component:Search, meta:{showFooter:true}},
    {path:'/order', component:Order, meta:{showFooter:true}},
    {path:'/profile', component:Profile, meta:{showFooter:true}},
    {
        path:'/login',
        component:Login,
        meta:{showFooter:false},
        beforeEnter: (to, from, next)=>{
            if($store.state.user._id)next('/msite');
            else next()
        }
    },
    {path:'/user_detail', component:UserDetail, meta:{showFooter:false}},
    {
        path:'/main_app/:id',
        component:MainApp,
        meta:{showFooter:false},
        props:true,
        children:[
            {path:'goods', component:EleGoods},
            {path:'ratings', component:EleRatings},
            {path:'sellers', component:EleSellers},
            {path:'/', redirect:'goods'}
        ]
    },
    {path:'/', redirect:'/profile'}
]

