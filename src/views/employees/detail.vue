<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form :model="formData" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px"/>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="formData.password" style="width:300px" type="password"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">更新</el-button>
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
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
