import axios from 'axios'
import Cookies from 'js-cookie'
import { MessageBox, Message } from "element-ui";
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
})
// 请求拦截
service.interceptors.request.use(
    config => {
        const token = Cookies.get('token')
        alert('第一次：'+token)
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
            Cookies.set('token', response.data.authorization)
            alert('第二次：'+ Cookies.get('token'))
            // sessionStorage.setItem('token', response.data.authorization)
            sessionStorage.removeItem('user')
            location.href=response.data.url
        }else if(response.data.status === 500) {
            if(response.data.url) {
                location.href=response.data.url
            }else {
                Message({
                    message: '非法请求，请联系管理员',
                    type: "error",
                    duration: 2 * 1000
                });
            }
            
        }
        return response.data
        
    },
    error => {
        return Promise.reject(error);
    }
)
export default service