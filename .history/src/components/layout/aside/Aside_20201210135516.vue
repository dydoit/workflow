<template>
  <div class="aside">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#fff"
        text-color="#333"
        active-text-color="#d6000f"
        :unique-opened="false"
        mode="vertical"
      >
        <aside-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> 
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import AsideItem from './AsideItem.vue'
export default {
  name:'Aside',
  data() {
      return {
          isCollapse: false
      }
  },
  created () {
    this.$bus.$on('toggleActive', (status)=>{
      this.isCollapse=status==='zhankai'
    })
  },
  computed: {
    routes(){
      return  this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // 默认激活项
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  components: {
    AsideItem,
  },
};
</script>

<style lang="stylus" scoped>
.aside {
  >>>.el-scrollbar__view {
    height: 100%;
  }

  >>>.el-menu {
    border-right: none;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    min-height: 400px;
  }
}

.el-scrollbar {
  height: 90%;
}
</style>