import request from '@/utils/request'

// 获取简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工详细列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 批量导入员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

// 删除员工
export function delEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}

// 新增员工接口
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
