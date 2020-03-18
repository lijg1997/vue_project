import Msite from 'pages/msite/msite'
import Order from 'pages/order/order'
import Profile from 'pages/profile/profile'
import Search from 'pages/search/search'
import Login from 'pages/login/login'
import UserDetail from 'pages/userDetail/userDetail'
export default [
    {path:'/msite', component:Msite, meta:{showFooter:true}},
    {path:'/order', component:Order, meta:{showFooter:true}},
    {path:'/profile', component:Profile, meta:{showFooter:true}},
    {path:'/search', component:Search, meta:{showFooter:true}},
    {path:'/login', component:Login, meta:{showFooter:false}},
    {path:'/user_detail', component:UserDetail, meta:{showFooter:false}},
    {path:'/', redirect:'/profile'},
]