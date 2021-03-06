import Vue from 'vue'
// 1. 引入库
import VueI18n from 'vue-i18n'
// 2. use注册
Vue.use(VueI18n)
// 引入饿了么预设语言包
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import elementEN from 'element-ui/lib/locale/lang/en'

// 引入自定义菜单的语言包
import customZH from './zh'
import customEN from './en'

import Cookie from 'js-cookie'

// 3. 创建实例
export default new VueI18n({
  // 1. 设定当前语言
  locale: Cookie.get('language') || 'zh',
  // 2. 设定字典
  messages: {
    zh: {
      hi: '你好丫',
      gd: '祝你开心每一天',
      changeSuccess: '切换语言成功',
      ...elementZH,
      ...customZH
    },
    en: {
      hi: 'WHat\'s up',
      gd: 'Have a good day',
      changeSuccess: 'Change language successfully',
      ...elementEN,
      ...customEN
    }
  }
})

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
