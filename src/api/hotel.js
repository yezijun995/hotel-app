import request from '@/utils/request'

const URL = 'api/hotel'

export function add(form) {
  return request({
    url: URL + '/add',
    method: 'post',
    data: form
  })
}

export function edit(form) {
  return request({
    url: URL + '/update',
    method: 'post',
    data: form
  })
}

export function del(roomId) {
  return request({
    url: URL + '/delete',
    method: 'post',
    data: {
      roomId
    }
  })
}

export function getById(roomId) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      roomId
    }
  })
}

export function getAllHotel() {
  return request({
    url: URL + '',
    method: 'post'
  })
}

export function list(hotelWinshop) {
  return request({
    url: URL + '/wineshop/list',
    method: 'get',
    data: {
      hotelWinshop
    }
  })
}

export function getInfo(hotelId) {
  return request({
    url: URL + '/wineshop/' + hotelId,
    method: 'get'
  })
}

