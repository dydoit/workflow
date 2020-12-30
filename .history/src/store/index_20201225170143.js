import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    state: {
        user:{
            name: '', //姓名
            oa:'', // oa
            siteName:'', //部门名称
            siteCode:'', // 部门代码
            orgCode: '' // 公司名称
            
        }
    },
    getters:{
        user: state => state.user
    },
    mutations: {
        setRole(state, {name,oa}) {
            console.log(name,oa)
            state.user.name = name
            state.user.oa = oa
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token',token)
        },
        resetToken() {
            state.token = ''
            localStorage.removeItem('token',token)
        }
    },
    actions: {
        getUser({ commit }){ // 登录，获取token

        }
    },
    plugins: debug ? [createLogger()] : []
})