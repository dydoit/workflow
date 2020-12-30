<template>
  <div style="text-align:center">
   <img src="../../assets/developing.png" alt=""> 
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
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
  }
</script>

<style lang="stylus" scoped>

</style>