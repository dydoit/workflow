<template>
    <el-dialog
     v-bind="$attrs" v-on="$listeners">
      <el-select style="width:100%" v-model="leader" placeholder="请选择" @change="selectLeader">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSelect"
          >确 定</el-button
        >
      </span>
         
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
                total:0,
                selectedLeader: '',
                selectedLeaderOa:''
            }
        },
        created () {
            this.getData()
        },
        methods: {
            async getData() {
                let res = await this.$http.queryLeaderList({
                    ...this.formData,
                    limit: this.limit,
                    page: this.currentPage
                })
                console.log(res)
            },
            selectLeader(){}
        },
    }
</script>

<style lang="stylus" scoped>

</style>