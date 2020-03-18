import config from './config'
import axios from './axios'
import utilFn from '@/util/http'
export default utilFn(axios, config.api)