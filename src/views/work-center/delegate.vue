<template>
  <div>
    <el-dialog
      :visible="dialogVisible"
      :title="dialogTitle"
      width="500px"
      :rules="dialogRules"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <el-form
        :model="delegate"
        ref="addForm"
        label-width="100px"
        :rules="dialogRules"
      >
        <el-form-item label="委托事件" prop="title">
          <el-input
            v-model="delegate.title"
            placeholder="请输入委托事件"
          ></el-input>
        </el-form-item>
        <el-form-item label="委托业务" prop="business">
          <el-select
            v-model="delegate.business"
            placeholder="请选择委托业务"
            filterable
            multiple
            reserve-keyword
            class="itemWidth"
            :loading="businessLoading"
            value-key="processKey"
          >
            <el-option
              v-for="item in businessOptions"
              :key="item.processKey"
              :label="item.processName"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="委托人" prop="entrustUsername">-->
        <!--          <el-input-->
        <!--            v-model="delegate.entrustUsername"-->
        <!--            @click.native="showDrawer()"-->
        <!--          >-->
        <!--          </el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="被委托人" prop="entrustDUsername">
          <el-input
            v-model="delegate.entrustDUsername"
            @click.native="showDrawer('选择被委托人')"
            placeholder="请选择被委托人"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="委托时间" prop="timeRange">
          <el-date-picker
            v-model="delegate.timeRange"
            @change="handleDateTimeChange"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="委托开始时间"
            end-placeholder="委托结束时间"
            align="right"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否启用" prop="statuz">
          <el-switch
            v-model="delegate.statuz"
            :active-value="0"
            inactive-value="1"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="委托原因" prop="reason">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="delegate.reason"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAddDelegate"
          :loading="dialogConfirmButtonLoading"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-row :gutter="8">
      <el-form
        ref="searchForm"
        :model="searchCondition"
        :rules="rules"
        size="small"
        label-width="150px"
      >
        <el-col :span="10">
          <el-form-item label="委托事件" prop="title">
            <el-input
              v-model="searchCondition.title"
              placeholder="请输入委托事件"
              clearable
              class="itemWidth"
              size="small"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="委托业务" prop="business">
            <!--            <el-input-->
            <!--              v-model="searchCondition.business"-->
            <!--              placeholder="请输入委托业务"-->
            <!--              clearable-->
            <!--              class="itemWidth"-->
            <!--              size="small"-->
            <!--            >-->
            <!--            </el-input>-->
            <el-select
              v-model="searchCondition.business"
              placeholder="请选择委托业务"
              filterable
              reserve-keyword
              class="itemWidth"
              :loading="businessLoading"
              value-key="processKey"
            >
              <el-option
                v-for="item in businessOptions"
                :key="item.processKey"
                :label="item.processName"
                :value="item.processKey"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="searchCondition.startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="请选择开始时间"
              class="itemWidth"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="searchCondition.endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="请选择结束时间"
              class="itemWidth"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="是否启用" prop="statuz">
            <el-select
              v-model="searchCondition.statuz"
              placeholder="请选择是否启用"
              clearable
              class="itemWidth"
              size="small"
            >
              <el-option
                v-for="(item, index) in statuzOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="委托原因" prop="reason">
            <el-input
              v-model="searchCondition.reason"
              placeholder="请输入委托原因"
              clearable
              class="itemWidth"
              size="small"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" v-if="authority === '超管'">
          <el-form-item label="委托人" prop="entrustUsername">
            <el-input
              v-model="searchCondition.entrustUsername"
              placeholder="请输入委托人"
              clearable
              class="itemWidth"
              size="small"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="被委托人" prop="entrustDUsername">
            <el-input
              v-model="searchCondition.entrustDUsername"
              placeholder="请输入被委托人"
              clearable
              class="itemWidth"
              size="small"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" :class="{ button__search: authority !== '超管' }">
          <el-button type="primary" @click="getDataList" size="small"
            >查询</el-button
          >
        </el-col>
      </el-form>
    </el-row>
    <el-button type="primary" @click="handleOpen" size="small">新增</el-button>
    <!--    <el-button type="danger" @click="handleDeleteSelected" size="small"-->
    <!--      >批量删除</el-button-->
    <!--    >-->
    <el-table :data="tableData" style="width: 95%" ref="delegateTable">
      <!--      <el-table-column type="selection" width="55"> </el-table-column>-->
      <!--      <el-table-column prop="id" label="ID"></el-table-column>-->
      <el-table-column prop="title" label="委托事件"></el-table-column>
      <el-table-column prop="businessTitle" label="委托业务"></el-table-column>
      <el-table-column
        prop="entrustAccount"
        label="委托人账号"
        width="90"
        v-if="authority === '超管'"
      ></el-table-column>
      <el-table-column
        prop="entrustUsername"
        label="委托人"
        v-if="authority === '超管'"
      ></el-table-column>
      <el-table-column
        prop="entrustDAccount"
        label="被委托人账号"
        width="110"
      ></el-table-column>
      <el-table-column
        prop="entrustDUsername"
        label="被委托人"
      ></el-table-column>
      <el-table-column prop="statuz" label="委托状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.statuz"
            :active-value="0"
            inactive-value="1"
            @change="handleChangeStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="委托开始时间"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="endTime"
        label="委托结束时间"
        width="120"
      ></el-table-column>
      <el-table-column prop="reason" label="委托原因"></el-table-column>
      <el-table-column fixed="right" label="操作" width="125">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEditOpen(scope.row)"
          ></el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="searchCondition.page"
      :page-size="searchCondition.limit"
      layout="total, prev, pager, next, jumper"
      :total="searchCondition.totalCount"
    >
    </el-pagination>
    <find-drawer
      :visible.sync="drawerVisible"
      size="50%"
      :title="drawerTitle"
      @selected="handlePersonSelect"
      :isSelectDepartment="false"
    ></find-drawer>
  </div>
