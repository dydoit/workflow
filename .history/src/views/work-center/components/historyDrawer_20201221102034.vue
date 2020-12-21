<template>
    <div>
        <el-drawer
          v-bind="$attrs" v-on="$listeners">
          <el-scrollbar>
              <el-timeline>
                  
              </el-timeline>
          </el-scrollbar>
        </el-drawer>
    </div>
</template>

<script>
    export default {
       props: {
           hisArr:{
               type: Array
           }
       } 
    }
</script>

<style lang="scss" scoped>

</style>