import EleGoods from 'pages/eleGoods/eleGoods.vue'
import EleRatings from 'pages/eleRatings/eleRatings.vue'
import EleSellers from 'pages/eleSellers/eleSellers.vue'
export default [
  {path:'/goods', component:EleGoods},
  {path:'/ratings', component:EleRatings},
  {path:'/sellers', component:EleSellers},
  {path:'/', redirect:'/goods'}
]