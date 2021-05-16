<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="checkList">
      <!-- 选项 -->
      <!-- 对于多选框来说
      1. 供计算机查看和记录的叫 label
      2. 供用户查看的放在开闭标签vine -->
      <el-checkbox
        v-for="item in allRoles"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'

export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkList: [],
      allRoles: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.allRoles = rows
    }
  }
}
</script>

<style>

</style>
