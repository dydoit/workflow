<template>
  <div>
    <el-row :gutter="13">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="small"
        label-width="150px"
      >
        <el-col :span="22">
          <el-form-item label="工单标题" prop="orderTitle">
            <el-input
              v-model="formData.orderTitle"
              placeholder="请输入工单标题"
              :maxlength="100"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请人" prop="applyName">
            <el-input v-model="formData.applyName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请人电话" prop="applyPhone">
            <el-input
              v-model="formData.applyPhone"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请单位" prop="applyOrg">
            <el-input
              v-model="formData.applyOrg"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请部门" prop="applySite">
            <el-input
              v-model="formData.applySite"
              :disabled="true"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工单类别" prop="orderType">
            <el-select
              v-model="formData.orderType"
              placeholder="请选择工单类别"
              :style="{ width: '100%' }"
              clearable
            >
              <el-option
                v-for="(item, index) in orderTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item class="is-required" prop="orderLevel">
            <span slot="label" class="auto-label"
              >工单等级
              <el-popover
                placement="top"
                width="150"
                trigger="hover"
                popper-class="bg-popover"
                content="高级（既紧急又重要的任务）、中级（紧急、重要的任务）、一般（除高级、中级以外的其他工单）"
              >
                <i class="tip" slot="reference">(?)</i>
              </el-popover>
            </span>
            <el-select
              v-model="formData.orderLevel"
              placeholder="请选择工单等级"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in orderLevelOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="要求完成日期" prop="completeDate">
            <el-date-picker
              v-model="formData.completeDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '100%' }"
              placeholder="请选择日期"
              :picker-options="pickerOptions"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="投资金额(万元)" prop="investmentMoney">
            <el-input
              v-model="formData.investmentMoney"
              placeholder="请输入投资金额(万元)"
              clearable
              @change="filter1"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="效益金额(万元)" prop="profitMoney">
            <el-input
              v-model="formData.profitMoney"
              placeholder="请输入效益金额(万元)"
              clearable
              @change="filter2"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办人" prop="acceptName">
            <el-input
              v-model="formData.acceptName"
              placeholder="请选择承办人"
              readonly
              @click.native="showDrawer"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办人电话" prop="acceptPhone">
            <el-input
              v-model="formData.acceptPhone"
              placeholder="承办人电话"
              :disabled="true"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办部门" prop="acceptSite">
            <el-input
              v-model="formData.acceptSite"
              placeholder="承办部门"
              :disabled="true"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办单位" prop="acceptOrg">
            <el-input
              v-model="formData.acceptOrg"
              :disabled="true"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="需求任务概要" prop="requireOutline">
            <el-input
              v-model="formData.requireOutline"
              type="textarea"
              placeholder="请输入需求任务概要"
              :maxlength="2000"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="需求任务详细说明" prop="requireDetails">
            <el-input
              v-model="formData.requireDetails"
              type="textarea"
              placeholder="请输入需求任务详细说明"
              :maxlength="5000"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="上传附件" prop="field118">
            <el-upload
              ref="field118"
              :file-list="field118fileList"
              :action="attachmentAction"
              :before-upload="attachmentBeforeUpload"
              :show-file-list="false"
              :on-success="handleUpload"
              :on-error="handleUploadErr"
              :on-progress="waite"
              :headers="myHeaders"
            >
              <el-button size="small" type="primary" icon="el-icon-upload"
                >点击上传</el-button
              >
              <span style="margin-left: 8px; font-size: 12px; color: #606266"
                >上传文件格式：jpg/png/jpeg/xls/xlsx/doc/docx/pdf/ppt/pptx/rar/zip（建议不超过20M）</span
              >
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-table
            :data="attachmentList"
            border
            size="small"
            v-loading="uploadFlag"
          >
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              label="文档类型"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.fileComment"
                  placeholder="请输入标题"
                  size="small"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="uploadTime"
              width="120"
              label="创建时间"
            >
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="userName"
              width="80"
              label="创建人"
            >
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="fileName"
              label="附件名称"
            >
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="handleSee(scope.row)" type="text" size="mini"
                  >预览</el-button
                >
                <el-button
                  @click="handleLoad(scope.row)"
                  type="text"
                  size="mini"
                  >下载</el-button
                >
                <el-button
                  @click="handleDel(scope.row)"
                  type="danger"
                  size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="btn-group">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm" :disabled="uploadFlag"
              >提交</el-button
            >
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <find-drawer
      :visible.sync="drawer"
      size="50%"
      title="选择承办人"
      @selected="selectedAccept"
    ></find-drawer>
    <el-dialog
      title="请选择需求部门领导"
      width="25%"
      :visible.sync="dialogVisible"
    >
      <el-select
        style="width: 100%"
        filterable
        v-model="formData.xuqiubumenOa"
        placeholder="请选择"
        @change="selectLeader"
      >
        <el-option
          v-for="item in leaderOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span sty le="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.value
          }}</span>
        </el-option>
      </el-select>
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
import findDrawer from "./components/findDrawer.vue";
import { mapGetters } from "vuex";
const pathHead = "http://10.210.9.218/uniflowFileSystem";
const formKey = "wlbg";
export default {
  components: { findDrawer },
  props: [],
  data() {
    return {
      isClickFlag: false,
      uploadFlag: false,
      drawer: false,
      dialogVisible: false,
      // applyName: "",
      // applyOa: "",
      currentFormKey: "WlbgFormKey1",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      attachmentList: [
        // 附件列表
      ],
      formData: {
        orderTitle: "",
        applyName: "",
        applyOa: "", //
        applyPhone: "",
        applyOrg: "", // 申请人单位名称
        applyOrgCode: "", //申请人单位code
        applySiteCode: "", // 申请人部门code
        applySite: "", // 申请人部门名称
        orderType: "",
        orderLevel: "",
        completeDate: "",
        investmentMoney: "",
        profitMoney: "",
        acceptOa: "", //承办人oa
        acceptName: "", //承办人名字
        acceptPhone: "", // 承办人电话
        acceptSite: "", // 承办人部门名称
        acceptSiteCode: "", // 承办部门code
        acceptOrg: "", //  承办人单位名称
        acceptOrgCode: "", //承办人单位code
        requireOutline: "",
        requireDetails: "",
        xuqiubumenName: "", // 需求部门领导名字
        xuqiubumenOa: "", // 需求部门领导oa
      },
      rules: {
        orderTitle: [
          {
            required: true,
            message: "请输入工单标题",
            trigger: "blur",
          },
        ],
        orderType: [
          {
            required: true,
            message: "请选择工单类别",
            trigger: "change",
          },
        ],
        orderLevel: [
          {
            required: true,
            message: "请选择工单等级",
            trigger: "change",
          },
        ],
        completeDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        acceptName: [
          {
            required: true,
            message: "请选择承办人",
            trigger: "change",
          },
        ],
        requireOutline: [
          {
            required: true,
            message: "请输入需求任务概要",
            trigger: "blur",
          },
        ],
        requireDetails: [
          {
            required: true,
            message: "请输入需求任务详细说明",
            trigger: "blur",
          },
        ],
      },
      attachmentAction: "/uniflowApi/manage/tblmanageattachment/addAttachment",
      field118fileList: [],
      orderTypeOptions: [
        {
          label: "建设",
          value: "建设",
        },
        {
          label: "维护",
          value: "维护",
        },
        {
          label: "优化",
          value: "优化",
        },
        {
          label: "投诉",
          value: "投诉",
        },
        {
          label: "交付",
          value: "交付",
        },
        {
          label: "能力支撑",
          value: "能力支撑",
        },
        {
          label: "综合支撑",
          value: "综合支撑",
        },
        {
          label: "客户感知",
          value: "客户感知",
        },
        {
          label: "其他",
          value: "其他",
        },
      ],
      orderLevelOptions: [
        {
          label: "高级",
          value: "高级",
        },
        {
          label: "中级",
          value: "中级",
        },
        {
          label: "一般",
          value: "一般",
        },
      ],
      leaderOptions: [],
      leaderObj: {},
      myHeaders: {
        authorization: sessionStorage.getItem("token"),
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    "user.siteCode"() { 
      this.formData.applyName = this.user.name
      this.formData.applyOrg = this.user.orgName
      this.formData.applySite = this.user.siteName
      this.formData.applySiteCode = this.user.siteCode
      this.formData.applyPhone = this.user.phone
      this.formData.acceptOrgCode = this.user.orgCode
      this.getLeaderList();
    }
  },
  created() {
    this.getLeaderList();
    this.formData.applyName = this.user.name
    this.formData.applyOrg = this.user.orgName
    this.formData.applySite = this.user.siteName
    this.formData.applySiteCode = this.user.siteCode
    this.formData.applyPhone = this.user.phone
    this.formData.acceptOrgCode = this.user.orgCode
  },
  mounted() {},
  methods: {
    filter1() {
      if (!isNaN(Number(this.formData.investmentMoney))) {
        this.formData.investmentMoney = Number(
          this.formData.investmentMoney
        ).toFixed(4);
      } else {
        this.formData.investmentMoney = "";
        this.$message.error("投资金额必须是数字");
      }
    },
    filter2() {
      if (!isNaN(Number(this.formData.profitMoney))) {
        this.formData.profitMoney = Number(this.formData.profitMoney).toFixed(
          4
        );
      } else {
        this.formData.profitMoney = "";
        this.$message.error("效益金额必须是数字");
      }
    },
    waite() {
      // 上传过程中等待
      this.uploadFlag = true;
    },
    async getLeaderList() {
      let res = await this.$http.queryLeaderList({
        limit: 1000,
        page: 1,
        siteCode: this.$store.state.user.siteCode,
      });
      if (res.code === 0) {
        this.leaderOptions =
          res.page &&
          res.page.list.map((item) => {
            return {
              value: item.oa,
              label: item.name,
            };
          });
        this.leaderObj =
          res.page &&
          res.page.list.reduce((last, cur) => {
            return {
              ...last,
              [cur.oa]: cur,
            };
          }, {});
      }
    },
    showDrawer() {
      this.drawer = true;
    },
    selectLeader(val) {
      if (val) {
        this.formData.xuqiubumenName = this.leaderObj[val].name;
      }
    },
    async sureSubmit() {
      //选好审批领导提交
      if (this.isClickFlag) {
        this.$message.error("请勿频繁点击提交");
        return;
      }
      if (!this.formData.xuqiubumenOa) {
        this.$message.error("请选择需求部门领导");
        return;
      }
      this.isClickFlag = true;
      let params = {
        proInsDatas: {
          creatorUserCode: this.user.oa,
          formName: this.formData.orderTitle,
          systemSn: "flow",
          processDefinitionKey: "WlbgProcessKey",
        },
        formDatas: [
          {
            formKey: "WlbgFormKey1",
            formData: JSON.stringify({
              ...this.formData,
              applyName: this.user.name,
              applyOa: this.user.oa,
            }),
          },
        ],
        fileDatas: this.attachmentList.map((item) => ({
          fileId: item.fileId,
          fileUrl: item.fileUrl,
          fileName: item.fileName,
          fileType: this.currentFormKey,
          fileComment: item.fileComment,
        })),
      };
      try {
        let res = await this.$http.addDelegate(params);
        if (res.code === 0) {
          this.$message.success("提交成功");
          this.$router.push({ path: "/workCenter/list" });
        } else {
          alert(res.msg);
        }
      } catch (err) {
        console.log(err);
      }
      this.isClickFlag = false;
    },
    selectedAccept({
      deptName,
      deptCode,
      orgCode,
      orgCodeName,
      oa,
      name,
      phone,
    }) {
      // 已选好承办人
      this.formData = {
        ...this.formData,
        acceptOa: oa,
        acceptName: name,
        acceptPhone: phone,
        acceptSite: deptName, // 承办人部门名称
        acceptSiteCode: deptCode, // 承办部门code
        acceptOrg: orgCodeName, //  承办人单位名称
        acceptOrgCode: orgCode, // 承办单位code
      };
    },
    submitForm() {
      this.$refs["elForm"].validate(async (valid) => {
        if (!valid) return;
        this.dialogVisible = true;
      });
    },
    handleSee({ fileUrl }) {
      //预览
      const seePath = "http://10.210.9.218:8088/onlinePreview?url=";
      let unicodePath = encodeURIComponent(pathHead + fileUrl);
      window.open(seePath + unicodePath, "_blank");
    },
    handleLoad({ fileUrl }) {
      // 下载
      location.href = pathHead + fileUrl;
    },
    handleDel({ fileId }) {
      // 删除附件(
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.delAttach({
            id: fileId,
          });
          if (res.code === 0) {
            this.attachmentList = this.attachmentList.filter(
              (item) => item.fileId !== fileId
            );
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleUpload(res, file, fileList) {
      if (res.code === 0) {
        let {
          fileUrl,
          fileName,
          userName,
          uploadTime,
          fileId,
          fileType,
          deleteFlag,
        } = res;
        this.attachmentList.push({
          fileName,
          fileComment: "",
          fileId,
          fileType,
          fileUrl,
          uploadTime,
          userName,
          deleteFlag,
        });
      } else {
        this.$message.error(`${res.msg}`);
      }
      this.uploadFlag = false;
    },
    handleUploadErr(err, file, fileList) {},
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    attachmentBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 5;
      if (!isRightSize) {
        this.$message.error("文件大小超过 5MB");
      }
      return isRightSize;
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-upload__tip {
  line-height: 1.2;
}

.btn-group {
  margin-top: 40px;
}

.auto-label .tip {
  color: red;
}
</style>