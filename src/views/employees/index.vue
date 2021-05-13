<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">

        <template slot="before">
          <span>共{{ page.total }}条记录</span>
        </template>

        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportEmployees">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
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
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.enableState === 1"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="$router.push('/employees/detail/'+row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
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
      <AddEmployee :show-dialog="showDialog"/>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
// 引入枚举数据, 方便聘用形式的格式化
import employmentEnum from '@/api/constant/employees'
import { delEmployee } from '@/api/employees'
// 对于一个不常用的库, 每次都默认引入, 技术上没问题
// 可以进行优化
// import {export_json_to_excel} from '@/vendor/Export2Excel'
import { formatDate } from '@/filters'
import AddEmployee from './components/add-employee'

export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    async exportEmployees() {
      // 这里是按钮被点击, 可以就在这里单独引入需要的库
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      console.log(export_json_to_excel)
      // 加载所有员工
      const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
      console.log(rows)
      // export_json_to_excel({
      //   header: ['姓名', '年龄', '地址'],
      //   data: [
      //     ['小明', 888, '珠吉路58号'],
      //     ['小红', 8, '珠吉路59号'],
      //     ['小刚', 12, '珠吉路60号']
      //   ]
      // })

      const dict = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // console.log(Object.keys(dict))

      const userData = rows.map(user => {
        return this.object2Arrayy(user, dict)
      })

      console.log(userData)

      export_json_to_excel({
        header: Object.keys(dict),
        data: userData
      })
    },
    object2Arrayy(user, dict) {
      const newUser = []
      for (const key in dict) {
        const enKey = dict[key]
        const value = user[enKey]
        // newUser.push(value)
        if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
          newUser.push(new Date(formatDate(value)))
        } else if (enKey === 'formOfEmployment') {
          const obj = employmentEnum.hireType.find(item => item.id === value)
          newUser.push(obj ? obj.value : '未知')
        } else {
          newUser.push(value)
        }
      }
      return newUser
    },
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
      const obj = employmentEnum.hireType.find(item => item.id === Number(cellValue))
      return obj ? obj.value : '未知!!!'
    }
  }
}
</script>

<style>

</style>
