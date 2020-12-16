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
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column property="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column property="oa" label="oa账号" width="120">
          </el-table-column>
          <el-table-column property="phone" label="手机号码"> </el-table-column>
        </el-table>
      </el-row>
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
        page: this.currentPage
      });
      if(res.code === 0) {
          this.tableData = res.list
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<style lang="stylus" scoped></style>