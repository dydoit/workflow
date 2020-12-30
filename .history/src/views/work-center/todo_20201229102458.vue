<template>
  <div>
    <el-table v-loading="loadFlag" :data="tableData" style="width: 100%" size="small">
      <el-table-column prop="formName" label="工单标题" width="180">
      </el-table-column>
      <!-- <el-table-column prop="taskName" label="任务名称" width="180">
      </el-table-column> -->
      <el-table-column prop="processDefId" label="工单类别"> 
        <template slot-scope="scope">
          <el-tag type="warning">{{config[scope.row.processDefId]}}</el-tag>
        </template>  
      </el-table-column>
      <el-table-column prop="startTime" label="接收待办时间"> </el-table-column>
      <el-table-column prop="lastApprover" label="上级处理人"> </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >办理</el-button
          >
           <el-button @click="handleClickSee(scope.row)" type="text" size="small"
            >跟踪</el-button
          >
            <el-button @click="handleClickDetail(scope.row)" type="text" size="small"
            >查看</el-button
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
    <progress-img :img-url="imgUrl" ref="progress"></progress-img>
  </div>
</template>

<script>
import ProgressImg from './components/progressImg.vue'
import config from '@/utils/config.js'
import {mapGetters} from 'vuex'
import {getWorkImg } from "@/api";
export default {
  data() {
    return {
      config,
      tableData: [],
      loadFlag: true,
      limit: 10,
      currentPage: 1,
      value: false,
      imgUrl: ''
    };
  },
  computed: {
   ...mapGetters(['user'])
  },
  components: {
    ProgressImg,
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$http.getApplyingTasks({
        userCode: this.user.oa,
        limit: this.limit,
        page: this.currentPage,
      });
      this.loadFlag = false
      if (res.code === 0) {
        this.total = res.data.totalCount
        this.tableData = res.data.list;
      }else {
        alert('接口错误')
      }
    }, 
    handleClick(val) {
      let {processInstanceId,taskId} = val
      this.$router.push({path: '/workCenter/apply',query: {processInstanceId,taskId}})
    },
    async handleClickSee({processInstanceId}){
       let res = await getWorkImg({
        processInstanceId
      })
      let data = btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      this.imgUrl = `data:image/png;base64,${data}`
      this.$refs.progress.isShow = true
    },
    handleClickDetail(val) {
       let {processInstanceId,taskId} = val
       this.$router.push({path: '/workCenter/detail',query: {processInstanceId,taskId}})
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
.pagination-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin: 20px;
}
</style>