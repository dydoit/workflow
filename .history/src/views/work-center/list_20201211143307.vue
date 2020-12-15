<template>
  <div class="work-list">
    <el-button type="primary" size="small">发起新工单</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="名称" width="180"> </el-table-column>
      <el-table-column prop="name" label="审批人" width="180">
      </el-table-column>
      <el-table-column prop="address" label="系统"> </el-table-column>
      <el-table-column prop="address" label="发起时间"> </el-table-column>
      <el-table-column prop="address" label="结束时间"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >跟踪</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleClick() {
      
    }
  },
};
</script>

<style lang="stylus" scoped>
.work-list {
  padding-top: 30px;
}
</style>