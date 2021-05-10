import request from '@/utils/request'

export function getCompanyInfo(companyId) {
  return request({
    url: '/company/' + companyId
  })
}

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
