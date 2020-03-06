import EleGoods from 'pages/ele_goods.vue';
import EleRatings from 'pages/ele_retings.vue';
import EleSellers from 'pages/ele_sellers.vue';

export default [
  { path: '/goods', component: EleGoods },
  { path: '/ratings', component: EleRatings },
  { path: '/sellers', component: EleSellers },
  { path: '/', redirect: '/goods' }
];
