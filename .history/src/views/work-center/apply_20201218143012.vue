<template>
  <div>
    <div class="title-tip">申请信息：</div>
    <el-row :gutter="15">
      <!-- 申请的表单 -->
      <el-form
        ref="elForm"
        :model="formData"
        size="small"
        label-width="150px"
        disabled
      >
        <el-col :span="22">
          <el-form-item class="is-required" label="工单标题" prop="orderTitle">
            <el-input
              v-model="formData.orderTitle"
              placeholder="请输入工单标题"
              :maxlength="100"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item class="is-required" label="申请人" prop="applyName">
            <el-input
              v-model="formData.applyName"
              :disabled="true"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item
            class="is-required"
            label="申请人电话"
            prop="applyPhone"
          >
            <el-input
              v-model="formData.applyPhone"
              :disabled="true"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item class="is-required" label="申请单位" prop="applyOrg">
            <el-input
              v-model="formData.applyOrg"
              :disabled="true"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item class="is-required" label="申请部门" prop="applySite">
            <el-input
              v-model="formData.applySite"
              :disabled="true"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item class="is-required" label="工单类别" prop="orderType">
            <el-input
              v-model="formData.orderType"
              :style="{ width: '100%' }"
            ></el-input>
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
            <el-input
              v-model="formData.orderLevel"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item
            class="is-required"
            label="要求完成日期"
            prop="completeDate"
          >
            <el-date-picker
              v-model="formData.completeDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '100%' }"
              placeholder="请选择日期"
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
          <el-form-item class="is-required" label="承办人" prop="acceptName">
            <el-input
              v-model="formData.acceptName"
              placeholder="请选择承办人"
              readonly
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
          <el-form-item
            class="is-required"
            label="需求任务概要"
            prop="requireOutline"
          >
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
          <el-form-item
            class="is-required"
            label="需求任务详细说明"
            prop="requireDetails"
          >
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
      </el-form>
       <el-col :span="22">
          <el-table :data="startAttachmentList" border size="small">
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
                  v-model="scope.row.description"
                  placeholder="请输入标题"
                  size="small"
                  readonly
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="time"
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
              prop="name"
              label="附件名称"
            >
            </el-table-column>
            <el-table-column label="操作" width="130">
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
              </template>
            </el-table-column>
          </el-table>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="title-tip">办理意见：</div>
    <el-row :gutter="15">
      <el-form ref="form" :model="approveDatas" label-width="120px">
        <el-col :span="11">
          <el-form-item class="is-required" label="请选择：">
            <el-radio-group v-model="approveDatas.approveFlag">
              <el-radio :label="0">同意</el-radio>
              <el-radio :label="1">不同意</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="请填写意见：" class="is-required" >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="approveDatas.approveMsg"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请选择审批人" class="is-required">
            <el-select style="width:100%" v-model="shishibumenOa" placeholder="请选择" @change="selectLeader">
          <el-option
            v-for="item in shishiLeaderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="24" class="btn-group">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button >取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
const pathHead = 'http://10.210.9.218/uniflowFileSystem'
export default {
  data() {
    return {
      currentFormKey:'',
      processInstanceId:'', //流程id
      taskId:'', // 任务id
      formData: {},
      approveDatas: {
        approveMsg:'',
        approveFlag:'',
      },
      apply: "", //0为同意，1为不同意
      startAttachmentList: [],
      dialogVisible1:false, //选择实施部门领导弹框
      shishibumenName: '', // 实施部门领导名字
      shishibumenOa: '', //实施部门领导oa
      shishiLeaderOptions:[],
    };
  },
  created() {
    let { processInstanceId, taskId } = this.$route.query;
    this.processInstanceId = processInstanceId
    this.taskId = taskId
    processInstanceId && this.getFormTableByPid(processInstanceId);
    processInstanceId && this.getAttachmentByProcessInstanceId(processInstanceId)
    processInstanceId &&
      taskId &&
      this.getCurrentFromJson(processInstanceId, taskId);
  },
  methods: {
    async getFormTableByPid(processInstanceId) {
      let res = await this.$http.getFormTableByPid({
        processInstanceId,
      });
      if (res.code === 0) {
        this.formData =
          res.data && res.data.formParams && JSON.parse(res.data.formParams);
      }
      console.log(res);
    },
    async getAttachmentByProcessInstanceId(processInstanceId) { // 请求该流程下全部附件
      let res = await this.$http.getAttachmentByProcessInstanceId({
        processInstanceId
      })
      if(res.code === 0) {
        this.startAttachmentList  = res.data.filter(item => item.type==='WlbgFormKey1')
      }
    },
    async getCurrentFromJson(processInstanceId,taskId) { //查看当前节点是否有表单
      let res = await this.$http.getCurrentFromJson({
        processInstanceId,
        taskId
      })
      if(res.code === 0) {
        let data = res.formData && res.formData.customDeForm && JSON.parse(res.formData.customDeForm)
        this.currentFormKey = data && data.formKey
      }
      console.log(JSON.parse(res.formData.customDeForm))
    },
     handleSee({url}) { //预览
      location.href = pathHead+url
    },
    handleLoad({url}) { // 下载
      location.href = pathHead+url
    },
    async submitForm(){
      let res = await this.$http.apply({
        taskId: this.taskId,
        pId: this.processInstanceId,
        userId: 'junbinmo', //登陆者oa，暂时写死测试
        approveDatas:this.approveDatas
      })
      if(res.code === 0) {
        this.$message.success('提交成功')
        this.$router.push('/workCenter/finished')
      } else {
        this.$message.error('提交失败')
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
.title-tip {
  padding-left: 5px;
  margin-bottom: 10px;
  border-left: 3px solid #d6000f;
  font-weight: 600;
  font-size: 14px;
}

.module {
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
}

.auto-label .tip {
  color: red;
}
</style>