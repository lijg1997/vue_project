import EleGoods from 'pages/ele-goods/ele_goods.vue';
import EleRatings from 'pages/ele-ratings/ele_ratings.vue';
import EleSellers from 'pages/ele-sellers/ele_sellers.vue';

export default [
  { path: '/goods', component: EleGoods },
  { path: '/ratings', component: EleRatings },
  { path: '/sellers', component: EleSellers },
  { path: '/', redirect: '/goods' }
];
