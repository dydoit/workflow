<template>
  <div class="nav-wrapper">
    <div class="w1200 flex-wrapper">
      <div class="nav-left">
        <img src="../../assets/top_logo.png" alt="">
      </div>
      <div class="user-wrapper">
        <span>您好，邓寅(网络BG能力创新中心)</span>
        <i class="el-icon-s-tools" title="点击此处切换角色" @click="showRole"></i>
        <b>|</b>
        <a title="退出登录">
           <svg-icon class="logout" iconClass="login-out"></svg-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  components: {},
  methods: {
    showRole() {

    }
  },
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
  padding-right: 15px; 
  font-size 14px
  svg {
    vertical-align middle
  }
  b {
    margin 0 12px
    color #999
  }
}
.el-icon-s-tools {
  margin-left 14px
  cursor pointer
  &:hover {
    color #d6000f
  }  
}
.logout {
  cursor pointer
}
</style>