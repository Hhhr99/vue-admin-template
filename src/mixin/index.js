import store from '@/store'
export default {
  methods: {
    checkPermission(pointsName) {
      // 1. 按钮的名称 pointsName 作为形参
      // 2. 用户权限的列表 store.getters.roles.points
      // 如果列表中存在这个按钮名称 => 有权限
      return store.getters.roles && store.getters.roles.points.includes(pointsName)
    }
  }
}
