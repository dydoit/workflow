<template>
  <div>
    首页开发中
     <el-date-picker
      v-model="value2"
      value-format="yyyy-MM"
      type="month"
      placeholder="选择月">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value2: ''
      }
    },
  }
</script>

<style lang="stylus" scoped>

</style>