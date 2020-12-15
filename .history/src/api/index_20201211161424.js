import request from '@/utils/request'
export function getWorkList(params) {
    return request({
        url:'/flowable/workCenter/getMyProcessInstances',
        method: 'get',
        params
    })
}