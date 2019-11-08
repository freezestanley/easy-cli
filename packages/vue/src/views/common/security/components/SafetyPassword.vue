<template>
  <div>
    <el-row>
      <el-form ref="infoForm" :model="infoForm" label-width="120px" label-position="left" :rules="infoFormRule">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="infoForm.oldPwd" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="pwd">
          <el-input v-model="infoForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="confirmPwd">
          <el-input v-model="infoForm.confirmPwd" type="password" />
        </el-form-item>
        <el-form-item label=" " class="tar mb0">
          <el-button @click="$emit('close')">取消</el-button>
          <el-button type="primary" @click="sendHandle('infoForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { UserApi } from '@/api'
import { isPassword } from '@/utils/validator'
import { encryption } from '@/utils/crypto'
export default {
  props: {
    close: {
      type: Function,
      default() {}
    }
  },
  data() {
    var validateRePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.infoForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      infoForm: {
        oldPwd: '',
        pwd: '',
        confirmPwd: ''
      },
      infoFormRule: {
        oldPwd: [
          { required: true, message: '请填写旧密码', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          isPassword('需包含大小写字母和数字，长度6-20位'),
        ],
        confirmPwd: [
          { required: true, validator: validateRePass, trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    sendHandle(rule) {
      this.$refs[rule].validate(valid => {
        if (valid) {
          if (this.loading) return
          this.loading = true
          UserApi.modifyPwd({
            ...this.infoForm,
            oldPwd: encryption(this.infoForm.oldPwd),
            confirmPwd: encryption(this.infoForm.confirmPwd),
            pwd: encryption(this.infoForm.pwd),
          }).then(({ data }) => {
            this.$message.success('修改密码成功')
            this.$store.dispatch('user/getInfo')
            this.$emit('close')
            let t = setTimeout(() => {
              this.loading = false
              clearTimeout(t)
              t = null
            }, 1000)
          }).catch((msg) => {
            this.loading = false
          })
        } else {
          return false
        }
      })
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
    width: 100%;
  }
  .mb0 {
    margin-bottom: 0;
  }
</style>
