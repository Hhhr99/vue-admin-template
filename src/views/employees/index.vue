<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">

        <template slot="before">
          <span>{{ page.total }}</span>
        </template>

        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="">
            <template slot-scope="scope">
              <!-- 如果想要得出真正当前页员工的在全部数据的索引
              应该先算出上一页的最后一行
              再次基础上, 当前页再 +1 +2 以此类推 -->
              <!-- 或者可以这么想, 前面所有的总条数基础上 +1 +2 .... -->
              {{ ((page.page - 1) * page.size) + (scope.$index + 1) }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" sortable="" prop="username"/>
          <el-table-column label="工号" sortable="" prop="workNumber"/>
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatFormEmployment"/>
          <el-table-column label="部门" sortable="" prop="departmentName"/>
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="scope">
              {{ scope.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState"/>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" :total="page.total" :page-size="page.size"
                         @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
// 引入枚举数据, 方便聘用形式的格式化
import employmentEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 5,
        total: 0
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      // console.log(this.page.total)
      // console.log(this.page.page)
      // console.log(this.list)
    },
    currentChange(newPage) {
      // 1. 修改翻页配置
      this.page.page = newPage
      // 2. 发个请求
      this.getEmployeeList()
    },
    formatFormEmployment(row, column, cellValue) {
      const obj = employmentEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    }
  }
}
</script>

<style>

</style>
