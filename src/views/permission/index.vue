<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </page-tools>
      <el-card>
        <!-- 表格 -->
        <el-table border :data="list" row-key="id" :default-expand-all="true">
          <el-table-column label="名称" prop="name"/>
          <el-table-column align="center" label="标识" prop="code"/>
          <el-table-column align="center" label="描述" prop="description"/>
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="delPermission(row.id)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { delPermission, getPermissionList } from '@/api/permission'
import { listToTreeData } from '@/utils'

export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = listToTreeData(await getPermissionList(), '0')
      console.log(this.list)
    },
    async delPermission(id) {
      // 二次校验
      await this.$confirm('是否确认删除')
      // 发请求
      await delPermission(id)
      // 提示用户
      this.$message.success('删除成功')
      // 重新加载数据
      this.getPermissionList()
    }
  }
}
</script>

<style>

</style>
