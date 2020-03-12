import Mock from 'mockjs'
import data from './data'
Mock.mock('/api/goods', {errno:0, data:data.goods})
Mock.mock('/api/ratings', {errno:0, data:data.ratings})
Mock.mock('/api/seller', {errno:0, data:data.seller})
