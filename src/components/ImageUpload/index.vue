<template>
  <div>
    <!--
      action 必填的图片上传地址, 后面要对接腾讯云, 只是放一个 # 敷衍一下
      list-type 决定文件列表的显示方式
      file-list 是管理上传文件的数组
     -->
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
    >
      <i class="el-icon-plus"/>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        // 写死一张图片作为测试
        {
          url: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2189630771,282788356&fm=26&gp=0.jpg'
        }
      ]
    }
  }
}
</script>

<style>

</style>
