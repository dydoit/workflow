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
    let userJson = localStorage.getItem("user")
    if (!userJson) {
        this.$http.isLogin({
          token: getQueryVariable("token"),
          js: getQueryVariable("js"),
        })
        .then((res) => {
          // 获取用户信息
          if(res.code === 0) {
            this.$store.commit('setUser',JSON.parse(res.data))
            localStorage.setItem('user',res.data)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }else {
      this.$store.commit('setUser',JSON.parse(userJson))
    }
  },
  beforeDestroy() {
    console.log('销毁')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
};
</script>

<style lang="stylus" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>