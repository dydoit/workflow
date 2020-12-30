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
    let userJson = sessionStorage.getItem("user")
    let token = sessionStorage.getItem('token')
    let {origin,pathname} = location
    if (!userJson&&!token) {
        this.$http.isLogin({
          token: getQueryVariable("token"),
          js: getQueryVariable("js"),
        })
        .then((res) => {
          // 获取用户信息
          if(res.code === 0) {
            let data = JSON.parse(res.data)
            this.$store.commit('setUser',data)
            sessionStorage.setItem('user',res.data)
            this.$store.dispatch('getRoleList', data.oa)
            // location.replace(origin+pathname)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }else {
      let data = JSON.parse(userJson)
      this.$store.commit('setUser',data)
      this.$store.dispatch('getRoleList', data.oa)
    }
  }
};
</script>

<style lang="stylus" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>