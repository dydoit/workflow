<template>
  <div class="nav-wrapper">
    <div class="w1200 flex-wrapper">
      <div class="nav-left">
        <img src="../../assets/top_logo.png" alt="" />
      </div>
      <el-select v-model="role" placeholder="请选择用户" @change="toggle">
        <el-option
          v-for="item in testOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <div class="user-wrapper">
        <span>您好！{{user.name}} 所属部门：{{user.siteName}}</span>
        <i
          class="el-icon-s-tools"
          title="点击此处切换角色"
          @click="showRole"
        ></i>
        <b>|</b>
        <a title="退出登录" @click="loginOut">
          <svg-icon class="logout" iconClass="login-out"></svg-icon>
        </a>
      </div>
    </div>
    <el-dialog
      title="请选择所属角色"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-select v-model="site" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureRole"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false,
      role: this.$store.state.user.oa, // 选中角色
      site:this.$store.state.user.siteCode,
      testObj: {
        'junbinmo':'莫俊斌',
        'hejw29':'何建文',
        'dengy29':'邓寅',
        'zhangyuan3':'张园',
        "zhangsy178":"张思勇",
        'chenwh118':'陈文浩',
        'chenkx':'陈可翔'
      },
      testOptions:[
        {
          label: '莫俊斌',
          value:'junbinmo'
        },
        {
          label: '何建文',
          value:'hejw29'
        },
        {
          label: '邓寅',
          value:'dengy29'
        },
        {
           label: '张园',
           value:'zhangyuan3'
        },
        {
          label: '张思勇',
          value: 'zhangsy178'
        },
        {
          label: '陈文浩',
          value: 'chenwh118'
        },
        {
          label: '陈可翔',
          value:'chenkx'
        }
      ],
      options: [
        {
          label: '广东省分公司网络支撑中心',
          value: '0'
        }
      ],
      siteObj:null,
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    "user.oa"(newVal) {
      this.getRoleList(newVal)
    }
  },
  created(){
    this.getRoleList(this.user.oa)
    this.$http.toggleUser({
      oa: 'hejw29'
    }).then(res => {
      console.log(res)
    })
  },
  components: {},
  methods: {
    ...mapMutations(['toggleRole','setUser']),
    async getRoleList(oa) {
      let res = await this.$http.queryRoleList({oa})
      if(res.code === 0) {
        this.options = res.data.map(item => {
          return {
            value:  item.deptCode,
            label: item.deptName
          }
        })
        this.siteObj = res.data.reduce((last,cur)=>{
          return {
            ...last,
            [cur.deptCode]: cur.deptName
          }
        },{})
      }
    },
    showRole() {
      this.dialogVisible = true
    },
    sureRole() {
      this.toggleRole({deptName: this.siteObj[this.site], deptCode: this.site})
      this.dialogVisible = false
    },
    handleClose(){},
    toggle(oa) {
      this.$http.toggleUser({oa}).then(res => {
        if(res.code === 0) {
          let user = JSON.parse(res.data)
          this.setUser(user)
        }
      }).catch(err => console.log(err))
    },
    async loginOut() {
      let res = await this.$http.loginOut()
      if(res.code===0) {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        location.href = res.reurl
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
.nav-wrapper {
  width: 100%;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px 0px;
}

.flex-wrapper {
  display: flex;
  height: 70px;
  line-height: 70px;
  justify-content: space-between;
}

.svg-button {
  cursor: pointer;
}

.user-wrapper {
  padding-right: 15px;
  font-size: 14px;
  svg {
    vertical-align: middle;
  }

  b {
    margin: 0 12px;
    color: #999;
  }
}

.el-icon-s-tools {
  margin-left: 14px;
  cursor: pointer;

  &:hover {
    color: #d6000f;
  }
}

.logout {
  cursor: pointer;
}
.el-dialog__wrapper {
  line-height: 1.5
  & >>> .el-select {
    display block
  }
}
</style>