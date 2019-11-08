<template>
  <el-dialog
    title="融资详情"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
  >
    <div v-loading="loading" class="form-container">
      <el-form ref="form" class="form-info" :inline="true" label-width="140px" label-position="left">
        <h3>融资申请信息</h3>
        <el-form-item v-if="role !== 'CHAIN'" label="融资方">
          <div>{{ originInfo.corpName }}</div>
        </el-form-item>
        <el-form-item :label="TOKEN__NAME + '所属'">
          <div>{{ originInfo.fundCorpName }}</div>
        </el-form-item>
        <el-form-item label="融资到期日">
          <div>{{ originInfo.dueDate }}</div>
        </el-form-item>
        <el-form-item :label="'申请融资' + TOKEN__NAME + '数量'">
          <span>{{ originInfo.tokenCount | thousands }}个</span>
          <span class="zhehe">折合人民币 {{ (originInfo.tokenCount / 10000) | thousands }}万元</span>
        </el-form-item>
        <h3>融资产品信息</h3>
        <el-form-item label="资金方">
          <div>{{ originInfo.fundCorpName }}</div>
        </el-form-item>
        <el-form-item label="融资产品">
          <div>{{ originInfo.productName }}</div>
        </el-form-item>
        <el-form-item label="融资额度">
          <div>{{ (originInfo.loanMinAmount / 10000) | thousands }}万元～{{ (originInfo.loanMaxAmount / 10000) | thousands }}万元</div>
        </el-form-item>
        <el-form-item label="融资期限">
          <div>{{ originInfo.loanStartTime }}～{{ originInfo.loanEndTime }}</div>
        </el-form-item>
        <el-form-item label="融资利率">
          <div>{{ originInfo.loanInterestRate }}%</div>
        </el-form-item>
        <!-- <el-form-item label="合约">
          <Download v-if="originInfo.issueTokenContractUrl" type="primary" direct :url="originInfo.issueTokenContractUrl || ''">
            <el-button class="download-button" type="text">融资申请合约</el-button>
          </Download>
          <span v-else>-</span>
        </el-form-item> -->
        <el-form-item label="合约">
          <Download type="primary" direct :url="originInfo.preContractUrl">
            <el-button class="download-button" type="text">应收账款转让合同+{{ TOKEN__NAME }}合约</el-button>
          </Download>
        </el-form-item>
        <h3>融资方收款账号</h3>
        <el-form-item label="银行">
          <div>{{ originInfo.payeeBankName }}</div>
        </el-form-item>
        <el-form-item label="银行账号">
          <div>{{ originInfo.payeeBankAccountNo }}</div>
        </el-form-item>
        <h3>融资方联系人信息</h3>
        <el-form-item label="联系人">
          <div>{{ originInfo.contactsUser }}</div>
        </el-form-item>
        <el-form-item label="联系电话">
          <div>{{ originInfo.contactsTel }}</div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import tableMixin from '@/utils/tableMixin'
import { mapGetters } from 'vuex'
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
        tokenName: '',
        loanEndTime: '',
        tokenCount: '',
        fundCorpName: '',
        productName: '',
        loanMinAmount: '',
        loanMaxAmount: '',
        applyDate: '',
        loanStartTime: '',
        loanInterestRate: '',
        payeeBankName: '',
        payeeBankCode: '',
        contactsUser: '',
        contactsTel: '',
      },
    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  watch: {
  },
  methods: {
    open(data) {
      this.visible = true
      this.originInfo = data
      if (!this.originInfo.preContractUrl) {
        this.loading = true
        EnterprisApi.previewFinContract({
          transNo: this.originInfo.transNo
        }).then(res => {
          this.originInfo.preContractUrl = res.data.contractUrl
        }).finally(() => {
          this.loading = false
        })
      }
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
.zhehe {
  color: #8492a6;
}
</style>
