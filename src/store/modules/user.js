import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken, removeToken, setTime } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, data) {
    // 1. 数据存放在 Cookies 持久化
    setToken(data)
    // 2. 存放和在 state 方便 vue 使用
    state.token = data
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, data) {
    state.userInfo = { ...data }
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(store, data) {
    try {
      // 1. 发请求
      const res = await login(data)
      console.log('这里成功了')
      console.log(res)
      // console.log(res.data.data)
      // const token = res
      // axios 数据包裹在 res.data 中
      // 后端返回的 token 字段也要 data
      // 2. 拿到成功的 token
      store.commit('setToken', res)
      setTime()
    } catch (error) {
      console.log('这里报错了')
      console.log(error)
    }
  },
  async getUserInfo(store) {
    // 获取基本信息这里不够
    // 还需要在此之后获取详情
    const simpleData = await getUserInfo()
    const detail = await getUserDetailById(simpleData.userId)

    const data = {
      ...simpleData,
      ...detail
    }
    store.commit('setUserInfo', data)
    return data
  },
  async logout(store) {
    store.commit('removeToken')
    store.commit('removeUserInfo')
    // 清空后来添加的路由配置
    resetRouter()
    // 清空菜单配置
    // 如果要调用兄弟之间的 mutations
    // 需要添加第三个参数, 指定查找模块是, 以根模块作为起点
    // root: true
    store.commit('permission/setRoutes', [], {
      root: true
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
