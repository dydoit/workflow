<template>
  <div>
    <el-drawer v-bind="$attrs" v-on="$listeners">
      <el-row :gutter="13">
        <el-form ref="form" :model="formData" label-width="80px" size="small">
          <el-col :span="9">
            <el-form-item label="姓名" prop="applyName">
              <el-input
                v-model="formData.name"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="OA账号" prop="oa">
              <el-input
                v-model="formData.oa"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" size="mini">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        size="small"
      >
        <el-table-column type="index" width="50" title="鼠标单击选中"> </el-table-column>
        <el-table-column property="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column property="oa" label="oa账号" width="120">
        </el-table-column>
        <el-table-column property="phone" label="手机号码"> </el-table-column>
      </el-table>
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
          @current-change="handleCurrentPageChange"
        >
        </el-pagination>
      </div>
      <div class="btn-group">
          <el-button  size="small">取消</el-button>
          <el-button type="primary" size="small">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      tableData: [],
      limit: 6,
      currentPage: 1,
      total: 0,
      currentRow: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$http.queryPersonList({
        limit: this.limit,
        page: this.currentPage,
      });
      if (res.code === 0) {
        this.tableData = res.page.list;
      }
    },
    handleSizeChange() {},
    handleCurrentPageChange() {},
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-table
    margin 0 5px
.pagination-wrapper
  display: flex;
  flex-direction: row-reverse
  margin: 20px;
.btn-group
    text-align center
</style>