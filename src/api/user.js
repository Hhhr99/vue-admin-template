import request from '@/utils/request'
// 登录接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户基本资料
export function getUserInfo() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

// 根据 id 获取用户详情
export function getUserDetailById(id) {
  return request({
    // url: '/sys/user/' + id
    url: `/sys/user/${id}`
  })
}
