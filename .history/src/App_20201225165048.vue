<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
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
  created() {
    if (!localStorage.getItem("user")) {
        this.$http.isLogin({
          token: getQueryVariable("token"),
          js: getQueryVariable("js"),
        })
        .then((res) => {
          // 获取用户信息
          console.log(res);
          if(res.code === 0) {

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style lang="stylus" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>