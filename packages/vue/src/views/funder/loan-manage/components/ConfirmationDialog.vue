<template>
  <el-dialog
    :visible.sync="paymentFormVisible"
    title="确认已放款"
    :append-to-body="true"
    width="800px"
  >
    <el-form ref="paymentForm" :model="paymentForm" :rules="rules" label-width="96px" label-position="left">
      <h3>收款方</h3>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="收款方银行">
            <span>{{ paymentForm.payeeBankName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款方账户名">
            <span>{{ paymentForm.payeeBankAccountName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="收款方账号">
            <span>{{ paymentForm.payeeBankAccountNo }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>付款方</h3>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="付款日期" prop="payerTime">
            <el-date-picker v-model="paymentForm.payerTime" type="date" style="width: 100%;" :picker-options="pickerOptions" placeholder="选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款金额" prop="payerAmount">
            <el-input v-model="paymentForm.payerAmount" placeholder="请输入" suffix="万元" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="付款方银行" prop="payerBankName">
            <el-input v-model="paymentForm.payerBankName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方账户名" prop="payerBankAccountName">
            <el-input v-model="paymentForm.payerBankAccountName" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="付款方账号" prop="payerBankAccountNo">
            <el-input v-model="paymentForm.payerBankAccountNo" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="回执单号" prop="payerReceiptNumber">
            <el-input v-model="paymentForm.payerReceiptNumber" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="上传凭证" prop="payerVoucherUrl">
            <image-upload
              ref="imageupload"
              :limit="1"
              :url.sync="fileList"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>

import ImageUpload from './ImageUpload'
import { CommonApi } from '@/api'

export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      paymentFormVisible: false,
      paymentForm: {
        payeeBankName: '',
        payeeBankAccountName: '',
        payeeBankAccountNo: '',
        payerTime: '',
        payerAmount: '',
        payerBankName: '',
        payerBankAccountName: '',
        payerBankAccountNo: '',
        payerReceiptNumber: '',
        payerVoucher: '',
        payerVoucherUrl: ''
      },
      rules: {
        payerTime: [
          { required: true, message: '请选择付款日期' },
        ],
        payerAmount: [
          { required: true, message: '请输入付款金额' },
        ],
        payerBankName: [
          { required: true, message: '请输入付款方银行' },
        ],
        payerBankAccountName: [
          { required: true, message: '请输入付款方账户名' },
        ],
        payerBankAccountNo: [
          { required: true, message: '请输入付款方账号' },
        ],
        payerReceiptNumber: [
          { required: true, message: '请输入回执单号' },
        ],
        payerVoucherUrl: [
          { required: true, message: '请上传凭证' },
        ]
      },
      fileList: [],
      pickerOptions: {
        disabledDate: (time) => {
          const now = new Date()
          now.setDate(now.getDate() + 3)
          return time > now
        }
      },
    }
  },
  watch: {
    'fileList': function(val) {
      if (val.length > 0) {
        this.paymentForm.payerVoucherUrl = val.map(item => item.data)[0]
        this.paymentForm.payerVoucher = val.map(item => item.name)[0]
      } else {
        this.paymentForm.payerVoucherUrl = ''
        this.paymentForm.payerVoucher = ''
      }
    }
  },
  methods: {
    open(data) {
      this.transNo_payment = data.transNo
      this.paymentForm.payeeBankName = data.payeeBankName
      this.paymentForm.payeeBankAccountName = data.payeeBankAccountName
      this.paymentForm.payeeBankAccountNo = data.payeeBankAccountNo
      this.paymentFormVisible = true
      this.getBankCardInfo()
    },
    // 获取对公账号信息
    getBankCardInfo() {
      CommonApi.getCorpBankAccount().then((res) => {
        const cards = res.data
        cards.some((card) => {
          if (card.type === 'PAYMENT' || card.type === 'ALL') { // 如果是付款账号或收付卡
            if (card.status === 'VALID') { // 有效状态的卡
              this.paymentForm.payerBankName = card.bankName
              this.paymentForm.payerBankAccountName = card.bankAccountName
              this.paymentForm.payerBankAccountNo = card.bankAccountNo
              return true
            }
            return false
          }
          return false
        }, this)
      })
    },
    submit() {
      this.$refs.paymentForm.validate(valid => {
        if (valid) {
          this.paymentForm.payerAmount = this.paymentForm.payerAmount * 10000
          var form = { ...this.paymentForm }
          this.$emit('callback', { data: form })
          this.close()
        }
      })
    },
    close() {
      this.paymentFormVisible = false
      this.fileList.length = 0
      this.$refs.paymentForm.resetFields()
      this.$refs.imageupload.clearFiles()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
