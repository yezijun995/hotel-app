import request from '@/utils/request'

const URL = 'api/system/account'

export function accountRegister(account) {
  return request({
    url: URL,
    method: 'post',
    data: account
  })
};

export function getAccountInfo(username) {
  return request({
    url: URL + "/" + username,
    method: 'get'
  })
}
