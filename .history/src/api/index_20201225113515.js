import request from '@/utils/request'
// 判断用户登录，获取token
export function isLogin(params) {
    return request({
        url:'/manage/login/getSessionUser',
        method: 'get',
        tokenFlag:true,
        params:{...params}
    })
}
// 流程列表
export function getWorkList(params) {
    return request({
        url:'/flowable/workCenter/getMyProcessInstances',
        method: 'get',
        tokenFlag:true,
        params:{...params}
    })
}
// 流程预览图片
export function getWorkImg(params) {
    return request({
        url:'/flowable/workCenter/processDiagram',
        method: 'get',
        tokenFlag:true,
        responseType: 'arraybuffer',
        params:{...params}
    })
}
// 请求委托列表
export function getDelegate(params) {
    return request({
        url:'/flowable/customdeentrust/list',
        method: 'get',
        tokenFlag:true,
        params:{...params}
    })
}
// 设置委托-新增委托
export function createDelegate(params) {
    return request({
        url: '/flowable/customdeentrust/save',
        method: 'post',
        tokenFlag:true,
        data: params,
    })
}
// 新增一个委托
export function addDelegate(params) {
    return request({
        url:'/flowable/workCenter/add',
        method: 'post',
        tokenFlag:true,
        data:params
    })
}
// 修改一个委托
export function updateDelegate(params) {
    return request({
        url: '/flowable/customdeentrust/update',
        method: 'post',
        tokenFlag:true,
        data: params
    })
}
// 删除一个委托
export function delDelegate(params) {
    return request({
        url:'/flowable/customdeentrust/delete',
        method: 'get',
        tokenFlag:true,
        params:{...params}
    })
}
// 启用/停用一个委托
export function toggleDelegate(params) {
    return request({
        url:'/flowable/customdeentrust/saEntrustById',
        method: 'get',
        tokenFlag:true,
        params:{...params}
    })
}
export function getBusinessList(params) {
    return request({
        url: '/flowable/customdeentrust/getProcessDefinitionList',
        params,
        tokenFlag:true,
    })
}
// 查询承办人列表
export function queryPersonList(params) {
    return request({
        url:'/manage/uniperson/queryUniPersonList',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 查看人物角色列表
export function queryRoleList(params) {
    return request({
        url: '/manage/uniperson/getEmpToCompanyList',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 查看部门领导列表
export function queryLeaderList(params) {
    return request({
        url: '/business/wlbgperson/queryLeaderPersonList',
        method: 'get',
        params: {...params},
        tokenFlag:true,
    })
}
// 发起新工单删除附件
export function delAttach(params) {
    return request({
        url: '/manage/tblmanageattachment/delete',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 查看我的待办列表
export function getApplyingTasks(params){
    return request({
        url: '/flowable/workCenter/getApplyingTasks',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 获取当前节点是否有审批表单
export function getCurrentFromJson(params){
    return request({
        url: '/flowable/workCenter/getCurrentFromJson',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 获取开始表单
export function getFormTableByPid(params){
    return request({
        url: '/flowable/workCenter/getFormTableByPid',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 获取历史节点表单（除去开始表单）
export function getHisFromDatas(params){
    return request({
        url: '/flowable/workCenter/getHisFromDatas',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 审批我的待办
export function apply(params){
    return request({
        url: '/flowable/workCenter/apply',
        method: 'post',
        data:params,
        tokenFlag:true,
    })
}
// 查看流程下所有附件
export function getAttachmentByProcessInstanceId(params){
    return request({
        url: '/flowable/workCenter/attachmentByProcessInstanceId',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 查看我的已办
export function getFinished(params){
    return request({
        url: '/flowable/workCenter/getApplyedTasks',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
// 获取审批历史
export function getCommentsByProcessInstanceId(params){
    return request({
        url: '/flowable/workCenter/commentsByProcessInstanceId',
        method: 'get',
        params:{...params},
        tokenFlag:true,
    })
}
