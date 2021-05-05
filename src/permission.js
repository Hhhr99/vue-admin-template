import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  const whiteList = ['/login', '/404']
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
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
