<template>
  <div class="filter-form">
    <el-form ref="ruleForm" :inline="true" :model="ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="时间" prop="regdate">
            <el-date-picker
              v-model="ruleForm.regdate"
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
          <el-form-item label="核心企业" prop="fromCorpName">
            <el-input v-model="ruleForm.fromCorpName" type="text" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="流程状态" prop="bizStatus">
            <el-select v-model="ruleForm.bizStatus" placeholder="请选择">
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
          <el-form-item label="订单状态" prop="orderStatus">
            <el-select v-model="ruleForm.orderStatus" placeholder="请选择">
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
        <el-col :span="8" class="tar">
          <el-form-item class="option-btns">
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="onResetForm()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-box">
      <el-table
        v-loading="loading"
        empty-text=" "
        element-loading-text="Loading"
        highlight-current-row
        stripe
        :data="list"
      >
        <el-table-column prop="transNo" label="编号" width="150px" show-overflow-tooltip />
        <el-table-column prop="hash" label="hash" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <hash-link
              v-if="scope.row.txHash"
              :txhash="scope.row.txHash"
              type="0"
            >{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyDate" label="时间" width="150px" />
        <el-table-column label="核心企业名称" :min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link class="ellipsis primary cursor" :corp-no="scope.row.fromCorpNo">{{ scope.row.fromCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="签发数量(个)" width="110px">
          <template slot-scope="scope">{{ scope.row.amount | thousands }}</template>
        </el-table-column>
        <el-table-column label="签发有效期" width="180px">
          <template slot-scope="scope">{{ scope.row.effectiveDate }} - {{ scope.row.expireDate }}</template>
        </el-table-column>
        <el-table-column prop="bizStatus" label="流程状态" width="120" fixed="right">
          <template slot-scope="scope">
            <div :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ scope.row.bizStatusName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="120" fixed="right">
          <template slot-scope="scope">
            <div :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ ORDER_STATUS_MAP[scope.row.orderStatus] }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="备注" min-width="150px" show-overflow-tooltip />
        <el-table-column label="操作" width="210" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.bizStatus !== 'CORE_CHECK'
                &&scope.row.bizStatus !== 'CORE_REJECT'
                &&scope.row.bizStatus !== 'PLATFORM_CHECK'
                &&scope.row.bizStatus !== 'PLATFORM_REJECT'
                &&scope.row.bizStatus !== 'CORE_SIGN'"
              type="text"
              @click="viewContract(scope.row.contractUrl)"
            >查看合约</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'CHAIN_SIGN' &&CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__sign'"
              v-fast-click="wrapClick(handleCreateContract,scope.row.contractUrl,scope.row.transNo, scope.row.isLastOperator)"
              type="text"
            >签约</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'PLATFORM_CHECK'
                ||scope.row.bizStatus === 'PLATFORM_REJECT'
                ||scope.row.bizStatus === 'CORE_SIGN'
                ||scope.row.bizStatus === 'CHAIN_SIGN'
                ||scope.row.bizStatus === 'SUCCESS'
                ||scope.row.bizStatus === 'FAIL'"
              type="text"
              @click="handleDateil(scope.row)"
            >签发详情</el-button>
            <el-button
              v-if="CHECK_FLOW_STATUS.DONE === scope.row.button"
              type="text"
              @click="openCheckFlow(scope.row)"
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

    <!-- 复核弹窗-->
    <IssueCheckDialog ref="reCheck" @submit="handleReCheckSubmit" />
    <!-- 签发详情 -->
    <IssueDetailDialog ref="signDetail" />
    <!-- 创建合约 -->
    <PDF ref="pdfDialog">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <Download direct :url="contractUrl">
          <el-button type="primary">下载合约</el-button>
        </Download>
      </template>
    </PDF>
    <!-- 签约 -->
    <PDF ref="pdfDialog2">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <el-button type="primary" @click="agreeContract">同意签约</el-button>
      </template>
    </PDF>
    <!-- 审批流 -->
    <CheckFlow ref="checkFlow">
      <div slot="sign">
        <SignPdf :pdf-url="pdfUrl">
          <template>
            <el-button @click="cancelCheck">取消</el-button>
            <el-button v-if="isLastOperator" type="primary" @click="agreeContract">确认签约</el-button>
            <el-button v-if="!isLastOperator" type="primary" @click="agreeContract">同意签约</el-button>
          </template>
        </SignPdf>
      </div>
    </CheckFlow>
  </div>
</template>
<script>

import store from '@/store'
import IssueDetailDialog from '@/components/Business/Issue/IssueDetailDialog' // 签发详情
import CheckFlow from '@/components/CheckFlow/index'
import IssueCheckDialog from './components/IssueCheckDialog'
import tableMixin from '@/utils/tableMixin'
import { BUSINESS_FLOW_NAME, CHECK_FLOW_STATUS, ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE } from '@/utils/constant/index'
import Validator from '@/utils/validator'
import { EnterprisApi, CommonApi } from '@/api/index'
import { COLLECT_ASSETS } from '@/utils/constant/assets'
import { mapGetters } from 'vuex'
import SignPdf from '@/components/PDF/SignPdf'

export default {
  name: 'ApplySignList',
  components: {
    IssueDetailDialog,
    IssueCheckDialog,
    CheckFlow,
    SignPdf
  },
  mixins: [tableMixin],
  data() {
    return {
      CHECK_FLOW_STATUS,
      ORDER_STATUS_COLOR,
      ORDER_STATUS_MAP,
      FLOW_POP_TYPE,
      ORDER_STATUS_LIST,
      curDateil: {},
      token: store.getters.token,
      digNewSign: false,
      curCorpAssest: [],
      curToken: [],
      ruleForm: {
        regdate: '',
        beginApplyDate: '',
        endApplyDate: '',
        fromCorpName: '',
        orderStatus: '',
        toCorpName: '',
        triggerCorpType: 'CORE', //  核心需要填写 链属不需要填写
        transNo: ''
      },
      newSignRules: {
        assetNo: [Validator.isRequired('请选择资产')],
        amount: [Validator.isRequired('请选择资产')],
      },
      newSignForm: {
        range: '',
        surplusAssest: '',
        assetName: '',
        amount: 0,
        assetNo: '',
        effectiveDate: '',
        expireDate: '',
        quotaNo: '1'
      },
      loading: false,
      list: [{}],
      contractUrl: '', // 合约url
      transNo: '',
      pdfUrl: '',
      isLastOperator: true,
      // bizStatusArr: [],
    }
  },
  computed: {
    ...mapGetters(['currentDict']),
    bizStatusArr: function() {
      return this.currentDict[BUSINESS_FLOW_NAME.CHAIN_APPLY_ISSUE] || []
    }
  },
  mounted() {
    const query = this.$route.query
    if (query && query.tab === 'signList') {
      this.ruleForm = {
        ...this.ruleForm,
        ...query
      }
    }
    this.getData()
    // this.getCorpAssest()
    // this.getToken()
  },
  methods: {
    getData() {
      // if (this.loading) return
      this.loading = true
      CommonApi.chainCorpQueryIssueTokenTrans({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          this.list = res.data
          this.total = res.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    viewContract(url) {
      this.contractUrl = url
      this.$refs['pdfDialog'].open(url, '查看合约')
    },
    handleCreateContract(url, transNo, isLastOperator) {
      this.transNo = transNo
      this.isLastOperator = isLastOperator
      this.pdfUrl = url
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SIGN, transNo: transNo, title: '签发签约' })
    },
    cancelCheck() {
      this.$refs.checkFlow.close()
    },
    // 审批流
    openCheckFlow(row) {
      if (row.bizStatusName.includes('签约') || row.bizStatusName.includes('已完成')) {
        this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SFLOW, transNo: row.transNo, title: '签发审批流' })
      } else {
        this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.FLOW, transNo: row.transNo, title: '签发审批流' })
      }
    },
    handleDateil(row) {
      // 打开签发详情  传对应的应收应付 COLLECT_ASSETS 应收  PAY_ASSETS 应付
      this.$refs.signDetail.open(row, COLLECT_ASSETS)
    },
    agreeContract() {
      this.$securityCode().then((code) => {
        this.$refs.checkFlow.close()
        this.loading = true
        CommonApi.chainCorpSignIssueTokenContract({
          approve: true,
          transNo: this.transNo,
          securityCode: code
        }).then(res => {
          if (res) {
            this.loading = false
            this.$message.success('签约成功')
            this.getData()
          }
          this.onSignResetForm()
        })
      })
    },
    onSearch() {
      const { regdate } = this.ruleForm
      if (Array.isArray(regdate)) {
        this.ruleForm.beginApplyDate = this.ruleForm.regdate[0]
        this.ruleForm.endApplyDate = this.ruleForm.regdate[1]
      }
      this.pageNum = 1
      this.getData()
    },
    onSignResetForm() {
      this.newSignForm.surplusAssest = ''
      this.newSignForm.assetName = ''
      // this.$refs.newSignForm.resetFields()
    },
    handleNewSign() {
      const { range } = this.newSignForm
      if (Array.isArray(range)) {
        this.newSignForm.effectiveDate = this.newSignForm.range[0]
        this.newSignForm.expireDate = this.newSignForm.range[1]
      }
      this.$securityCode().then((code) => {
        this.digNewSign = false
        this.loading = true
        EnterprisApi.coreCorpApplyIssueTokenTrans({
          ...this.newSignForm,
          securityCode: code
        }).then(res => {
          if (res) {
            this.$message.success('新增签发成功')
            this.loading = false
          }
          this.onSignResetForm()
        })
      })
    },
    handleDownload(row) {
      if (row.contractUrl) window.open(row.contractUrl)
      else this.$message.error('下载链接错误')
    },
    openRecheck(row) {
      this.$refs.reCheck.open({ name: row.toCorpName, transNo: row.transNo })
    },
    handleReCheckSubmit(param) {
      this.$securityCode().then((code) => {
        EnterprisApi.coreCorpReviewIssueTokenTrans({
          ...param,
          securityCode: code
        }).then(res => {
          if (res) {
            this.$message.success('复核成功')
            this.getData()
          }
        })
      })
    },
    handleAuditSubmit() {
      this.$securityCode().then((code) => {
        EnterprisApi.coreCorpReviewIssueTokenTrans({
          ...this.auditForm,
          securityCode: code
        }).then(res => {
          if (res) {
            this.$message.success('复核成功')
            this.digAudit = false
          }
          this.onSignResetForm()
        })
      })
    },
    // handleCreateContract(row, type) {
    //   this.contractNo = row.transNo
    //   this.$refs['pdfDialog'].open(row.contractUrl, type: type })
    // },
    onContract(info) {
      this.$securityCode().then((code) => {
        this.$refs['pdfDialog'].close()
        this.loading = true
        CommonApi.chainCorpSignIssueTokenContract({
          transNo: this.contractNo,
          securityCode: code
        }).then(res => {
          if (res) {
            this.loading = false
            this.$message.success('签约成功')
          }
          this.getData()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.success {
  color: $success;
}
.error {
  color: $error;
}
.disabled {
  color: $disabled;
}
.digWrap {
  font-size: 14px;
  color: $titleColor;
  label {
    display: inline-block;
    width: 100px;
    color: $labelColor;
  }
}
.tips {
  color: $labelColor;
  font-size: 12px;
}
.text-right {
  text-align: right;
  padding: 0 10px 10px;
}
</style>
