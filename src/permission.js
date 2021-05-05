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
      await store.dispatch('user/getUserInfo')
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
