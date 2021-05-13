<template>
  <div>
    <!--
      action 必填的图片上传地址, 后面要对接腾讯云, 只是放一个 # 敷衍一下
      list-type 决定文件列表的显示方式
      file-list 是管理上传文件的数组
      on-preview 指定点击放大镜后的处理，有了这个函数放大镜才会出现
     -->
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="preview"
    >
      <i class="el-icon-plus"/>
    </el-upload>

    <el-dialog title="预览" :visible="showDialog" @close="showDialog=false">
      <el-row type="flex" justify="center">
        <img :src="previewURL" alt="">
      </el-row>
    </el-dialog>
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
      ],
      showDialog: false,
      previewURL: ''
    }
  },
  methods: {
    preview(file) {
      this.showDialog = true
      console.log(file)
      this.previewURL = file.url
    }
  }
}
</script>

<style>

</style>
