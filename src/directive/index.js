export const imgerr = {
  // 指令都像 v-if / v-for 用在组件或者 dom 上面
  // 这个配置, 指定使用这个指令的 dom 在不同生命周期应该做的事情
  inserted(dom, options) {
    dom.src = dom.src || options.value
    // 自定义指令的这个钩子函数
    // 可以接受两个形参
    // 1. 当前dom本身
    // 2. 当前指令的配置参数, 允许传值
    // 这是指定使用指令的 dom 插入页面时需要的操作
    dom.onerror = function() {
      dom.src = options.value
    }
  },
  // 之前的错误事件监听, 只需要在插入钩子执行一遍即可
  // 因为监听是一直存在
  // 对于空值的短路运算赋值, 则是写的时候会执行一次, 之后不管
  // 我们需要加上一个钩子, 不仅仅在插入dom的时候处理, 在组件更新是也要做同样的处理
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
