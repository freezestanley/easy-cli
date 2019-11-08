<template>
  <div class="page page-apply-sign">
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
            <el-form-item label="核心企业" prop="fromCorpName">
              <el-input v-model="ruleForm.fromCorpName" type="text" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核状态" prop="bizStatus">
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
              <div class="opt-add-btn">
                <el-button v-permission="'issue-manage__apply'" type="primary" @click="showSignPop">+ 申请签发</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
        <el-table-column prop="hash" label="hash" width="132px" show-overflow-tooltip>
          <template slot-scope="scope" width="150px">
            <hash-link
              v-if="scope.row.txHash"
              :txhash="scope.row.txHash"
              type="0"
            >{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyDate" label="申请时间" width="150px" />
        <el-table-column label="核心企业名称" width="132px" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="ellipsis primary cursor">{{ scope.row.fromCorpName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="applyAmount" label="申请签发数量(个)" width="160px" align="right">
          <template slot-scope="scope">{{ scope.row.applyAmount | thousands }}</template>
        </el-table-column>
        <el-table-column prop="expireDate" label="签发有效期" width="120px" />
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
        <el-table-column label="备注" :min-width="152" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.reason }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.bizStatus === 'CHAIN_CHECK'
                ||scope.row.bizStatus === 'CHAIN_REJECT'
                ||scope.row.bizStatus === 'CORE_ISSUE'
                ||scope.row.bizStatus === 'CORE_CHECK'
                ||scope.row.bizStatus === 'CORE_REJECT'"
              type="text"
              @click="handleApplyDateil(scope.row)"
            >申请详情</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'SUCCESS'"
              type="text"
              @click="viewContract(scope.row.contractUrl)"
            >查看合约</el-button>
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
              v-if="scope.row.bizStatus === 'CHAIN_SIGN' &&CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__sign'"
              v-fast-click="wrapClick(handleCreateContract, scope.row, 0, scope.row.isLastOperator)"
              type="text"
            >签约</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'CHAIN_CHECK' &&CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__check'"
              type="text"
              @click="openRecheck(scope.row)"
            >审核</el-button>
            <el-button
              v-if="CHECK_FLOW_STATUS.DONE === scope.row.button"
              type="text"
              @click="openCheckFlow(scope.row)"
            >审批流</el-button>
            <Download :url="scope.row.contractUrl || ''" direct>
              <el-button v-if="scope.row.bizStatus === 'CORE_CORP_SIGNED_REVIEW'" type="text">下载合约</el-button>
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
    <!--新增签发-->
    <el-dialog
      :visible.sync="digNewSign"
      :append-to-body="true"
      width="550px"
      title="申请签发"
      @closed="onSignResetForm"
    >
      <el-form
        ref="newSignForm"
        :inline="true"
        :model="newSignForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="应收资产" prop="assetNo">
          <el-select
            v-model="newSignForm.assetNo"
            placeholder="请选择"
            style="width:350px"
            @change="handleAssetChange"
          >
            <el-option
              v-for="item in curCorpAssest"
              :key="item.assetNo"
              :label="item.assetName"
              :value="item.assetNo"
            />
          </el-select>
          <div class="tips">资产剩余金额:{{ curSign.balAmt | formatWan }}万元</div>
        </el-form-item>
        <div>
          <el-form-item label="企业名称">{{ newSignForm.payCorpName }}</el-form-item>
        </div>
        <el-form-item label="申请签发数量" prop="amount">
          <el-input
            v-model="newSignForm.amount"
            type="number"
            :placeholder="maxCount"
            style="width:348px"
          >
            <div slot="suffix" style="color:$titleColor">个</div>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="digNewSign =false;onSignResetForm()">取消</el-button>
        <el-button type="primary" @click="handleNewSign()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 签发详情 -->
    <IssueDetailDialog ref="signDetail" />
    <!-- 申请详情 -->
    <el-dialog title="申请详情" :visible.sync="digApplyDetail" :append-to-body="true" width="500px">
      <div class="digWrap">
        <p>
          <label>应收资产</label>
          <asset-link
            :asset-no="curApplyDateil.asset&&curApplyDateil.asset.assetNo || ''"
            asset-type="COLLECT"
          >{{ curApplyDateil.asset&&curApplyDateil.asset.assetName }}</asset-link>
        </p>
        <p>
          <label>企业名称</label>
          <span>{{ curApplyDateil.fromCorpName || curApplyDateil.toCorpName }}</span>
        </p>
        <p>
          <label>申请签发数量</label>
          <span>{{ curApplyDateil.applyAmount||0 }}个 (折合人民币{{ curApplyDateil.applyAmount||0 }}元)</span>
        </p>
      </div>
    </el-dialog>
    <!-- 复核弹窗-->
    <IssueCheckDialog ref="reCheck" @submit="handleReCheckSubmit" />
    <!-- 创建合约 -->
    <PDF ref="pdfDialog">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <el-button type="primary" class="next-button" @click="onContract">同意签约</el-button>
      </template>
    </PDF>
    <!-- 查看合约 -->
    <PDF ref="pdfDialog2">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <Download direct :url="contractUrl">
          <el-button type="primary">下载合约</el-button>
        </Download>
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
            <el-button v-if="isLastOperator" type="primary" @click="onContract">确认签约</el-button>
            <el-button v-if="!isLastOperator" type="primary" @click="onContract">同意签约</el-button>
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
import { SIGN_AUDIT_STATE } from '@/utils/constant/issue'
import { BUSINESS_FLOW_NAME, CHECK_FLOW_STATUS, FLOW_POP_TYPE, ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST } from '@/utils/constant/index'
import { COLLECT_ASSETS } from '@/utils/constant/assets'
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
      SIGN_AUDIT_STATE,
      CHECK_FLOW_STATUS,
      ORDER_STATUS_COLOR,
      FLOW_POP_TYPE,
      ORDER_STATUS_MAP,
      ORDER_STATUS_LIST,
      curApplyDateil: {},
      contractNo: '',
      curCorpAssest: [],
      digApplyDetail: false,
      digNewSign: false,
      ruleForm: {
        regdate: '',
        beginApplyDate: '',
        endApplyDate: '',
        fromCorpName: '',
        orderStatus: '',
        toCorpName: '',
        triggerCorpType: 'CHAIN', //  核心需要填写 链属不需要填写
        transNo: ''
      },
      newSignForm: {
        amount: '',
        assetNo: '',
        payCorpName: ''
      },
      curSign: {
        balAmt: 0
      },
      loading: false,
      list: [{}],
      contractUrl: '',
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
    maxCount() {
      return '最大' + (this.curSign.balAmt || 0) + '个'
    },
    bizStatusArr: function() {
      return this.currentDict[BUSINESS_FLOW_NAME.CHAIN_APPLY_ISSUE] || []
    }
  },
  mounted() {
    const query = this.$route.query
    if (query && query.tab === 'applySign') {
      this.ruleForm = {
        ...this.ruleForm,
        ...query
      }
    }
    this.getData()
    this.getCorpAssest()
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
      this.$refs['pdfDialog2'].open(url, '查看合约')
    },
    // 审批流
    openCheckFlow(row) {
      if (row.bizStatusName.includes('签约') || row.bizStatusName.includes('已完成')) {
        this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SFLOW, transNo: row.transNo, title: '签发审批流' })
      } else {
        this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.FLOW, transNo: row.transNo, title: '签发审批流' })
      }
    },
    // 获取资产
    getCorpAssest: async function(name) {
      const assetList = await EnterprisApi.queryAssetList({
        assetType: COLLECT_ASSETS,
        assetStatus: 'VALID',
        amountScope: 'NOT_ZERO',
        queryType: 'CHAIN_APPLY_ISSUE'
      })
      this.curCorpAssest = assetList.data
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
    showSignPop() {
      if (this.userInfo.haveCorpBankCollectCard) {
        this.digNewSign = true
      } else {
        this.$message.error('操作前请完成收款对公账号绑定')
      }
    },
    // 重置
    onSignResetForm() {
      this.$refs.newSignForm.resetFields()
    },
    // 资产选择变化
    handleAssetChange(asset) {
      const tempAsset = this.curCorpAssest.filter(
        item => item.assetNo === asset
      )

      if (tempAsset.length > 0) {
        this.curSign = tempAsset[0]
        this.newSignForm.payCorpName = tempAsset[0].payCorpName
      }
    },
    // 链属发起签发
    handleNewSign: async function() {
      this.$refs.newSignForm.validate(valid => {
        if (valid) {
          if (+this.newSignForm.amount > this.curSign.balAmt) {
            this.$message.error(
              '申请签发数量不能大于资产剩余金额，请修改申请签发数量后重试'
            )
            return
          }
          this.$securityCode().then((code) => {
            this.loading = true
            this.digNewSign = false
            CommonApi.chainCorpApplyIssueTokenTrans({
              ...this.newSignForm,
              securityCode: code
            }).then(res => {
              if (res) {
                this.$message.success('申请签发成功')
              }
              this.loading = false
              this.getData()
              this.onSignResetForm()
            })
          })
        }
      })
    },

    handleApplyDateil(row) {
      this.curApplyDateil = row
      this.digApplyDetail = true
    },
    handleDownload(row) {
      if (row.contractUrl) window.open(row.contractUrl)
      else this.$message.error('下载链接错误')
    },
    handleDateil(row) {
      // 打开签发详情  传对应的应收应付 COLLECT_ASSETS 应收  PAY_ASSETS 应付
      this.$refs.signDetail.open(row, COLLECT_ASSETS)
    },
    cancelCheck() {
      this.$refs.checkFlow.close()
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
    // 审核确认
    handleReCheckSubmit() {
      this.$refs.verifyForm.validate(valid => {
        if (valid) {
          this.$securityCode().then((code) => {
            this.loading = true
            this.$refs.checkFlow.close()
            CommonApi.chainCorpReviewIssueTokenTrans({
              ...this.verifyForm,
              securityCode: code
            }).then(res => {
              if (res) {
                this.loading = false
                this.$message.success('审核成功')
                this.getData()
              }
            })
          })
        }
      })
    },
    // 签约
    handleCreateContract(row, type, isLastOperator) {
      this.contractNo = row.transNo
      this.isLastOperator = isLastOperator
      this.pdfUrl = row.contractUrl
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SIGN, transNo: row.transNo, title: '签发签约' })
    },
    onContract(info) {
      this.$securityCode().then((code) => {
        this.$refs.checkFlow.close()
        this.loading = true
        CommonApi.chainCorpSignIssueTokenContract({
          approve: true,
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
