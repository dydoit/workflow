<template>
  <div class="work-list">
    <el-button
      type="primary"
      size="small"
      @click="$router.push({ path: '/workCenter/add-work' })"
      >发起新工单</el-button
    >
    <el-table v-loading="loadFlag" :data="tableData" style="width: 100%" size="small">
      <el-table-column prop="formName" label="工单名称" width="280">
      </el-table-column>
      <el-table-column prop="approver" label="审批人" width="80">
      </el-table-column>
      <el-table-column prop="systemSn" label="工单类别" width="80"> 
        <template slot-scope="scope">
          <el-tag type="warning">{{config[scope.row.systemSn]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="发起时间" > </el-table-column>
      <el-table-column prop="endTime" label="结束时间" > </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >跟踪</el-button
          >
          <el-button v-if="scope.row.enableRevokeFlag==='0'" style="color:red" type="text" size="mini"
            @click="revokeProcess" >撤回</el-button
          >
          <el-button v-if="scope.row.enableStopFlag==='0'" style="color:red"  type="text" size="mini"
            @click="stopProcess">终止</el-button
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
    <el-dialog
      title="请填写原因"
      width="25%"
      :visible.sync="dialogVisible"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="原因">

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button
          type="primary"
          :loading="isClickFlag"
          @click="sureSubmit"
          size="small"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getWorkList, getWorkImg } from "@/api";
import config from '@/utils/config.js'
import ProgressImg from './components/progressImg.vue'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      config,
      dialogVisible: true,
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
  computed: {
   ...mapGetters(['user'])
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await getWorkList({
        userCode: this.user.oa,
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
    handleSizeChange(val) {
      this.limit = val
      this.loadFlag = true
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadFlag = true
      this.getData()
    },
  },
};
</script>

<style lang="stylus" scoped>
.work-list {
  padding-top: 15px;
  >.el-button {
    margin-bottom:15px
  }
}

.pagination-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin: 20px;
}
</style>