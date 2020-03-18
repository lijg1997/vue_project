import axios from './axios'
import config from './config'
import utilFn from '../../util/http'
export default utilFn(axios, config.api)