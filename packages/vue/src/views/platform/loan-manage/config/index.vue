<template>
  <div class="page">
    <div v-show="edit" class="inputContent">
      <h4>服务费收款账号</h4>
      <el-form ref="form" :model="loanForm" :rules="rules" label-width="90px">
        <el-form-item label="开户名称" prop="bankAccountName">
          <el-input v-model="loanForm.bankAccountName" />
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName">
          <el-input v-model="loanForm.bankName" class="inline" />
        </el-form-item>
        <el-form-item label="银行账户" prop="bankAccountNo">
          <el-input v-model="loanForm.bankAccountNo" class="inline" />
        </el-form-item>
        <h4>费用说明</h4>
        <el-form-item label="费用说明" prop="feeExplanation">
          <el-input
            v-model="loanForm.feeExplanation"
            :rows="12"
            maxlength="1000"
            show-word-limit
            type="textarea"
            resize="none"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="back">取 消</el-button>
          <el-button style="width:240px;height:36px" type="primary" @click="handleAddConfirm">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="!edit" class="financingShow">
      <el-button v-permission="'loan-manage-config__edit'" class="f_edit" size="medium" type="text" @click="handleUpdate">
        <svg-icon icon-class="edit" />编辑
      </el-button>
      <h4>服务费收款账号</h4>
      <div class="line">
        <p>
          <span class="tit">银行</span>
          <span>{{ loanForm.bankName }}</span>
        </p>
        <p>
          <span class="tit">平台开户名称</span>
          <span>{{ loanForm.bankAccountName }}</span>
        </p>
        <p>
          <span class="tit">平台银行账号</span>
          <span>{{ (loanForm.bankAccountNo || '').replace(/(.{4})/g, "$1 ") }}</span>
        </p>
      </div>
      <h4>费用说明</h4>
      <p class="baseInfo">{{ loanForm.feeExplanation }}</p>
    </div>
  </div>
</template>

<script>
import { isRequired } from '@/utils/validator'
import { PlatformApi } from '@/api'
export default {
  name: 'LoanConfig',
  data() {
    return {
      edit: false,
      list: [],
      loanForm: {
        bankAccountName: '',
        bankAccountNo: '',
        bankName: '',
        feeExplanation: '',
        securityCode: ''
      },
      rules: {
        bankAccountName: isRequired('请输入开户名称'),
        bankName: isRequired('请输入开户银行'),
        bankAccountNo: isRequired('请输入银行账户'),
        feeExplanation: isRequired('请输入费用说明')
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData: async function() {
      const result = await PlatformApi.getLoanServiceFee({})
      if (result.data.bankAccountNo) this.edit = false
      this.loanForm = { ...result.data }
    },
    back() {
      this.edit = false
      this.loanForm = { ...this.bak }
    },
    handleAddConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$securityCode().then(code => {
            this.handleSCodeSubmit(code)
          })
        }
      })
    },
    handleUpdate() {
      this.edit = true
      this.bak = { ...this.loanForm }
    },
    handleSCodeSubmit(code) {
      this.loanForm.securityCode = code
      PlatformApi.addOrUpdateLoanServiceFee(this.loanForm).then(res => {
        if (res) {
          this.$message.success('修改成功')
          this.edit = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 0 15px;
}
.financingShow {
  .f_edit {
    position: absolute;
    right: 40px;
  }
  .baseInfo {
    color: $labelColor;
    font-size: 14px;
    line-height: 25px;
  }
  .line {
    display: flex;
    > p {
      flex: 1;
      font-size: 14px;
      color: $titleColor;
      .tit {
        color: $labelColor;
        width: 110px;
      }
      > span {
        display: inline-block;
        padding-right: 15px;
        color: $titleColor;
      }
    }
  }
}

.inputContent {
  .block-index {
    font-size: 14px;
  }
  h4 {
    color: $titleColor;
    font-size: 16px;
    margin: 22px 0;
  }
  width: 550px;
  /deep/.el-form {
    .el-form-item__label {
      text-align: left !important;
    }
    .el-input .el-input__count .el-input__count-inner {
      background: transparent;
    }
  }
}
</style>

