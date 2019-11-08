<template>
  <div class="filter-form">
    <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
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
          <el-form-item label="申请方" prop="toCorpName">
            <el-input v-model="ruleForm.toCorpName" type="text" placeholder="请输入" />
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
        <el-col :span="8">
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
        :empty-text="' '"
        element-loading-text="Loading"
        highlight-current-row
        stripe
        :data="list"
      >
        <el-table-column prop="transNo" label="编号" width="150px" show-overflow-tooltip />
        <el-table-column label="hash" width="140px" show-overflow-tooltip>
          <template slot-scope="scope">
            <hash-link
              v-if="scope.row.txHash"
              :txhash="scope.row.txHash"
              type="0"
            >{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyDate" label="申请时间" width="150px" />
        <el-table-column label="申请方" :min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.toCorpNo">{{ scope.row.toCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column prop="applyAmount" label="申请签发数量(个)" width="120">
          <template slot-scope="scope">{{ scope.row.applyAmount | thousands }}</template>
        </el-table-column>
        <el-table-column prop="expireDate" label="签发有效期" width="100" />
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
        <el-table-column prop="reason" label="备注" min-width="140px" show-overflow-tooltip />
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button
              v-if="scope.row.bizStatus == 'CHAIN_CORP_REVIEWED' || scope.row.bizStatus == 'CORE_CORP_CHECK_REJECTED'"
              type="text"
              @click="handleApplyDateil(scope.row)"
            >申请详情</el-button> -->
            <el-button
              v-if="scope.row.bizStatus === 'CHAIN_SIGN' ||scope.row.bizStatus === 'SUCCESS' "
              type="text"
              @click="viewContract(scope.row.contractUrl)"
            >查看合约</el-button>
            <el-button
              v-if="scope.row.bizStatus !== 'CHAIN_SIGN' "
              type="text"
              @click="handleDateil(scope.row)"
            >签发详情</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'CORE_SIGN' && CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__sign'"
              v-fast-click="wrapClick(handleCreateContract, scope.row, 'sign', scope.row.isLastOperator)"
              type="text"
            >签约</el-button>
            <!-- <el-button
              v-if="scope.row.bizStatus === 'CORE_CORP_SIGNED'"
              type="text"
              @click="handleCreateContract(scope.row)"
            >签约复核</el-button> -->
            <el-button
              v-if="scope.row.bizStatus === 'CORE_ISSUE' && CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__issuance'"
              type="text"
              @click="goApplySign(scope.row)"
            >签发</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'CORE_ISSUE' && CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__rejected'"
              type="text"
              @click="handleReject(scope.row)"
            >驳回</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'CORE_CHECK' && CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__check'"
              type="text"
              @click="openRecheck(scope.row)"
            >审核</el-button>
            <el-button
              v-if="CHECK_FLOW_STATUS.DONE === scope.row.button"
              type="text"
              @click="openCheckFlow(scope.row)"
            >审批流</el-button>
            <Download
              v-if="scope.row.bizStatus === 'CORE_CORP_SIGNED_REVIEW'"
              :url="scope.row.contractUrl || ''"
              direct
            >
              <el-button type="text">下载合约</el-button>
            </Download>
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
    <!-- 签发详情 -->
    <IssueDetailDialog ref="signDetail" />
    <!-- 申请详情 -->
    <el-dialog title="申请详情" :visible.sync="digApplyDetail" :append-to-body="true" width="500px">
      <div class="digWrap">
        <p>
          <label>应收资产</label>
          <asset-link
            :asset-no="curApplyDateil.asset && curApplyDateil.asset.assetNo || ''"
            asset-type="COLLECT"
          >{{ curApplyDateil.asset && curApplyDateil.asset.assetName }}</asset-link>
        </p>
        <p>
          <label>申请企业名称</label>
          <span>{{ curApplyDateil.toCorpName }}</span>
        </p>
        <p>
          <label>申请签发数量</label>
          <span>{{ curApplyDateil.applyAmount }}个 (折合人民币{{ curApplyDateil.applyAmount }}元)</span>
        </p>
      </div>
    </el-dialog>
    <!-- 驳回 -->
    <el-dialog
      :visible.sync="digReject"
      title="审核驳回"
      :append-to-body="true"
      width="520px"
      @closed="handleRejectClose"
    >
      <el-form
        ref="rejectForm"
        :model="rejectForm"
        :rules="rules"
        label-position="left"
        label-width="72px"
      >
        <el-form-item label="企业名称">{{ curReject.fromCorpName }}</el-form-item>
        <el-form-item label="审核结果">
          <el-radio-group v-model="rejectForm.approve" prop="approve" style="width:400px">
            <el-radio :label="false" checked>审核驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回原因" prop="reason">
          <el-input
            v-model="rejectForm.reason"
            :rows="4"
            :maxlength="100"
            show-word-limit
            placeholder="请输入驳回原因"
            style="width:400px"
            type="textarea"
            resize="none"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleRejectClose">取 消</el-button>
        <el-button type="primary" @click="handleRejectSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 复核弹窗-->
    <IssueCheckDialog ref="reCheck" @submit="handleReCheckSubmit" />
    <!-- 创建合约 -->
    <PDF ref="pdfDialog">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <el-button type="primary" class="next-button" @click="onCreateContract">签约</el-button>
      </template>
    </PDF>
    <!-- 查看合约 -->
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
import IssueDetailDialog from '@/components/Business/Issue/IssueDetailDialog' // 签发详情
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
      ORDER_STATUS_MAP,
      FLOW_POP_TYPE,
      ORDER_STATUS_LIST,
      contractNo: '', // 签约ID
      curApplyDateil: {},
      curReject: {},
      digReject: false,
      digApplyDetail: false,
      rejectForm: {
        approve: false,
        reason: '',
        transNo: ''
      },
      rejectRules: {
        reason: [
          { required: true, message: '请填写驳回原因', trigger: 'blur' }
        ]
      },
      ruleForm: {
        regdate: '',
        beginApplyDate: '',
        endApplyDate: '',
        toCorpNo: '',
        orderStatus: '',
        toCorpName: '', // 申请方
        transNo: '',
        triggerCorpType: 'CHAIN' //  核心需要填写 链属不需要填写
      },
      loading: false,
      list: [{}],
      currentUrl: '',
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
    ...mapGetters(['currentDict']),
    bizStatusArr: function() {
      return this.currentDict[BUSINESS_FLOW_NAME.CHAIN_APPLY_ISSUE] || []
    }
  },
  mounted() {
    const query = this.$route.query
    console.log(query)
    if (query && query.tab === 'applySign') {
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
    onSearch() {
      const { regdate } = this.ruleForm
      if (Array.isArray(regdate)) {
        this.ruleForm.beginApplyDate = this.ruleForm.regdate[0]
        this.ruleForm.endApplyDate = this.ruleForm.regdate[1]
      }
      this.pageNum = 1
      this.getData()
    },
    // 链属申请签发跳转
    goApplySign(row) {
      this.$router.push({
        path: '/business/new-issue',
        query: {
          transNo: row.transNo,
          assetName: row.asset.assetName,
          balAmt: row.asset.balAmt,
          corpName: row.asset.receiveCorpName,
          applyAmount: row.applyAmount
        }
      })
    },
    viewContract(url) {
      this.isCreateContract = false
      this.currentUrl = url
      this.$refs['pdfDialog'].open(url, '查看合约')
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
    // 驳回
    handleRejectSubmit() {
      this.$refs.rejectForm.validate(valid => {
        if (valid) {
          this.$securityCode().then((code) => {
            this.loading = true
            this.digReject = false
            EnterprisApi.coreCorpCheckIssueTokenTrans({
              ...this.rejectForm,
              securityCode: code
            }).then(res => {
              if (res) {
                this.$message.success('驳回成功')
                this.getData()
                this.loading = false
              }
            }).finally(() => {
              this.loading = false
            })
          })
        }
      })
    },
    // 驳回确认
    handleReject(row) {
      this.digReject = true
      this.curReject = row
      this.rejectForm.approve = false
      this.rejectForm.transNo = row.transNo
      // this.rejectForm.quotaNo = row.asset.assetNo
      // this.rejectForm.expireDate = new Date()
    },
    // 申请详情
    handleApplyDateil(row) {
      this.curApplyDateil = row
      this.digApplyDetail = true
    },
    handleRejectClose() {
      this.digReject = false
      this.curReject = {}
      this.$refs.rejectForm.resetFields()
    },
    // 文件下载
    handleDownload(row) {
      if (row.contractUrl) window.open(row.contractUrl)
      else this.$message.error('下载链接错误')
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
    handleDateil(row) {
      // 打开签发详情
      this.$refs.signDetail.open(row, 'RECEIVE')
    },
    // 签约
    handleCreateContract(row, type, isLastOperator) {
      // 需预览 确认签约后正式生成合约地址
      CommonApi.previewIssueTokenContract({
        transNo: row.transNo
      }).then(res => {
        if (res.data) {
          console.log(res.data)
          this.contractNo = row.transNo
          if (type) {
            this.pdfUrl = res.data
            this.isLastOperator = isLastOperator
            this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SIGN, transNo: row.transNo, title: '签发签约' })
          } else {
            this.$refs['pdfReviewDialog'].open(res.data, '复核')
          }
        } else {
          this.$message.error('合约地址有误')
        }
      })
    },
    onCreateContract(info) {
      this.$securityCode().then((code) => {
        this.$refs['checkFlow'].close()
        this.loading = true
        EnterprisApi.coreCorpSignIssueTokenContract({
          transNo: this.contractNo,
          securityCode: code
        }).then(res => {
          if (res) {
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
            this.$message.success('复核成功')
          }
          this.getData()
        }).finally(() => {
          this.loading = false
        })
      })
    },
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
    float: left;
  }
  span{
    display: inline-block;
    width: 330px;
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
