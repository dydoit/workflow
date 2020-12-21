<template>
    <div>
        <el-drawer
          v-bind="$attrs" v-on="$listeners">
          <el-scrollbar>
              <el-timeline>
                  <el-timeline-item v-for="item of hisArr" :key="item.time" :timestamp="item.time"  placement="top">
                    <el-card class="card">
                        <h4>{{item.typeName}}</h4>
                        <div class="his-content">
                            <div class="person">
                                <i class="el-icon-user-solid"></i>
                                <span>{{item.userName}}</span>
                            </div>
                            <div class="comment">
                                <b>处理意见：</b>
                                <p>{{item.message}}</p>
                            </div>
                        </div>
                        <img :src="item.typeName==='驳回'?'../../../assets/huitui.png':'../../../assets/tijiao.png'" alt="">
                    </el-card>
                  </el-timeline-item>
              </el-timeline>
          </el-scrollbar>
        </el-drawer>
    </div>
</template>

<script>
    export default {
       props: {
           hisArr:{
               type: Array
           }
       },
       methods: {
           imgUrlSet(name) {
               if(name === '提交') {
                   return 
               }
           }
       },
    }
</script>

<style lang="stylus" scoped>
.his-content
    display flex
    padding-right 30px
    margin-top 10px
    .person
        display flex
        align-items center
        i 
            font-size 20px
        span 
            margin-left 6px
    .comment
        margin-left 200px
.card
    position relative
</style>