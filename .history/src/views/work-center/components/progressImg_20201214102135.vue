<template>
  <el-dialog title="详情" :visible.sync="trackDialog" width="60%">
    <div>
      <img class="imgUrl" :src="imgurl" alt="" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "processDiagram",
  props: ["imgurl"],
  data() {
    return {
      trackDialog: false,
    };
  },
};
</script>

<style lang="stylus" scoped>
.imgUrl {
  width: 100%;
}
</style>