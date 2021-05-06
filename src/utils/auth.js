import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'hrsass-ihrm-token'
const TimeKey = 'hrsaas-time-key'

// 处理 token 持久化
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 处理时间持久化
export function getTime() {
  return Cookies.get(TimeKey)
}

export function setTime() {
  const date = new Date()
  return Cookies.set(TimeKey, date.getTime())
}
