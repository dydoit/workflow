<template>
  <div>
    <el-drawer v-bind="$attrs" v-on="$listeners">
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
        </el-form>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
    };
  },
  methods: {},
};
</script>

<style lang="stylus" scoped></style>