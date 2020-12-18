<template>
  <div>
    <el-table :data="tableData" style="width: 100%" size="small">
      <el-table-column prop="formName" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="taskName" label="任务名称" width="180">
      </el-table-column>
      <el-table-column prop="systemSn" label="系统"> </el-table-column>
      <el-table-column prop="approver" label="审批人"> </el-table-column>
      <el-table-column prop="approver" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >办理</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 分页 -->
    <div class="pagination-wrapper" v-if="tableData.length">
      <el-pagination
        layout="total,sizes, prev, pager, next, jumper"
        background
        :page-sizes="[6, 10, 14, 18]"
        :page-size="limit"
        :total="total"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCode: "hejw29", // junbinmo, hejw29
      tableData: [],
      limit: 10,
      currentPage: 1,
      value: false
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
        page: this.currentPage,
      });
      if (res.code === 0) {
        this.total = res.data.totalCount
        this.tableData = res.data.list;
      }
    }, 
    handleClick(val) {
      let {processInstanceId,taskId} = val
      this.$router.push({path: '/workCenter/apply',query: {processInstanceId,taskId}})
    },
    handleSizeChange(){},
    handleCurrentChange(){},
  },
};
</script>

<style lang="stylus" scoped>
.pagination-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin: 20px;
}
</style>