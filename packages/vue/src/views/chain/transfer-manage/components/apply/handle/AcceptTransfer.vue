<template>
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
          <el-form-item label="下游企业" prop="toCorpName">
            <el-input
              v-model.trim="ruleForm.toCorpName"
              type="text"
              placeholder="请输入企业名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="流程状态" prop="bizStatus">
            <el-select v-model="ruleForm.bizStatus" placeholder="请选择">
              <el-option
                v-for="item in bizStatusList"
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
          <el-form-item label="订单状态" prop="status">
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
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="container">
      <div class="table-box">
        <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
          <el-table-column slot="txhash" label="hash" width="132px" show-overflow-tooltip>
            <template slot-scope="scope">
              <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash" type="0">{{ scope.row.txHash }}</hash-link>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column slot="toCorpName" label="下游企业" min-width="150px" show-overflow-tooltip>
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.corpNo">{{ scope.row.toCorpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column slot="bizStatus" width="120px" label="流程状态" fixed="right">
            <template slot-scope="scope">
              <div :class="ORDER_STATUS_COLOR[scope.row.status]">{{ scope.row.bizStatusName }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="status" width="100px" label="订单状态" fixed="right">
            <template slot-scope="scope">
              <div :class="ORDER_STATUS_COLOR[scope.row.status]">{{ ORDER_STATUS_MAP[scope.row.status] }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="opt" label="操作" width="330px" fixed="right">
            <template slot-scope="scope">
              <template v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE">
                <!-- 待上游转让时，展示 -->
                <el-button
                  v-if="scope.row.bizStatus === DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_UT"
                  v-permission="'transfer-apply__add'"
                  type="text"
                  @click="transfer(scope.row)"
                >转让</el-button>
                <!-- 待上游转让时，展示 -->
                <el-button
                  v-if="scope.row.bizStatus === DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_UT"
                  v-permission="'transfer-apply__reject'"
                  type="text"
                  @click="reject(scope.row)"
                >驳回</el-button>
                <!-- 待上游审核时，展示 -->
                <el-button
                  v-if="scope.row.bizStatus === DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_UC"
                  v-permission="'transfer-apply__up_check'"
                  type="text"
                  @click="verify(scope.row)"
                >审核</el-button>
                <!-- 待上游签约时，展示 -->
                <el-button
                  v-if="scope.row.bizStatus === DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_US"
                  v-permission="'transfer-apply__up_sign'"
                  type="text"
                  @click="sign(scope.row)"
                >签约</el-button>
              </template>
              <template v-if="scope.row.button === CHECK_FLOW_STATUS.DONE">
                <el-button
                  type="text"
                  @click="showFlow(scope.row, FLOW_POP_TYPE.SFLOW, '转让审批流')"
                >审批流</el-button>
              </template>
              <!-- 全部展示 -->
              <el-button
                type="text"
                @click="viewApplyHandle(scope.row)"
              >申请详情</el-button>
              <!-- 新增转让后，展示 -->
              <el-button
                v-if="[DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_UC,
                       DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_PC,
                       DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_PR,
                       DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_US,
                       DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_DS,
                       DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_S].indexOf(scope.row.bizStatus) > -1"
                type="text"
                @click="viewTransferDetail(scope.row)"
              >转让详情</el-button>
              <el-button
                v-if="scope.row.bizStatus === DOWNSTREAM_APPLY_BIZ_STATUS_MAP.KEY_S"
                type="text"
                @click="viewContract(scope.row)"
              >查看合约</el-button>
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

      <!-- 审批流/签约流/签约 -->
      <CheckFlow ref="checkFlow">
        <div slot="check">
          <el-form ref="verifyForm" class="mark-form" :model="verifyForm" :rules="rules" label-width="100px" label-position="left" style="width: 90%">
            <el-form-item v-if="opt === opt_verify" label="审核结果" prop="approve">
              <el-radio-group v-model="verifyForm.approve">
                <el-radio :label="true">审核通过</el-radio>
                <el-radio :label="false">审核驳回</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="opt === opt_reject" label="审核结果" prop="approve">
              <span>驳回</span>
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
        <div slot="sign">
          <SignPdf :pdf-url="contractUrl">
            <div class="footer footer-right">
              <el-button @click="cancelSign">取消</el-button>
              <el-button v-if="opt === opt_sign" type="primary" @click="handleSign">确定签约</el-button>
            </div>
          </SignPdf>
        </div>
      </CheckFlow>
      <!-- 转让详情 -->
      <transfer-detail-dialog ref="transferDetailDialog" />

      <!-- 申请详情 -->
      <apply-transfer-detail-dialog ref="applyTransferDetailDialog" />

      <!-- 转让弹窗 -->
      <add-transfer-dialog ref="AddTransferDialog" @success="onAddSuccess" />

      <!-- 查看合约 -->
      <PDF ref="pdfDialogView">
        <template slot-scope="props">
          <el-button @click="props.close()">取消</el-button>
          <Download type="primary" direct :url="contractUrl">
            <el-button class="next-button" type="primary">下载合约</el-button>
          </Download>
        </template>
      </PDF>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { EnterprisApi } from '@/api/index'
import SignPdf from '@/components/PDF/SignPdf'
import TransferDetailDialog from '../../TransferDetailDialog'
import ApplyTransferDetailDialog from '../ApplyTransferDetailDialog'
import AddTransferDialog from '../AddTransferDialog'
import Validator, { numToStr } from '@/utils/validator'
import checkPermission from '@/utils/permission'

import tableMixin from '@/utils/tableMixin'
import { DOWNSTREAM_APPLY_BIZ_STATUS_MAP, BIZ_STATUS_LIST, ORDER_STATUS_LIST, ORDER_STATUS_MAP, ORDER_STATUS_COLOR, FLOW_POP_TYPE, CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME } from '@/utils/constant/transfer'

export default {
  components: {
    TransferDetailDialog,
    ApplyTransferDetailDialog,
    AddTransferDialog,
    SignPdf
  },
  mixins: [tableMixin],
  data() {
    return {
      DOWNSTREAM_APPLY_BIZ_STATUS_MAP,
      FLOW_POP_TYPE,
      ORDER_STATUS_LIST,
      ORDER_STATUS_MAP,
      ORDER_STATUS_COLOR,
      BIZ_STATUS_LIST,
      CHECK_FLOW_STATUS,
      ruleForm: {
        beginApplyDate: '',
        endApplyDate: '',
        range: '',
        bizStatus: '',
        status: '',
        toCorpName: '', // 传下游名
        // triggerCorpType: 'DOWNSTREAM', // CORE("CORE", "核心企业"),CHAIN("CHAIN", "链属企业"),UPSTREAM("UPSTREAM", "上游链属企业"),DOWNSTREAM("DOWNSTREAM", "下游链属企业");
      },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '110px', 'show-overflow-tooltip': true },
        { slot: 'txhash' },
        { slot: 'toCorpName' },
        { label: '申请时间', prop: 'applyDate', width: '150px' },
        { label: '申请转让数量(个)', prop: 'applyAmount', width: '150px', formatter: (row) => this.numToStr(row.applyAmount, '') },
        { label: '签发有效期', prop: 'expireDate', width: '100px' },
        { slot: 'bizStatus' },
        { slot: 'status' },
        { label: '驳回原因', prop: 'reason', 'min-width': '150px', 'show-overflow-tooltip': true },
        { slot: 'opt' }
      ],
      addForm: {},
      verifyForm: {
        transNo: '',
        approve: true,
        reason: '', // 原因
      },
      rules: {
        reason: Validator.isRequired('请填写驳回原因')
      },
      currViewData: {},
      contractUrl: '',
      opt: 'reject',
      opt_verify: 'verify',
      opt_sign: 'sign',
      opt_reject: 'reject',
      opt_view: 'view'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentDict']),
    bizStatusList() {
      return this.currentDict[BUSINESS_FLOW_NAME.DCHAIN_TO_UCHAIN_APPLY_TRANSFER] || []
    }
  },
  watch: {
    'ruleForm.range': function(val) {
      if (val && val.length === 2) {
        this.ruleForm.beginApplyDate = val[0]
        this.ruleForm.endApplyDate = val[1]
      } else {
        this.ruleForm.beginApplyDate = ''
        this.ruleForm.endApplyDate = ''
      }
    }
  },
  created() {
    const query = this.$route.query
    if (query && query.tab === 'accept') {
      this.ruleForm = {
        ...this.ruleForm,
        ...query
      }
    }
    this.getData()
  },
  methods: {
    numToStr,
    checkPermission,
    getData() {
      if (this.loading) return
      this.loading = true
      EnterprisApi.queryTransferTrans({
        ...this.ruleForm,
        queryType: 'UNACTIVE_FROM_ME',
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    // 取消
    cancel() {
      this.$refs.checkFlow.close()
    },
    // 转让
    transfer(row) {
      this.$refs['AddTransferDialog'].open(row)
    },
    // 驳回
    reject(row) {
      this.opt = this.opt_reject
      this.verifyForm = {
        transNo: row.transNo,
        approve: false,
        reason: ''
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: row.transNo })
    },
    // 审核
    verify(row, approve = true) {
      this.opt = this.opt_verify
      this.verifyForm = {
        transNo: row.transNo,
        approve: approve,
        reason: ''
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: row.transNo })
    },
    // 确认审核
    handleVerify() {
      this.$refs.verifyForm.validate((valid) => {
        if (!valid) return false

        this.$refs.checkFlow.close()
        this.$securityCode().then((code) => {
          this.triggerVerifyApi(code)
        })
      })
    },
    triggerVerifyApi(code) {
      EnterprisApi.endNodeTransferTrans({
        ...this.verifyForm,
        securityCode: code,
      }).then(() => {
        this.$message.success('审核成功')
        this.getData()
      })
    },
    // 取消审核
    cancelCheck() {
      this.cancel()
    },
    // 签约
    sign(row) {
      this.opt = this.opt_sign
      this.currViewData = row
      if (!row.contractUrl) {
        EnterprisApi.previewTransferTokenContract({
          transNo: row.transNo
        }).then(res => {
          this.contractUrl = res.data
          row.contractUrl = res.data
        }).finally(() => {
          this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SIGN, transNo: row.transNo })
        })
        return
      }
      this.contractUrl = row.contractUrl
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.SIGN, transNo: row.transNo })
    },
    // 确定签约
    handleSign() {
      this.$refs.checkFlow.close()

      this.$securityCode().then((code) => {
        this.triggerSignApi(code)
      })
    },
    triggerSignApi(code) {
      EnterprisApi.endNodeTransferTrans({
        transNo: this.currViewData.transNo,
        securityCode: code,
      }).then(() => {
        this.$message.success('签约成功')
        this.getData()
      }).finally(() => {

      })
    },
    // 取消签约
    cancelSign() {
      this.cancel()
    },
    // 审批流/签约流
    showFlow(row, type, title) {
      this.verifyForm = {
        transNo: row.transNo,
        approve: row.approve,
        reason: row.reason
      }
      this.$refs.checkFlow.open({ type: type, transNo: row.transNo, title: title })
    },
    // 申请详情
    viewApplyHandle(row) {
      this.$refs['applyTransferDetailDialog'].open(row, 'PAY')
    },
    // 转让详情
    viewTransferDetail(row) {
      row.type = 'collect'
      this.$refs['transferDetailDialog'].open(row, 'PAY')
    },
    // 查看合约
    viewContract(row) {
      if (!row.contractUrl) {
        EnterprisApi.previewTransferTokenContract({
          transNo: row.transNo
        }).then(res => {
          this.contractUrl = res.data
          row.contractUrl = res.data
        }).finally(() => {
          this.$refs['pdfDialogView'].open(this.contractUrl, '查看合约')
        })
        return
      }
      this.contractUrl = row.contractUrl
      this.$refs['pdfDialogView'].open(this.contractUrl, '查看合约')
    },
    onAddSuccess() {
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  margin-top: 10px;
}
  .footer-right {
    text-align: right;
  }
</style>
