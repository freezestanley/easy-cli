<template>
  <div class="page page-security">
    <el-row :gutter="40">
      <el-col :span="6">登录密码</el-col>
      <el-col :span="8" class="tar" />
      <el-col :span="10">
        <el-button type="text" @click="showCurType('pwd')">更改</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="6">绑定邮箱</el-col>
      <el-col :span="8" class="tar">{{ userInfo.email }}</el-col>
      <el-col :span="10">
        <el-button type="text" @click="showCurType('email')">更改</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="6">动态码</el-col>
      <el-col :span="8" class="tar" />
      <el-col :span="10">
        <el-button type="text" @click="showCurType('code')">更改</el-button>
      </el-col>
    </el-row>
    <el-dialog
      v-if="dialogVisible"
      :title="curType"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="520px"
    >
      <SafetyPassword v-if="type === 'pwd'" @close="dialogVisible = false" />
      <SafetyMail v-if="type === 'email'" @close="dialogVisible = false" />
      <SafetyCode v-if="type === 'code'" @close="dialogVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SafetyPassword from './components/SafetyPassword'
import SafetyMail from './components/SafetyMail'
import SafetyCode from './components/SafetyCode'
export default {
  name: '', // 安全管理
  components: {
    SafetyPassword,
    SafetyMail,
    SafetyCode
  },
  data () {
    return {
      dialogVisible: false,
      type: 'pwd'
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    curType() {
      const TITLE = {
        pwd: '更改登录密码',
        email: '更改邮箱',
        code: '更改动态码',
      }
      return TITLE[this.type]
    }
  },
  methods: {
    showCurType(t) {
      this.type = t
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" >
.page-security {
  font-size: 14px;
  .el-row {
    margin-bottom: 20px;
    .el-col {
      line-height: 60px;
      font-size: 14px;
      &.tar {
        height: 60px;
      }
    }
  }
}
</style>
