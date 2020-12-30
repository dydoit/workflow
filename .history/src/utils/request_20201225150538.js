import axios from 'axios'
import { MessageBox, Message } from "element-ui";
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
})
// 请求拦截
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        debugger
        if (token&&config.tokenFlag) {
        // 设置令牌请求头
         config.headers["authorization"] =  token;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截
service.interceptors.response.use(
    response => {
        if(response.data.status===200) {
            return response.data
        }else if(response.data.status===302) {
            localStorage.setItem('token', response.data.authorization)
            alert(1)
            location.href=response.data.url
        }
        return response.data
        
    },
    error => {
        return Promise.reject(error);
    }
)
export default service