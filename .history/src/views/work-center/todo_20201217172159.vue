<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="formName" label="名称" width="180"> </el-table-column>
    <el-table-column prop="taskName" label="任务名称" width="180"> </el-table-column>
    <el-table-column prop="systemSn" label="系统"> </el-table-column>
    <el-table-column prop="approver" label="审批人"> </el-table-column>
    <el-table-column prop="approver" label="操作"> 
      <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >审批</el-button
          >
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      userCode: "junbinmo",
      tableData: [
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