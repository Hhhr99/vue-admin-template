import { asyncRoutes } from '@/router'

const state = {}
const mutations = {}
const actions = {
  // 封装一个函数可以根据用户数据
  // 筛选出他有权限访问的页面路由配置
  // 1. 用户资料 (调用的时候传进来)
  // 2. 路由列表 (可以通过直接 import )
  filterRoutes(store, menus) {
    // 应该配合全部的动态路由列表
    // 和用户的 menus 权限数组
    // 筛选出名字存在于 menus 里面的路由
    const res = asyncRoutes.filter(route => menus.includes(route.name))
    console.log(res)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
