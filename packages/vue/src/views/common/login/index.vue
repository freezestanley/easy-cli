<template>
  <div class="page page-login">
    <div class="container">
      <div class="content">
        <el-form
          ref="loginForm"
          label-position="left"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
        >
          <div class="login-header" />
          <div class="title-container">
            <h3 class="title">欢迎使用<strong>众企安链</strong></h3>
            <p>供应链金融系统</p>
          </div>
          <el-form-item prop="loginName" data-tip="账号" :class="['show-tip', { act: loginForm.loginName }]">
            <el-input
              ref="loginName"
              v-model.trim="loginForm.loginName"
              placeholder="账号"
              name="loginName"
              type="text"
              tabindex="1"
              class="login-input"
              clearable
              @focus="setFocus"
              @blur="onBlur($event, 'loginName')"
            />
            <!-- auto-complete="on" -->
            <!-- <span class="prefix-icon">
              <svg-icon icon-class="userName" />
            </span> -->
          </el-form-item>
          <el-form-item prop="pwd" data-tip="密码" :class="['show-tip', { act: loginForm.pwd }]">
            <el-input
              :key="passwordType"
              ref="pwd"
              v-model="loginForm.pwd"
              :type="passwordType"
              placeholder="密码"
              name="pwd"
              class="login-input"
              tabindex="2"
              @focus="setFocus"
              @blur="onBlur($event, 'pwd')"
            />
            <!-- auto-complete="on" -->
            <!-- <span class="prefix-icon">
              <svg-icon icon-class="password" />
            </span> -->
            <span v-if="!isIe" class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eyeopen'" />
            </span>
          </el-form-item>
          <el-form-item prop="securityCode" data-tip="动态码" :class="['show-tip', { act: loginForm.securityCode }]">
            <el-input
              ref="securityCode"
              v-model="loginForm.securityCode"
              placeholder="动态码"
              name="securityCode"
              class="login-input"
              tabindex="3"
              auto-complete="off"
              :maxlength="6"
              @focus="setFocus"
              @blur="onBlur($event, 'securityCode')"
              @keyup.enter.native="handleLogin"
            />
            <!-- <span class="prefix-icon">
              <svg-icon icon-class="code" />
            </span> -->
            <el-tooltip class="item" effect="dark" placement="top-end">
              <div slot="content" class="code-help">
                <span>动态码用于公司内部动态口令账</span>
                <br>
                <span>户认证，账户登录及操作业务时</span>
                <br>
                <span>需要输入动态码，请您下载安装</span>
              </div>
              <span class="show-pwd">
                <i class="el-icon-question" />
              </span>
            </el-tooltip>
          </el-form-item>
          <div style="text-align:right;margin:12px 0px 26px 0px;">
            <router-link class="install-safeCode" to="/installSafety">安装动态码</router-link>
          </div>
          <el-button
            :loading="loading"
            type="primary"
            class="w100 fs16"
            @click.native.prevent="handleLogin"
          >登 录</el-button>
          <div class="tips">
            <router-link to="/forgetPwd">忘记密码</router-link>
            <router-link to="/register"> 注册账号</router-link>
          </div>
        </el-form>
      </div>
      <div class="back">
        <div class="items">
          <template v-for="(img, index) in imgs">
            <div :key="img" :class="{item: true, active: index === current}" :style="{ backgroundImage: `url(${img})` }" />
          </template>
        </div>
      </div>
    </div>
    <!-- <div class="login-footer">
      <div class="footer-info">
        <span>©版权所有： 上海众安科技有限公司 | 粤ICP备19084400号</span>
        <span>
          <a>联系我们 &nbsp; 020-38899823 </a> &nbsp; | &nbsp;
          <a href="mailto:office@suiyincc.com"> office@suiyincc.com</a>
          <label> - </label>
          <a @click="showProtocal">用户协议</a>
        </span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { encryption } from '@/utils/crypto'
