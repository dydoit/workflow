<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="22" class="his-wrap">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="hisDrawer = true"
          >查看审批历史</el-button
        >
      </el-col>
    </el-row>
    <!-- 申请的表单 -->
    <div class="title-tip">申请信息：</div>
    <el-row :gutter="15">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="small"
        label-width="150px"
        :disabled="currentFormKey !== 'WlbgFormKey1'"
      >
        <el-col :span="11">
          <el-form-item label="工单编号">
            <el-input
              v-model="formData.flowWorkOrderNo"
              disabled
              :maxlength="100"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="提交日期">
            <el-input
              v-model="formData.flowCreateDate"
               disabled
              :maxlength="100"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item class="is-required" label="工单标题" prop="orderTitle">
            <el-input
              v-model="formData.orderTitle"
              placeholder="请输入工单标题"
              disabled
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
              :style="{ width: '100%' }"
               @change="filter2"
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
        <el-col :span="22" v-if="currentFormKey === 'WlbgFormKey1'">
          <el-form-item label="上传附件" prop="field118">
            <el-upload
              ref="field118"
              :action="attachmentAction"
              :before-upload="attachmentBeforeUpload"
              :show-file-list="false"
              :on-success="handleUploadStart"
            >
              <el-button size="small" type="primary" icon="el-icon-upload"
                >点击上传</el-button
              >
             <span style="margin-left:8px;font-size:12px;color: #606266;">只能上传jpg/png/jpeg/xls/xlsx/doc/docx/pdf/ppt/pptx/rar/zip文件，且不超过5M</span>
            </el-upload>
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
            label="文档类型"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.fileComment"
                placeholder="请输入标题"
                size="small"
                :disabled="currentFormKey !== 'WlbgFormKey1'"
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
                v-if="scope.row.deleteFlag === '0'"
                @click="handleDelStart(scope.row)"
                type="danger"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- 实施阶段表单 -->
    <!-- 当处于实施阶段时或者历史表单里有formKey为WlbgFormKey3就要渲染这个表单 -->
    <template v-if="currentFormKey === 'WlbgFormKey3'||shishiData.formKey === 'WlbgFormKey3'">
      <div class="title-tip">实施反馈：</div>
      <el-row :gutter="10">
        <el-form
          ref="shishiForm"
          :model="shishiData"
          :rules="shishiRules"
          size="small"
          label-width="120px"
          :disabled="currentFormKey!=='WlbgFormKey3'"
        >
          <el-col :span="7">
            <el-form-item class="is-required" label="完成情况">
              <el-select
                v-model="shishiData.completeSituation"
                placeholder="请选择"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in completeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="完成日期">
              <el-input disabled v-model="shishiData.completionTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="处理及时">
              <el-input disabled v-model="shishiData.handleTimely"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="备注">
              <el-input
                v-model="shishiData.acceptComment"
                type="textarea"
                placeholder="请输入说明"
                :maxlength="2000"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22" v-if="currentFormKey==='WlbgFormKey3'">
            <el-form-item label="上传附件">
              <el-upload
                ref="shishiAttatch"
                :action="attachmentAction"
                :before-upload="attachmentBeforeUpload"
                :show-file-list="false"
                :on-success="handleShishiUpload"
              >
                <el-button size="small" type="primary" icon="el-icon-upload"
                  >点击上传</el-button
                >
                <span style="margin-left:8px;font-size:12px;color: #606266;">只能上传jpg/png/jpeg/xls/xlsx/doc/docx/pdf/ppt/pptx/rar/zip文件，且不超过5M</span>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
        <el-col :span="22">
          <el-table :data="shishiAttachmentList" border size="small">
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
                  :disabled="currentFormKey!=='WlbgFormKey3'"
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
                  @click="handleDelShishi(scope.row)"
                  type="danger"
                  size="mini"
                  v-if="scope.row.deleteFlag === '0'"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </template>
    <!-- 结果评价 -->
    <!-- 当处于评价阶段时或者历史表单里有formKey为WlbgFormKey4就要渲染这个表单 -->
    <template v-if="currentFormKey === 'WlbgFormKey4' || evaluationData.formKey === 'WlbgFormKey4'">
      <div class="title-tip">结果评价：</div>
      <el-row :gutter="10">
        <el-form :model="evaluationData" size="small" label-width="120px" :disabled="currentFormKey!=='WlbgFormKey4'">
          <el-col :span="8">
            <el-form-item class="is-required">
              <span slot="label" class="auto-label"
                >回单质量
                <el-popover
                  placement="top"
                  width="150"
                  trigger="hover"
                  popper-class="bg-popover"
                  content="高（6分，严格按照工单要求完成），中（4分，工单整体完成，但在完备性、准确性上存在明显不足），低（1分，工单完成不符合要求）"
                >
                  <i class="tip" slot="reference">(?)</i>
                </el-popover>
              </span>
              <el-select
                v-model="evaluationData.receiptQualityScore"
                placeholder="请选择回单质量"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in receiptQualityScoreOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required">
              <span slot="label" class="auto-label"
                >回单及时性
                <el-popover
                  placement="top"
                  width="150"
                  trigger="hover"
                  popper-class="bg-popover"
                  content="及时（4分，严格按照工单时限要求完成）、超时（2分，工单超时48小时（含）以内）、严重超时（0分，工单超时48小时以上）"
                >
                  <i class="tip" slot="reference">(?)</i>
                </el-popover>
              </span>
              <el-select
                v-model="evaluationData.receiptTimelyScore"
                placeholder="请选择回单及时性"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in receiptTimelyScoreOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合计评价得分">
              <el-input disabled v-model="receiptSumScore"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22" v-if="currentFormKey==='WlbgFormKey4'">
            <el-form-item label="上传附件">
              <el-upload
                ref="evaluationAttatch"
                :action="attachmentAction"
                :before-upload="attachmentBeforeUpload"
                :show-file-list="false"
                :on-success="handleEvaluationUpload"
              >
                <el-button size="small" type="primary" icon="el-icon-upload"
                  >点击上传</el-button
                >
                <span style="margin-left:8px;font-size:12px;color: #606266;">只能上传jpg/png/jpeg/xls/xlsx/doc/docx/pdf/ppt/pptx/rar/zip文件，且不超过5M</span>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
        <el-table :data="evaluationAttachmentList" border size="small">
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
                :disabled="currentFormKey!=='WlbgFormKey4'"
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
                v-if="scope.row.deleteFlag === '0'"
                @click="handleDelEvaluation(scope.row)"
                type="danger"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-divider></el-divider>
    </template>
    <div class="title-tip">办理意见：</div>
    <el-row :gutter="15">
      <el-form ref="approveForm" :model="approveDatas" :rules="approveRules" label-width="120px">
        <el-col :span="11">
          <el-form-item class="is-required" label="请选择：">
            <el-radio-group v-model="approveDatas.approveFlag" prop="approveFlag">
              <el-radio :label="0">同意</el-radio>
              <el-radio :label="1" v-if="!(currentFormKey==='WlbgFormKey5' && hisFormDatas.filter(item=>item.formKey==='WlbgFormKey3'||item.formKey==='WlbgFormKey4').length > 0)&&currentFormKey!=='WlbgFormKey3'">不同意</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="请填写意见：" required  prop="approveMsg">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="approveDatas.approveMsg"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" v-if="currentFormKey === 'WlbgFormKey2'">
          <el-form-item label="请选择实施部门领导" required prop="shishibumenOa" size="small">
            <el-select
              style="width: 100%"
              filterable
              v-model="shishibumenOa"
              placeholder="请选择"
              @change="selectShishiLeader"
            >
              <el-option
                v-for="item in shishiLeaderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.value
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" v-if="currentFormKey === 'WlbgFormKey1'">
          <el-form-item label="请选择审批人" class="is-required" size="small">
            <el-select
              style="width: 100%"
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
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="btn-group">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm" :loading="isClickFlag">提交</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <history-drawer
      :visible.sync="hisDrawer"
      size="40%"
      title="审批历史"
      :hisArr="hisArr"
    ></history-drawer>
    <find-drawer
      :visible.sync="drawer"
      size="50%"
      title="选择承办人"
      @selected="selectedAccept"
    ></find-drawer>
  </div>
