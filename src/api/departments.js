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

// 添加部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 根据 id 获取详情
export function getDepartmentDetail(id) {
  return request({
    url: '/company/department/' + id
  })
}
