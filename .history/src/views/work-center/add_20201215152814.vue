<template>
  <div>
    <el-row :gutter="13">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="small"
        label-width="150px"
      >
        <el-col :span="22">
          <el-form-item label="标题" prop="field101">
            <el-input
              v-model="formData.field101"
              placeholder="请输入标题"
              :maxlength="100"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请人" prop="field102">
            <el-input
              v-model="formData.field102"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系电话" prop="field103">
            <el-input
              v-model="formData.field103"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请单位" prop="field104">
            <el-input
              v-model="formData.field104"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请部门" prop="field105">
            <el-input
              v-model="formData.field105"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工单类别" prop="field106">
            <el-select
              v-model="formData.field106"
              placeholder="请选择工单类别"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in field106Options"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
            <!-- <el-form-item label="工单等级" prop="field107" class="teshu">
              <el-select
                v-model="formData.field107"
                placeholder="请选择工单等级"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field107Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
              <el-button>工单等级</el-button>
            </el-tooltip>
            <el-select
                v-model="formData.field107"
                placeholder="请选择工单等级"
                clearable
                :style="{ width: '100%' }"
                size="small"
              >
                <el-option
                  v-for="(item, index) in field107Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
        </el-col>
        <el-col :span="11">
          <el-form-item label="要求完成日期" prop="field108">
            <el-date-picker
              v-model="formData.field108"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '100%' }"
              placeholder="请选择日期"
              :picker-options="pickerOptions"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="投资金额(万元)" prop="field110">
            <el-input
              v-model="formData.field110"
              placeholder="请输入投资金额(万元)"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="效益金额(万元)" prop="field111">
            <el-input
              v-model="formData.field111"
              placeholder="请输入效益金额(万元)"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办人" prop="field112">
            <el-select
              v-model="formData.field112"
              placeholder="请选择承办人"
              clearable
              :style="{ width: '100%' }"
            >
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办人电话" prop="field113">
            <el-input
              v-model="formData.field113"
              placeholder="承办人电话"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办部门" prop="field114">
            <el-input
              v-model="formData.field114"
              placeholder="承办部门"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="承办单位" prop="field115">
            <el-input
              v-model="formData.field115"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="需求任务概要" prop="field116">
            <el-input
              v-model="formData.field116"
              type="textarea"
              placeholder="请输入需求任务概要"
              :maxlength="2000"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="需求任务详细说明" prop="field117">
            <el-input
              v-model="formData.field117"
              type="textarea"
              placeholder="请输入需求任务详细说明"
              :maxlength="5000"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="上传附件" prop="field118">
            <el-upload
              ref="field118"
              :file-list="field118fileList"
              :action="field118Action"
              :before-upload="field118BeforeUpload"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleChange"
            >
              <el-button size="small" type="primary" icon="el-icon-upload"
                >点击上传</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-table :data="attachmentList" border size="small">
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              label="文档标题"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.title"
                  placeholder="请输入标题"
                  size="small"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="time"
              width="120"
              label="创建时间"
            >
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="founder"
              width="80"
              label="创建人"
            >
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="name"
              label="附件名称"
            >
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="handleSee(scope.row)" type="text" size="mini"
                  >预览</el-button
                >
                <el-button @click="handleSee(scope.row)" type="text" size="mini"
                  >下载</el-button
                >
                <el-button
                  @click="handleSee(scope.row)"
                  type="danger"
                  size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="btn-group">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      attachmentList: [
        {
          title: "测试",
          id: "001",
          url: "xx.com",
          name: ".doc",
          time: "2020-12-15",
          founder: "张三",
        },
      ],
      formData: {
        field101: undefined,
        field102: undefined,
        field103: undefined,
        field104: undefined,
        field105: undefined,
        field106: undefined,
        field107: undefined,
        field108: null,
        field110: undefined,
        field111: "",
        field112: undefined,
        field113: undefined,
        field114: undefined,
        field115: undefined,
        field116: undefined,
        field117: undefined,
        field118: null,
      },
      rules: {
        field101: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        field102: [],
        field103: [],
        field104: [],
        field105: [],
        field106: [
          {
            required: true,
            message: "请选择工单类别",
            trigger: "change",
          },
        ],
        field107: [
          {
            required: true,
            message: "请选择工单等级",
            trigger: "change",
          },
        ],
        field108: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        field110: [],
        field111: [],
        field112: [
          {
            required: true,
            message: "请选择承办人",
            trigger: "change",
          },
        ],
        field113: [],
        field114: [],
        field115: [],
        field116: [
          {
            required: true,
            message: "请输入需求任务概要",
            trigger: "blur",
          },
        ],
        field117: [
          {
            required: true,
            message: "请输入需求任务详细说明",
            trigger: "blur",
          },
        ],
      },
      field118Action: "https://jsonplaceholder.typicode.com/posts/",
      field118fileList: [],
      field106Options: [
        {
          label: "建设",
          value: "建设",
        },
        {
          label: "维护",
          value: "维护",
        },
        {
          label: "优化",
          value: "优化",
        },
        {
          label: "投诉",
          value: "投诉",
        },
        {
          label: "交付",
          value: "交付",
        },
        {
          label: "能力支撑",
          value: "能力支撑",
        },
        {
          label: "综合支撑",
          value: "综合支撑",
        },
        {
          label: "客户感知",
          value: "客户感知",
        },
      ],
      field107Options: [
        {
          label: "高级",
          value: "高级",
        },
        {
          label: "中级",
          value: "中级",
        },
        {
          label: "一般",
          value: "一般",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    handleSee() {},
    handleLoad() {},
    handleDel() {},
    handleChange(file, fileList) {
      let { name } = file;
      this.attachmentList.push({
        name,
        title: "",
        url: "xx.com",
        name,
        time: "2020-12-15",
        founder: "张三",
      });
      console.log(file, fileList);
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    field118BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-upload__tip {
  line-height: 1.2;
}

.btn-group {
  margin-top: 40px;
}
.teshu >>> label:after {
  content: '(?)';
  color: #F56C6C;
  font-size:14px;
  cursor:pointer
}
</style>