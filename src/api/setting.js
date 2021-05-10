import request from '@/utils/request'

export function getCompanyInfo(companyId) {
  return request({
    url: '/company/' + companyId
  })
}
