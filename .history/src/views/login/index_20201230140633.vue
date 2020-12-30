<template>
    <div>
        <!-- 待办跳转中间页面 -->
    </div>
</template>

<script>
import Cookies from "js-cookie";
function getQueryVariable(variable) {
  var query = window.location.href.split("?")[1];
  if (!query) {
    return;
  }
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return "";
}
    export default {
        created () {
            console.log(this.$route)
        },
        methods: {
            checkLogin() {
                
            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>