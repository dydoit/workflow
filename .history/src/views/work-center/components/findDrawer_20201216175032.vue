<template>
  <div>
    <el-drawer v-bind="$attrs" v-on="$listeners" @opened="onOpen" @close="onClose">
      <el-scrollbar>
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
              <el-button type="primary" size="mini" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-row>
        <el-table
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
          size="small"
        >
          <el-table-column type="index" width="50" title="鼠标单击选中">
          </el-table-column>
          <el-table-column property="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column property="oa" label="oa账号" width="120">
          </el-table-column>
          <el-table-column property="phone" label="手机号码"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleSelect(scope.row)"
                type="text"
                size="small"
                >选择</el-button
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
            @current-change="handleCurrentPageChange"
          >
          </el-pagination>
        </div>
      </el-scrollbar>
      
      <!-- <div class="btn-group">
          <el-button  size="small">取消</el-button>
          <el-button type="primary" size="small">确定</el-button>
      </div> -->

    </el-drawer>
    <el-dialog
      title="请选择所属岗位"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-select style="width:100%" v-model="role" placeholder="请选择" @change="selectRole">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSelect"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {
          name:'',
          oa:''
      },
      tableData: [],
      limit: 9,
      currentPage: 1,
      total: 0,
      currentRow: null,
      options: [],
      optionsObj:null,
      role:'',
      selectedOa:'',
      selectedRolObj:{},
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
        ...this.formData
      });
      if (res.code === 0) {
        this.tableData = res.page.list;
        this.total = res.page.totalCount;
      }
    },
    async handleSelect({oa}) {
        this.selectedOa = oa
        let res = await this.$http.queryRoleList({
            oa
        })
        if(res.code===0) {
            this.options = res.data.map(item => {
                return {
                    value: item.deptName,
                    label: item.deptName
                }
            })
            this.optionsObj = res.data.reduce((last,cur)=>{
                return {
                    ...last,
                    [cur.deptName]: cur
                }
            },{})
            this.dialogVisible = true
        }
    },
    sureSelect() {
        this.$emit('selected', this.selectedRolObj)
        this.dialogVisible = false
    },
    selectRole(val){
        this.selectedRolObj = {...this.optionsObj[val],oa: this.selectedOa}
    },
    handleSizeChange() {},
    handleCurrentPageChange() {},
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    onOpen(){},
    onClose(){

    }
  },
};
</script>

<style lang="stylus" scoped>
.el-table {
  margin: 0 5px;
}
.el-scrollbar {
    height: 100%;
}
.pagination-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin: 20px;
}

.btn-group {
  text-align: center;
}
</style>