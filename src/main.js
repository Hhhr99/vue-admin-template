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
import { imgerr } from '@/directive'

Vue.directive('imgerr', imgerr)

// 全局注册组件方便四处使用
// import PageTools from '@/components/PageTools'
// Vue.component('PageTools', PageTools)
// // vue 提供了一个 use 函数
// // 可以往里丢一个插件对象
// // use 会自动运行对象的 install 方法
// // 所有你要做的事情都可以封装在里面
// // Vue.component 注册再多组件, 都可以封装在里面
// // 最终在 main.js 只需要 一个 use 即可
// Vue.use = function(obj) {
//   obj.install(Vue)
// }
import myComponents from '@/components'
Vue.use(myComponents)

// 过滤器的注册
// import { formateDate } from '@/filters'
// Vue.filter('formateDate', formateDate)

import * as filters from '@/filters'
// console.log(filters)
// Vue.filter(函数名, 函数体) 就可以注册过滤器
for (const key in filters) {
  const name = key
  // console.log(name)
  const fn = filters[key]
  // console.log(fn)
  Vue.filter(name, fn)
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
