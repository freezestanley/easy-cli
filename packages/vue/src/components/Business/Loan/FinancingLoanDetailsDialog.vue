<template>
  <el-dialog
    title="放款详情"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
  >
    <div class="form-container">
      <el-form ref="form" class="form-info" :inline="true" label-width="140px" label-position="left">
        <h3>
          收款方信息
        </h3>
        <el-form-item label="收款银行">
          <div>{{ originInfo.payeeBankName }}</div>
        </el-form-item>
        <el-form-item label="收款方账户名">
          <div>{{ originInfo.payeeBankAccountName }}</div>
        </el-form-item>
        <el-form-item label="收款方账号">
          <div>{{ originInfo.payeeBankAccountNo }}</div>
        </el-form-item>
        <h3>
          付款方信息
        </h3>
        <el-form-item label="付款日期">
          <div>{{ formatterTime(originInfo.payerTime) }}</div>
        </el-form-item>
        <el-form-item label="付款金额">
          <div>{{ originInfo.payerAmount / 10000 | thousands }} 万元</div>
        </el-form-item>
        <el-form-item label="付款方银行">
          <div>{{ originInfo.payerBankName }}</div>
        </el-form-item>
        <el-form-item label="付款方账户名">
          <div>{{ originInfo.payerBankAccountName }}</div>
        </el-form-item>
        <el-form-item label="付款方账号">
          <div>{{ originInfo.payerBankAccountNo }}</div>
        </el-form-item>
        <el-form-item label="回执单号">
          <div>{{ originInfo.payerReceiptNumber }}</div>
        </el-form-item>
        <el-form-item label="付款凭证">
          <span>{{ originInfo.payerVoucher }}</span>
          <Download v-if="originInfo.payerVoucherUrl" direct :url="originInfo.payerVoucherUrl">
            <el-button style="margin-left:30px" type="text">下载</el-button>
          </Download>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>

import tableMixin from '@/utils/tableMixin'

export default {
  name: 'FinancingLoanDetailsDialog',
  components: {
  },
  mixins: [tableMixin],
  data() {
    return {
      visible: false,
      originInfo: {
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
        payerVoucherUrl: '',
      },
    }
  },
  computed: {

  },
  watch: {
  },
  methods: {
    open(data) {
      this.visible = true
      this.originInfo = data
    },
    close() {
      this.visible = false
    }
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
      width: 214px;
    }
  }
}
</style>