// import bg1 from '@/assets/images/bg-1.jpg'
import bg from '@/assets/images/bg.jpg'
import { isIE } from '@/utils/browser'
const DURATION = 3000 * 1000
export default {
  name: 'Login',
  components: {
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      mynum: '',
      dialogVisible: false,
      loginForm: {
        loginName: '',
        pwd: '',
        securityCode: '',
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        pwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
        securityCode: [{ required: true, trigger: 'blur', message: '请输入动态码' }]
      },
      loading: false,
      isIe: isIE(),
      passwordType: 'password',
      redirect: undefined,
      current: 0,
      imgs: [bg]
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.current = +(!this.current)
      }, DURATION)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = 0
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    setFocus(e) {
      const input = e.target
      input.parentElement.parentElement.parentElement.classList.add('act')
    },
    onBlur(e, name) {
      const input = e.target
      if (!this.loginForm[name]) {
        input.parentElement.parentElement.parentElement.classList.remove('act')
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', {
            ...this.loginForm,
            pwd: encryption(this.loginForm.pwd)
          }).then(() => {
            this.redirect ? this.$router.push(this.redirect) : this.$router.push('/')
            setTimeout(() => {
              this.loading = false
              this.$message.success('登录成功')
            }, 500)
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showContact() {
      const h = this.$createElement
      this.$msgbox({
        title: '联系我们',
        message: h('div', null, [
          h('div', null, [
            h('lable', null, '联系电话: '),
            h('strong', null, '020-38899823')
          ]),
          h('div', null, [
            h('lable', null, '联系邮箱: '),
            h('strong', null, 'office@suiyin-group.com')
          ]),
        ]),
        confirmButtonText: '知道了',
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .page-login .el-input input,
  .page-login input {
    color: $cursor;
    background-color: #fff !important;
    input::-internal-autofill-selected {
      background-color: red !important;
    }
  }
}
.page-login .el-input input {
  color: $cursor;
  background-color: #fff !important;
  input::-internal-autofill-selected {
    background-color: red !important;
  }
}

/* reset element-ui css */
.page-login {
  // .el-input {
  //   display: inline-block;
    // width: 100%;
    input {
      color: $titleColor;
      background-color: #fff !important;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        box-shadow: 0 0 0px 1000px #fff inset !important;
        // -webkit-text-fill-color: #fff !important;
      }

    // }
  }
}
</style>

<style lang="scss" scoped>
$bg: rgb(0, 0, 0);
$icon-color: $info;
$light_gray: #eee;
/* 输入框输入内容时，展示label描述 */
.show-tip {
    position: relative;
    &:after {
      position: absolute;
      transition: .4s;
      content: attr(data-tip);
      width: 100px;
      top: 0px;
      text-align: left;
      font-size: 10px;
      left: 15px;
      opacity: 0;
    }
  &.act {
    &::after {
      top: -1em;
      color: $theme;
      opacity: 1;
    }
  }
}
.page-login {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: $bg;
  overflow: hidden;
  min-width: 1220px;
  overflow: hidden;
  min-height: 600px;
  // padding-bottom: 60px;

  .tips {
    font-size: 12px;
    margin-top: 14px;
    text-align: right;
    a {
      &:first-of-type {
        color: #8291b9;
        margin-right: 20px;
      }
      &:nth-child(2) {
        color: $theme;
      }
      cursor: pointer;
    }
  }

  .prefix-icon {
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 16px;
    color: $icon-color;
    cursor: pointer;
    user-select: none;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 16px;
    color: $icon-color;
    cursor: pointer;
    user-select: none;
  }

  .login-header {
    margin-bottom: 50px;
    height: 48px;
    background: url(../../../assets/logo.png) left no-repeat;
    background-size: 160px;
    overflow: hidden;
    font-size: 20px;
  }
  .code-help {
    min-width: 170px;
    background-color: $titleColor;
  }
  .container {
    width: 100%;
    height: 100%;
    .content {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0px;
      background-color: #fff;
      width: 500px;
      text-align: center;
      z-index: 2;
      // display: flex;
      // align-content: center;
      // justify-content: center;
      .login-form {
        position: absolute;
        top: 50%;
        right: 40px;
        width: 420px;
        // height: 440px;
        transform: translateY(-60%);
        background: #fff;
        padding: 36px 36px;
        .el-form-item {
          margin-top: 32px;
          margin-bottom: 0px;
        }
        .title-container {
          text-align: left;
          font-size: 24px;
          .title {
            line-height: 1;
            margin: 8px auto;
            color: $titleColor;
          }
          p {
            font-size: 16px;
            color: $labelColor;
          }
        }
        // .focus-input {
        //   position: relative;
        //   width: 100%;
        //   height: 32px;
        //   border-radius: 4px;
        //   border: 1px solid $borderColor;
        //   padding-left: 15px;
        //   position: relative;
        //   &:focus {
        //     border-color: $theme;
        //   }
        //   &:after {
        //       position: absolute;
        //       transition: .4s;
        //       content: attr(placeholder);
        //       width: 100px;
        //       height: 20px;
        //       top: 0px;
        //       text-align: left;
        //       font-size: 10px;
        //       left: 15 px;
        //       opacity: 0;
        //     }
        //   &.act {
        //     &::after {
        //       top: -1em;
        //       color: $theme;
        //       opacity: 1;
        //     }
        //   }
        // }
      }
    }
    .back {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0px;
      width: 100%;
      min-height: 600px;
      min-width: 1220px;
      .items, .item {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
      .items {
        .item {
          transition: opacity 0.5s;
          background: #0a2040 none no-repeat center center;
          background-size: cover;
          opacity: 0;
          &.active {
            opacity: 1;
          }
        }
      }
    }
  }

  .login-footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 60px;
    background-color: $titleColor;
    color: $bgColor;
    z-index: 99;
    font-size: 12px;
  }

  .footer-info {
    position: absolute;
    left: 0;
    right: 0;
    min-width: 1000px;
    display: flex;
    line-height: 60px;
    padding: 0 120px;
    justify-content: space-between;
    cursor: pointer;
  }
  .install-safeCode {
    font-size: 12px;
    color: $theme;
    margin-bottom: 26px;
    cursor: pointer;
  }
  .el-button {
    height: 48px;
  }
}
</style>
