import { login } from '@/api/user'
const state = {
  token: null
}
const mutations = {
  setToken(state, data) {
    state.token = data
  },
  removeToken(state) {
    state.token = null
  }
}
const actions = {
  async login(store, data) {
    // 1. 发请求
    const res = await login(data)
    console.log(res.data.data)
    const token = res.data.data
    // axios 数据包裹在 res.data 中
    // 后端返回的 token 字段也要 data
    // 2. 拿到成功的 token
    store.commit('setToken', token)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
