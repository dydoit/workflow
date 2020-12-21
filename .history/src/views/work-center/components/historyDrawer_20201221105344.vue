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
                            <div>
                                <i class="el-icon-user-solid"></i>
                                <span>{{item.userName}}</span>
                            </div>
                            <div>
                                <p>处理意见：</p>
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
</style>