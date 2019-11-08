<template>
  <div class="page page-apply-sign-list">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left" label-width="96px">
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
            <el-form-item :label="TOKEN__NAME + '发出方'" prop="fromCorpName">
              <el-input
                v-model="ruleForm.fromCorpName"
                type="text"
                placeholder="请输入企业名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="TOKEN__NAME + '接收方'" prop="toCorpName" label-width="96px">
              <el-input
                v-model="ruleForm.toCorpName"
                type="text"
                placeholder="请输入企业名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="编号" prop="transNo">
              <el-input
                v-model.trim="ruleForm.transNo"
                type="text"
                placeholder="请输入编号"
              />
            </el-form-item>
          </el-col> -->
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
          <el-col :span="8" class="tar">
            <el-form-item>
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
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
        <el-table-column label="hash" width="152px" show-overflow-tooltip>
          <template slot-scope="scope">
            <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash">{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyDate" label="申请时间" width="150px" />
        <el-table-column :label="TOKEN__NAME + '发出方'" min-width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.fromCorpNo">{{ scope.row.fromCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column :label="TOKEN__NAME + '接收方'" min-width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.toCorpNo">{{ scope.row.toCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="签发数量(个)" width="100">
          <template slot-scope="scope">{{ scope.row.amount | thousands }}</template>
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
        <el-table-column prop="reason" label="备注" width="150px" show-overflow-tooltip />
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.bizStatus === 'CHAIN_SIGN'
                ||scope.row.bizStatus === 'SUCCESS'"
              type="text"
              @click="viewContract(scope.row.contractUrl)"
            >查看合约</el-button>
            <el-button
              v-if="scope.row.bizStatus !== 'CHAIN_SIGN'"
              type="text"
              @click="handleDateil(scope.row)"
            >签发详情</el-button>
            <el-button
              v-if="scope.row.bizStatus === 'PLATFORM_CHECK' &&CHECK_FLOW_STATUS.OPERATE === scope.row.button"
              v-permission="'issue-manage__check'"
              type="text"
              @click="openRecheck(scope.row)"
            >审核</el-button>
            <el-button
              v-if="CHECK_FLOW_STATUS.DONE === scope.row.button && scope.row.bizStatus !== 'SUCCESS'"
              type="text"
              @click="openCheckFlow(scope.row.transNo)"
            >审批流</el-button>
            <Download
              v-if="scope.row.status === 'CORE_CORP_SIGNED'"
              :url="scope.row.contractUrl"
              direct
            >
              <el-button type="text">下载合约</el-button>
            </Download>
          </template>
        </el-table-column>
        <div slot="append">
          <NoData v-if="!list.length && !loading" title="暂时没有数据" />
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
    <!-- 驳回 -->
    <IssueDetailDialog ref="signDetail" />
    <!-- 复核弹窗-->
    <CheckDialog ref="reCheck" @submit="handleReCheckSubmit" />
    <!-- 查看合约 -->
    <PDF ref="pdfDialog">
      <template slot-scope="props">
        <el-button @click="props.close">取消</el-button>
        <el-button
          v-if="isCreateContract"
          type="primary"
          class="next-button"
          @click="onCreateContract"
        >确定生成合约</el-button>
        <Download v-else :url="currentUrl" direct>
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
    </CheckFlow>
  </div>
</template>
<script>
import IssueDetailDialog from '@/components/Business/Issue/IssueDetailDialog'
import CheckFlow from '@/components/CheckFlow/index'
import CheckDialog from './CheckDialog'
import tableMixin from '@/utils/tableMixin'
import { PAY_ASSETS } from '@/utils/constant/assets'
import { CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME, FLOW_POP_TYPE, ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST } from '@/utils/constant/index'
import { EnterprisApi, PlatformApi } from '@/api/index'
import { mapGetters } from 'vuex'

export default {
  name: 'ApplySignList',
  components: {
    IssueDetailDialog,
    CheckDialog,
    CheckFlow
  },
  mixins: [tableMixin],
  data() {
    return {
      CHECK_FLOW_STATUS,
      ORDER_STATUS_COLOR,
      FLOW_POP_TYPE,
      ORDER_STATUS_MAP,
      ORDER_STATUS_LIST,
      auditForm: {},
      ruleForm: {
        regdate: '',
        beginApplyDate: '',
        endApplyDate: '',
        fromCorpName: '',
        bizStatus: '',
        orderStatus: '',
        toCorpName: '',
        transNo: ''
      },
      loading: false,
      list: [{}],
      isCreateContract: true,
      currentUrl: '',
      onCreateContract: true,
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
    }
  },
  computed: {
    ...mapGetters(['currentDict']),
    bizStatusArr: function() {
      return this.currentDict[BUSINESS_FLOW_NAME.CHAIN_APPLY_ISSUE] || []
    }
  },
  mounted() {
    if (this.$route.query) {
      this.ruleForm = {
        ...this.ruleForm,
        ...this.$route.query
      }
    }
    this.getData()
  },
  methods: {
    getData() {
      // if (this.loading) return
      this.loading = true
      PlatformApi.platformQueryIssueTokenTrans({
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
    // 查看合约
    viewContract(url) {
      this.isCreateContract = false
      this.currentUrl = url
      this.$refs['pdfDialog'].open(url, '查看合约')
    },
    // 审批流
    openCheckFlow(transNo) {
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.FLOW, transNo: transNo, title: '签发审批流' })
    },
    getCorpAssest: async function(name) {
      const assetList = await EnterprisApi.queryAssetList({
        assetType: PAY_ASSETS,
        assetStatus: 'VALID',
        amountScope: 'NOT_ZERO'
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
    // 授信弹窗
    viewCreditDetail(corpNo) {
      this.$refs.creditDetailDialog.open(corpNo)
    },
    handleDateil(row) {
      // 打开签发详情
      this.$refs.signDetail.open(row, 'PAY')
    },
    cancelCheck() {
      this.$refs.checkFlow.close()
    },
    openRecheck(row, approve = true) {
      this.verifyForm = {
        corpName: row.toCorpName,
        transNo: row.transNo,
        approve: approve,
        reason: ''
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: row.transNo, title: '签发审批流' })
    },
    handleReCheckSubmit(param) {
      this.$refs.verifyForm.validate(valid => {
        if (valid) {
          this.auditForm = { ...param }
          this.$securityCode().then(code => {
            this.loading = true
            this.$refs.checkFlow.close()
            this.handleSCodeSubmit(code)
          })
        }
      })
    },
    handleSCodeSubmit(code) {
      this.auditForm.securityCode = code
      PlatformApi.platformCheckIssueTokenTrans({
        ...this.auditForm,
        ...this.verifyForm
      }).then(res => {
        if (res) {
          this.loading = false
          this.$message.success('审核成功')
          this.auditForm = {}
          this.getData()
        }
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
