<template>
  <div class="page page-financing-product">
    <div v-loading="formLoading" class="inputContent">
      <el-form ref="form" class="financing-product-form" :model="financingForm" :rules="rules" label-width="84px">
        <h4>融资合同信息</h4>
        <p>
          1.本企业是一家在中华人民共和国依法注册的
          <el-form-item prop="enterpriseStatement" class="dib" style="width:440px" label-width="0">
            <el-input v-model.trim="financingForm.enterpriseStatement" class="inline-input tac" maxlength="30" style="width: 440px" />
          </el-form-item>
          公司，依法可提供
          <el-form-item prop="serviceStatement" class="dib" style="width:720px" label-width="0">
            <el-input v-model.trim="financingForm.serviceStatement" class="inline-input tac" maxlength="50" style="width: 720px" />
          </el-form-item>
          服务。
        </p>
        <p>
          2.融资生成的合同词汇具有明确定义与解释，未特别解释的专业术语，可参照国家法律规定或
          <el-form-item prop="contractStatement" class="dib" style="width:720px" label-width="0">
            <el-input v-model.trim="financingForm.contractStatement" class="inline-input tac" maxlength="50" style="width: 720px" />
          </el-form-item>
          的国际惯例予以解释。
        </p>
        <h4>融资产品信息</h4>
        <el-form-item label="产品名称" prop="productName">
          <el-input
            v-model="financingForm.productName"
            class="product-name"
            type="textarea"
            :rows="1"
            :maxlength="30"
            :show-word-limit="true"
            placeholder="请输入融资产品名称"
            resize="none"
          />
        </el-form-item>
        <div class="moneySection">
          <el-form-item label="融资额度" prop="loanMinAmount" style="width: 300px;">
            <el-input
              v-model="financingForm.loanMinAmount"
              type="number"
              class="inline"
              placeholder="请输入"
            >
              <div slot="suffix" style="color:#000">万元</div>
            </el-input>
          </el-form-item>
          <span> ~ </span>
          <el-form-item prop="loanMaxAmount" style="width: 215px;">
            <el-input
              v-model="financingForm.loanMaxAmount"
              type="number"
              class="inline"
              placeholder="请输入"
            >
              <div slot="suffix" style="color:#000">万元</div>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="融资利率" prop="loanInterestRate">
          <el-input v-model="financingForm.loanInterestRate" class="inline" placeholder="请输入利率百分比">
            <div slot="suffix" style="color:#000">%</div>
          </el-input>
        </el-form-item>
        <el-form-item label="融资期限" prop="regdate">
          <el-date-picker
            v-model="financingForm.regdate"
            end-placeholder="结束日期"
            start-placeholder="开始日期"
            type="daterange"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="逾期利率" prop="overdueInterestRate">
          <el-input v-model="financingForm.overdueInterestRate" class="inline">
            <div slot="suffix" style="color:#000">%</div>
          </el-input>
        </el-form-item>
        <el-form-item label="产品介绍" prop="productIntroduction">
          <el-input
            v-model="financingForm.productIntroduction"
            :rows="7"
            maxlength="200"
            show-word-limit
            type="textarea"
            resize="none"
          />
        </el-form-item>
        <el-form-item label="申请条件" prop="applyRequirement">
          <el-input
            v-model="financingForm.applyRequirement"
            :rows="7"
            maxlength="200"
            show-word-limit
            type="textarea"
            resize="none"
          />
        </el-form-item>
        <el-form-item label="申请流程" prop="applyProcess">
          <el-input
            v-model="financingForm.applyProcess"
            :rows="7"
            maxlength="200"
            show-word-limit
            type="textarea"
            resize="none"
          />
        </el-form-item>
        <el-form-item>
          <el-button style="width:100px;height:36px" @click="handleCancel">取 消</el-button>
          <el-button :loading="loading" style="width:240px;height:36px" type="primary" @click="handleConfirm">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isRequired, isNumber } from '@/utils/validator'
import { FunderApi } from '@/api'

