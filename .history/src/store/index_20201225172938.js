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
        setUser(state, payload) {
            state.user= payload
        }
    },
    actions: {
    },
    plugins: debug ? [createLogger()] : []
})