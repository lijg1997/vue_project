import Msite from 'pages/msite/msite'
import Search from 'pages/search/search'
import Order from 'pages/order/order'
import Profile from 'pages/profile/profile'
import Login from 'pages/login/login'
import UserDetail from 'pages/userDetail/userDetail'
import MainApp from 'pages/mainApp/mainApp'
import EleGoods from 'pages/ele-goods/ele_goods.vue';
import EleRatings from 'pages/ele-ratings/ele_ratings.vue';
import EleSellers from 'pages/ele-sellers/ele_sellers.vue';
export default [
    {path:'/msite', component:Msite, meta:{showFooter:true},},
    {path:'/search', component:Search, meta:{showFooter:true}},
    {path:'/order', component:Order, meta:{showFooter:true}},
    {path:'/profile', component:Profile, meta:{showFooter:true}},
    {path:'/login', component:Login, meta:{showFooter:false}},
    {path:'/user_detail', component:UserDetail, meta:{showFooter:false}},
    {
        path:'/mainApp',
        component:MainApp,
        meta:{showFooter:false},
        children:[
            {path:'goods', component:EleGoods},
            {path:'ratings', component:EleRatings},
            {path:'sellers', component:EleSellers},
            {path:'/', redirect:'goods'}
        ]
    },
    {path:'/', redirect:'/profile'}
]

