<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%; height: 40px">
    <el-col>
      <strong v-if="isRoot"><i class="el-icon-s-home"/> {{ treeNode.name }}</strong>
      <span v-else>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down"/>
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addDepartment">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">修改部门</el-dropdown-item>
              <!--              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>-->
              <el-dropdown-item v-if="!isRoot" @click.native="delDepartment">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { delDepartment, addDepartment } from '@/api/departments'

export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async delDepartment() {
      try {
        // 二次校验
        await this.$confirm('是否确认删除')
        // 核心就是发请求
        await delDepartment(this.treeNode.id)
        // 提示用户
        this.$message.success('删除成功')
        // 更新页面
        this.$emit('delDepartment')
      } catch (error) {
        console.log(error)
      }
    },
    addDepartment() {
      console.log(this.treeNode)
      this.$emit('addDepartment', this.treeNode)
    }
  }
}
</script>

<style>

</style>
