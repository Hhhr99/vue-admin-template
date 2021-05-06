import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false

// 注册全局自定义指令
// Vue.directive(指令名, 指令配置)
Vue.directive('imgerr', {
  // 指令都像 v-if / v-for 用在组件或者 dom 上面
  // 这个配置, 指定使用这个指令的 dom 在不同生命周期应该做的事情
  inserted() {
    // 这是指定使用指令的 dom 插入页面时需要的操作
    console.log('dom 被插入页面')
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
