<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="formData.id?'编辑部门':'新增部门'" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符"/>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符"/>
      </el-form-item>
      <el-form-item ref="addDept" label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple"
                   @blur="checkManager"
        >
          <el-option v-for="item in employeeList" :key="item.id" :value="item.username" :label="item.username"/>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3"/>
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments, addDepartment, getDepartmentDetail, editDepartment } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'

export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      required: true
    }
  },
  data() {
    const checkRepeatName = async(rule, value, callback) => {
      // 同一部门下不能有重名
      // 1. 所有部门列表
      const { depts } = await getDepartments()
      // 2. 当前被点击座位父部门的那个id
      // const isRepeat = depts
      //   // 找到同一部门下的子部门 得到一个数组
      //   .filter(item => item.pid === this.treeNode.id)
      //   // 找到是否存在跟当前用户输入相同的名称 得到布尔值
      //   .some(item => item.name === value)
      // if (isRepeat) {
      //   callback(new Error('同部门下不能重名'))
      // } else {
      //   callback()
      // }
      let isRepeat = false
      if (this.formData.id) {
        // 编辑
        isRepeat = depts
          // 当前的 treeNode.pid 才是父部门
          .filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)
          // 找一找是否存在跟当前用户输入值相同的名称 得到布尔值
          .some(item => item.name === value)
      } else {
        // 新增
        isRepeat = depts
          // 找到同一父部门下的子部门 得到一个数组
          .filter(item => item.pid === this.treeNode.id)
          // 找一找是否存在跟当前用户输入值相同的名称 得到布尔值
          .some(item => item.name === value)
      }
      isRepeat ? callback(new Error('同部门下不能重名')) : callback()
    }

    const checkRepeatCode = async(rule, value, callbakc) => {
      // 1. 全部部门列表
      const { depts } = await getDepartments()
      // 2. 当前用户输入的value
      // const isRepeat = depts.some(item => item.name === value)
      let isRepeat = false
      if (this.formData.id) {
        // 编辑 的时候必须把自己排除在外
        isRepeat = depts.some(item => item.code === value && item.id !== this.treeNode.id)
      } else {
        // 新增
        isRepeat = depts.some(item => item.code === value)
      }
      isRepeat ? callbakc(new Error('部门代码不能重复')) : callbakc()
    }
    return {
      formData: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      },
      rules: {
        code: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 50, message: '不能超过50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkRepeatCode }
        ],
        introduce: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 300, message: '不能超过300个字符', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 50, message: '不能超过50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkRepeatName }
        ]
      },
      employeeList: []
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.employeeList = await getEmployeeSimple()
      console.log(this.employeeList)
    },
    checkManager() {
      // 这是失去焦点的部门负责人, 需要手动触发校验
      setTimeout(() => {
        this.$refs.addDept.validateField('manager')
      }, 200)
    },
    async btnOK() {
      // 1. 表单校验
      await this.$refs.addDept.validate()
      // 2. 发请求
      // await addDepartment({ ...this.formData, pid: this.treeNode.id })
      // 如果是编辑请求,api 不相同
      if (this.formData.id) {
        // 编辑
        await editDepartment(this.formData)
      } else {
        await addDepartment({ ...this.formData, pid: this.treeNode.id })
      }
      // 3. 提醒用户
      this.$message.success('操作成功')
      // 4. 弹窗关闭
      // this.showDialog = false
      this.$emit('update:showDialog', false)
      // 5. 加载新数据
      this.$emit('addDepartment')
    },
    btnCancel() {
      // 先清理表单绑定的数据
      // 为了照顾编辑的情况, 每次关闭强制将表单恢复到原样
      this.formData = {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      }
      // 清理校验结果
      this.$refs.addDept.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getDepartmentDetail(id) {
      this.formData = await getDepartmentDetail(id)
    }
  }
}
</script>

<style scoped>

</style>
