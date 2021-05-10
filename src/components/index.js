// 这个是我们自己封装的组件库
// 希望在这里祖册的所有组件
// 在 main.js 当中只需要 use 即可使用
import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
