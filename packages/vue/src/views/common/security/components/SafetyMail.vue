<template>
  <div>
    <el-row>
      <el-form ref="infoForm" :model="infoForm" label-width="100px" label-position="left" :rules="rules">
        <el-form-item label="动态码" prop="securityCode">
          <el-input v-model="infoForm.securityCode" />
        </el-form-item>
        <el-form-item label="新邮箱" prop="newmail">
          <el-input v-model="infoForm.newmail" class="db" />
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="mailCode">
          <el-input v-model="infoForm.mailCode" class="input-mail" />
          <el-button :disabled="sending" class="dib send-btn" @click="sendCodeModifyEmail()">
            {{ sending ? sendString : '发送验证码' }}</el-button>
        </el-form-item>
        <el-form-item label="" class="tar mb0">
          <el-button @click="$emit('close')">取消</el-button>
          <el-button class="btn-style" type="primary" @click="sendHandle('infoForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { Regs } from '@/utils/validator'
import { UserApi } from '@/api'
import { mapGetters } from 'vuex'

export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (value === this.email) {
        return callback(new Error('新邮箱不能与原邮箱相同'))
      }
      if (!Regs.isEmail(this.infoForm.newmail)) {
        return callback(new Error('请填写正确的邮箱地址!'))
      }
      setTimeout(() => {
        if (Regs.isEmail(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      infoForm: {
        securityCode: '',
        newmail: '',
        mailCode: ''
      },
      sending: false, // 邮件发送中
      count: 60, // 发送缓冲时间
      rules: {
        securityCode: [
          { required: true, message: '请填写动态码', trigger: 'blur' }
        ],
        newmail: [
          { required: true, validator: checkEmail, trigger: 'blur' },
        ],
        mailCode: [
          { required: true, message: '请填写邮箱验证码', trigger: 'blur' },
        ]
      },
    }
  },
  computed: {
    sendString() {
      return `重新发送 ${this.count}s`
    },
    ...mapGetters([
      'email',
    ])
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    sendHandle(rule) {
      this.$refs[rule].validate(valid => {
        if (valid) {
          UserApi.modifyEmail({
            verificationCode: this.infoForm.mailCode,
            email: this.infoForm.newmail,
            securityCode: this.infoForm.securityCode
          })
            .then(() => {
              this.$message.success('修改邮箱成功')
              this.$emit('close')
              this.$store.dispatch('user/getInfo')
              let t = setTimeout(() => {
                this.loading = false
                clearTimeout(t)
                t = null
              }, 1000)
            })
        } else {
          return false
        }
      })
    },
    sendCodeModifyEmail() {
      if (this.sending) return
      this.$refs.infoForm.validateField('newmail', valid => {
        if (!valid) {
          this.$confirm('是否确认向邮箱 ' + this.infoForm.newmail + '发送验证码？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.startTimer()
            UserApi.registerSend(this.infoForm.newmail)
              .then(() => {
                this.$notify({
                  title: '验证码已发送到邮箱',
                  message: this.infoForm.newmail + '请前往查收',
                  type: 'success'
                })
              })
          })
        }
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
  .input-mail{
    width: 66%;
    margin-right: 10px;
  }
  .send-btn {
    width: 30%;
  }
  .mb0 {
    margin-bottom: 0;
  }
</style>
<style>
  /* .input-mail.input.el-input__inner {
      width: 60%;
  } */
</style>
