<template>
  <div class="work-list">
    <el-button type="primary" size="small">发起新工单</el-button>
    <el-table :data="tableData" style="width: 100%" size="medium">
      <el-table-column prop="formName" label="名称" width="180"> </el-table-column>
      <el-table-column prop="approver" label="审批人" width="180">
      </el-table-column>
      <el-table-column prop="systemSn" label="来源系统"> </el-table-column>
      <el-table-column prop="startTime" label="发起时间"> </el-table-column>
      <el-table-column prop="endTime" label="结束时间"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >跟踪</el-button
          >
        </template>
      </el-table-column>
    </el-table>
      <!-- 分页 -->
    <div class="pagination-wrapper" v-if="tableData.length">
        <el-pagination
          layout="total,sizes, prev, pager, next, jumper"
          background
          :page-sizes="[6, 10, 14, 18]"
          :page-size="queryData.limit"
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
      tableData: [
        {
          formName: "",
          approver: "王小虎",
          systemSn: "测试系统",
          startTime:'',
          endTime:'',
        }
      ],
      currentPage: '',
      total:''
    };
  },
  methods: {
    handleClick() {
      
    },
    handleSizeChange(){},
    handleCurrentChange(){}
  },
};
</script>

<style lang="stylus" scoped>
.work-list {
  padding-top: 30px;
}
</style>