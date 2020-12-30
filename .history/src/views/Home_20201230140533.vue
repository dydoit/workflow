<template>
  <div class="wrapper">
    <Nav></Nav>
    <div class="container">
      <Aside></Aside>
      <div class="content-wrap">
        <BreadCrumb class="breadcrumb-container" />
        <router-view class="x-hidden" />
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/layout/aside/Aside.vue";
import BreadCrumb from "@/components/layout/breadcrumb";
import Nav from "@/components/layout/Nav.vue";
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
  components: {
    Aside,
    BreadCrumb,
    Nav,
  },
  created() {
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
  },
};
</script>
<style lang="stylus" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.container {
  display: flex;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;

  .content-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    padding: 0 15px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;

    .el-scrollbar {
      flex: 1;
      padding-bottom: 15px;
    }
  }
}
</style>