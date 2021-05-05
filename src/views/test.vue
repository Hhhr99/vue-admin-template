<template>
  <div>
    <!-- el-form 表单的容器 -->
    <!-- 饿了么校验的固定写法 -->
    <!-- 1. el-form 绑定当前表单数据对象 :model -->
    <!-- 2. el-form 绑定一个规则对象 :rules -->
    <el-form :model="formData" :rules="rules">
      <!-- el-form-item 单个表单项的容器 -->
      <!-- 3. 绑定当前的表单项校验字段名 -->
      <el-form-item prop="mobile" label="手机号">
        <!-- el-input 是输入框 -->
        <el-input v-model="formData.mobile"/>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <!-- el-input 是输入框 -->
        <el-input v-model="formData.password"/>
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
  },
  rules: {
    mobile: [
      // 这里可以放各种规则
      { required: true, message: '该项不能为空', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入合法手机号', trigger: 'blur' }
    ],
    password: [
      // 这里可以放各种规则
      { required: true, message: '该项不能为空', trigger: 'blur' },
      { min: 6, max: 16, message: '密码长度在 6-16 之间', trigger: 'blur' }
    ]
  }
}
</script>

<style>

</style>
