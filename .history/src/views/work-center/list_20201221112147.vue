<template>
  <div class="work-list">
    <el-button
      type="primary"
      size="small"
      @click="$router.push({ path: '/workCenter/add-work' })"
      >发起新工单</el-button
    >
    <el-table v-loading="loadFlag" :data="tableData" style="width: 100%" size="small">
      <el-table-column prop="formName" label="名称" width="180">
      </el-table-column>
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
        :page-size="limit"
        :total="total"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <progress-img :img-url="imgUrl" ref="progress"></progress-img>
  </div>
</template>

<script>
import { getWorkList, getWorkImg } from "@/api";
import ProgressImg from './components/progressImg.vue'
export default {
  data() {
    return {
      loadFlag: true,
      tableData: [
      ],
      limit: 6,
      currentPage: 1,
      total: 0,
      imgUrl: '',
    };
  },
  components: {
    ProgressImg,
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await getWorkList({
        userCode: "hejw29",
        page: this.currentPage,
        limit: this.limit,
      });
      this.loadFlag = false
      if (res.code === 0) {
        let { page: data } = res;
        this.total = data.totalCount;
        this.tableData = data.list.map(item => {
          return {
            ...item,
            endTime: item.endTime?item.endTime:'--'
          }
        });
      }
    },
    async handleClick({processInstanceId}) { // 展示详情
      let res = await getWorkImg({
        processInstanceId
      })
      let data = btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      this.imgUrl = `data:image/png;base64,${data}`
      this.$refs.progress.isShow = true
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="stylus" scoped>
.work-list {
  padding-top: 20px;
}

.pagination-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin: 20px;
}
</style>