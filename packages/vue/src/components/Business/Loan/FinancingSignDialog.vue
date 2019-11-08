<template>
  <el-dialog
    title="标记抽成已支付"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
  >
    <div v-loading="loading" class="form-container">
      <el-form class="form-info" :inline="true" label-width="120px" label-position="left">
        <h3>
          平台抽成信息
        </h3>
        <el-form-item label="金融服务费(线下)">
          <div>{{ originInfo.offlinePercentageRate }}% 折合人民币 {{ originInfo.offlinePercentageAmount }}元 </div>
        </el-form-item>
        <el-form-item label="平台开户名称">
          <div>{{ originInfo.payeeBankAccountName }}</div>
        </el-form-item>
        <el-form-item label="平台开户银行">
          <div>{{ originInfo.payeeBankName }}</div>
        </el-form-item>
        <el-form-item label="平台银行账号">
          <div>{{ originInfo.payeeBankAccountNo }}</div>
        </el-form-item>
      </el-form>
      <h3>
        标记付款信息
      </h3>
      <el-form ref="form" class="form-info" :inline="true" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="付款日期:" prop="payerTime">
          <el-date-picker v-model="form.payerTime" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="付款金额" prop="payerAmount">
          <el-input v-model="form.payerAmount" type="number" placeholder="请输入">
            <template slot="suffix" class="textTitle">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="付款方银行" prop="payerBankName">
          <el-input v-model="form.payerBankName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="付款方账户名" prop="payerBankAccountName">
          <el-input v-model="form.payerBankAccountName" type="text" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="付款方账号" prop="payerBankAccountNo">
          <el-input v-model="form.payerBankAccountNo" type="text" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="回执单号" prop="payerReceiptNumber">
          <el-input v-model="form.payerReceiptNumber" type="text" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="上传凭证" prop="payerVoucher">
          <!-- <image-upload
            v-if="visible"
            :limit="1"
            :url.sync="fileList"
            :files="fileList"
          /> -->
          <file-upload :url-arr.sync="fileList" :limit="1" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import FileUpload from '@/components/FileUpload'
import { EnterprisApi, CommonApi } from '@/api/index'
import { mapGetters } from 'vuex'
// import { thousands } from '@/utils/validator'

export default {
  name: 'FinancingSignDialog',
  components: {
    // ImageUpload,
    FileUpload
  },
  data() {
    const checkNo = (rule, value, callback) => {
      if ((value === '' || value <= 0)) {
        return callback(new Error('请输入'))
      }
      callback()
    }
    return {
      visible: false,
      fileList: [],
      loading: false,
      originInfo: {
        loanInterestRate: 111,
        payeeBankName: '11111',
        payeeBankAccountName: '11111',
        payeeBankAccountNo: '11111',
      },
      form: {
        payerAmount: '',
        payerBankName: '',
        payerBankAccountName: '',
        payerBankAccountNo: '',
        payerReceiptNumber: '',
        payerTime: '',
        payerVoucher: '',
      },
      rules: {
        payerTime: [
          { required: true, message: '请选择付款日期', trigger: 'change' },
        ],
        payerAmount: [
          { required: true, message: '请输入付款金额', trigger: 'change' },
          { validator: checkNo, trigger: ['blur', 'change'] }
        ],
        payerBankName: [
          { required: true, message: '请选择银行', trigger: 'change' },
        ],
        payerBankAccountName: [
          { required: true, message: '请填写付款方账户名' }
        ],
        payerBankAccountNo: [
          { required: true, message: '请填写付款方账号' }
        ],
        payerReceiptNumber: [
          { required: true, message: '请填写回执单号' }
        ],
        payerVoucher: [
          { required: true, message: '请上传附件' }
        ],
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    'form.range': function(val) {
      if (val) {
        this.form.applyDateBegin = val[0] || ''
        this.form.applyDateEnd = val[1] || ''
      } else {
        this.form.applyDateBegin = ''
        this.form.applyDateEnd = ''
      }
    }
  },
  methods: {
    open(data) {
      this.fileList = []
      this.visible = true
      this.getBankInfo()
      this.getInfo(data.transNo, data.loanAmount)
    },
    getInfo(transNo, loanAmount) {
      EnterprisApi.getLoanPercentage({
        transNo: transNo
      }).then(res => {
        this.originInfo = res.data
        // this.originInfo.platformDes = res.data.percentageRate + '%, ' + '折合人民币 ' + thousands(loanAmount * 0.01 * res.data.percentageRate)
      }).finally(() => {
        this.loading = false
      })
    },
    // 获取银行信息
    getBankInfo() {
      this.loading = true
      CommonApi.getCorpBankAccount().then((res) => {
        const cards = res.data
        cards.some((card) => { // 会有已作废 所以遍历
          if (card.type === 'PAYMENT' || card.type === 'ALL') { // 如果找到是收款账号或者是支收卡
            if (card.status === 'VALID') { // 已激活
              this.form.payerBankName = card.bankName
              this.form.payerBankAccountName = card.bankAccountName
              this.form.payerBankAccountNo = card.bankAccountNo
            }
            return card.status === 'VALID'
          } else {
            return false
          }
        }, this)
      })
    },
    close() {
      this.originInfo = {
        payeeBankName: '',
        payeeBankAccountName: '',
        payeeBankAccountNo: '',
        loanInterestRate: ''
      }
      this.fileList = []
      this.$refs.form.resetFields()
      this.visible = false
    },
    handleSubmit() {
      // this.form.payerVoucherUrl = this.fileList.map(item => item.data)[0]
      // this.form.payerVoucher = this.fileList.map(item => item.name)[0]
      if (this.fileList.length) {
        const file = this.fileList[0]
        this.form.payerVoucherUrl = file
        this.form.payerVoucher = file.slice(file.lastIndexOf('/') + 1)
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$securityCode().then((code) => {
            EnterprisApi.corpUpdateLoanPercentage({
              payerAmount: this.form.payerAmount,
              payerBankAccountName: this.form.payerBankAccountName,
              payerBankAccountNo: this.form.payerBankAccountNo,
              payerBankName: this.form.payerBankName,
              payerReceiptNumber: this.form.payerReceiptNumber,
              payerTime: this.form.payerTime,
              payerVoucher: this.form.payerVoucher,
              payerVoucherUrl: this.form.payerVoucherUrl,
              payerCorpNo: this.userInfo.corpNo,
              payerCorpName: this.userInfo.corpName,
              transNo: this.originInfo.transNo,
              securityCode: code,
            }).then(() => {
              this.close()
              this.$message({
                type: 'success',
                message: '标记成功!'
              })
              this.$emit('callback')
            }).finally(() => {
              this.loading = false
            })
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.form-container{
  .form-info{
    /deep/ .el-form-item {
      width: 364px;
      margin-bottom: 16px;
    }
    /deep/ .el-form-item__content {
      width: 240px;
      .el-input {
        width: 264px;
      }
      .el-date-editor{
        width: 264px!important;
      }
    }
  }
}
</style>
