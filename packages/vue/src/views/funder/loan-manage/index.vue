<template>
  <div class="page page-financing-manage">
    <div class="filter-form">
      <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="申请时间" prop="timeRange">
              <el-date-picker
                v-model="ruleForm.timeRange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="~"
                type="daterange"
                :clearable="false"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资方" prop="corpName">
              <el-input v-model="ruleForm.corpName" clearable placeholder="请输入" />
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
          <el-col :span="16">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div>
      <div v-loading="loading">
        <el-table
          :data="list"
          :empty-text="' '"
          highlight-current-row
          stripe
        >
          <el-table-column label="编号" prop="transNo" :min-width="110" show-overflow-tooltip />
          <el-table-column label="hash" prop="txHash" width="120px" show-overflow-tooltip>
            <template slot-scope="scope">
              <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash" type="0">{{ scope.row.txHash }}</hash-link>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="申请时间" prop="applyDate" width="100px" />
          <el-table-column label="融资方" prop="corpName" width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.corpNo">{{ scope.row.corpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column label="融资产品" prop="productName" width="200px" show-overflow-tooltip />
          <el-table-column :label="'申请融资' + TOKEN__NAME + '数量（个）'" prop="tokenCount" width="160" />
          <el-table-column label="融资利率" prop="loanInterestRate" width="100px" :formatter="row => row.loanInterestRate!=null ? row.loanInterestRate + '%' : ''" />
          <el-table-column label="融资到期日" prop="dueDate" width="100px" />
          <el-table-column label="备注" width="140px" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="ellipsis">{{ scope.row.opinion===''?'-':scope.row.opinion }}</div>
            </template>
          </el-table-column>
          <el-table-column label="流程状态" prop="bizStatusName" fixed="right" width="124">
            <template slot-scope="scope">
              <div :class="ORDER_STATUS_COLOR[scope.row.status]">{{ scope.row.bizStatusName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" prop="status" fixed="right" width="130px">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 'FUND_SIGNED_REVIEWED' && scope.row.contractStatus === 'INIT'" :class="ORDER_STATUS_COLOR[scope.row.status]">
                签章中
              </span>
              <span v-else-if="scope.row.status === 'CHAIN_CORP_SIGNED' && scope.row.contractStatus === 'WAIT'" :class="ORDER_STATUS_COLOR[scope.row.status]">
                链属企业签章中
              </span>
              <span v-else :class="ORDER_STATUS_COLOR[scope.row.status]">{{ ORDER_STATUS_MAP[scope.row.status] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="350px">
            <template slot-scope="scope">
              <el-button type="text" @click="viewAssets(scope.$index, scope.row)">资产浏览</el-button>
              <el-button
                v-show="['CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) == -1"
                v-fast-click="wrapClick(viewFinancingDetail, scope.$index, scope.row)"
                type="text"
              >融资详情</el-button>
              <el-button
                v-show="['CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) > -1"
                v-fast-click="wrapClick(viewContract, scope.$index, scope.row)"
                type="text"
              >查看合约</el-button>
              <el-button
                v-show="['SUCCESS'].indexOf(scope.row.bizStatus) > -1"
                type="text"
                @click="viewPaymentDetail(scope.$index, scope.row)"
              >放款详情</el-button>
              <!-- <template v-if="['SUCCESS'].indexOf(scope.row.bizStatus) > -1">
                <el-button type="text" @click="downloadInfo(scope.row)">下载信息</el-button>
                <a :href="ZHONGDENG_URL" target="_blank">
                  <el-button type="text">中登网登记</el-button>
                </a>
              </template> -->
              <template v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE">
                <el-button
                  v-show="['FUND_CHECK_TOKEN'].indexOf(scope.row.bizStatus) > -1"
                  v-permission="'loan-manage-list__check'"
                  v-fast-click="wrapClick(showCheck, scope.row)"
                  type="text"
                >审核</el-button>
                <el-button
                  v-show="['FUND_SEAL_TOKEN'].indexOf(scope.row.bizStatus) > -1"
                  v-permission="'loan-manage-list__sign'"
                  v-fast-click="wrapClick(showSign, scope.row)"
                  type="text"
                >签约</el-button>
                <el-button
                  v-show="['FUND_LOAN_TOKEN'].indexOf(scope.row.bizStatus) > -1 && scope.row.contractStatus === 'VALID'"
                  v-permission="'loan-manage-list__sure'"
                  v-fast-click="wrapClick(confirmPayment, scope.$index, scope.row)"
                  type="text"
                >确认已放款</el-button>
              </template>
              <el-button
                v-show="['FUND_CHECK_TOKEN', 'FUND_REJECT_TOKEN'].indexOf(scope.row.bizStatus) > -1 && scope.row.button === CHECK_FLOW_STATUS.DONE"
                v-fast-click="wrapClick(showFlow, scope.row, FLOW_POP_TYPE.FLOW, '融资审批流')"
                type="text"
              >审批流</el-button>
              <el-button
                v-show="['FUND_SEAL_TOKEN', 'CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) > -1 && scope.row.button === CHECK_FLOW_STATUS.DONE"
                v-fast-click="wrapClick(showFlow, scope.row, FLOW_POP_TYPE.SFLOW, '融资审批流')"
                type="text"
              >审批流</el-button>
            </template>
          </el-table-column>
          <div slot="append">
            <NoData v-if="!list.length" title="暂时没有数据" />
          </div>
        </el-table>
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

    <!-- 资产浏览 -->
    <assets-preview-dialog ref="assetsDialog" />

    <!-- 融资详情 -->
    <financing-details-dialog ref="financingDetailsDialog" />

    <!-- 确认已放款 -->
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
              <el-date-picker v-model="paymentForm.payerTime" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款金额" prop="payerAmount">
              <el-input v-model="paymentForm.payerAmount" placeholder="请输入" />
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
                :limit="1"
                :url.sync="fileList"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="() => {paymentFormVisible = false}">取 消</el-button>
        <el-button type="primary" @click="onConfirmPayment">提交</el-button>
      </div>
    </el-dialog>

    <!-- 放款详情 -->
    <el-dialog
      :visible.sync="paymentDetailVisible"
      title="放款详情"
      :append-to-body="true"
      width="800px"
    >
      <el-form :model="paymentDetail" label-width="96px" label-position="left">
        <h3>收款方</h3>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="收款方银行">
              <span>{{ paymentDetail.payeeBankName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款方账户名">
              <span>{{ paymentDetail.payeeBankAccountName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="收款方账号">
              <span>{{ paymentDetail.payeeBankAccountNo }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>付款方</h3>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="付款日期">
              <span>{{ paymentDetail.payerTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款金额">
              <span>{{ paymentDetail.payerAmount / 10000 | thousands }} 万元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="付款方银行">
              <span>{{ paymentDetail.payerBankName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款方账户名">
              <span>{{ paymentDetail.payerBankAccountName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="付款方账号">
              <span>{{ paymentDetail.payerBankAccountNo }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回执单号">
              <span>{{ paymentDetail.payerReceiptNumber }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="付款凭证">
              <span>{{ paymentDetail.payerVoucher }}</span>
              <Download :url="paymentDetail.payerVoucherUrl" direct>
                <el-button type="text">下载</el-button>
              </Download>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- pdf 查看合约 -->
    <PDF ref="pdfDialogView">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <Download type="primary" direct :url="contractUrl">
          <el-button class="next-button" type="primary">下载合约</el-button>
        </Download>
      </template>
    </PDF>

    <!-- 确认已放款-->
    <ConfirmationDialog ref="confirmationDialog" @callback="onConfirmPayment" />

    <!-- 审批流 -->
    <CheckFlow ref="checkFlow">
      <div slot="check">
        <el-form ref="verifyForm" :model="verifyForm" label-width="100px" :rules="verifyRules">
          <el-form-item label="企业名称">
            <span>{{ currCorpName }}</span>
          </el-form-item>
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
            <el-button v-if="!currViewData.isLastOperator" v-fast-click="wrapClick(onConfirmSign)" type="primary">同意签约</el-button>
            <el-button v-if="currViewData.isLastOperator" v-fast-click="wrapClick(onConfirmSign)" type="primary">确定签约</el-button>
          </div>
        </SignPdf>
      </div>
    </CheckFlow>
  </div>
</template>

<script>
import ConfirmationDialog from './components/ConfirmationDialog'
import ImageUpload from './components/ImageUpload'
import SignPdf from '@/components/PDF/SignPdf'
import { FunderApi, CommonApi } from '@/api'

import { ZHONGDENG_URL } from '@/utils//constant/index'
import { returnOptinos, FINANCING_FUND_STATUS_MAP, ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE, CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME } from '@/utils/constant/loan'
import tableMixin from '@/utils/tableMixin'
import FinancingDetailsDialog from '@/components/Business/Loan/FinancingDetailsDialog'
import AssetsPreviewDialog from '@/components/CommonDialogs/AssetsPreviewDialog'

import { mapGetters } from 'vuex'
// CHAIN_CORP_APPLYED("CHAIN_CORP_APPLYED", "链属企业已申请", "待复核"),
// CHAIN_CORP_REVIEWED("CHAIN_CORP_REVIEWED", "链属企业已复核", "待平台审核"),
// PLATFORM_CHECKED("PLATFORM_CHECKED", "平台已审核", "待资金方审核"),
// FUND_CHECKED("FUND_CHECKED", "资金方已审核", "待资金方签约"),
// FUND_SIGNED("FUND_SIGNED", "资金方已签约", "待链属企业签约"),
// CHAIN_CORP_SIGNED("CHAIN_CORP_SIGNED", "链属企业已签约", "待资金方放款"),
// FUND_CONFIRM_PAID("FUND_CONFIRM_PAID", "资金方确认放款", "已完成"),
// CHAIN_CORP_REVIEW_REJECTED("CHAIN_CORP_REVIEW_REJECTED", "链属企业复核驳回", "复核驳回"),
// PLATFORM_CHECK_REJECTED("PLATFORM_CHECK_REJECTED", "平台审核驳回", "平台驳回"),
// FUND_CHECK_REJECTED("FUND_CHECK_REJECTED", "资金方审核驳回", "资金方驳回"),

const filterForm = {
  timeRange: null,
  corpName: '',
  status: '',
  transNo: '',
  bizStatus: ''
}
const paymentDetail = {
  payeeBankName: '',
  payeeBankAccountName: '',
  payeeBankAccountNo: '',
  payerTime: '',
  payerAmount: '',
  payerBankName: '',
  payerBankAccountName: '',
  payerBankAccountNo: '',
  payerReceiptNumber: ''
}

export default {
  name: 'FunderLoanManage',
  components: {
    ImageUpload,
    FinancingDetailsDialog,
    AssetsPreviewDialog,
    ConfirmationDialog,
    SignPdf
  },
  mixins: [tableMixin],
  data() {
    return {
      pdfUrl: '',
      currCorpName: '', // 当前融资方
      FLOW_POP_TYPE,
      CHECK_FLOW_STATUS,
      verifyForm: {
        approve: true,
        reason: '', // 原因
      },
      FINANCING_ATTACHED_STATUS: returnOptinos(FINANCING_FUND_STATUS_MAP),
      FINANCING_FUND_STATUS_MAP,
      ORDER_STATUS_COLOR,
      ORDER_STATUS_MAP,
      ORDER_STATUS_LIST,
      ZHONGDENG_URL,
      ruleForm: {
        ...filterForm
      },
      loading: false,
      list: [],
      currViewData: { contractUrl: '' },
      dialogFormVisible: false, // 表单弹窗
      transNo_verify: null,
      verifyDialogVisible: false,
      verifyRules: {
        reason: [
          { required: true, message: '请输入驳回原因' },
        ],
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

      transNo_payment: null,
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
      fileList: [],

      paymentDetailVisible: false,
      paymentDetail: {
        ...paymentDetail
      },
      contractUrl: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentDict']),
    bizStatusArr() {
      return this.currentDict[BUSINESS_FLOW_NAME.TOKEN] || []
    }
  },
  created() {
    if (this.$route.query.status) {
      this.ruleForm.status = this.$route.query.status
    }
    this.getData()
  },
  methods: {
    // 审核
    showCheck(item, approve = true) {
      console.log('审核')
      this.currCorpName = item.corpName
      this.verifyForm = {
        fundCorpNo: item.fundCorpNo,
        transNo: item.transNo,
        approve: approve,
        reason: ''
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: item.transNo, title: '融资审核' })
    },
    showSign(data) {
      console.log('签约')
      this.currViewData = data
      if (!data.preContractUrl) {
        this.loading = true
        FunderApi.previewFinContract({
          transNo: data.transNo
        }).then(res => {
          this.pdfUrl = res.data.preContractUrl
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.pdfUrl = data.preContractUrl
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SIGN, transNo: data.transNo, title: '融资签约' })
    },
    cancelCheck() {
      this.$refs.checkFlow.close()
      this.$refs.checkFlow.destroy()
    },
    handleVerify() {
      this.$refs.verifyForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then((code) => {
            FunderApi.fundCheckLoanTrans({
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
    getData() {
      if (this.loading) return
      const params = {
        applyDateBegin: this.ruleForm.timeRange ? this.ruleForm.timeRange[0] : '',
        applyDateEnd: this.ruleForm.timeRange ? this.ruleForm.timeRange[1] : '',
        corpName: this.ruleForm.corpName,
        status: this.ruleForm.status,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        transNo: this.ruleForm.transNo,
        bizStatus: this.ruleForm.bizStatus

      }
      this.loading = true
      FunderApi.queryLoanTrans({
        ...params,
        fundCorpNo: this.userInfo.corpNo
      })
        .then(res => {
          this.list = res.data
          this.total = res.total
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    },
    handleSearch() {
      this.pageNum = 1
      this.getData()
    },
    handleReset() {
      this.ruleForm = { ...filterForm }
      this.$refs.ruleForm.resetFields()
    },
    // 浏览资产
    viewAssets(index, row) {
      this.$refs.assetsDialog.open(row.corpNo, 'CHAIN', 'ALL')
    },
    // 查看融资详情
    viewFinancingDetail(index, row) {
      this.$refs['financingDetailsDialog'].open(row)
    },
    // 确认已放款
    confirmPayment(index, row) {
      this.transNo_payment = row.transNo
      this.$refs['confirmationDialog'].open(row)
    },
    // 确认已放款-提交
    onConfirmPayment(data) {
      const paymentForm = data.data
      this.$securityCode().then((code) => {
        FunderApi.fundConfirmPaid({
          payerAmount: paymentForm.payerAmount,
          payerBankAccountName: paymentForm.payerBankAccountName,
          payerBankAccountNo: paymentForm.payerBankAccountNo,
          payerBankName: paymentForm.payerBankName,
          payerReceiptNumber: paymentForm.payerReceiptNumber,
          payerTime: paymentForm.payerTime,
          payerVoucher: paymentForm.payerVoucher,
          payerVoucherUrl: paymentForm.payerVoucherUrl,
          fundCorpNo: this.userInfo.corpNo,
          transNo: this.transNo_payment,
          securityCode: code,
        }).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.getData()
        })
      })
    },
    // 放款详情
    viewPaymentDetail(index, row) {
      this.paymentDetail.payeeBankName = row.payeeBankName
      this.paymentDetail.payeeBankAccountName = row.payeeBankAccountName
      this.paymentDetail.payeeBankAccountNo = row.payeeBankAccountNo
      this.paymentDetail.payerBankName = row.payerBankName
      this.paymentDetail.payerBankAccountName = row.payerBankAccountName
      this.paymentDetail.payerBankAccountNo = row.payerBankAccountNo
      this.paymentDetail.payerTime = row.payerTime
      this.paymentDetail.payerAmount = row.payerAmount
      this.paymentDetail.payerReceiptNumber = row.payerReceiptNumber
      this.paymentDetail.payerVoucher = row.payerVoucher
      this.paymentDetail.payerVoucherUrl = row.payerVoucherUrl
      this.paymentDetailVisible = true
    },
    downloadInfo(row) {
      FunderApi.downLoadLoanInfo({
        transNo: row.transNo
      })
    },
    // 查看合约
    viewContract(index, row) {
      if (!row.contractUrl) {
        this.loading = true
        FunderApi.previewFinContract({
          transNo: row.transNo
        }).then(res => {
          row.contractUrl = res.data.contractUrl
          this.contractUrl = row.contractUrl
          this.$refs['pdfDialogView'].open(row.contractUrl, '查看合约')
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.contractUrl = row.contractUrl
        this.$refs['pdfDialogView'].open(row.contractUrl, '查看合约')
      }
    },
    // 确认签约
    onConfirmSign() {
      this.$securityCode().then((code) => {
        FunderApi.fundSignedLoanTrans({
          transNo: this.currViewData.transNo,
          fundCorpNo: this.currViewData.fundCorpNo,
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
    }
  }
}
</script>
