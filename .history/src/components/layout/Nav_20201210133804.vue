<template>
  <div class="nav-wrapper">
    <div class="nav-left">
       logo
    </div>
    <div class="user-wrapper">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link user-avator">
          <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
          <i class="name">张三</i>
          <i class="el-icon-arrow-down icondown"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            iconClass: 'shousuo'
        }
    },
  components: {
  },
  methods: {
  },
};
</script>

<style lang="stylus" scoped>
.nav-wrapper
    width 100%
    height 70px
    margin-bottom 20px
    background-color #fff
    display flex
    justify-content space-between
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px 0px
.svg-button
    cursor pointer
.user-wrapper
    display flex
    align-items center
    padding-right 15px
    .el-avatar
      vertical-align middle
      margin-right 4px
    .icondown
      color: #333;
      margin-left: 2px;
      transition: transform .3s;
    &:hover .icondown
      transform: rotate(180deg)
</style>