import axios from 'axios'

axios.interceptors.request.use((config) => {
   return config
})

axios.interceptors.response.use((response) => {
   return response.data
},(err) => {
   
})

export default axios