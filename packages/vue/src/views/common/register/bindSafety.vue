<template>
  <div class="page page-bindSafety">
    <div class="bindSafety-container-header">
      <div class="bindSafety-button" @click="gotoLogin">
        <i class="el-icon-back">返回登录</i>
      </div>
    </div>
    <div class="bindSafety-container-content">
      <div class="bindSafety-container-content-center">
        <div class="title-container">
          <img src="../../../assets/logo3.png">
          <span>绑定动态码</span>
        </div>

        <div class="bindSafety-show-container">
          <div class="bindSafety-show-container-content">
            <el-steps direction="vertical" :active="2">
              <el-step title="什么是动态码" description="动态码用于公司内部动态口令账户认证，账户登录及操作业务时需要输入动态码。请您下载App并在手机上完成安装。" />
              <el-step title="下载App" />
            </el-steps>
            <div class="bindSafety-show-container-content-text">我们已将您的账户和密钥发到您的邮箱 {{ email }}，请在APP上绑定您的账号信息并妥善保管</div>
            <el-button type="text" class="bindSafety-show-container-content-book" @click="openInstall">下载安装手册</el-button>
          </div>
          <div class="bindSafety-show-container-content-img">
            <span>
              <p>IOS下载地址</p>
              <img src="../../../assets/images/ios.png">
            </span>
            <span>
              <p>Android下载地址</p>
              <img src="../../../assets/images/android.png">
            </span>
          </div>
          <el-button type="primary" class="next-button" @click.native.prevent="gotoLogin()">已安装，去登录</el-button>
        </div>
      </div>
    </div>
  </div></template>

<script>

import { mapGetters } from 'vuex'
import { INSTALL_HELP } from '@/utils//constant/index'
export default {
  name: 'BindSafety',
  computed: {
    ...mapGetters([
      'email',
    ])
  },
  methods: {
    // 返回登录
    gotoLogin() {
      this.$router.push('/login')
    },
    openInstall() {
      window.open(INSTALL_HELP)
    }
  }
}
</script>

<style lang="scss" scoped>

  $bindSafety_width: 720px;

  .next-button{
    width: 240px;
  }

  .page-bindSafety{
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    background-size: 100% auto;
    min-width: 1220px;
    height: 708px;
  }

  .bindSafety-container-header {
    height: 40px;
    background-size: 100%;
    overflow: hidden;
    margin: 20px auto 0 30px;
  }

  .bindSafety-button {
    width: 116px;
    height: 40px;
    line-height: 40px;
    border-radius:4px;
    cursor:pointer;
    text-align: center;
    transition: all .12s;
  }

  .bindSafety-button:hover{
    text-align: center;
    width: 116px;
    height: 40px;
    line-height: 40px;
    border-radius:4px;
    color: #ffffff;
    background: $theme;
  }

  .bindSafety-show-container {
    width: $bindSafety_width;
    height: 554px;
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

  .bindSafety-container-content-center{
    margin:0 auto;
    width: $bindSafety_width;
  }

  .bindSafety-show-container-content{
    height: 220px;
    position:relative;
  }

  .bindSafety-show-container-content-text{
    position: absolute;
    font-size: 14px;
    padding: 16px;
    top:100px;
    left: 38px;
    width:555px;
    color: $info;
    background:rgba(101,85,246,0.05);
    border-radius:4px;
  }

  .bindSafety-show-container-content-book{
    position: absolute;
    font-size: 14px;
    top: 190px;
    left: 110px;
    color: $theme;
  }

  /deep/ .el-step__icon{
    border:11px solid;
  }
  /deep/ .el-step__icon-inner{
      color: white;
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

  .bindSafety-show-container-content-img{
    overflow: hidden;
    display:flex;
    justify-content: space-around;
    span{
      display: inline-block;
      width: 120px;
      p{
        font-size: 14px;
      }
    }
    img{
      width: 120px;
      height: 120px;
    }
  }

  .next-button{
    margin: 40px auto;
    display: block;
  }
</style>
