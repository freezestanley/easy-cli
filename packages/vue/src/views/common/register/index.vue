<template>
  <div class="page page-register">
    <div class="register-container-header">
      <div class="register-button" @click="gotoLogin">
        <i class="el-icon-back">返回登录</i>
      </div>
    </div>
    <div class="register-container-content">
      <div class="register-container-content-center">
        <div class="title-container">
          <img src="../../../assets/logo3.png">
          <span>欢迎注册</span>
        </div>

        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="130px"
          class="register-form"
        >
          <input id="loginPassword" type="password" class="hide">
          <input id="loginUserName" type="text" class="hide">
          <el-form-item label="企业名称" prop="corpName">
            <el-input v-model.trim="ruleForm.corpName" type="text" placeholder="请输入企业名称" />
          </el-form-item>
          <el-form-item label="联系人" prop="nickName">
            <el-input v-model.trim="ruleForm.nickName" type="text" placeholder="请输入联系人姓名" />
          </el-form-item>
          <el-form-item label="登录账号" prop="loginName">
            <el-input
              v-model.trim="ruleForm.loginName"
              type="text"
              maxlength="20"
              placeholder="登录账号是您唯一凭证，只能设置一次，不能修改"
            />
          </el-form-item>
          <el-form-item label="联系人邮箱" prop="email">
            <el-input v-model.trim="ruleForm.email" type="text" maxlength="50" placeholder="请输入联系人邮箱，可作为登录账号使用" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">邮箱作为登录账号使用</el-checkbox>
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="verificationCode">
            <el-input
              v-model.trim="ruleForm.verificationCode"
              class="input-mail"
              type="text"
              maxlength="10"
              placeholder="请输入邮箱验证码"
            />
            <el-button
              :disabled="emailDisabled"
              @click="sendCode_modifyEmail()"
            >{{ verificationDes }}</el-button>
          </el-form-item>
          <el-form-item label="登录密码" prop="pwd">
            <el-input
              v-model.trim="ruleForm.pwd"
              type="password"
              placeholder="需包含大小写字母和数字，长度6-20位"
            />
          </el-form-item>
          <el-form-item label="重复密码" prop="confirmPwd">
            <el-input v-model.trim="ruleForm.confirmPwd" type="password" placeholder="请再次输入密码" />
          </el-form-item>
          <el-form-item label="邀请码" prop="invitationCode">
            <el-input v-model.trim="ruleForm.invitationCode" type="text" maxlength="10" placeholder="请输入邀请码" />
          </el-form-item>
          <!-- <el-form-item label="" prop="checked">
            <el-checkbox v-model="ruleForm.checked">我同意并遵守</el-checkbox><a class="form-agreement" @click="openAgreement()">《众安金融平台服务协议》</a>
          </el-form-item>-->
          <el-form-item label>
            <el-button
              type="primary"
              class="next-button"
              :loading="loading"
              @click.native.prevent="openAgreement()"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <ProtocalDialog ref="protocalDialog" @submit="handleRegister" />
  </div>
</template>

<script>
// TODO 将验证方法 写到utils下的validate中，共用
import ProtocalDialog from '@/components/CommonDialogs/ProtocalDialog'
import { Regs } from '@/utils/validator'
import { timeHandler } from '@/utils/timeHandler'
import { UserApi } from '@/api/'
import { encryption } from '@/utils/crypto'
const TIME_TYPE = 'registerTime'

