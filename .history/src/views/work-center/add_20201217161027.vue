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
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请人" prop="applyName">
            <el-input
              v-model="formData.applyName"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请人电话" prop="applyPhone">
            <el-input
              v-model="formData.applyPhone"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请单位" prop="applyOrg">
            <el-input
              v-model="formData.applyOrg"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请部门" prop="applySite">
            <el-input
              v-model="formData.applySite"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工单类别" prop="orderType">
            <el-select
              v-model="formData.orderType"
              placeholder="请选择工单类别"
              clearable
              :style="{ width: '100%' }"
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
              :style="{ width: '100%' }"
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
              :style="{ width: '100%' }"
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
              :style="{ width: '100%' }"
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
              :style="{ width: '100%' }"
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
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办单位" prop="acceptOrg">
            <el-input
              v-model="formData.acceptOrg"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
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
            >
              <el-button size="small" type="primary" icon="el-icon-upload"
                >点击上传</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-table :data="attachmentList" border size="small">
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              label="文档标题"
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
                <el-button @click="handleLoad(scope.row)" type="text" size="mini"
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
            <el-button type="primary" @click="submitForm">提交</el-button>
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
     :visible.sync="dialogVisible">
      <el-select style="width:100%" v-model="formData.xuqiubumenOa" placeholder="请选择" @change="selectLeader">
        <el-option
          v-for="item in leaderOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sureSubmit" size="small"
          >确定</el-button
        >
      </span>
         
    </el-dialog>
  </div>
</template>

<script>
import findDrawer from "./components/findDrawer.vue";
const pathHead = 'http://10.210.9.218/uniflowFileSystem'
export default {
  components: { findDrawer},
  props: [],
  data() {
    return {
      drawer: false,
      dialogVisible: true,
      creatorUserCode: "hejw29",
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
        applyName: "何建文",
        applyOa: "hejw", //
        applyPhone: "18565125218",
        applyOrg: "申请人单位", // 申请人单位名称
        applyOrgCode: "", //申请人单位code
        applySiteCode: "", // 申请人部门code
        applySite: "申请人部门", // 申请人部门名称
        orderType: "",
        orderLevel: "",
        completeDate: "",
        investmentMoney: "",
        profitMoney: "",
        acceptOa: "dengy29", //承办人oa
        acceptName: "", //承办人名字
        acceptPhone: "18602030872", // 承办人电话
        acceptSite: "承办单位", // 承办人部门名称
        acceptSiteCode: "", // 承办部门code
        acceptOrg: "承办部门", //  承办人单位名称
        acceptOrgCode: "", //承办人单位code
        requireOutline: "",
        requireDetails: "",
        xuqiubumenName: '', // 需求部门领导名字
        xuqiubumenOa:''  // 需求部门领导oa
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
      leaderOptions:[],
      leaderObj:{}
    };
  },
  created() {
    this.getLeaderList()
  },
  mounted() {},
  methods: {
    async getLeaderList(){
      let res = await this.$http.queryLeaderList({
          limit: 30,
          page: 1,
          siteCode: '00440038487'
      })
      if(res.code === 0) {
        this.leaderOptions = res.page&&res.page.list.map(item => {
          return {
            value: item.oa,
            label: item.name
          }
        })
        this.leaderObj = res.page&&res.page.list.reduce((last,cur)=>{
          return {
            ...last,
            [cur.oa]:cur
          }
        },{})
      }
    },
    showDrawer() {
      this.drawer = true;
    },
    selectLeader(val){
      if(val) {
        this.formData.xuqiubumenName = this.leaderObj[val].name
      }
    },
    async sureSubmit(){
      let params = {
           proInsDatas: {
            creatorUserCode: this.formData.applyOa,
            formName: this.formData.orderTitle,
            systemSn: "flow",
            processDefinitionKey: "WlbgProcessKey",
          },
          formDatas: [
            {
              formKey: "formkey1",
              formData: JSON.stringify(this.formData),
            }
          ],
          fileDatas: this.attachmentList.map(item => ({
              fileId:item.fileId,
              fileUrl:item.fileUrl,
              fileName:item.fileName,
              fileType:item.fileType,
              fileComment:item.fileComment
          }))
      }
      let res = await this.$http.addDelegate(params)
      console.log(res)
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

        // TODO 提交表单
        // let res = await addDelegate({
        //   proInsDatas: {
        //     creatorUserCode: this.formData.applyOa,
        //     formName: this.formData.orderTitle,
        //     systemSn: "flow",
        //     processDefinitionKey: "WlbgProcessKey",
        //   },
        //   formDatas: [
        //     {
        //       formKey: "formkey1",
        //       formData: JSON.stringify(this.formData),
        //     },
        //   ],
        // });
        // console.log(res);
      });
    },
    sureSubmit(){},
    handleSee({fileUrl}) { //预览
      location.href = pathHead+url
    },
    handleLoad({fileUrl}) { // 下载
      location.href = pathHead+url
    },
    async handleDel({fileId}) { // 删除附件
      let res = await this.$http.delAttach({
        id: fileId
      })
      if(res.code===0) {
        this.attachmentList = this.attachmentList.filter(item => item.fileId !== fileId)
      }
    },
    handleUpload(res, file, fileList) {
      if (res.code === 0) {
        let { fileUrl, fileName, userName, uploadTime, fileId,fileType} = res;
        this.attachmentList.push({
          fileName,
          fileComment: "",
          fileId,
          fileType,
          fileUrl,
          uploadTime,
          userName,
        });
      }
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    attachmentBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
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