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
        data() {
            return {
                processInstanceId: '',
                taskId:''
            }
        },
        created () {
            this.processInstanceId = this.$route.processInstanceId
            this.taskId = this.$route.taskId
            this.isLogin()
        },
        methods: {
            checkLogin() {
                 let userJson = Cookies.get("user");
    if (!userJson) {
      this.$http
        .isLogin({
          token: getQueryVariable("token"),
          js: getQueryVariable("js"),
        })
        .then((res) => {
          // 获取用户信息
          if (res.code === 0) {
            let data = JSON.parse(res.data);
            this.$store.commit("setUser", data);
            Cookies.set("user", res.data);
            // sessionStorage.setItem('user',res.data)
            this.$store.dispatch("getRoleList", data.oa);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let data = JSON.parse(userJson);
      this.$store.commit("setUser", data);
      this.$store.dispatch("getRoleList", data.oa);
    }
            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>