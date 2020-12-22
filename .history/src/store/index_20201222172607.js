import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        user:{
            name: '何建文',
            oa:'hejw29',
            org:'',
            siteCode: '00440038487'
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
        }
    },
    actions: {
        getUser({ commit }){ // 登录，获取token

        }
    },
    plugins: debug ? [createLogger()] : []
})