import Vue from 'vue'
import Vuex from 'vuex'
import {queryRoleList} from '@/api'
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
            orgCode: '', // 公司名称 
            phone: ''    // 电话号码
        },
        roleList:[], // 岗位列表
        siteObj:{},  // 岗位对象
    },
    getters:{
        user: state => state.user,
        roleList: state => state.roleList,
        siteObj: state => state.siteObj
    },
    mutations: {
        setUser(state, payload) {
            state.user= payload
        },
        toggleRole(state, {deptCode, deptName}) {
            state.user.siteName = deptName
            state.user.siteCode = deptCode
        },
        setRoleList(state, payload) {
            state.roleList = payload
        },
        setRoleObj(state, payload){
            state.siteObj = payload
        }
    },
    actions: {
        getRoleList({commit}, oa) {
            queryRoleList({oa}).then(res => {
                if(res.code === 0) {
                    let options = res.data.map(item => {
                        return {
                          value:  item.deptCode,
                          label: item.deptName
                        }
                    })
                    let siteObj = res.data.reduce((last,cur)=>{
                        return {
                          ...last,
                          [cur.deptCode]: cur.deptName
                        }
                      },{})
                    commit('setRoleList', options)
                    commit('setRoleObj', siteObj)
                }
            })
        }
    },
    plugins: debug ? [createLogger()] : []
})