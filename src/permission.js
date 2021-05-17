import router from '@/router'
import store from '@/store'

router.beforeEach(async(to, from, next) => {
  const whiteList = ['/login', '/404']
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 这里有了 token 又不是到登录页
      // 后台正常放行的逻辑中
      // 就需要获取用户资料

      // await store.dispatch('user/getUserInfo')

      // 其实每次跳转页面都会经过这里
      // 最好是先确认之前没有拿过数据, 再发请求
      // 仍哦之前拿过, 直接放行即可
      // if (!store.state.user.userInfo) {
      // 直接判断一个空对象, 其实永远是 true
      // 只能判断里面的其中一个属性在不在
      if (!store.state.user.userInfo.userId) {
        // await store.dispatch('user/getUserInfo')
        const res = await store.dispatch('user/getUserInfo')
        // 如果 action return 了数据, 这边可以直接获取
        console.log('触发筛选过程')
        // await store.dispatch('permission/filterRoutes', res.roles.menus)
        const routes = await store.dispatch('permission/filterRoutes', res.roles.menus)
        // store.state.user.userInfo.roles.menus
        router.addRoutes(routes)
        // 这里是第一次进入页面(刷新)获取用户资料
        // 用户资料里面有权限列表可以用来做筛选
        // 将筛选的逻辑放入到 vuex 里面
        // 需要准备两个数据 1. 全部的动态路由列表 2. 当前用户的信息
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
