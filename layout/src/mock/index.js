import Mock from 'mockjs';
import data from './data.json';

Mock.mock('/api/sellers', {errno:0, data:data.sellers});
Mock.mock('/api/goods', {errno:0, data:data.goods});
Mock.mock('/api/ratings', {errno:0, data:data.ratings});
