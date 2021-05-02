import request from '@/utils/request'

const URL = 'api/hotel/message'

// 新增留言管理
export function addMessage(data) {
  return request({
    url: URL,
    method: 'post',
    data: data
  })
}

// 新增留言管理
export function infoMessage(hotelId) {
  return request({
    url: URL + "/info/" + hotelId,
    method: 'get'
  })
}