const financingForm = {
  applyProcess: '',
  applyRequirement: '',
  loanInterestRate: '',
  loanMaxAmount: '',
  loanMinAmount: '',
  loanStartTime: '',
  loanEndTime: '',
  overdueInterestRate: '',
  productIntroduction: '',
  productName: '',
  regdate: null,
  enterpriseStatement: '',
  serviceStatement: '',
  contractStatement: ''
}
export default {
  name: 'FundFinancingProduct',
  props: {
    productNo: {
      default: null,
      type: [String, Object]
    }
  },
  data() {
    const amountValidator = (rule, value, callback) => {
      const float = value.toString().split('.')[1] || ''
      if (float.length > 4) {
        callback(new Error('小数点后不能超过四位'))
      } else {
        callback()
      }
    }
    const productNameValidator = (rule, value, callback) => {
      if (value.length > 30) {
        callback(new Error('产品名称不能超过30个字符'))
      } else {
        callback()
      }
    }
    return {
      formLoading: false,
      loading: false,
      financingForm: {
        ...financingForm
      },
      rules: {
        enterpriseStatement: isRequired('请输入合同企业名称'),
        serviceStatement: isRequired('请输入合同服务内容'),
        contractStatement: isRequired('请输入合同词汇解释'),
        productName: [
          isRequired('请输入融资产品名称'),
          { validator: productNameValidator, trigger: 'blur' }
        ],
        loanMinAmount: [
          isNumber('融资额度必须为大于0的数字'),
          { validator: amountValidator, trigger: 'blur' }
        ],
        loanMaxAmount: [
          isNumber('融资额度必须为大于0的数字'),
          { validator: amountValidator, trigger: 'blur' }
        ],
        loanInterestRate: isNumber('请输入融资利率'),
        regdate: [
          { required: true, message: '请选择融资期限' }
        ],
        // productIntroduction: isRequired('请输入产品介绍'),
        // applyRequirement: isRequired('请输入申请条件'),
        overdueInterestRate: isNumber('请输入正确的逾期利率'),
      },
      initialData: {
        ...financingForm
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    integer(e) {
      console.log(e.target.value)
    },
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        const form = this.financingForm
        const { regdate } = form
        if (Array.isArray(regdate)) {
          form.loanStartTime = form.regdate[0]
          form.loanEndTime = form.regdate[1]
        }
        if (form.loanMinAmount <= 0 || form.loanMaxAmount <= 0) {
          this.$message.error('融资额度不能为零')
          return
        }
        this.triggerApi({
          ...form,
          loanMinAmount: +form.loanMinAmount * 10000,
          loanMaxAmount: +form.loanMaxAmount * 10000,
        })
        // this.$ukey({ ...this.financingForm }).then(signData => {
        //   this.triggerApi({ signData })
        // })
      })
    },
    handleCancel() {
      this.$router.back()
    },
    triggerApi(params = {}) {
      if (this.productNo) {
        params.productNo = this.productNo
      }

      this.loading = true
      FunderApi.addOrUpdateLoanProduct(params).then(res => {
        if (res) {
          this.$message.success('操作成功')
          this.$router.back()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    getData() {
      if (this.productNo) {
        this.formLoading = true
        FunderApi.getLoanProduct({
          productNo: this.productNo
        }).then(res => {
          res.data.regdate = [res.data.loanStartTime, res.data.loanEndTime]
          this.initialData = res.data
          this.financingForm = {
            ...this.initialData,
            loanMinAmount: +res.data.loanMinAmount / 10000,
            loanMaxAmount: +res.data.loanMaxAmount / 10000,
          }
          this.$refs['form'].resetFields()
        })
          .finally(() => {
            this.formLoading = false
          })
      } else {
        FunderApi.getLatestLoanProduct().then(res => {
          const data = res.data
          this.financingForm = {
            ...financingForm,
            enterpriseStatement: data.enterpriseStatement,
            serviceStatement: data.serviceStatement,
            contractStatement: data.contractStatement,
          }
          this.loading = false
        }).catch(err => {
          console.error(err)
          this.loading = false
        })
      }
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
      > span {
        color: $labelColor;
        display: inline-block;
        padding-right: 15px;
      }
    }
  }
}

.inputContent {
  .block-index {
    font-size: 14px;
  }
  .moneySection {
    font-size: 14px;
    line-height: 30px;
    display: flex;
    > span {
      margin: 0 10px;
    }
    /deep/.el-form-item:last-child {
      .el-form-item__content {
        margin: 0 !important;
      }
    }
    /deep/.el-input__inner {
      width: 215px;
    }
  }
  h4 {
    color: $titleColor;
    font-size: 16px;
    margin: 22px 0;
  }
  // width: 550px;
  /deep/.el-form {
    .el-form-item__label {
      text-align: left !important;
    }
    .el-input .el-input__count .el-input__count-inner {
      background: transparent;
    }
  }
}
/deep/.inline-input.el-input {
  input {
    border-color: transparent;
    border-bottom-color: $info;
    border-radius: 0;
    padding: 0;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
}
/deep/.financing-product-form {
  .el-form-item {
    width: 550px;
  }
  p {
    color: $labelColor;
    line-height: 34px;
    margin: 8px 0;
  }
}
/deep/.product-name{
  .el-input__count{
    line-height: 22px;
  }
}
</style>

