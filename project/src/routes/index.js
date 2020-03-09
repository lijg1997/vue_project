import EleGoods from 'pages/eleGoods/eleGoods.vue'
import EleRatings from 'pages/eleRatings/eleRatings.vue'
import EleSeller from 'pages/eleSeller/eleSeller.vue'
export default [
  {path:'/goods', component:EleGoods},
  {path:'/ratings', component:EleRatings},
  {path:'/seller', component:EleSeller},
  {path:'/', redirect:'/goods'}
]