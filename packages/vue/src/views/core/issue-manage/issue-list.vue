<template>
  <div class="filter-form">
    <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left" label-width="98px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="申请时间" prop="regdate">
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
          <el-form-item class="corp-name" :label="TOKEN__NAME+'接收方'" prop="toCorpName">
            <el-input v-model="ruleForm.toCorpName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="流程状态" prop="bizStatus" label-width="80px">
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
        <el-col :span="8">
          <el-form-item class="option-btns">
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="onResetForm()">重置</el-button>
            <div v-permission="'issue-manage__new'" class="opt-add-btn">
              <el-button type="primary" @click="goNewSign">+ 新增签发</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-box">
      <el-table
        v-loading="loading"
        :empty-text="' '"
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
              :txhash="scope.row.txHash || ''"
              type="0"
            >{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyDate" label="申请时间" width="152px" />
        <el-table-column :label="TOKEN__NAME+'接收方'" min-width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.toCorpNo">{{ scope.row.toCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column prop="applyAmount" label="签发数量(个)" width="130px">
          <template slot-scope="scope">{{ scope.row.applyAmount | thousands }}</template>
        </el-table-column>
        <el-table-column label="签发有效期" width="150px">
          <template slot-scope="scope">{{ scope.row.expireDate }}</template>
        </el-table-column>
        <el-table-column prop="reason" label="备注" width="150px" show-overflow-tooltip />
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
        <el-table-column label="操作" width="210" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.bizStatus === 'CHAIN_SIGN'|| scope.row.bizStatus === 'SUCCESS'|| scope.row.bizStatus === 'FAIL'"
              type="text"
              @click="viewContract(scope.row.contractUrl)"
            >查看合约</el-button>
            <el-button
              v-if="scope.row.bizStatus !== 'CHAIN_SIGN'"
              type="text"
              @click="handleDateil(scope.row)"
            >签发详情</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'CORE_SIGN' &&CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__sign'"
              v-fast-click="wrapClick(handleCreateContract, scope.row, 'sign', scope.row.isLastOperator)"
              type="text"
            >签约</el-button>
            <!-- <el-button
              v-if="scope.row.bizStatus === 'CORE_CORP_SIGNED' &&CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              type="text"
              @click="handleCreateContract(scope.row)"
            >签约复核</el-button> -->
            <el-button
              v-if="(scope.row.bizStatus === 'CORE_CHECK' || scope.row.bizStatus === 'CORE_ISSUE') && CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__check'"
              type="text"
              @click="openRecheck(scope.row)"
            >审核</el-button>
            <el-button
              v-if="CHECK_FLOW_STATUS.DONE === scope.row.button &&scope.row.bizStatus !== 'SUCCESS'"
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
    <IssueDetailDialog ref="signDetail" />
    <!-- 复核弹窗-->
    <IssueCheckDialog ref="reCheck" @submit="handleReCheckSubmit" />
    <!-- 创建合约 -->
    <PDF ref="pdfDialog">
      <template slot-scope="props">
        <el-button @click="props.close">取消</el-button>
        <el-button
          v-if="isCreateContract"
          type="primary"
          class="next-button"
          @click="onCreateContract"
        >同意签约</el-button>
        <Download v-else :url="currentUrl" direct>
          <el-button type="primary">下载合约</el-button>
        </Download>
      </template>
    </PDF>
    <!-- 签约复核 -->
    <PDF ref="pdfReviewDialog">
      <template slot-scope="props">
        <el-button @click="props.close">取消</el-button>
        <el-button
          type="primary"
          class="next-button"
          @click="onCreateContractReview"
        >签约复核</el-button>
      </template>
    </PDF>
    <!-- 审批流 -->
    <CheckFlow ref="checkFlow">
      <div slot="check">
        <el-form ref="verifyForm" class="mark-form" :model="verifyForm" :rules="rules" label-width="100px" label-position="left" style="width: 90%">
          <el-form-item label="企业名称">
            <span>{{ verifyForm.corpName }}</span>
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
            <el-button type="primary" @click="handleReCheckSubmit">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="sign">
        <SignPdf :pdf-url="pdfUrl">
          <template>
            <el-button @click="cancelCheck">取消</el-button>
            <el-button v-if="isLastOperator" type="primary" @click="onCreateContract">确认签约</el-button>
            <el-button v-if="!isLastOperator" type="primary" @click="onCreateContract">同意签约</el-button>
          </template>
        </SignPdf>
      </div>
    </CheckFlow>
  </div>
</template>
<script>
import IssueDetailDialog from '@/components/Business/Issue/IssueDetailDialog'
import CheckFlow from '@/components/CheckFlow/index'
import IssueCheckDialog from './components/IssueCheckDialog'
import tableMixin from '@/utils/tableMixin'
import { CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME, FLOW_POP_TYPE, ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST } from '@/utils/constant/index'
import { EnterprisApi, CommonApi } from '@/api/index'
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
      FLOW_POP_TYPE,
      ORDER_STATUS_MAP,
      ORDER_STATUS_LIST,
      corpList: [],
      contractNo: '',
      ruleForm: {
        regdate: '',
        beginApplyDate: '',
        endApplyDate: '',
        fromCorpName: '',
        orderStatus: '',
        toCorpName: '',
        transNo: '',
        triggerCorpType: 'CORE' //  核心需要填写 链属不需要填写
      },
      loading: false,
      list: [{}],
      currentUrl: '', // 当前行数据的PDF URL
      isCreateContract: true, // 是否为签约
      // bizStatusArr: [],
      verifyForm: {
        corpName: '',
        approve: true,
        reason: '', // 原因
      },
      rules: {
        reason: [
          { required: true, message: '请填写驳回原因', trigger: 'blur' }
        ]
      },
      pdfUrl: '',
      isLastOperator: true,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
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
  },
  methods: {
    getData() {
      // if (this.loading) return
      this.loading = true
      EnterprisApi.coreCorpQueryIssueTokenTrans({
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
    // 签发预览
    viewContract(url) {
      this.isCreateContract = false
      this.currentUrl = url
      this.$refs['pdfDialog'].open(url, '查看合约')
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
    handleDownload(row) {
      if (row.contractUrl) window.open(row.contractUrl)
      else this.$message.error('下载链接错误')
    },
    // 签发详情
    handleDateil(row) {
      // 打开签发详情
      console.log(row)
      this.$refs.signDetail.open(row, 'PAY')
    },
    // 审核
    openRecheck(row, approve = true) {
      this.verifyForm = {
        corpName: row.toCorpName,
        transNo: row.transNo,
        approve: approve,
        reason: ''
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: row.transNo, title: '签发审批流' })
    },
    // 复核提交
    handleReCheckSubmit() {
      this.$refs.verifyForm.validate(valid => {
        if (valid) {
          this.$securityCode().then((code) => {
            this.$refs.checkFlow.close()
            this.loading = true
            EnterprisApi.coreCorpReviewIssueTokenTrans({
              ...this.verifyForm,
              securityCode: code
            }).then(res => {
              if (res) {
                this.loading = false
                this.$message.success('审核成功')
                this.getData()
              }
            }).finally(() => {
              this.loading = false
            })
          })
        }
      })
    },
    // 签合约 预览
    handleCreateContract(row, type, isLastOperator) {
      this.isCreateContract = true
      this.contractNo = row.transNo
      CommonApi.previewIssueTokenContract({
        transNo: row.transNo
      }).then(res => {
        if (res.data) {
          this.currentUrl = res.data
          if (type) {
            this.pdfUrl = res.data
            this.isLastOperator = isLastOperator
            this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SIGN, transNo: row.transNo, title: '签发签约' })
          } else {
            this.$refs['pdfReviewDialog'].open(res.data, '复核')
          }
        } else {
          this.$message.error('预览地址有误')
        }
      })
    },
    // 签署合约
    onCreateContract(info) {
      this.$securityCode().then((code) => {
        this.$refs.checkFlow.close()
        this.loading = true
        EnterprisApi.coreCorpSignIssueTokenContract({
          transNo: this.contractNo,
          securityCode: code
        }).then(res => {
          if (res) {
            this.loading = false
            this.$message.success('签约成功')
          }
          this.getData()
        }).finally(() => {
          this.loading = false
        })
      })
    },
    // 签约复核
    onCreateContractReview(info) {
      this.$securityCode().then((code) => {
        this.$refs['pdfReviewDialog'].close()
        this.loading = true
        EnterprisApi.coreCorpReviewSignIssueTokenContract({
          transNo: this.contractNo,
          securityCode: code
        }).then(res => {
          if (res) {
            this.loading = false
            this.$message.success('复核成功')
          }
          this.getData()
        }).finally(() => {
          this.loading = false
        })
      })
    },
    goNewSign() {
      if (this.userInfo.haveCorpBankPaymentCard) {
        this.$router.push('/business/new-issue')
      } else {
        this.$message.error('操作前请完成付款对公账号绑定')
      }
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
.corp-name{
  /deep/.el-input__inner {
    width: 253px;
  }
}
</style>
