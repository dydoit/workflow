import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        user:{
            name: '',
            oa:'',
            org:'',
            siteCode: '00440038487'
        }
    },
    getters:{
        user: state => state.user
    },
    mutations: {
        setRole(state, {org}) {
            state.user.org = org
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