</template>

<script>
import historyDrawer from "@/views/work-center/components/historyDrawer";
import findDrawer from "./components/findDrawer.vue";
import {validateForms} from '@/utils'
const pathHead = "http://10.210.9.218/uniflowFileSystem";
const receiptQualityObj = {
  6: "高",
  4: "中",
  1: "低",
};
const receiptTimelyObj = {
  4: "及时",
  2: "超时",
  0: "严重超时",
};
export default {
  data() {
    return {
      isClickFlag: false,
      drawer: false,
      hisDrawer: false,
      hisArr: [],
      currentFormKey: null, // 用来识别当前流程到哪个环节
      processInstanceId: "", //流程id
      taskId: "", // 任务id
      formData: {}, // 申请人提交的表单
      leaderOptions: [],
      leaderObj: {},
      hisFormDatas: [], // 历史表单
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
      shishiRules:{

      },
      approveRules:{
        approveFlag: [
          {
            required: true,
            message: "请选择意见",
            trigger: "change",
          },
        ],
        approveMsg: [
          {
            required: true,
            message: "请填写意见",
            trigger: "change",
          },
        ],
      },
      orderTypeOptions: [
        // 工单类别
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
        // 工单等级
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
      shishiData: {
        completeSituation: "", // 完成情况
        completionTime: "", //完成日期
        handleTimely: "", //处理及时
        acceptComment: "", //备注说明
      },
      evaluationData: {
        // 评价表单
        receiptQuality: "", //回单质量
        receiptQualityScore: "", //回单质量得分
        receiptTimely: "", // 回单及时性
        receiptTimelyScore: "", // 回单及时性得分
        receiptSumScore: "", // 合计评价得分
        receiptComment: "", // 备注
      },
      receiptQualityObj,
      receiptTimelyObj,
      approveDatas: {
        approveMsg: "",
        approveFlag: "",
      },
      apply: "", //0为同意，1为不同意
      startAttachmentList: [], // 开始阶段表单附件列表
      dialogVisible1: false, //选择实施部门领导弹框
      shishibumenName: "", // 实施部门领导名字
      shishibumenOa: "", //实施部门领导oa
      shishiLeaderOptions: [], // 实施部门领导list
      shishiLeaderObj: {},
      attachmentAction: "/uniflowApi/manage/tblmanageattachment/addAttachment",
      completeOptions: [
        {
          label: "全部完成",
          value: "全部完成",
        },
        {
          label: "部分完成",
          value: "部分完成",
        },
        {
          label: "未完成",
          value: "未完成",
        },
      ],
      shishiAttachmentList: [], //实施阶段上传附件列表
      evaluationAttachmentList: [], //评价阶段上传附件列表
      receiptQualityScoreOptions: [
        { label: "高", value: 6 },
        { label: "中", value: 4 },
        { label: "低", value: 1 },
      ],
      receiptTimelyScoreOptions: [
        { label: "及时", value: 4 },
        { label: "超时", value: 2 },
        { label: "严重超时", value: 0 },
      ],
    };
  },
  components: {
    historyDrawer,
    findDrawer,
  },
  computed: {
    receiptSumScore() {
      return (
        this.evaluationData.receiptQualityScore +
        this.evaluationData.receiptTimelyScore
      );
    },
    receiptQuality() {
      // 回单质量中文
      return this.receiptQualityObj[this.evaluationData.receiptQualityScore];
    },
    receiptTimely() {
      return this.receiptTimelyObj[this.evaluationData.receiptTimelyScore];
    },
  },
  watch: {
    currentFormKey(newVal) {
      if (newVal === "WlbgFormKey2") {
        this.getshishiLeaderList();
      }
    },
  },
  created() {
    let { processInstanceId, taskId } = this.$route.query;
    this.processInstanceId = processInstanceId;
    this.taskId = taskId;
    this.getLeaderList();
    processInstanceId &&
      taskId &&
      this.getFormTableByPid(processInstanceId, taskId);
    processInstanceId &&
      taskId &&
      this.getAttachmentByProcessInstanceId(processInstanceId, taskId);
    processInstanceId && this.getCommentsByProcessInstanceId(processInstanceId);
    processInstanceId && this.getHisFromDatas(processInstanceId);
  },
  methods: {
    showDrawer() {
      this.drawer = true;
    },
    filter1() {
      if(!isNaN(Number(this.formData.investmentMoney))) {
        this.formData.investmentMoney = Number(this.formData.investmentMoney).toFixed(4);
      }else {
        this.formData.investmentMoney = ''
        this.$message.error('投资金额必须是数字')
      }
      
    },
    filter2() {
      if(!isNaN(Number(this.formData.profitMoney))) {
        this.formData.profitMoney = Number(this.formData.profitMoney).toFixed(4);
      }else {
        this.formData.profitMoney = ''
        this.$message.error('效益金额必须是数字')
      }
    },
    async getLeaderList() {
      let res = await this.$http.queryLeaderList({
        limit: 1000,
        page: 1,
        siteCode: "00440038487", // 暂时写死
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
    async getCommentsByProcessInstanceId(processInstanceId) {
      let res = await this.$http.getCommentsByProcessInstanceId({
        processInstanceId,
      });
      if (res.code === 0) {
        this.hisArr = res.data;
      }
    },
    async getFormTableByPid(processInstanceId, taskId) {
      let res = await this.$http.getFormTableByPid({
        processInstanceId,
      });
      if (res.code === 0) {
        this.formData =
          res.data && res.data.formParams && JSON.parse(res.data.formParams);
        // 请求当前环节是否有新表单，来判断在哪个环节
        this.getCurrentFromJson(processInstanceId, taskId);
      }
    },
    async getAttachmentByProcessInstanceId(processInstanceId, taskId) {
      // 请求该流程下全部附件
      let res = await this.$http.getAttachmentByProcessInstanceId({
        processInstanceId,
        taskId,
      });
      if (res.code === 0) {
        this.startAttachmentList = res.data.filter(
          (item) => item.fileType === "WlbgFormKey1"
        );
        this.shishiAttachmentList = res.data.filter(
          (item) => item.fileType === "WlbgFormKey3"
        );
        this.evaluationAttachmentList = res.data.filter(
          (item) => item.fileType === "WlbgFormKey4"
        );
      }
    },
    async getCurrentFromJson(processInstanceId, taskId) {
      //查看当前节点是否有表单
      let res = await this.$http.getCurrentFromJson({
        processInstanceId,
        taskId,
      });
      if (res.code === 0) {
        let data =
          res.formData &&
          res.formData.customDeForm &&
          JSON.parse(res.formData.customDeForm);
        this.currentFormKey = data && data.formKey;
        if(this.currentFormKey==='WlbgFormKey3') {
          this.shishiData.completionTime = res.sysTime_.slice(0,10)
          this.shishiData.handleTimely = new Date(this.formData.completeDate).getTime()
          -new Date(this.shishiData.completionTime).getTime() >= 0 ? '正常':'超时'
        }
      }
    },
    async getHisFromDatas(processInstanceId) {
      // 获取开始表单之外的历史表单
      let res = await this.$http.getHisFromDatas({
        processInstanceId,
      });
      if (res.code === 0) {
        this.hisFormDatas = res.formDatas;
        let shishiDataObj = res.formDatas.filter(item => item.formKey === 'WlbgFormKey3')[0]
        let evaluationDataObj = res.formDatas.filter(item => item.formKey === 'WlbgFormKey4')[0]
        if(shishiDataObj) {
           this.shishiData = {
              ...JSON.parse(shishiDataObj.formData),
              formKey:'WlbgFormKey3'
           }
        }
        if(evaluationDataObj) {
           this.evaluationData = {
              ...JSON.parse(evaluationDataObj.formData),
              formKey:'WlbgFormKey4'
           }
        }
       
      }
    },
    handleSee({ fileUrl }) {
      //预览
      location.href = pathHead + fileUrl;
    },
    handleLoad({ fileUrl }) {
      // 下载
      location.href = pathHead + fileUrl;
    },
    handleDelEvaluation() {},
    handleDelStart({ fileId }) {
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
            this.startAttachmentList = this.startAttachmentList.filter(
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
    selectLeader(val) {
      // 选择需求部门领导
      if (val) {
        this.formData.xuqiubumenName = this.leaderObj[val].name;
      }
    },
    validate() {
      validateForms([this.$refs["elForm"],this.$refs["approveForm"]]).then(()=>{

      }).catch(err => {console.log(err)})
    },
    async submitForm() {
      // 总提交方法
      this.$refs["elForm"].validate(async (valid) => {
        if (!valid) return;
      });
      this.$refs["approveForm"].validate(async (valid) => {
        if (!valid) return;
      });
      if (this.isClickFlag) {
        this.$message.error("请勿频繁点击提交");
        return;
      }
      this.isClickFlag = true;
      const formData =
        this.currentFormKey === "WlbgFormKey2"
          ? {
              shishibumenName: this.shishibumenName,
              shishibumenOa: this.shishibumenOa,
            }
          : this.currentFormKey === "WlbgFormKey3"
          ? {
              ...this.shishiData,
            }
          : this.currentFormKey === "WlbgFormKey4"
          ? {
              ...this.evaluationData,
              receiptQuality: this.receiptQuality,
              receiptTimely: this.receiptTimely,
            }
          : this.currentFormKey === "WlbgFormKey1"
          ? { ...this.formData }
          : null;
      const fileDatas =
        this.currentFormKey === "WlbgFormKey3"
          ? this.shishiAttachmentList.map((item) => {
              return {
                ...item,
                fileType: this.currentFormKey,
              };
            })
          : this.currentFormKey === "WlbgFormKey4"
          ? this.evaluationAttachmentList.map((item) => {
              return {
                ...item,
                fileType: this.currentFormKey,
              };
            })
          : this.currentFormKey === "WlbgFormKey1"
          ? this.startAttachmentList.map((item) => {
              return {
                ...item,
                fileType: this.currentFormKey,
              };
            })
          : [];
      let res = await this.$http.apply({
        taskId: this.taskId,
        pId: this.processInstanceId,
        orderTitle: this.formData.orderTitle,
        userId: this.$store.state.user.oa, //提交者oa
        approveDatas: this.approveDatas,
        formDatas: this.currentFormKey
          ? [
              {
                formKey: this.currentFormKey,
                formData: formData?JSON.stringify(formData):null,
              },
            ]
          : null,
        formKeys: this.currentFormKey,
        fileDatas,
      });
      if (res.code === 0) {
        this.$message.success("提交成功");
        this.$router.push("/workCenter/finished");
      } else {
        this.$message.error("提交失败");
      }
      this.isClickFlag = false;
    },
    async getshishiLeaderList() {
      // 获取实施部门领导list
      let res = await this.$http.queryLeaderList({
        limit: 1000,
        page: 1,
        siteCode: this.formData.acceptSiteCode,
      });
      if (res.code === 0) {
        this.shishiLeaderOptions =
          res.page &&
          res.page.list.map((item) => {
            return {
              value: item.oa,
              label: item.name,
            };
          });
        this.shishiLeaderObj =
          res.page &&
          res.page.list.reduce((last, cur) => {
            return {
              ...last,
              [cur.oa]: cur,
            };
          }, {});
      }
    },
    handleUploadStart(res, file, fileList) {
      // 开始表单的上传附件
      if (res.code === 0) {
        let { fileUrl, fileName, userName, uploadTime, fileId, fileType ,deleteFlag} = res;
        this.startAttachmentList.push({
          fileName,
          fileComment: "",
          fileId,
          fileType,
          fileUrl,
          uploadTime,
          userName,
          deleteFlag
        });
      }else {
        this.$message.error(`${res.msg}`);
      }
    },
    handleShishiUpload(res, file, fileList) {
      // 实施阶段上传附件
      if (res.code === 0) {
        let { fileUrl, fileName, userName, uploadTime, fileId, fileType ,deleteFlag} = res;
        this.shishiAttachmentList.push({
          fileName,
          fileComment: "",
          fileId,
          fileType,
          fileUrl,
          uploadTime,
          userName,
          deleteFlag
        });
      }else {
        this.$message.error(`${res.msg}`);
      }
    },
    handleEvaluationUpload(res, file, fileList) {
      // 评价阶段上传附件
      if (res.code === 0) {
        let { fileUrl, fileName, userName, uploadTime, fileId, fileType ,deleteFlag} = res;
        this.evaluationAttachmentList.push({
          fileName,
          fileComment: "",
          fileId,
          fileType,
          fileUrl,
          uploadTime,
          userName,
          deleteFlag
        });
      }else {
        this.$message.error(`${res.msg}`);
      }
    },
    attachmentBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 5;
      if (!isRightSize) {
        this.$message.error("文件大小超过 5MB");
      }
      return isRightSize;
    },
    selectShishiLeader() {},
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

.his-wrap {
  display: flex;
  flex-direction: row-reverse;
}
</style>