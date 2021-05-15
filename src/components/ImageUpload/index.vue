<template>
  <div>
    <!--
      必填
      action 必填的图片上传地址, 后面要对接腾讯云, 只是放一个 # 敷衍一下
      file-list 是管理上传文件的数组

      影响显示
      list-type 决定文件列表的显示方式
      :class 动态类名可以控制有图片时隐藏上传图标

      各个阶段的钩子
      on-preview 指定点击放大镜后的处理, 有了这个函数放大镜才会出现
      on-remove 删除后触发
      on-change 图片数据改变(添加)后触发
      http-request 替代了默认 action 上传行为,为后续腾讯云连接座准备
     -->
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :class="{disable: fileList.length > 0}"
      :on-preview="preview"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="upload"
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
// 引入腾讯云工具库
// 利用创建的访问密钥创建一个实例
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDSiiSvBDyTjiRt4xax4uTlmVx94uUnpa4',
  SecretKey: 'EE6pPnzwc2C5h27vRiiRt4zcz4tSkmX1'
})
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
    },
    onRemove(file, fileList) {
      // 删除图片的钩子
      // 根据文档有两个参数
      // 1. 被删除的文件本身
      // 2. 删除后最新的文件列表
      this.fileList = [...fileList]
    },
    onChange(file, fileList) {
      // 跟 onRemove 一样
      // 饿了么会给我们回调当前最新的文件数组
      // 用来覆盖 原来的数据即可
      this.fileList = [...fileList]
    },
    beforeUpload(file) {
      console.log('上传前校验')
      console.log(file)

      // 1.校验类型
      const acceptType = ['image/jpeg', 'image/png']
      if (!acceptType.includes(file.type)) {
        this.$message.warning('只接受 jpeg / png 类型文件')
        return false
      }

      // 2.校验大小
      const maxSize = 200 * 1024
      if (file.size > maxSize) {
        this.$message.warning('图片大小不能超过' + maxSize / 1024 + 'K')
        return false
      }
    },
    upload(data) {
      // 拦截掉默认上传到 action 的动作
      // 后续应该连接腾讯云进行上传
      console.log('触发上传')
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
// /deep/ .disable {
::v-deep .disable {
  .el-upload--picture-card {
    display: none;
  }
}

::v-deep img {
  object-fit: cover;
}
</style>
