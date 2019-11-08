<template>
  <div class="page page-system-batch">
    <el-form :model="ruleForm">
      <el-form-item prop="roleType" label="操作的角色" required :rules="[{ required: true, message: '请选择操作的角色'}]">
        <el-radio v-model="ruleForm.roleType" label="PLATFORM">平台</el-radio>
        <el-radio v-model="ruleForm.roleType" label="FUND">资金方</el-radio>
        <el-radio v-model="ruleForm.roleType" label="CORE">核心</el-radio>
        <el-radio v-model="ruleForm.roleType" label="CHAIN">链属</el-radio>
      </el-form-item>
      <el-form-item v-loading="loading">
        <el-button type="primary" @click="submit">自动生成</el-button>
        <el-button type="danger" @click="deleteIt">删除该角色权限</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SuperApi } from '@/api/'
import { execute } from '@/router/menu-config/util'

export default {
  name: 'SystemBatch',

  data () {
    return {
      ruleForm: {
        allAuth: '',
        roleType: ''
      },
      loading: false
    }
  },

  methods: {
    submit() {
      if (!this.ruleForm.roleType) {
        this.$message.error('请选择操作的角色')
        return
      }
      this.loading = true
      execute(this.ruleForm.roleType, (menus) => {
        const allAuth = menus
        SuperApi.addAuthBatch({
          allAuth
        }).then(res => {
          console.log(res)
          this.$message.success('添加 ' + this.ruleForm.roleType + ' 菜单成功')
        }).finally(() => {
          this.loading = false
        })
      })
    },
    deleteIt() {
      if (!this.ruleForm.roleType) {
        this.$message.error('请选择操作的角色')
        return
      }
      this.$confirm(`确定要删除 ${this.ruleForm.roleType} 的所有菜单吗？`, {
        title: '警告',
        type: 'warning',
      }).then(() => {
        this.loading = true
        SuperApi.delAuthBatch(this.ruleForm.roleType).then(() => {
          this.$message.success('删除 ' + this.ruleForm.roleType + ' 成功')
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="" >

</style>
