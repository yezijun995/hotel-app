import request from '@/utils/request'

const URL = '/api/hotel/roomType'


export function getBookableRoomType(hotelId) {
  return request({
    url: URL + '/subscribe/hotel/'+hotelId,
    method: 'get'
  })
}

export function getRoomTypeById(typeId) {
  return request({
    url: URL + '/'+typeId,
    method: 'get'
  })
}
//
// export function getAllRoomType() {
//   return request({
//     url: URL + '',
//     method: 'post'
//   })
// }
//
