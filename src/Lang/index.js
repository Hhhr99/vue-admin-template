import Vue from 'vue'
// 1. 引入库
import VueI18n from 'vue-i18n'
// 2. use注册
Vue.use(VueI18n)
// 3. 创建实例
export default new VueI18n()

// 翻译原理的说明
// // 1. 渲染的地方不能写死, 而是调用翻译函数
// <div>{{translate('hi')}}</div>

// // 2. 准备字典供翻译工具查询
// const dict = {
//   zh: {
//     hi: '你好'
//   },
//   en: {
//     hi: 'Hello'
//   }
// }

// // 3. 可以随时改变当前语言的设定
// const locale = 'en'
