import request from '@/utils/request'
// 流程列表
export function getWorkList(params) {
    return request({
        url:'/flowable/workCenter/getMyProcessInstances',
        method: 'get',
        params:{...params}
    })
}
// 流程预览图片
export function getWorkImg(params) {
    return request({
        url:'/flowable/workCenter/processDiagram',
        method: 'get',
        responseType: 'arraybuffer',
        params:{...params}
    })
}
// 请求委托列表
export function getDelegate(params) {
    return request({
        url:'/flowable/customdeentrust/list',
        method: 'get',
        params:{...params}
    })
}
// 新增一个委托
export function addDelegate(params) {
    return request({
        url:'/flowable/workCenter/add',
        method: 'post',
        data:params
    })
}
// 修改一个委托
export function updateDelegate(params) {
    return request({
        url:'/flowable/customdeentrust/update',
        method: 'get',
        params:{...params}
    })
}
// 删除一个委托
export function delDelegate(params) {
    return request({
        url:'/flowable/customdeentrust/delete',
        method: 'get',
        params:{...params}
    })
}
// 启用/停用一个委托
export function toggleDelegate(params) {
    return request({
        url:'/flowable/customdeentrust/saEntrustById',
        method: 'get',
        params:{...params}
    })
}
// 查询承办人列表
export function queryPersonList(params) {
    return request({
        url:'/manage/uniperson/queryUniPersonList',
        method: 'get',
        params:{...params}
    })
}
// 查看人物角色列表
export function queryRoleList(params) {
    return request({
        url: '/manage/uniperson/getEmpToCompanyList',
        method: 'get',
        params:{...params}
    })
}
