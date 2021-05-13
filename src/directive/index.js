export const imgerr = {
  // 指令都像 v-if / v-for 用在组件或者 dom 上面
  // 这个配置, 指定使用这个指令的 dom 在不同生命周期应该做的事情
  inserted(dom, options) {
    // 自定义指令的这个钩子函数
    // 可以接受两个形参
    // 1. 当前dom本身
    // 2. 当前指令的配置参数, 允许传值
    // 这是指定使用指令的 dom 插入页面时需要的操作
    // console.log('dom 被插入页面')
    // console.log(dom)
    // console.log(options)
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
