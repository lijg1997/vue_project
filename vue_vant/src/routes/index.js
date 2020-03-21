const Msite = () => import(/* webpackChunkName: 'Msite' */ 'pages/msite/msite');
const Search = () => import(/* webpackChunkName: 'Search' */ 'pages/search/search');
const Order = () => import(/* webpackChunkName: 'Order' */ 'pages/order/order');
const Profile = () => import(/* webpackChunkName: 'Profile' */ 'pages/profile/profile');
const Login = () => import(/* webpackChunkName: 'Login' */ 'pages/login/login');
const UserDetail = () => import(/* webpackChunkName: 'UserDetail' */ 'pages/userDetail/userDetail');

export default [
    {path:'/msite', component:Msite, meta:{showFooter:true}},
    {path:'/search', component:Search, meta:{showFooter:true}},
    {path:'/order', component:Order, meta:{showFooter:true}},
    {path:'/profile', component:Profile, meta:{showFooter:true}},
    {path:'/login', component:Login, meta:{showFooter:false}},
    {path:'/userDetail', component:UserDetail, meta:{showFooter:false}},
    {path:'/', redirect:'/profile'},
]