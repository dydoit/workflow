<template>
  <div id="app">
   <router-view />
  </div>
</template>

<script>

  export default {
    created () {
      // 
      this.$http.isLogin().then(res => {// 获取token
        console.log(res)
      }).catch(err=> {
        console.log(err)
      })
    },
  }
</script>

<style lang="stylus" scoped>
  #app
    width 100%
    height 100%
</style>