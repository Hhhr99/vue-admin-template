<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width:120px" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :value="item" :label="item+'年'" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width:120px;margin-left:10px" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :value="item" :label="item+'月'" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{date,data}">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeekend(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(oldValue) {
      const newDate = oldValue.split('-')[2]
      return newDate.startsWith('0') ? newDate.substr(1) : newDate
    }
  },
  data() {
    return {
      yearList: [],
      currentYear: '',
      currentMonth: '',
      currentDate: new Date()
    }
  },
  created() {
    this.getYearList()
  },
  methods: {
    isWeekend(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    dateChange() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    getYearList() {
      this.currentYear = this.currentDate.getFullYear()
      this.currentMonth = this.currentDate.getMonth() + 1
      this.yearList = Array.from(Array(11), (value, index) => index + this.currentYear - 5)
    }
  }
}
</script>

<style  scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>
