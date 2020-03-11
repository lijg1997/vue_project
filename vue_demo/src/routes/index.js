import EleGoods from 'pages/eleGoods/eleGoods'
import EleRatings from 'pages/eleRatings/eleRatings'
import EleSeller from 'pages/eleSeller/eleSeller'
export default [
    {path:'/goods', component:EleGoods},
    {path:'/ratings', component:EleRatings},
    {path:'/seller', component:EleSeller},
    {path:'/', redirect:'/goods'}
]