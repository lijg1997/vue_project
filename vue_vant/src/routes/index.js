import Msite from 'pages/msite/msite'
import Search from 'pages/search/search'
import Order from 'pages/order/order'
import Profile from 'pages/profile/profile'
import Login from 'pages/mock/mock'
export default [
    {path:'/msite', component:Msite, meta:{showFooter:true}},
    {path:'/search', component:Search, meta:{showFooter:true}},
    {path:'/order', component:Order, meta:{showFooter:true}},
    {path:'/profile', component:Profile, meta:{showFooter:true}},
    {path:'/mock', component:Login, meta:{showFooter:false}},
    {path:'/', redirect:'/msite'},
]