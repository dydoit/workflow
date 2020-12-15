<template>
  <div id="app">
   <router-view />
  </div>
</template>

<script>
import {getUser} from "@/api";
  export default {
    async created () {
      let res = await getUser()
      console.log(res)
    },
  }
</script>

<style lang="stylus" scoped>
  #app
    width 100%
    height 100%
</style>