import axios from './axios'
import config from './config'
import httpUtil from '@/util/http'
export default httpUtil(axios, config.api)