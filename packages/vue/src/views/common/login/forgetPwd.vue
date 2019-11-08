<template>
  <div class="page page-forgetPwd">
    <div class="forgetPwd-container-header">
      <div class="forgetPwd-button" @click="gotoLogin">
        <i class="el-icon-back">返回登录</i>
      </div>
    </div>
    <div class="forgetPwd-container-content">
      <div class="forgetPwd-container-content-center">
        <div class="title-container">
          <img src="../../../assets/logo3.png">
          <span>重置密码</span>
        </div>

        <el-form
          ref="infoForm"
          :model="infoForm"
          label-width="100px"
          :rules="infoFormRule"
          class="forgetPwd-form"
        >
          <input id="loginPassword" type="password" class="hide">
          <input id="loginUserName" type="text" class="hide">
          <el-form-item label="账号" prop="loginName">
            <el-input
              v-model.trim="infoForm.loginName"
              placeholder="请输入登录账号"
            />
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="verificationCode">
            <el-input
              v-model.trim="infoForm.verificationCode"
              class="input-mail"
              placeholder="请输入邮箱验证码"
            /><el-button :disabled="emailDisabled" size="small" @click="sendCodeResetPwd()">{{ verificationDes }}</el-button>
          </el-form-item>

          <el-form-item label="新密码" prop="pwd">
            <el-input
              v-model.trim="infoForm.pwd"
              type="password"
              placeholder="需包含大小写字母和数字，长度6-20位"
            />
          </el-form-item>
          <el-form-item label="重复新密码" prop="confirmPwd">
            <el-input
              v-model.trim="infoForm.confirmPwd"
              type="password"
              placeholder="请再次输入密码"
            />
          </el-form-item>
          <el-form-item label="动态码" prop="securityCode">
            <el-input
              v-model.trim="infoForm.securityCode"
              placeholder="请输入动态码"
            />
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" class="next-button" style="margin-top:30px;" @click.native.prevent="handleSend('infoForm')">重置密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Regs } from '@/utils/validator'
import { timeHandler } from '@/utils/timeHandler'
import { UserApi } from '@/api/'
import { encryption } from '@/utils/crypto'
const TIME_TYPE = 'forgetTime'
const TIMEOUT_TYPE = 'forgetTimeOut'

export default {
  name: 'ForgetPwd',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.infoForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
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

    return {
      infoForm: {
        loginName: '',
        verificationCode: '',
        securityCode: '',
        pwd: '',
        confirmPwd: ''
      },
      infoFormRule: {
        loginName: [
          { required: true, message: '请输入登录账号' }
        ],
        verificationCode: [
          { required: true, message: '请输入邮箱验证码' }
        ],
        securityCode: [
          { required: true, message: '请填写动态码' }
        ],
        pwd: [
          { required: true, message: '请填写新密码' },
          { validator: ckPwd }
        ],
        confirmPwd: [
          { required: true, validator: validatePass },
        ]
      },
      emailDisabled: false,
      verificationDes: '发送验证码'
    }
  },
  beforeDestroy() {
    this.stopCoolDown()
  },
  methods: {
    // 返回登录
    gotoLogin() {
      this.$router.push('/login')
    },
    handleSend(rule) {
      this.$refs[rule].validate(valid => {
        if (valid) {
          UserApi.resetPwd({
            ...this.infoForm,
            pwd: encryption(this.infoForm.pwd),
            confirmPwd: encryption(this.infoForm.confirmPwd),
          })
            .then(response => {
              this.$message.success('重置密码成功,请重新登录')
              timeHandler.setTimeHandler(TIMEOUT_TYPE, null, this, 2, () => {
                this.gotoLogin()
              }, this)
            })
        } else {
          return false
        }
      })
    },
    sendCodeResetPwd() {
      this.$refs.infoForm.validateField('loginName', valid => {
        if (!valid) {
          this.emailDisabled = true
          timeHandler.setTimeHandler(TIME_TYPE, (timeOut) => {
            this.verificationDes = timeOut + '秒重试'
          }, this, 60, () => {
            this.verificationDes = '发送验证码'
            this.emailDisabled = false
          }, this)
          UserApi.resetPwdSend(this.infoForm.loginName)
            .then(({ data }) => {
              this.$notify({
                title: '验证码已发送到邮箱',
                message: '请前往邮箱' + data + '查收验证码',
                type: 'success'
              })
            })
        }
      })
    },
    stopCoolDown() {
      timeHandler.clearTimeHandler(TIME_TYPE)
      timeHandler.clearTimeHandler(TIMEOUT_TYPE)
    }
  }
}

</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

  $forgetPwd_width: 720px;

  .next-button{
    width: 200px;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }

  .page-forgetPwd {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    background-image: url('../../../assets/images/register-bg.png');
    background-size: 100% auto;
    min-width: 1220px;
    height: 708px;
  }

  .forgetPwd-container-header {
    height: 40px;
    background-size: 100%;
    overflow: hidden;
    margin: 20px auto 0 30px;
  }

  .forgetPwd-button {
    width: 116px;
    height: 40px;
    line-height: 40px;
    border-radius:4px;
    cursor:pointer;
    text-align: center;
    transition: all .12s;
  }

  .forgetPwd-button:hover{
    text-align: center;
    width: 116px;
    height: 40px;
    line-height: 40px;
    border-radius:4px;
    color: #ffffff;
    background: $theme;
  }

  .forgetPwd-form {
    width: $forgetPwd_width;
    height: 398px;
    border: 1px solid white;
    border-radius: 12px;
    padding: 36px 64px;
    overflow: hidden;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 20px 0px rgba(101,85,246,0.2);
    border-radius:12px;
  }

  .title-container{
    margin-bottom: 34px;
    img{
      width: 115px;
      height: 29px;
      vertical-align:middle
    }
    span{
      font-size: 20px;
      margin-left: 33px;
      font-weight: bold;
      vertical-align:middle
    }
  }

  .forgetPwd-container-content-center{
    margin:0 auto;
    width: $forgetPwd_width;
  }

  .input-mail{
    width: 73%;
    margin-right: 20px;
  }

  .hide{
    width: 0;
    position: absolute;
    border-width: 0px;
    padding: 0px;
  }
</style>