export default {
  name: 'Register',
  components: {
    ProtocalDialog
  },
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (this.checked) this.ruleForm.loginName = this.ruleForm.email
        if (Regs.isEmail(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }

    const atypismPsw = (rule, value, callback) => {
      if (value !== this.ruleForm.pwd) {
        return callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    const ckPwd = (rule, value, callback) => {
      if (!Regs.isPassword(value)) {
        return callback(new Error('需包含大小写字母和数字，长度6-20位'))
      } else {
        callback()
      }
    }

    const checkAgree = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请同意协议内容'))
      } else {
        callback()
      }
    }

    return {

      dialogVisible: false,
      emailDisabled: false,
      checked: false,
      pandingName: '',
      ruleForm: {
        corpName: '',
        nickName: '',
        loginName: '',
        email: '',
        verificationCode: '',
        pwd: '',
        confirmPwd: '',
        invitationCode: '',
        checked: false,
      }, // 表单变量
      rules: {
        corpName: [
          { required: true, message: '请输入企业名' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符' }
        ],
        nickName: [
          { required: true, message: '请输入联系人姓名' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符' }
        ],
        email: [
          { required: true, validator: checkEmail },
        ],
        verificationCode: [
          { required: true, message: '请输入邮箱验证码' },
        ],
        loginName: [
          { required: true, message: '请输入登录账号' },
          // { validator: ckName, message: '用户名是6-20位字母或数字或组合' }
          //            { validator: isExistName, message: '账号已存在'}
        ],
        pwd: [
          { required: true, message: '请输入密码' },
          { validator: ckPwd }
        ],
        confirmPwd: [
          { required: true, message: '请重复输入密码' },
          { validator: atypismPsw, message: '两次输入的密码不一致' }
        ],
        invitationCode: [
          { required: true, message: '请输入邀请码' }
        ],
        checked: [
          { required: true, validator: checkAgree }
        ]
      }, // 表单变量规则
      loading: false,
      verificationDes: '发送验证码'
    }
  },
  computed: {},
  watch: {
    checked() {
      if (this.checked) {
        this.pandingName = this.ruleForm.loginName
        this.ruleForm.loginName = this.ruleForm.email
      } else {
        this.ruleForm.loginName = this.pandingName
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    this.stopCoolDown()
  },
  methods: {
    // 返回登录
    gotoLogin() {
      this.$router.push('/login')
    },
    // 邮箱验证
    sendCode_modifyEmail() {
      this.$refs.ruleForm.validateField('email', valid => {
        if (!valid) {
          this.$confirm(`是否确定向邮箱 ${this.ruleForm.email} 发送验证码 ？`, '提示', {
            confirmButtonText: '发送',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.emailDisabled = true
            timeHandler.setTimeHandler(TIME_TYPE, (timeOut) => {
              this.verificationDes = timeOut + '秒重试'
            }, this, 60, () => {
              this.verificationDes = '发送验证码'
              this.emailDisabled = false
            }, this)
            UserApi.registerSend(this.ruleForm.email)
              .then(() => {
                this.$notify({
                  title: '验证码已发送到邮箱',
                  message: '请前往邮箱' + this.ruleForm.email + '查收验证码',
                  type: 'success'
                })
              })
          })
        }
      })
    },
    stopCoolDown() {
      timeHandler.clearTimeHandler(TIME_TYPE)
    },
    // 提交表单
    handleRegister() {
      this.loading = true
      this.$store.dispatch('user/register', {
        ...this.ruleForm,
        pwd: encryption(this.ruleForm.pwd),
        confirmPwd: encryption(this.ruleForm.confirmPwd),
      }).then(() => {
        this.$router.push('/bindSafety')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 打开协议
    openAgreement() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$refs.protocalDialog.open()
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.dialogVisible = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$register_width: 720px;

.next-button {
  width: 200px;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.page-register {
  min-height: 750px;
  width: 100%;
  overflow: hidden;
  background-image: url("../../../assets/images/register-bg.png");
  background-size: 100% auto;
  min-width: 1220px;
  height: 100%;
}

.register-container-header {
  height: 40px;
  background-size: 100%;
  overflow: hidden;
  margin: 20px auto 0 30px;
}

.register-button {
  width: 114px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: all 0.12s;
}

.register-button:hover {
  text-align: center;
  width: 114px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  color: #ffffff;
  background: $theme;
}

.register-form {
  width: $register_width;
  height: 624px;
  border: 1px solid white;
  border-radius: 12px;
  padding: 36px 64px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px 0px rgba(101, 85, 246, 0.2);
  border-radius: 12px;
}

.title-container {
  margin-bottom: 34px;
  img {
    width: 115px;
    height: 29px;
    vertical-align: middle;
  }
  span {
    font-size: 20px;
    margin-left: 33px;
    font-weight: bold;
    vertical-align: middle;
  }
}

.register-container-content-center {
  margin: 0 auto;
  width: $register_width;
}

.form-agreement {
  color: #6c4cff;
}

.input-mail {
  width: 74%;
  margin-right: 20px;
}

.agreement {
  display: inline-block;
  overflow-y: scroll;
}

.hide {
  width: 0;
  position: absolute;
  border-width: 0px;
  padding: 0px;
}
</style>
