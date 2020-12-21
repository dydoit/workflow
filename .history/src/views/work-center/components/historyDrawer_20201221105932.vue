<template>
    <div>
        <el-drawer
          v-bind="$attrs" v-on="$listeners">
          <el-scrollbar>
              <el-timeline>
                  <el-timeline-item v-for="item of hisArr" :key="item.time" :timestamp="item.time"  placement="top">
                    <el-card>
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
       } 
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
        span 
            margin-left 6px
    .comment
        margin-left 200px
</style>