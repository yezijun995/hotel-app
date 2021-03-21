import request from '@/utils/request'

const URL = 'user'

export function userLogin(username, password) {
  return request({
    url:  'login/user',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

export function userRegister(data) {
  return request({
    url: URL + '/register',
    method: 'post',
    data: data
  })
}

export function getUserInfoByUsername(username) {
  return request({
    url: URL + '/withUsername',
    method: 'post',
    data: {
      username
    }
  })
}

export function getUserInfo() {
  return request({
    url: URL + '/profile',
    method: 'post',
    data: {
      // username
    }
  })
}

export function getUserInfoById(id) {
  return request({
    url: URL + '/withId',
    method: 'post',
    data: {
      userId: id
    }
  })
}

