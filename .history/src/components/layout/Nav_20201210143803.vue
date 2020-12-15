<template>
  <div class="nav-wrapper">
    <div class="w1200 flex-wrapper">
      <div class="nav-left">
        <img src="../../assets/top_logo.png" alt="">
      </div>
      <div class="user-wrapper">
        <span>您好，邓寅</span>
        <i class="el-icon-s-tools" title="点击此处切换角色"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconClass: "shousuo",
    };
  },
  components: {},
  methods: {},
};
</script>

<style lang="stylus" scoped>
.nav-wrapper {
  width: 100%;
  height: 70px;
  line-height 70px
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px 0px;
}
.flex-wrapper {
  display flex
  justify-content space-between
}
.svg-button {
  cursor: pointer;
}

.user-wrapper {
  display: flex;
  align-items: center;
  padding-right: 15px;
}
.el-icon-s-tools {
  margin-left 6px
  cursor pointer
}

</style>