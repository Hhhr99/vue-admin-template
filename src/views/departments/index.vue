<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <TreeTools :tree-node="company" :is-root="true" @addDepartment="addDepartment"/>
        <hr>
        <!-- 以上是头部的公司信息, 下面是树形的部门结构 -->
        <el-tree :expand-on-click-node="false" :data="departs" :props="{label: 'name'}" :default-expand-all="true">

          <!-- 作用域插槽需要指定两个东西
          1. 插槽名字
          2. 接收数据的形参 -->
          <template #default="scoped">
            <!--            <TreeTools :tree-node="scoped.data" :is-root="false"/>-->
            <TreeTools :tree-node="scoped.data" :is-root="false" @addDepartment="addDepartment"
                       @editDepartment="editDepartment"
                       @delDepartment="getDepartments"
            />
          </template>
        </el-tree>
      </el-card>
      <AddDept ref="addDept" :tree-node="treeNode" :show-dialog.sync="showDialog" @addDepartment="getDepartments"/>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { listToTreeData } from '@/utils'
import AddDept from '@/views/departments/components/add-dept'

export default {
  components: {
    AddDept,
    TreeTools
  },
  data() {
    return {
      showDialog: false,
      company: {
        name: '超级无敌大帅哥',
        manager: '负责人',
        id: ''
      },
      departs: [],
      treeNode: {}
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
      this.departs = listToTreeData(res.depts, '')
    },
    addDepartment(treeNode) {
      this.showDialog = true
      this.treeNode = treeNode
    },
    editDepartment(treeNode) {
      this.showDialog = true
      this.treeNode = treeNode
      this.$refs.addDept.getDepartmentDetail(treeNode.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
