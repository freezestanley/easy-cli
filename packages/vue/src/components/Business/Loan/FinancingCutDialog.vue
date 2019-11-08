<template>
  <el-dialog
    title="抽成明细"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
  >
    <div v-loading="loading" class="form-container">
      <h4>
        平台抽成信息
      </h4>
      <el-form ref="form" class="form-info" :inline="true" label-width="130px" label-position="left">
        <div>
          <el-form-item label="技术服务费(线上)">
            <div>{{ percentDetail.technologyServiceRate }}% 折合人民币 {{ percentDetail.technologyServiceAmount }}元 </div>
          </el-form-item>
        </div>
        <div>
          <el-form-item v-if="percentDetail.onlinePercentageRate" label="金融服务费(线上)">
            <div>{{ percentDetail.onlinePercentageRate }}% 折合人民币 {{ percentDetail.onlinePercentageAmount }}元 </div>
          </el-form-item>
        </div>
        <div>
          <el-form-item v-if="percentDetail.offlinePercentageRate" label="金融服务费(线下)">
            <div>{{ percentDetail.offlinePercentageRate }}% 折合人民币 {{ percentDetail.offlinePercentageAmount }}元 </div>
          </el-form-item>
        </div>
        <el-form-item label="平台开户名称">
          <div>{{ percentDetail.payeeBankAccountName }}</div>
        </el-form-item>
        <el-form-item label="开户银行">
          <div>{{ percentDetail.payeeBankName }}</div>
        </el-form-item>
        <el-form-item label="平台银行账号">
          <div>{{ percentDetail.payeeBankAccountNo }}</div>
        </el-form-item>
        <h3>
          抽成付款信息
        </h3>
        <el-form-item label="付款日期">
          <div>{{ percentDetail.payerTime }}</div>
        </el-form-item>
        <el-form-item label="付款金额">
          <div>{{ percentDetail.payerAmount }} (元)</div>
        </el-form-item>
        <el-form-item label="付款方银行">
          <div>{{ percentDetail.payerBankName }}</div>
        </el-form-item>
        <el-form-item label="付款方账户名">
          <div>{{ percentDetail.payerBankAccountName }}</div>
        </el-form-item>
        <el-form-item label="付款方账户">
          <div>{{ percentDetail.payerBankAccountNo }}</div>
        </el-form-item>
        <el-form-item label="回执单号">
          <div>{{ percentDetail.payerReceiptNumber }}</div>
        </el-form-item>
        <el-form-item label="付款凭证">
          <span class="dib ellipsis" style="width:170px;vertical-align: middle;">{{ percentDetail.payerVoucher }}</span>
          <Download v-if="percentDetail.payerVoucherUrl" direct :url="percentDetail.payerVoucherUrl">
            <el-button type="text">下载</el-button>
          </Download>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>

import { EnterprisApi } from '@/api/index'
import tableMixin from '@/utils/tableMixin'

export default {
  name: 'FinancingCut',
  components: {
  },
  mixins: [tableMixin],
  data() {
    return {
      visible: false,
      loading: false,
      percentDetail: {
        percentageRate: '',
        payeeBankAccountName: '',
        payerVoucherUrl: '',
        payerReceiptNumber: '',
        payeeBankName: '',
        payeeBankAccountNo: '',
        payerTime: '',
        loanAmount: '',
        payerBankName: '',
        payerBankAccountName: '',
        payerBankAccountNo: '',
        platformDes: '',
        percentageAmount: ''
      },
    }
  },
  computed: {

  },
  watch: {
  },
  mounted() {
  },
  methods: {
    open(data) {
      this.loading = true
      const { transNo } = data
      EnterprisApi.getLoanPercentage({
        transNo
      }).then(res => {
        this.percentDetail = res.data
        this.percentDetail.payerTime = res.data.payerTime
        this.percentDetail.payerVoucherUrl = res.data.payerVoucherUrl
        this.percentDetail.payerAmount = res.data.payerAmount

        // this.percentDetail.technologyServiceRate: data.technologyServiceRate,
        //   technologyServiceAmount: data.technologyServiceAmount,
        //   onlinePercentageRate: data.onlinePercentageRate,
        //   onlinePercentageAmount: data.onlinePercentageAmount,
        //   offlinePercentageRate: data.offlinePercentageRate,
        //   offlinePercentageAmount: data.offlinePercentageAmount,
      }).finally(() => {
        this.loading = false
      })
      this.visible = true
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
      width: 340px;
      margin-bottom: 16px;
    }
    /deep/ .el-form-item__content {
      width: 210px;
    }
  }
}
</style>
