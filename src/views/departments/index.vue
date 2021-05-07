<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <TreeTools :tree-node="{name: '江苏传智播客教育科技股份有限公司', manager: '负责人'}" :is-root="true"/>
        <hr>
        <!-- 以上是头部的公司信息, 下面是树形的部门结构 -->
<!--        <el-tree :data="departs" :props="{label: 'name'}" :default-expand-all="true">-->
        <TreeTools :tree-node="scoped.data" :is-root="false" @delDepartment="getDepartments" />
          <!-- 作用域插槽需要指定两个东西
          1. 插槽名字
          2. 接收数据的形参 -->
          <template #default="scoped">
            <TreeTools :tree-node="scoped.data" :is-root="false"/>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { listToTreeData } from '@/utils'

export default {
  components: {
    TreeTools
  },
  data() {
    return {
      departs: []
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
