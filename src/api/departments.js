import request from '@/utils/request'

// 获取列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除部门
export function delDepartment(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
