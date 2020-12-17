<template>
    <el-dialog
     v-bind="$attrs" v-on="$listeners">
      <div>
          <el-row :gutter="13">
          <el-form ref="form" :model="formData" label-width="80px" size="small">
            <el-col :span="9">
              <el-form-item label="姓名" prop="name">
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
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                formData:{
                    name:'',
                    oa:'',
                    siteCode: '00440038487'
                },
                limit: 8,
                currentPage: 1,
                total:0
            }
        },
        created () {
            
        },
        methods: {
            async getData() {
                let res = await this.$http({
                    ...this.formData,
                    limit: this.limit,
                    page: this.currentPage
                })
                console.log(res)
            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>