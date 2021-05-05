import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    // 如果已经有 token 就带在 config 上面
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  err => {
    Message.error(err.message)
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    const { success, message, data } = res.data
    if (success) {
      return data
    } else {
      // 数据层面出了问题
      // 如果是数据层面的失败
      // 也需要提示用户
      // 还要讲当前的 promise 拒绝掉
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  err => {
    Message.error(err.message)
    return Promise.reject(err)
  }
)
export default service
