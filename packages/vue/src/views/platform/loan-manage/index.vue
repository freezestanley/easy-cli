<template>
  <div>
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="申请时间" prop="range">
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
            <el-form-item label="融资方" prop="corpName">
              <el-input
                v-model.trim="ruleForm.corpName"
                type="text"
                placeholder="请输入企业名称"
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
        </el-row>
        <el-row :gutter="20">
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
            <el-form-item>
              <div class="option-btns">
                <el-button type="primary" @click="onSearch">搜索</el-button>
                <el-button @click="onResetForm()">重置</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container">
      <div class="table-box">
        <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
          <el-table-column slot="txHash" label="hash" width="132px" show-overflow-tooltip>
            <template slot-scope="scope">
              <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash" type="0">{{ scope.row.txHash }}</hash-link>
              <span v-else>-</span></template>
          </el-table-column>
          <el-table-column slot="corpName" label="融资方" width="132px" show-overflow-tooltip>
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.corpNo">{{ scope.row.corpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column slot="fundCorpName" label="资金方" width="132px" show-overflow-tooltip>
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.fundCorpNo">{{ scope.row.fundCorpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column slot="tokenCount" width="175px" :label="'申请融资' + TOKEN__NAME + '数量（个）'">
            <template slot-scope="scope">
              <div>{{ scope.row.tokenCount | thousands }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="bizStatusName" width="124" label="流程状态" fixed="right">
            <template slot-scope="scope">
              <div :class="ORDER_STATUS_COLOR[scope.row.status]">{{ scope.row.bizStatusName }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="status" width="138px" label="订单状态" fixed="right">
            <!--融资状态为FUND_SIGNED("FUND_SIGNED", "待链属企业签约")的时候，
              如果合同状态contractStatus为INIT("INIT", "资金方签章中")的时候，直接就展示资金方签章中
              融资状态为CHAIN_CORP_SIGNED("CHAIN_CORP_SIGNED", "待资金方放款")的时候，
              如果合同状态contractStatus为WAIT("WAIT", "链属企业签章中")的时候，直接就展示链属企业签章中
            -->
            <template slot-scope="scope">
              <div v-if="scope.row.bizStatus === 'FUND_SIGNED_REVIEWED' && scope.row.contractStatus === 'INIT'" :class="ORDER_STATUS_COLOR[scope.row.status]">
                资金方签章中
              </div>
              <div v-else-if="scope.row.bizStatus === 'CHAIN_CORP_SIGNED_REVIEWED' && scope.row.contractStatus === 'WAIT'" :class="ORDER_STATUS_COLOR[scope.row.status]">
                链属企业签章中
              </div>
              <div v-else :class="ORDER_STATUS_COLOR[scope.row.status]">{{ ORDER_STATUS_MAP[scope.row.status] }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="opt" label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <div>
                <el-button
                  v-show="['CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) == -1"
                  v-fast-click="wrapClick(openDetail, scope.row)"
                  type="text"
                >融资详情</el-button>
                <el-button
                  v-show="['CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) > -1"
                  v-fast-click="wrapClick(viewPdfHandle, scope.row)"
                  type="text"
                >查看合约</el-button>
                <template v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE">
                  <!-- <el-button
                    v-if="['PLATFORM_ENTER_PERCENTAGE', 'PLATFORM_ENTER_REJECT'].indexOf(scope.row.bizStatus) > -1"
                    type="text"
                    @click="viewCheckHandle(scope.row)"
                  >设置抽成</el-button> -->
                  <!-- <el-button
                    v-if="['PLATFORM_ENTER_PERCENTAGE', 'PLATFORM_ENTER_REJECT'].indexOf(scope.row.bizStatus) > -1"
                    type="text"
                    @click="viewCheckHandle(scope.row)"
                  >驳回</el-button> -->
                  <el-button
                    v-show="['PLATFORM_CHECK_TOKEN'].indexOf(scope.row.bizStatus) > -1"
                    v-permission="'loan-manage-index__check'"
                    v-fast-click="wrapClick(viewCheckHandle, scope.row)"
                    type="text"
                  >审核</el-button>
                </template>
                <el-button
                  v-show="['PLATFORM_CHECK_TOKEN', 'FUND_CHECK_TOKEN', 'FUND_SEAL_TOKEN', 'CHAIN_SEAL_TOKEN', 'FUND_LOAN_TOKEN', 'SUCCESS'].indexOf(scope.row.bizStatus) > -1 && scope.row.button === CHECK_FLOW_STATUS.DONE"
                  type="text"
                  @click="showFlow(scope.row, FLOW_POP_TYPE.FLOW, '融资审批流')"
                >审批流</el-button>
              </div>
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

    <el-dialog
      title="驳回"
      :visible.sync="rejectDialog"
      :append-to-body="true"
      :before-close="closeReject"
      width="520px"
    >
      <el-form
        ref="rejectForm"
        :inline="true"
        :model="rejectForm"
        label-width="100px"
      >
        <el-form-item
          label="驳回原因"
          :rules="[{ required: true, message: '请填写驳回原因', trigger: 'blur'}]"
          prop="opinion"
        >
          <el-input
            v-model="rejectForm.opinion"
            :rows="4"
            :maxlength="100"
            show-word-limit
            style="width:340px"
            type="textarea"
            resize="none"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeReject">取消</el-button>
        <el-button type="primary" @click="handleReject()">确定</el-button>
      </div>
    </el-dialog>
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

    <!-- 审核弹窗 -->
    <financing-check-dialog ref="financingCheckDialog" />

    <!-- 审批流 -->
    <CheckFlow ref="checkFlow">
      <div slot="check">
        <el-form ref="verifyForm" class="mark-form" :model="verifyForm" :rules="rules" label-width="120px" label-position="left">
          <template>
            <el-tooltip class="item" effect="dark" placement="top-end">
              <div slot="content" class="code-help">
                <span>技术服务费是指平台方就融资方从</span>
                <br>
                <span>众企安链平台获得的每笔融资款收</span>
                <br>
                <span>取的一定比例服务费。</span>
              </div>
              <span>
                技术服务费 <i class="el-icon-question success" />
              </span>
            </el-tooltip>
            <el-form-item label="抽成比例(线上)" prop="technologyServiceRate">
              <span>{{ verifyForm.technologyServiceRate }}%</span>
              <div class="tips"> 折合人民币 {{ technologyServiceAmount }} 元 </div>
            </el-form-item>
            <el-tooltip class="item" effect="dark" placement="top-end">
              <div slot="content" class="code-help">
                <span>金融服务费是指平台方就融资方从众企安</span>
                <br>
                <span>链平台的资金方处获得的每笔融资款，有</span>
                <br>
                <span>权要求资金方在线上交易时为平台方从融</span>
                <br>
                <span>资款中代扣一定比例的服务费或在线下交</span>
                <br>
                <span>易时要求融资方在获得资金方的融资款后</span>
                <br>
                <span>向平台方支付一定比例的服务费。</span>
              </div>
              <span>
                金融服务费 <i class="el-icon-question success" />
              </span>
            </el-tooltip>
            <el-form-item label="抽成比例(线上)" prop="onlinePercentageRate">
              <span>{{ verifyForm.onlinePercentageRate }}%</span>
              <div class="tips"> 折合人民币 {{ onlinePercentageAmount }} 元 </div>
            </el-form-item>
            <el-form-item label="抽成比例(线下)" prop="offlinePercentageRate">
              <span>{{ verifyForm.offlinePercentageRate }}%</span>
              <div class="tips"> 折合人民币 {{ offlinePercentageAmount }} 元 </div>
            </el-form-item>
          </template>
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
            <el-button type="primary" @click="handleVerify">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </CheckFlow>
  </div>
</template>
<script>

import tableMixin from '@/utils/tableMixin'

import FinancingDetailsDialog from '@/components/Business/Loan/FinancingDetailsDialog'
import FinancingCheckDialog from '@/components/Business/Loan/FinancingCheckDialog'

import { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE, CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME } from '@/utils/constant/loan'

import { PlatformApi } from '@/api/index'

import Validator from '@/utils/validator'
import { mapGetters } from 'vuex'

export default {
  name: 'FinanceMange',
  components: {
    FinancingDetailsDialog,
    FinancingCheckDialog
  },
  mixins: [tableMixin],
  data() {
    return {
      FLOW_POP_TYPE,
      CHECK_FLOW_STATUS,
      verifyForm: {
        approve: true,
        reason: '', // 原因
      },
      rejectDialog: false,
      rejectForm: {
        status: false,
        opinion: '',
      },
      rules: {
        reason: Validator.isRequired('请填写驳回原因')
      },
      currViewData: { contractUrl: '' },
      ORDER_STATUS_COLOR,
      ORDER_STATUS_MAP,
      ORDER_STATUS_LIST,
      ruleForm: {
        effectiveDate: '',
        expireDate: '',
        range: '',
        status: '',
        corpName: '',
        fundCorpName: '',
        transNo: '',
        bizStatus: ''
      },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', minWidth: '100px', 'show-overflow-tooltip': true },
        { slot: 'txHash' },
        { label: '申请时间', prop: 'applyDate', width: '150px' },
        { slot: 'corpName' },
        { slot: 'fundCorpName' },
        { label: '融资产品名称', prop: 'productName', width: '132px', 'show-overflow-tooltip': true },
        { slot: 'loanMaxAmount' },
        { slot: 'tokenCount' },
        { label: '融资利率', prop: 'loanInterestRate', width: '86px', formatter: (row) => { return (row.loanInterestRate + '%') } },
        { label: '融资到期日', prop: 'dueDate', width: '150px' },
        { slot: 'bizStatusName' },
        { slot: 'status' },
        { label: '备注', prop: 'opinion', width: '182px', formatter: (row) => { return (row.opinion === '' || row.opinion === null) ? '-' : row.opinion }, 'show-overflow-tooltip': true },
        { slot: 'opt' }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentDict']),
    bizStatusArr() {
      return this.currentDict[BUSINESS_FLOW_NAME.TOKEN] || []
    },
    technologyServiceAmount() {
      if (!this.verifyForm.technologyServiceRate || +this.verifyForm.technologyServiceRate < 0) {
        return 0
      }
      const num = 1 * +this.verifyForm.technologyServiceRate * 1000 // 避免出现 小数溢出
      return num * this.tokenCount / 100000
    },
    onlinePercentageAmount() {
      if (!this.verifyForm.onlinePercentageRate || +this.verifyForm.onlinePercentageRate < 0) {
        return 0
      }
      const num = 1 * +this.verifyForm.onlinePercentageRate * 1000 // 避免出现 小数溢出
      return num * this.tokenCount / 100000
    },
    offlinePercentageAmount() {
      if (!this.verifyForm.offlinePercentageRate || +this.verifyForm.offlinePercentageRate < 0) {
        return 0
      }
      const num = 1 * +this.verifyForm.offlinePercentageRate * 1000 // 避免出现 小数溢出
      return num * this.tokenCount / 100000
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
    if (this.$route.query.status) {
      this.ruleForm.status = this.$route.query.status
    }
    this.getData()
  },
  methods: {
    // 审核
    // showCheck(item, approve = true) {
    //   this.tokenCount = item.tokenCount
    //   this.verifyForm = {
    //     offlinePercentageRate: item.offlinePercentageRate,
    //     onlinePercentageRate: item.onlinePercentageRate,
    //     technologyServiceRate: item.technologyServiceRate,
    //     transNo: item.transNo,
    //     approve: approve,
    //     reason: ''
    //   }
    //   this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: item.transNo, title: '融资审核' })
    // },
    cancelCheck() {
      this.$refs.checkFlow.close()
    },
    handleVerify() {
      this.$refs.verifyForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then((code) => {
            PlatformApi.platformCheckLoanTrans({
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
      this.$refs.checkFlow.open({ type: type, transNo: item.transNo, title: title })
    },
    handleReject() {
      this.$securityCode().then(securityCode => {
        PlatformApi.platformEnterPercentage({
          ...this.rejectForm,
          securityCode
        }).then(res => {
          this.$message({
            type: 'success',
            message: '驳回成功!'
          })
          this.closeReject()
        })
      })
    },
    closeReject() {
      this.$refs.rejectForm.resetFields()
      this.rejectDialog = false
    },
    getData() {
      if (this.loading) return
      this.loading = true
      PlatformApi.queryLoanTrans({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data
        // this.list.forEach((i) => {
        //   // i.status = 'CHAIN_CORP_REVIEWED'
        //   console.log(3333, i.status)
        // }, this)// test
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    onFeeHandle() {
      this.$refs.feeExplainDialog.open()
    },
    // 融资详情
    openDetail(data) {
      this.$refs.financingDetailsDialog.open(data)
    },
    // 查看合约
    viewPdfHandle(data) {
      this.currViewData = data
      this.$refs['pdfDialogView'].open(data.contractUrl, '查看合约')
    },
    // 审核
    viewCheckHandle(data) {
      sessionStorage.setItem('financeInfo', JSON.stringify(data))
      this.$router.push({
        path: 'check',
        query: {
          productNo: data.productNo
        }
      })
    },
  }
}
</script>
