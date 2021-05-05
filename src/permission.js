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
        await store.dispatch('user/getUserInfo')
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
