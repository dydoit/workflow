<template>
  <div>
    <el-row :gutter="8">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="150px"
      >
        <el-col :span="9">
          <el-form-item label="委托事件" prop="title">
            <el-input
              v-model="formData.title"
              placeholder="请输入委托事件"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="委托业务" prop="business">
            <el-input
              v-model="formData.business"
              placeholder="请输入委托业务"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="委托人" prop="entrustUsername">
            <el-input
              v-model="formData.entrustUsername"
              placeholder="请输入委托人"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="被委托人" prop="field109">
            <el-input
              v-model="formData.field109"
              placeholder="请输入被委托人"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="是否启用" prop="statuz">
            <el-select
              v-model="formData.statuz"
              placeholder="请选择是否启用"
              clearable
              :style="{ width: '100%' }"
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
        <el-col :span="9">
          <el-form-item label="委托原因" prop="reason">
            <el-input
              v-model="formData.reason"
              placeholder="请输入委托原因"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        title: undefined,
        business: undefined,
        entrustUsername: "",
        field109: "",
        statuz: undefined,
        reason: undefined,
      },
      rules: {
        title: [],
        business: [],
        entrustUsername: [],
        field109: [],
        statuz: [],
        reason: [],
      },
      statuzOptions: [
        {
          label: "启用",
          value: 0,
        },
        {
          label: "禁用",
          value: 1,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>