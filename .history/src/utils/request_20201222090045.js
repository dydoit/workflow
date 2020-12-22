import axios from 'axios'
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
})
// 请求拦截
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
        // 设置令牌请求头
        config.headers["Authorization"] =  token;
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
        if(response.code===200) {
            return response.data
        }
        
    },
    error => {
        return Promise.reject(error);
    }
)
export default service