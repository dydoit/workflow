<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="formName" label="任务名称" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      userCode: "junbinmo",
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
      limit: 8,
      currentPage:1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$http.getApplyingTasks({
        userCode: this.userCode,
        limit: this.limit,
        page: this.currentPage
      })
      console.log(res)
    },
  },
};
</script>

<style lang="stylus" scoped></style>