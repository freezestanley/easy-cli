<template>
  <div>
    <el-row>
      <el-form ref="infoForm" :model="infoForm" label-width="100px" label-position="left" :rules="infoFormRule">
        <el-form-item label="邮箱">
          <div class="input-mail">{{ userInfo.email }}</div>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="verifyCode">
          <el-input v-model="infoForm.verifyCode" class="input-mail" />
          <el-button :disabled="sending" class="dib send-btn" @click="sendShield()">
            {{ sending ? sendString : '发送验证码' }}
          </el-button>
        </el-form-item>
        <el-form-item class="tar mb0">
          <el-button @click="$emit('close')">取消</el-button>
          <el-button type="primary" @click="sendHandle('infoForm')">发送密钥到邮箱</el-button>
        </el-form-item>

        <!-- <el-form-item label="">
          <div class="container-inline">
            <div class="d3" />
            <p class="container-p">
              动态码用于公司内部动态口令账户认证，请您下载APP并在手机上完成安装。
              <br>
              我们已将您的账户号及密钥发到您的邮箱{{ user.mail }}，请在APP上绑定您的账号信息并妥善保管，账户登录及操作业务时需要输入动态码。
            </p>
          </div>
        </el-form-item> -->
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { UserApi } from '@/api'
import { Regs } from '@/utils/validator'
import { mapGetters } from 'vuex'

export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请先填写邮箱，再发送验证码'))
      }
      setTimeout(() => {
        if (Regs.email(value)) {
          callback()
        } else {
          callback(new Error('邮箱格式不正确，请检查后重试'))
        }
      }, 100)
    }
    return {
      infoForm: {
        newmail: '',
        verifyCode: ''
      },
      sending: false,
      count: 60,
      infoFormRule: {
        newmail: [
          { required: true, validator: checkEmail, trigger: 'blur' },
        ],
        verifyCode: [
          { required: true, message: '请填写邮箱验证码', trigger: 'blur' },
        ]
      },
      user: { mail: '2211@qq.com' }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    sendString() {
      return `重新发送 ${this.count}s`
    }
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    sendHandle(rule) {
      this.$refs[rule].validate(valid => {
        if (valid) {
          UserApi.modifySafeCode({
            verifyCode: this.infoForm.verifyCode
          })
            .then(() => {
              this.$notify({
                title: '密钥已发送到邮箱',
                message: this.userInfo.email + ' 请前往查收密钥，并在动态码App上完成绑定',
                type: 'success'
              })
              this.$emit('close')
            })
        } else {
          return false
        }
      })
    },
    sendShield() {
      if (this.sending) return
      this.$confirm(`是否确认向邮箱 ${this.userInfo.email}发送验证码？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.startTimer()
        UserApi.modifySafeCodeSend().then(() => {
          this.$notify({
            title: '验证码已发送到邮箱',
            message: this.userInfo.email + ' 请前往查收',
            type: 'success'
          })
        })
      })
    },
    startTimer() {
      this.sending = true
      this.timer = setInterval(() => {
        if (this.count <= 0) {
          this.clearTimer()
        }
        this.count -= 1
      }, 1000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.sending = false
      this.timer = null
      this.count = 60
    }
  }
}

</script>

<style lang="scss" scoped>
  .title{
    width: 100%;
    margin: auto 2%;
    padding: 10px 0 5px 30px;
    border-bottom : 1px solid;
    border-color:rgba(0,0,0,0.2);
    text-align: left;
  }
  .container{
    padding: 20px 0 20px 2%;
  }
  .center{
    width:600px;
    margin: 50px auto;
  }
  .btn-style{
    width: 60%;
  }
  .input-mail{
    width: 66%;
    display: inline-block;
    margin-right: 10px;
  }
  .send-btn {
    width: 30%;
  }
  .container-inline{
    display: inline-block;
  }
  .d3{
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 20px;
    border-style: solid;
    border-color:rgb(0, 0, 0) transparent transparent transparent;
  }
  .container-p{
    text-align: left;
    border: 1px solid;
    text-indent:30px;
    padding: 5px;
  }
  .mb0 {
    margin-bottom: 0;
  }
</style>
<style>
  .input-mail.input.el-input__inner{
      width: 60%;
  }
</style>