</template>

<script>
import {
  getDelegate,
  createDelegate,
  delDelegate,
  updateDelegate,
  toggleDelegate,
  getBusinessList,
} from "@/api";
import findDrawer from "@/views/work-center/components/findDrawer.vue";
import { mapGetters } from "vuex";
import { cloneDeep } from "lodash";

const originDelegate = {
  title: "",
  business: "",
  entrustAccount: "",
  entrustUsername: "",
  entrustDAccount: "",
  entrustDUsername: "",
  statuz: 0,
  reason: "",
  startTime: "",
  endTime: "",
  timeRange: [],
};
const checkDateSelected = (rule, value, callback) => {
  console.log(value, "@@!!", value?.length);
  if (value?.length !== 2) {
    callback(new Error("请选择委托时间!!!"));
  }
};

export default {
  components: {
    findDrawer,
  },
  props: [],
  data() {
    return {
      authority: "普通员工",
      drawerTitle: "",
      drawerVisible: false,
      dialogConfirmButtonLoading: false,
      dialogVisible: false,
      dialogTitle: "",
      strs: {
        nameStr: "",
        accountStr: "",
      },
      dialogRules: {
        title: [{ required: true, message: "请输入委托事件", trigger: "blur" }],
        business: [
          { required: true, message: "请输入委托业务", trigger: "blur" },
        ],
        entrustUsername: [
          { required: true, message: "请输入委托人", trigger: "blur" },
        ],
        entrustDUsername: [
          { required: true, message: "请输入被委托人", trigger: "blur" },
        ],
        statuz: [
          { required: true, message: "请输入是否启用", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请输入委托原因", trigger: "blur" },
        ],
        timeRange: [
          { required: true, message: "请选择委托时间", trigger: "blur" },
        ],
      },
      tableData: [],
      businessOptions: [],
      originOptions: [],
      businessLoading: false,
      searchCondition: {
        title: undefined,
        business: undefined,
        entrustUsername: "",
        entrustDUsername: "",
        statuz: undefined,
        reason: undefined,
        startTime: "",
        endTime: "",

        page: 1,
        limit: 10,
        totalCount: 0,
      },
      timeRange: [],
      delegate: {
        // ...originDelegate
        // title: "2",
        // business: "3",
        // entrustAccount: "4",
        // entrustUsername: "5",
        // entrustDAccount: "6",
        // entrustDUsername: "7",
        // statuz: "0",
        // reason: "hh",
        // startTime: "",
        // endTime: "",
      },
      rules: {
        title: [],
        business: [],
        entrustDUsername: [],
        field109: [],
        statuz: [],
        reason: [],
      },
      statuzOptions: [
        {
          label: "启用",
          value: "0",
        },
        {
          label: "禁用",
          value: "1",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    user: {
      handler: function () {
        this.init();
      },
      deep: true,
    },
  },
  created() {
    this.init();
    this.getBusinessList("", true);
  },
  mounted() {},
  methods: {
    init(isGetDataList = true) {
      this.searchCondition.entrustUsername = this.user.name;
      this.searchCondition.entrustAccount = this.user.oa;
      originDelegate.entrustUsername = this.user.name;
      originDelegate.entrustAccount = this.user.oa;
      // Object.assign(this.delegate, cloneDeep(originDelegate));
      this.delegate = cloneDeep(originDelegate);
      if (isGetDataList) this.getDataList();
    },
    getDataList(isResetCurrentPage) {
      console.log(this.searchCondition);
      if (isResetCurrentPage) this.searchCondition.page = 1;
      getDelegate(this.searchCondition)
        .then(({ page }) => {
          this.tableData =
            page?.list.map((item) => {
              return {
                ...item,
                businessTitle: JSON.parse(item.business)
                  .map((b) => b.processName)
                  .join("，"),
              };
            }) || [];
          this.searchCondition.totalCount = page?.totalCount;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("查询失败");
        });
    },
    handleCurrentChange(currentPage) {
      this.searchCondition.page = currentPage;
      console.log(currentPage);
      this.getDataList();
    },
    // 新增修改
    async handleAddDelegate() {
      console.log(this.delegate);
      try {
        await this.$refs.addForm.validate();
        this.dialogConfirmButtonLoading = true;

        if (!this.delegate.id) {
          createDelegate({
            ...this.delegate,
            business: JSON.stringify(this.delegate.business),
          })
            .then(({ code, msg }) => {
              if (code === 0) {
                this.$message.success("新增委托成功");
                this.getDataList();
                this.handleClose();
              } else {
                this.$message.error(msg);
              }
            })
            .catch((err) => {
              console.error(err);
              this.$message.error("新增委托失败");
            })
            .finally(() => {
              this.dialogConfirmButtonLoading = false;
            });
        } else {
          updateDelegate({
            ...this.delegate,
            business: JSON.stringify(this.delegate.business),
          })
            .then(({ code, msg }) => {
              if (code === 0) {
                this.$message.success("修改委托成功");
                this.getDataList();
                this.handleClose();
              } else {
                this.$message.error(msg);
              }
            })
            .catch((err) => {
              console.error(err);
              this.$message.error("修改委托失败");
            });
        }
      } catch (err) {
        console.error(err);
      }
    },
    handleDateTimeChange(range) {
      console.log(range, "!!!", range?.[0]);
      this.delegate.startTime = range?.[0];
      this.delegate.endTime = range?.[1];
      if (range) {
        console.log("aaa");
        this.delegate.timeRange.splice(0, 2, ...range);
      } else {
        console.log("bbb");
        this.delegate.timeRange?.splice(0, 2);
      }
      // this.timeRange = range ?? []
      // this.delegate.timeRange = range ?? []
      console.log(this.timeRange, "@@@");
    },
    handleDelete({ id }) {
      this.deleteDelegate({ id });
    },
    deleteDelegate({ id, ids }) {
      this.$confirm(
        id ? "确认要删除该委托吗？" : "确认删除选中委托吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delDelegate({ ids: id || ids.toString() }).then(({ code }) => {
            if (code === 0) {
              this.$message.success("删除成功");
              this.getDataList();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEditOpen(row) {
      // this.businessOptions = JSON.parse(row.business);
      Object.assign(this.delegate, {
        ...row,
        business: JSON.parse(row.business),
      });
      console.log(this.delegate.timeRange, "@@@@###");
      this.delegate.timeRange?.splice(0, 2, row.startTime, row.endTime);
      console.log(this.delegate.timeRange, "33333");
      this.handleOpen({ title: "编辑委托信息" });
    },
    // handleDeleteSelected() {
    //   const selected = this.$refs.delegateTable.selection;
    //   if (!selected.length) this.$message.warning("请选择至少一个委托");
    //   const ids = selected.map(item => item.id);
    //   this.deleteDelegate({ ids });
    // },
    handleOpen({ title = "新增委托信息" } = {}) {
      // if (title.includes("新增")) this.businessOptions = this.originOptions;
      this.dialogTitle = title;
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs.addForm.clearValidate();
      // this.delegate = originDelegate;
      this.init(false);
      this.dialogVisible = false;
      this.dialogConfirmButtonLoading = false;
    },
    handleChangeStatus(row) {
      let { id, statuz } = row;
      statuz = statuz ? 0 : "1";
      console.log(id, statuz);
      toggleDelegate({ id })
        .then(({ code, msg }) => {
          if (code === 0) {
            this.$message.success("修改状态成功");
          } else {
            row.statuz = statuz;
            this.$message.error(msg);
          }
        })
        .catch((err) => {
          console.error(err);
          row.statuz = statuz;
          this.$message.error("修改状态失败");
        });
    },
    getBusinessList(query = "", first = false) {
      this.businessLoading = true;
      getBusinessList({
        processName: query,
      })
        .then(({ data }) => {
          if (first) this.originOptions = data;
          this.businessOptions = data;
        })
        .finally(() => {
          this.businessLoading = false;
        });
    },
    showDrawer(title = "选择委托人") {
      this.drawerTitle = title;
      this.drawerVisible = true;
      if (title.includes("被委托人")) {
        this.strs.nameStr = "entrustDUsername";
        this.strs.accountStr = "entrustDAccount";
      } else {
        this.strs.nameStr = "entrustUsername";
        this.strs.accountStr = "entrustAccount";
      }
      console.log("open");
    },
    handlePersonSelect(person) {
      this.delegate[this.strs.nameStr] = person.name;
      this.delegate[this.strs.accountStr] = person.oa;
    },
  },
};
</script>

<style lang="stylus" scoped>
>>> .el-form-item.el-form-item--medium > .el-form-item__content .el-button {
  margin-left: -150px !important;
}
>>> .el-pagination {
  float: right;
  margin-right: 25px;
}
.itemWidth {
  width: 100%;
}
.button__search {
  margin-left: 10px;
}
</style>
