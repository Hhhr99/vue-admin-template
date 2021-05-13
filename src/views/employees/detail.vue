<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form ref="loginForm" :model="formData" :rules="rules" label-width="120px"
                     style="margin-left: 120px; margin-top:30px"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px"/>
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="formData.password2" style="width:300px" type="password"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="sendRequest">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情"/>
          <el-tab-pane label="岗位信息"/>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'

export default {
  data() {
    return {
      userId: this.$route.params.id,
      formData: {
        username: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.formData = await getUserDetailById(this.userId)
    },
    async sendRequest() {
      // 表单校验
      await this.$refs.loginForm.validate()
      // 发送请求
      await saveUserDetailById({
        ...this.formData,
        password: this.formData.password2
      })
      // 提示用户
      this.$message.success('修改成功')
    }
  }
}
</script>

<style scoped>

</style>
