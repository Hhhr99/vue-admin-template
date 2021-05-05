<template>
  <div>
    <!-- el-form 表单的容器 -->
    <el-form>
      <!-- el-form-item 单个表单项的容器 -->
      <el-form-item>
        <!-- el-input 是输入框 -->
        <el-input v-model="formData.mobile" />
      </el-form-item>
      <el-form-item>
        <!-- el-input 是输入框 -->
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item>
        <el-button>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        mobile: '',
        password: ''
      }
    }
  }
}
</script>

<style>

</style>
