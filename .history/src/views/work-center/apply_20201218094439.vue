<template>
  <div>
    <el-tag>申请信息</el-tag>
    <el-row :gutter="15">
      
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
          <el-form-item class="is-required" label="申请人电话" prop="applyPhone">
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
            <el-input v-model="formData.orderType" :style="{ width: '100%' }"></el-input>
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
            <el-input v-model="formData.orderLevel" :style="{ width: '100%' }"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item class="is-required" label="要求完成日期" prop="completeDate">
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
          <el-form-item class="is-required" label="需求任务概要" prop="requireOutline">
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
          <el-form-item class="is-required" label="需求任务详细说明" prop="requireDetails">
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
      </el-form>
    </el-row>
    <el-row>
      <el-tag>办理意见</el-tag>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      attachmentList:[]
    };
  },
  created() {
      let {processInstanceId,taskId} = this.$route.query
      processInstanceId && this.getFormTableByPid(processInstanceId)
      processInstanceId && taskId && this.getCurrentFromJson(processInstanceId,taskId)
  },
  methods: {
    async getFormTableByPid(processInstanceId) {
        let res = await this.$http.getFormTableByPid({
            processInstanceId
        })
        if(res.code === 0) {
            this.formData = res.data && res.data.formParams && JSON.parse(res.data.formParams)
        }
        console.log(res)
    },
    async getCurrentFromJson() {}
  },
};
</script>

<style lang="stylus" scoped>
.auto-label .tip {
  color: red;
}
</style>