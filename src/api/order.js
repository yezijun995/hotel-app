import request from '@/utils/request'

const URL = 'api/hotel/order'


export function getOrders(userId) {
  return request({
    url: URL + '/' + userId,
    method: 'get'
  })
}

export function addOrder(data) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: data
  })
}

export function cancelOrder(id) {
  return request({
    url: URL + '/cancel/' + id,
    method: 'delete',
  })
}


export function payOrder(data) {
  return request({
    url: URL + '/pay',
    method: 'post',
    data: data
  })
}

export function getOrderById(orderId) {
  return request({
    url: URL + '/order/' + orderId,
    method: 'get'
  })
}
