<template>
  <el-dialog
    title="平台抽成"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
  >
    <div v-loading="loading" class="form-container">
      <div class="title">
        <i class="el-icon-warning" />
        <span class="content">资金方确认放款后，请您在线下将抽成费用打入平台账户，并标记抽成已支付。</span>
      </div>
      <el-form ref="form" class="form-info" :inline="true" label-width="140px" label-position="left">
        <h3>
          融资信息
        </h3>
        <el-form-item label="融资编号">
          <div>{{ originInfo.transNo }}</div>
        </el-form-item>
        <el-form-item label="融资金额">
          <div>{{ originInfo.loanAmount | thousands }}</div>
        </el-form-item>
        <el-form-item label="融资利率">
          <div>{{ originInfo.loanInterestRate }}%</div>
        </el-form-item>
        <el-form-item label="融资到期日">
          <div>{{ originInfo.dueDate }}</div>
        </el-form-item>
        <h3>
          抽成信息
        </h3>
        <!-- <div>
          <el-form-item label="技术服务费(线上)">
            <div>{{ originInfo.technologyServiceRate }}% 折合人民币 {{ originInfo.technologyServiceAmount }}元 </div>
          </el-form-item>
        </div>
        <div>
          <el-form-item v-if="originInfo.onlinePercentageRate" label="金融服务费(线上)">
            <div>{{ originInfo.onlinePercentageRate }}% 折合人民币 {{ originInfo.onlinePercentageAmount }}元 </div>
          </el-form-item>
        </div> -->
        <div>
          <el-form-item v-if="originInfo.offlinePercentageRate" label="服务费">
            <div>{{ originInfo.offlinePercentageRate }}% 折合人民币 {{ originInfo.offlinePercentageAmount }}元 </div>
          </el-form-item>
        </div>
        <h3>
          平台账户
        </h3>
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
    </div>
  </el-dialog>
</template>
<script>

import tableMixin from '@/utils/tableMixin'
import { EnterprisApi } from '@/api/index'

export default {
  name: 'FinancingDetailsDialog',
  components: {
  },
  mixins: [tableMixin],
  data() {
    return {
      visible: false,
      loading: false,
      originInfo: {
        tokenNo: '',
        loanAmount: '',
        loanInterestRate: '',
        loanEndTime: '',
        payerBankAccountName: '',
        payerBankName: '',
        payerBankAccountNo: '',
        platformDes: '',
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
      this.getPlatform()
    },
    close() {
      this.visible = false
    },
    // 获取融资详情
    getPlatform() {
      this.loading = true
      EnterprisApi.getLoanPercentage({
        transNo: this.originInfo.transNo
      }).then(res => {
        const data = res.data
        this.originInfo = {
          ...this.originInfo,
          payeeBankAccountName: data.payeeBankAccountName,
          payeeBankName: data.payeeBankName,
          payeeBankAccountNo: data.payeeBankAccountNo,
          technologyServiceRate: data.technologyServiceRate,
          technologyServiceAmount: data.technologyServiceAmount,
          onlinePercentageRate: data.onlinePercentageRate,
          onlinePercentageAmount: data.onlinePercentageAmount,
          offlinePercentageRate: data.offlinePercentageRate,
          offlinePercentageAmount: data.offlinePercentageAmount,
        }
        console.log(this.originInfo, data)
      }).finally(() => {
        this.loading = false
      })
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
.title {
  background: rgba(104, 88, 246, .05);
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 10px 0;
  padding-left: 40px;
  position: relative;
  i {
    display: inline-block;
    font-size: 24px;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 18px;
    color: #3F94F7;
    transform: translateY(-50%);
  }
  span{
    font-size: 14px;
  }
}
</style>
