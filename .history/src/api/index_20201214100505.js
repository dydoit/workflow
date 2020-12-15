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
        params:{...params}
    })
}