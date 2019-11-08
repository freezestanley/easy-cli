<template>
  <div>
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="申请时间:" prop="range">
              <el-date-picker
                v-model="ruleForm.range"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资金方" prop="fundCorpName">
              <el-input
                v-model.trim="ruleForm.fundCorpName"
                type="text"
                placeholder="请输入企业名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程状态" prop="bizStatus" fixed="right">
              <el-select v-model="ruleForm.bizStatus" placeholder="请选择">
                <el-option label="全部" value />
                <el-option
                  v-for="item in bizStatusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="订单状态" prop="status" fixed="right">
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option
                  v-for="item in ORDER_STATUS_LIST"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
              <div v-permission="'loan-manage__add'" class="opt-add-btn">
                <el-button type="primary" icon="el-icon-plus" @click="addTransfer">新增融资</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="tips-box">
      <div class="title">
        <i class="el-icon-warning" />
        <span class="content">Tips : 众企安链融资，会收取一定融资比例的服务费，平台审核融资申请通过后，会返回服务费用，您可在融资成功后线下打款到平台账户。 <a @click="onFeeHandle">查看《平台服务费说明》</a></span>
      </div>
    </div>
    <div class="container">
      <div class="table-box">
        <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
          <el-table-column slot="txHash" label="hash" width="132px" show-overflow-tooltip>
            <template slot-scope="scope">
              <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash">{{ scope.row.txHash }}</hash-link>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column slot="fundCorpName" label="资金方" width="132px" show-overflow-tooltip>
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.fundCorpNo">{{ scope.row.fundCorpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column slot="productName" label="融资产品" width="110px" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="ellipsis">{{ scope.row.productName }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="tokenCount" width="175px" :label="'申请融资' + TOKEN__NAME + '数量（个）'">
            <template slot-scope="scope">
              <div>{{ scope.row.tokenCount | thousands }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column v-else slot="loanMaxAmount" width="175px" label="申请融资额度（万元）">
            <template slot-scope="scope">
              <div>{{ numToStr(scope.row.loanMinAmount) }}~{{ numToStr(scope.row.loanMaxAmount) }}</div>
            </template>
          </el-table-column> -->
          <el-table-column slot="bizStatusName" width="124" label="流程状态" fixed="right">
            <template slot-scope="scope">
              <div :class="ORDER_STATUS_COLOR[scope.row.status]">{{ scope.row.bizStatusName }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="status" width="124" label="订单状态" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 'FUND_SIGNED_REVIEWED' && scope.row.contractStatus === 'INIT'" :class="ORDER_STATUS_COLOR[scope.row.status]">
                资金方签章中
              </div>
              <div v-else-if="scope.row.status === 'CHAIN_CORP_SIGNED_REVIEWED' && scope.row.contractStatus === 'WAIT'" :class="ORDER_STATUS_COLOR[scope.row.status]">
                签章中
              </div>
              <div v-else :class="ORDER_STATUS_COLOR[scope.row.status]">{{ ORDER_STATUS_MAP[scope.row.status] }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="opt" label="操作" width="280" fixed="right">
            <template slot-scope="scope" style="text-align:left">
              <el-button
                v-show="['CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) == -1"
                v-fast-click="wrapClick(openDetail, scope.row)"
                type="text"
              >融资详情</el-button>
              <el-button
                v-show="['CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) > -1"
                v-fast-click="wrapClick(viewPdfHandle, scope.row, 0)"
                type="text"
              >查看合约</el-button>
              <template v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE">
                <el-button
                  v-show="['CHAIN_CHECK_TOKEN'].indexOf(scope.row.bizStatus) > -1"
                  v-permission="'loan-manage__check'"
                  v-fast-click="wrapClick(showCheck, scope.row)"
                  type="text"
                >审核</el-button>
                <!-- FIRST("FIRST","盖一次成功"),这个的时候，链属可以签；-->
                <el-button
                  v-show="scope.row.bizStatus === 'CHAIN_SEAL_TOKEN' && scope.row.contractStatus === 'FIRST'"
                  v-permission="'loan-manage__sign'"
                  v-fast-click="wrapClick(showSign, scope.row)"
                  type="text"
                >签约</el-button>
              </template>
              <el-button
                v-show="['CHAIN_REJECT_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) == -1 && scope.row.button === CHECK_FLOW_STATUS.DONE"
                type="text"
                @click="showFlow(scope.row, FLOW_POP_TYPE.FLOW, '融资审批流')"
              >审批流</el-button>
              <el-button
                v-show="['FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) > -1 && scope.row.button === CHECK_FLOW_STATUS.DONE"
                type="text"
                @click="showFlow(scope.row, FLOW_POP_TYPE.SFLOW, '融资审批流')"
              >审批流</el-button>
              <el-button
                v-show="['FUND_CHECK_TOKEN', 'FUND_SEAL_TOKEN', 'CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN'].indexOf(scope.row.bizStatus) > -1"
                v-fast-click="wrapClick(viewPlatformCutHandle, scope.row)"
                type="text"
              >平台抽成</el-button>
              <el-button
                v-show="(scope.row.bizStatus === 'SUCCESS' && scope.row.loanPercentageStatus === 'PAID')"
                v-fast-click="wrapClick(viewCutHandle, scope.row)"
                type="text"
              >查看抽成</el-button>
              <el-button
                v-show="scope.row.bizStatus === 'SUCCESS'"
                v-fast-click="wrapClick(viewLoanHandle, scope.row)"
                type="text"
              >查看放款</el-button>
              <!-- 以下2种状态会出现标记支付
                1.CHAIN_CORP_SIGNED（待资金方放款）
                2.资金方放款完成后状态会变为FUND_CONFIRM_PAID 此候需要判断 loanPercentageStatus=='UNPAID'(表示未标记支付过)
              -->
              <!-- && ((scope.row.status === 'CHAIN_CORP_SIGNED_REVIEWED' && scope.row.loanPercentageStatus && scope.row.loanPercentageStatus === 'UNPAID') -->
              <el-button
                v-show="scope.row.bizStatus === 'SUCCESS' && scope.row.loanPercentageStatus === 'UNPAID' || scope.row.loanPercentageStatus === 'OFFLINE_UNPAID'"
                v-permission="'loan-manage__mark'"
                v-fast-click="wrapClick(viewSignHandle, scope.row)"
                type="text"
              >标记抽成已支付</el-button>
            </template>
          </el-table-column>
        </basic-table>

        <Pagination
          v-if="list.length && !loading"
          :current-change="onCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          :size-change="onSizeChange"
          :total="total"
        />
      </div>
    </div>

    <!-- 平台服务器说明 -->
    <fee-explain-dialog ref="feeExplainDialog" />

    <!-- 融资详情 -->
    <financing-details-dialog ref="financingDetailsDialog" />

    <!-- pdf 查看 -->
    <PDF ref="pdfDialogView">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <Download type="primary" direct :url="currViewData.contractUrl ||''">
          <el-button class="next-button" type="primary">下载合约</el-button>
        </Download>
      </template>
    </PDF>

    <!-- 抽成详情 -->
    <financing-cut-dialog ref="financingCutDialog" />

    <!-- 平台抽成 -->
    <financing-platform-cut-dialog ref="financingPlatformCutDialog" />

    <!-- 放款详情 -->
    <financing-loan-details-dialog ref="financingLoanDetailsDialog" />

    <!-- 标记已抽成 -->
    <financing-sign-dialog ref="financingSignDialog" @callback="signDialogCallback" />

    <!-- 审批流 -->
    <CheckFlow ref="checkFlow">
      <div slot="check">
        <el-form ref="verifyForm" class="mark-form" :model="verifyForm" :rules="rules" label-width="100px" label-position="left" style="width: 90%">
          <el-form-item label="审核结果" prop="approve">
            <el-radio-group v-model="verifyForm.approve">
              <el-radio :label="true">审核通过</el-radio>
              <el-radio :label="false">审核驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="!verifyForm.approve" label="驳回原因" prop="reason">
            <el-input v-model="verifyForm.reason" type="textarea" resize="none" :rows="4" :maxlength="100" show-word-limit placeholder="请输入驳回原因" />
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelCheck">取 消</el-button>
            <el-button v-fast-click="wrapClick(handleVerify)" type="primary">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="sign">
        <SignPdf :pdf-url="pdfUrl">
          <div style="padding-top: 15px">
            <el-button @click="cancelCheck">取消</el-button>
            <el-button v-if="!currViewData.isLastOperator" v-fast-click="wrapClick(onOkHandle)" type="primary">同意签约</el-button>
            <el-button v-if="currViewData.isLastOperator" v-fast-click="wrapClick(onOkHandle)" type="primary">确定签约</el-button>
          </div>
        </SignPdf>
      </div>
    </CheckFlow>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import tableMixin from '@/utils/tableMixin'
import FeeExplainDialog from '@/components/Business/Loan/FeeExplainDialog'
import FinancingDetailsDialog from '@/components/Business/Loan/FinancingDetailsDialog'
import FinancingCutDialog from '@/components/Business/Loan/FinancingCutDialog'
import FinancingPlatformCutDialog from '@/components/Business/Loan/FinancingPlatformCutDialog'
import FinancingLoanDetailsDialog from '@/components/Business/Loan/FinancingLoanDetailsDialog'
import FinancingSignDialog from '@/components/Business/Loan/FinancingSignDialog'
import SignPdf from '@/components/PDF/SignPdf'

// import { returnOptinos, FINANCING_ATTACHED_STATUS_MAP } from '@/utils/constant/loan'
import { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE, CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME } from '@/utils/constant/loan'
import { viewHash } from '@/utils'
import store from '@/store'
import { EnterprisApi } from '@/api/index'

import Validator from '@/utils/validator'

export default {
  name: 'LoanManage',
  components: {
    FeeExplainDialog,
    FinancingDetailsDialog,
    FinancingCutDialog,
    FinancingPlatformCutDialog,
    FinancingLoanDetailsDialog,
    FinancingSignDialog,
    SignPdf
  },
  mixins: [tableMixin],
  data() {
    return {
      pdfUrl: '',
      FLOW_POP_TYPE,
      CHECK_FLOW_STATUS,
      verifyForm: {
        approve: true,
        reason: '', // 原因
      },
      rules: {
        reason: Validator.isRequired('请填写驳回原因')
      },
      isHandle: '', // 是否经办
      // FINANCING_ATTACHED_STATUS: returnOptinos(FINANCING_ATTACHED_STATUS_MAP),
      // FINANCING_ATTACHED_STATUS_MAP,
      ORDER_STATUS_COLOR,
      ORDER_STATUS_MAP,
      ORDER_STATUS_LIST,
      currViewData: { contractUrl: '' },
      ruleForm: {
        applyDateBegin: '',
        applyDateEnd: '',
        range: '',
        status: '',
        bizStatus: '',
        fundCorpName: '',
        transNo: ''
      },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '110px', 'show-overflow-tooltip': true },
        { slot: 'txHash' },
        { label: '申请时间', prop: 'applyDate', width: '155px' },
        { slot: 'fundCorpName' },
        { slot: 'productName' }, // { label: '融资产品', prop: 'productName', width: '110px', 'show-overflow-tooltip': true },
        { slot: '' },
        { slot: 'loanMaxAmount' },
        { slot: 'tokenCount' },
        { label: '融资利率', prop: 'loanInterestRate', width: '86px', formatter: (row) => { return row.loanInterestRate + '%' } },
        { label: '融资到期日', prop: 'dueDate', width: '150px' },
        { slot: 'bizStatusName' },
        { slot: 'status' },
        { label: '备注', prop: 'opinion', width: '182px', formatter: (row) => { return (row.opinion === '' || row.opinion === null) ? '-' : row.opinion }, 'show-overflow-tooltip': true },
        { slot: 'opt' }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentDict']),
    bizStatusArr() {
      return this.currentDict[BUSINESS_FLOW_NAME.TOKEN] || []
    }
  },
  watch: {
    'ruleForm.range': function(val) {
      if (val) {
        this.ruleForm.applyDateBegin = val[0] || ''
        this.ruleForm.applyDateEnd = val[1] || ''
      } else {
        this.ruleForm.applyDateBegin = ''
        this.ruleForm.applyDateEnd = ''
      }
    }
  },
  mounted() {
    const query = this.$route.query
    if (query) {
      this.ruleForm = {
        ...this.ruleForm,
        ...query
      }
    }
    this.getData()
  },
  methods: {
    // 审核
    showCheck(item, approve = true) {
      this.verifyForm = {
        corpNo: item.corpNo,
        transNo: item.transNo,
        approve: approve,
        reason: ''
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: item.transNo, title: '融资审核' })
    },
    showSign(data) {
      this.currViewData = data
      if (!data.contractUrl) {
        this.loading = true
        EnterprisApi.previewFinContract({
          transNo: data.transNo
        }).then(res => {
          this.pdfUrl = res.data.contractUrl
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.pdfUrl = data.contractUrl
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SIGN, transNo: data.transNo, title: '融资签约' })
    },
    cancelCheck() {
      this.$refs.checkFlow.close()
    },
    handleVerify() {
      this.$refs.verifyForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then((code) => {
            EnterprisApi.chainCorpReviewLoanTrans({
              ...this.verifyForm,
              securityCode: code,
            }).then(() => {
              this.$message.success('审核成功')
              this.$refs.checkFlow.close()
              this.$refs.verifyForm.resetFields()
              this.getData()
            })
          })
        }
      })
    },
    // 审核流
    showFlow(item, type, title) {
      this.verifyForm = {
        corpNo: item.corpNo,
        transNo: item.transNo,
        approve: item.approve,
        reason: item.reason
      }
      this.$refs.checkFlow.open({ type: type, transNo: item.transNo, title: title })
    },
    viewHash(hash) {
      viewHash(hash)
    },
    getData() {
      if (this.loading) return
      this.loading = true
      this.ruleForm.corpNo = this.userInfo.corpNo
      EnterprisApi.queryLoanTrans({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        const authDtoList = store.getters && store.getters.authDtoList// 权限列表
        this.isHandle = authDtoList.some(role => {
          return role === 'CHAIN_HANDLE' // CHAIN_CHECK CHAIN_HANDLE
        })
        // res.data.forEach((i) => {
        //   i.status = 'FUND_CONFIRM_PAID' // test
        //   i.loanPercentageStatus = 'UNPAID'// UNPAID PAID
        // }, this)
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    onFeeHandle: async function() {
      const result = await EnterprisApi.getLoanServiceFee({})
      this.$refs.feeExplainDialog.open(result)
    },
    addTransfer() {
      this.$router.push('add-loan')
    },
    // 融资详情
    openDetail(data) {
      this.$refs.financingDetailsDialog.open(data)
    },
    // 查看授权书
    viewPdfHandle(data, type) {
      this.currViewData = data
      if (!data.contractUrl) {
        this.loading = true
        EnterprisApi.previewFinContract({
          transNo: data.transNo
        }).then(res => {
          data.contractUrl = res.data.contractUrl
          this.$refs['pdfDialogView'].open(data.contractUrl, '查看合约')
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.$refs['pdfDialogView'].open(data.contractUrl, '查看合约')
      }
    },
    // 签约回调
    onOkHandle() {
      this.$securityCode().then((code) => {
        EnterprisApi.chainCorpSignedLoanTrans({
          transNo: this.currViewData.transNo,
          corpNo: this.currViewData.corpNo,
          securityCode: code,
        }).then(() => {
          const str = this.currViewData.isLastOperator ? '签约成功' : '同意成功'
          this.$message.success(str)
          this.$refs.checkFlow.close()
          this.getData()
        }).finally(() => {
          this.loading = false
        })
      })
    },
    // 抽成详情
    viewCutHandle(data) {
      this.$refs['financingCutDialog'].open(data)
    },
    // 平台抽成
    viewPlatformCutHandle(data) {
      this.$refs['financingPlatformCutDialog'].open(data)
    },
    // 放款详情
    viewLoanHandle(data) {
      this.$refs['financingLoanDetailsDialog'].open(data)
    },
    // 标记已抽成
    viewSignHandle(data) {
      this.$refs['financingSignDialog'].open(data)
    },
    signDialogCallback() {
      this.getData()
    },
  }
}
</script>

<style lang="scss" scoped>
  .tips-box {
    background: rgba(104, 88, 246, .05);
    border-radius: 4px;
    width: 100%;
    padding: 20px 0;
    margin-bottom: 32px;
    .title {
      line-height: 28px;
      padding-left: 56px;
      position: relative;
      i {
        display: inline-block;
        width: 24px;
        height: 24px;
        font-size: 24px;
        border-radius: 50%;
        position: absolute;
        left: 20px;
        top: 15px;
        color: #3F94F7;
        transform: translateY(-50%);
      }
    }
    .content {
      color: $textColor;
      font-size: 14px;
      margin-top: 8px;
      a{
        color: #3F94F7;
      }
    }
  }
  /deep/ .el-table .cell{
      padding-left: 6px;
      padding-right: 6px;
      text-align: left;
  }
</style>
