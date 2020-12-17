<template>
    <el-dialog
     v-bind="$attrs" v-on="$listeners">
      <div>
          
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
                
            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>