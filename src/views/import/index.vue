<template>
  <!-- 这个花裤衩的上传组件可以传入一个 onSuccess 属性, 是一个函数
每当excel文件传入成功就会执行 -->
  <UploadExcel :on-success="upload"/>
</template>

<script>
export default {
  methods: {
    upload(data) {
      // 这里再excel数据传入成功后执行
      // 准备字典
      const dict = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // 现在我们的  data.results 是一个数组, 里面包裹着多个用户
      // 我希望遍历这个数组, 拿出每个用户单独处理
      console.log(data.results)
      const userData = data.results.map(user => {
        return this.translate(user, dict)
      })
      console.log(userData)
    },
    translate(user, dict) {
      const newUser = {}
      // 如果人工进行翻译应该如下
      // newUser.username = '高大山'
      // 其中需要的数据一个是 英文的 key
      // 第二个是原来的 user 中的 value 值
      for (const key in user) {
        const enKey = dict[key]
        const value = user[key]
        newUser[enKey] = value
      }

      return newUser
    }
  }
}
</script>

<style>

</style>
