<template>
  <div>
    <el-table
      v-loading="loadFlag"
      :data="tableData"
      style="width: 100%"
      size="small"
    >
      <el-table-column prop="formName" label="工单名称" width="180">
      </el-table-column>
      <!-- <el-table-column prop="taskName" label="任务名称" width="180">
      </el-table-column> -->
      <el-table-column prop="systemSn" label="工单类别">
        <template slot-scope="scope">
          <span>{{ config[scope.row.systemSn] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="接受待办时间"> </el-table-column>
      <el-table-column prop="lastApprover" label="上级审批人">
      </el-table-column>
      <el-table-column prop="approver" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >跟踪</el-button
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
    <progress-img ref="progress" :img-url="imgUrl"></progress-img>
  </div>
</template>

<script>
import ProgressImg from "./components/progressImg.vue";
import config from "@/utils/config.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      config,
      loadFlag: true,
      userCode: this.$store.state.user.oa, // junbinmo, hejw29, chenfen6， 承办人oa：gd-luozd5
      tableData: [],
      limit: 10,
      currentPage: 1,
      value: false,
      imgUrl: "",
    };
  },
  components: {
    ProgressImg,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$http.getFinished({
        userCode: this.userCode,
        limit: this.limit,
        page: this.currentPage,
      });
      this.loadFlag = false;
      if (res.code === 0) {
        this.total = res.data.totalCount;
        this.tableData = res.data.list;
      }
    },
    async handleClick(val) {
      let { processInstanceId } = val;
      let res = await this.$http.getWorkImg({
        processInstanceId,
      });
      let data = btoa(
        new Uint8Array(res).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      this.imgUrl = `data:image/png;base64,${data}`;
      this.$refs.progress.isShow = true;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.loadFlag = true;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadFlag = true;
      this.getData();
    },
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