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
        <el-input v-model="formData.mobile" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <!-- el-input 是输入框 -->
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item prop="password2" label="再次输入密码">
        <!-- el-input 是输入框 -->
        <el-input v-model="formData.password2" />
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
    const checkPassword2 = (rule, value, callback) => {
      // 如果给了一个自定义校验函数
      // 饿了么在校验时会自动调用, 并且传入三个参数
      // rule 规则对象
      // value 用户输入的值
      // callback 放行的回调函数
      // 我们可以自行写逻辑校验对错
      // 如果认为正确, 则直接执行 callback()
      // 如果认为不正确, 运行 callback 的时候 传入一个原生的错误对象 new Error('两次密码必须相同')
      if (value === this.formData.password) {
        callback()
      } else {
        callback(new Error('两次密码必须相同'))
      }
    }

    return {
      formData: {
        mobile: '',
        password: '',
        password2: ''
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
        ],
        password2: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          // 如果原来的规则填写方法已经满足不了我们的需求
          // 饿了么自定义校验函数进行处理
          // 指定一个校验函数 validator
          { trigger: 'blur', validator: checkPassword2 }
        ]
      }
    }
  }
}
</script>

<style>

</style>
