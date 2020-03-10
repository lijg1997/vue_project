import EleGoods from 'pages/eleGoods/eleGoods.vue'
import EleSeller from 'pages/eleSeller/eleSeller.vue'
import EleRatings from 'pages/eleRatings/eleRatings'

export default [
  {path:'/goods', component:EleGoods},
  {path:'/seller', component:EleSeller},
  {path:'/ratings', component:EleRatings},
  {path:'/', redirect:'/goods'}
]