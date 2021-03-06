<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择入职时间"/>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in employeesEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号"/>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          :value="formData.departmentName"
          style="width:80%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <el-tree
          v-if="showTree"
          class="deptsTree"
          :data="treeData"
          :props="{label: 'name'}"
          :default-expand-all="true"
          @node-click="selectDepts"
        />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择转正时间"/>
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { listToTreeData } from '@/utils'
import employeesEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      employeesEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      // 控制部门树形显示的数据
      showTree: false,
      treeData: []
    }
  },
  methods: {
    async getDepartments() {
      const { depts } = await getDepartments()
      this.treeData = listToTreeData(depts, '')
      this.showTree = true
    },
    selectDepts(data) {
      console.log(data)
      this.formData.departmentName = data.name
      this.showTree = false
    },
    async btnOK() {
      // 校验
      await this.$refs.addEmployee.validate()
      // 发请求
      await addEmployee(this.formData)
      // 提示用户
      this.$message.success('添加成功')
      // 关闭弹窗
      // 更新页面
      // 以上两个其实是在子组件想要控制父组件的数据火种调用父组件的函数
      // 标准的做法 $emit 进行子传父的传递
      // 还可以通过 this.$parent 直接去的父组件的实例对象
      this.$parent.showDialog = false
      this.$parent.getEmployeeList()
    },
    btnCancel() {
      // 1. 清空表单
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 2. 清空校验
      this.$refs.addEmployee.resetFields()
      // 3. 关闭弹窗
      this.$parent.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.deptsTree {
  position: absolute;
  z-index: 9;
  width: 80%;
  border: 1px solid #888;
  height: 173px;
  overflow: auto;
}
</style>
