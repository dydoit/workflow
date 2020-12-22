<template>
  <div>
    <el-drawer v-bind="$attrs" v-on="$listeners">
        <el-timeline>
          <el-timeline-item
            v-for="item of hisArr"
            :key="item.time"
            :timestamp="item.time"
            color="#F9A95C"
            placement="top"
          >
            <el-card class="card">
              <h4>
                {{
                  JSON.parse(item.message) && JSON.parse(item.message).nodeName
                }}
              </h4>
              <div class="his-content">
                <div class="person">
                  <i class="el-icon-user-solid"></i>
                  <span>{{ item.userName }}</span>
                </div>
                <div class="comment">
                  <b>处理意见：</b>
                  <p>
                    {{
                      JSON.parse(item.message) &&
                      JSON.parse(item.message).commentMessage
                    }}
                  </p>
                </div>
              </div>
              <img :src="imgUrlSet(item.typeName)" />
            </el-card>
          </el-timeline-item>
        </el-timeline>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    hisArr: {
      type: Array,
    },
  },
  methods: {
    imgUrlSet(name) {
      if (name === "驳回") {
        return require("../../../assets/huitui.png");
      } else {
        return require("../../../assets/tijiao.png");
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.his-content {
  display: flex;
  padding-right: 30px;
  margin-top: 10px;

  .person {
    display: flex;
    align-items: center;

    i {
      font-size: 20px;
    }

    span {
      margin-left: 6px;
    }
  }

  .comment {
    margin-left: 200px;
  }
}

.card {
  position: relative;

  img {
    position: absolute;
    right: 30px;
    bottom: 20px;
  }
}

.el-timeline {
  margin-left: 5px;
}
// .bg-scrollbar {
//     height: "calc(100vh - %s)" % arrow-size
//     overflow: hidden;
// }
</style>