import axios from 'axios'
import Qs from 'qs'
import Toast from 'muse-ui-toast';
import Cookie from 'js-cookie'
import router from '../router'
import { getToken } from './auth'

axios.defaults.withCredentials = false;


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})
service.defaults.withCredentials = true;

// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof(value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(
  function (response) {
   if(response.data.code!=1000){
     Toast.error(response.data.message);
   }
   if(response.data.code===1001){
    Cookie.remove("user_id")
    Cookie.remove("username")
    Cookie.remove("session_id")
   }
    return response.data;
  },
  error => {
    router.push('/404');
    Toast.error(error.message);
    return Promise.reject(error)

  }
)

export default service
