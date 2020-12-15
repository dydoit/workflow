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