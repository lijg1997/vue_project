import axios from 'axios'
const contact = axios.create({
    baseURL:'http://localhost:9000/api',
    timeout:15000
})
contact.interceptors.request.use((config)=>{
    return config
})

contact.interceptors.response.use((response)=>{
    return response.data
}, (err)=>{
    return new Promise(()=>{})
})

export default contact