const EleGoods = () => import(/* webpackChunkName: 'EleGoods' */ 'pages/eleGoods/eleGoods');
const EleRatings = () => import(/* webpackChunkName: 'EleRatings' */ 'pages/eleRatings/eleRatings');
const EleSeller = () => import(/* webpackChunkName: 'EleSeller' */ 'pages/eleSeller/eleSeller');
const EleShop = () => import(/* webpackChunkName: 'EleShop' */ 'pages/eleShop/eleShop');
const Msite = () => import(/* webpackChunkName: 'Msite' */ 'pages/msite/msite');
const Order = () => import(/* webpackChunkName: 'Order' */ 'pages/order/order');
const Profile = () => import(/* webpackChunkName: 'Profile' */ 'pages/profile/profile');
const Search = () => import(/* webpackChunkName: 'Search' */ 'pages/search/search');
const Login = () => import(/* webpackChunkName: 'Login' */ 'pages/login/login');
const UserDetail = () => import(/* webpackChunkName: 'UserDetail' */ 'pages/userDetail/userDetail');
import $store from 'store'
export default [
  {path:'/msite', component:Msite, meta:{showFooter:true}},
  {path:'/order', component:Order, meta:{showFooter:true}},
  {path:'/profile', component:Profile, meta:{showFooter:true}},
  {path:'/search', component:Search, meta:{showFooter:true}},
  {
    path:'/login',
    component:Login,
    meta:{showFooter:false},
    beforeEnter: (to, from, next) => {
      if($store.state.user._id) next('/msite');
      else next()
    }
  },
  {
    path:'/shop/:id',
    component:EleShop,
    props:true,
    children:[
      {path:'goods', component:EleGoods},
      {path:'ratings', component:EleRatings},
      {path:'seller', component:EleSeller},
      {path:'', redirect:'goods'}
    ]
  },
  {path:'/user_detail', component:UserDetail, meta:{showFooter:false}},
  {path:'/', redirect:'/profile'},
]