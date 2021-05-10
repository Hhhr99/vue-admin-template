import request from '@/utils/request'

// 获取公司信息
export function getCompanyInfo(companyId) {
  return request({
    url: '/company/' + companyId
  })
}

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 删除角色
export function delRole(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}
