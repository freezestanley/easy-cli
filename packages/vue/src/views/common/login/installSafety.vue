<template>
  <div class="page page-installSafety">
    <div class="installSafety-container-header">
      <div class="installSafety-button" @click="gotoLogin">
        <i class="el-icon-back">返回登录</i>
      </div>
    </div>
    <div class="installSafety-container-content">
      <div class="installSafety-container-content-center">
        <div class="title-container">
          <img src="../../../assets/logo3.png">
          <span>安装动态码</span>
        </div>

        <div class="installSafety-show-container">
          <div class="installSafety-show-container-content">

            <el-steps direction="vertical" :active="3">
              <el-step title="什么是动态码" description="动态码用于公司内部动态口令账户认证，账户登录及操作业务时需要输入动态码。请您下载App并在手机上完成安装。" />
              <el-step title="下载App" />
              <el-step title="发送密钥到邮箱" />
            </el-steps>

            <a class="installSafety-show-container-content-book" @click="openInstall">下载安装手册</a>
            <div class="installSafety-show-container-content-img">
              <span>
                <p>IOS下载地址</p>
                <img src="../../../assets/images/ios.png">
              </span>
              <span>
                <p>Android下载地址</p>
                <img src="../../../assets/images/android.png">
              </span>
            </div>
          </div>
          <div class="installSafety-show-container-content-form">
            <p>输入账号信息，发送验证码认证邮箱，确认后将收到密钥，使用密钥完成动态码账号绑定</p>
            <el-form
              ref="infoForm"
              :model="infoForm"
              label-width="100px"
              :rules="infoFormRule"
              class="install-form"
            >
              <el-form-item label="账号" prop="loginName">
                <el-input
                  v-model.trim="infoForm.loginName"
                  placeholder="请输入登录账号"
                />
              </el-form-item>
              <el-form-item label="邮箱验证码" prop="verifyCode">
                <el-input
                  v-model.trim="infoForm.verifyCode"
                  class="input-mail"
                  placeholder="请输入邮箱验证码"
                /><el-button :disabled="emailDisabled" size="small" @click="sendVerificationCode()">{{ verificationDes }}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-button type="primary" class="next-button" @click.native.prevent="handleSend('infoForm')">发送账户和密钥到邮箱</el-button>
        </div>
      </div>
    </div>
  </div></template>

<script>

import { timeHandler } from '@/utils/timeHandler'
import { UserApi } from '@/api/'
import { INSTALL_HELP } from '@/utils//constant/index'
const TIME_TYPE = 'installSafetyTime'
const TIMEOUT_TYPE = 'installSafetyTimeOut'

export default {
  name: 'InstallSafety',
  data() {
    return {
      infoForm: {
        loginName: '',
        verifyCode: '',
      },
      infoFormRule: {
        loginName: [
          { required: true, message: '请输入登录账号' }
        ],
        verifyCode: [
          { required: true, message: '请输入邮箱验证码' }
        ]
      },
      emailDisabled: false,
      verificationDes: '发送验证码',
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
    sendVerificationCode() {
      this.$refs.infoForm.validateField('loginName', valid => {
        if (!valid) {
          this.emailDisabled = true
          UserApi.resetPwdSend(this.infoForm.loginName)
            .then(({ data }) => {
              timeHandler.setTimeHandler(TIME_TYPE, (timeOut) => {
                this.verificationDes = timeOut + '秒重试'
              }, this, 60, () => {
                this.verificationDes = '发送验证码'
                this.emailDisabled = false
              }, this)
              this.$notify({
                title: '验证码已发送到邮箱',
                message: '请前往邮箱' + data + '查收验证码',
                type: 'success'
              })
            }).catch(() => {
              this.emailDisabled = false
            })
        }
      })
    },
    handleSend(rule) {
      this.$refs[rule].validate(valid => {
        if (valid) {
          UserApi.bindSafeCode(this.infoForm)
            .then(response => {
              this.$message.success('已发送至邮件,请查收!')
              timeHandler.setTimeHandler(TIMEOUT_TYPE, null, this, 2, () => {
                this.gotoLogin()
              }, this)
            })
        } else {
          return false
        }
      })
    },
    stopCoolDown() {
      timeHandler.clearTimeHandler(TIME_TYPE)
      timeHandler.clearTimeHandler(TIMEOUT_TYPE)
    },
    openInstall() {
      window.open(INSTALL_HELP)
    }
  }
}
</script>

<style lang="scss" scoped>

  $installSafety_width: 720px;

  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }

  .page-installSafety {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    background-image: url('../../../assets/images/register-bg.png');
    background-size: 100% auto;
    min-width: 1220px;
    height: 708px;
  }

  .installSafety-container-header {
    height: 40px;
    background-size: 100%;
    overflow: hidden;
    margin: 20px auto 0 30px;
  }

  .installSafety-button {
    width: 116px;
    height: 40px;
    line-height: 40px;
    border-radius:4px;
    cursor:pointer;
    text-align: center;
    transition: all .12s;
  }

  .installSafety-button:hover{
    text-align: center;
    width: 116px;
    height: 40px;
    line-height: 40px;
    border-radius:4px;
    color: #ffffff;
    background: $theme;
  }

  .installSafety-show-container {
    width: $installSafety_width;
    height: 570px;
    border: 1px solid white;
    border-radius: 12px;
    padding: 36px 60px;
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

  .installSafety-container-content-center{
    margin: 0 auto;
    width: $installSafety_width;
  }

  .installSafety-show-container-content{
    height: 350px;
    position:relative;

    .el-step{
      &:nth-child(1) {
        flex-basis: 34% !important;
      }
      &:nth-child(2) {
        flex-basis: 77% !important;
      }
    }
  }

  /deep/ .el-step__icon{
    border:11px solid;
  }
  /deep/ .el-step__icon-inner{
      color: white;
  }

  .installSafety-show-container-content-book{
    position: absolute;
    font-size: 14px;
    top: 102px;
    left: 110px;
    color: $theme;
  }

  /deep/ .el-step__title{
    color: #000;
    font-weight: bold;
  }

  /deep/ .el-step__description{
    color: $info;
    font-size: 14px;
    margin-top: 4px;
    padding-right:0px;
  }

  .installSafety-show-container-content-img{
    position: absolute;
    overflow: hidden;
    top: 123px;
    left: 35px;

    span{
      display: inline-block;
      width: 120px;
      margin-right: 100px;
      p{
        font-size: 14px;
      }
    }
    img{
      width: 120px;
      height: 120px;
    }
  }
  .installSafety-show-container-content-form{
    padding-left: 40px;
    p{
      margin: 0px;
      font-size: 14px;
      color: $info;
    }
    .install-form{
      margin: 24px auto auto 84px;
    }
  }
  .input-mail{
    width: 67%;
    margin-right: 20px;
  }

  .next-button{
    display: block;
    width: 240px;
    margin: 0 auto;
  }
</style>
