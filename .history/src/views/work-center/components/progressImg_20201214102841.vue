<template>
  <el-dialog title="详情" :visible.sync="isShow" width="60%">
    <div>
      <img class="imgUrl" :src="imgurl" alt="" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "processDiagram",
  props: ["imgUrl"],
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style lang="stylus" scoped>
.imgUrl {
  width: 100%;
}
</style>