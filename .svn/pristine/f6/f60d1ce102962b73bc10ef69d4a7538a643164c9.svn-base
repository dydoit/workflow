import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    state: {
        user:{
            name: '',
            oa:'',
            org:''
        }
    },
    getters:{
        user: state => state.user
    },
    mutations: {
        setRole(state, {org}) {
            state.user.org = org
        }
    },
    plugins: debug ? [createLogger()] : []
})