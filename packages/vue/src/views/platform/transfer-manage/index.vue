<template>
  <div class="page page-transfer">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" label-position="left" :model="ruleForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="转让时间">
              <el-date-picker
                v-model="ruleForm.range"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="~"
                type="daterange"
                value-format="yyyy-MM-dd"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="fromCorp">
              <el-input
                v-model="ruleForm.fromCorpName"
                clearable
                placeholder="请输入企业名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tar">
            <el-form-item :label="toCorp">
              <el-input
                v-model="ruleForm.toCorpName"
                clearable
                placeholder="请输入企业名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
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
            <el-form-item class="option-btns">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="container">
      <div class="table-box">
        <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
          <el-table-column slot="txhash" label="hash" width="132px" show-overflow-tooltip>
            <template slot-scope="scope">
              <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash" type="0">{{ scope.row.txHash }}</hash-link>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column slot="fromCorpName" :label="fromCorp" min-width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.fromCorpNo">{{ scope.row.fromCorpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column slot="toCorpName" :label="toCorp" min-width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.toCorpNo">{{ scope.row.toCorpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column slot="bizStatus" width="120px" label="流程状态" fixed="right">
            <template slot-scope="scope">
              <div :class="ORDER_STATUS_COLOR[scope.row.status]">{{ scope.row.bizStatusName }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="status" width="120px" label="订单状态" fixed="right">
            <template slot-scope="scope">
              <div :class="ORDER_STATUS_COLOR[scope.row.status]">{{ ORDER_STATUS_MAP[scope.row.status] }}</div>
            </template>
          </el-table-column>
          <el-table-column slot="opt" label="操作" width="210px" fixed="right">
            <template slot-scope="scope">
              <template v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE">
                <!-- 待平台方审核时，展示 -->
                <el-button
                  v-if="scope.row.bizStatus === PLATFORM_BIZ_STATUS_MAP.KEY_PC"
                  v-permission="'transfer-manage__check'"
                  type="text"
                  @click="verify(scope.row)"
                >审核</el-button>
              </template>
              <template v-if="scope.row.button === CHECK_FLOW_STATUS.DONE">
                <el-button
                  type="text"
                  @click="showFlow(scope.row, FLOW_POP_TYPE.FLOW, '转让审批流')"
                >审批流</el-button>
              </template>
              <!-- 全部展示 -->
              <el-button
                type="text"
                @click="viewTransferDetail(scope.row)"
              >转让详情</el-button>
              <!-- 签约已过期/已完成时，展示 -->
              <el-button
                v-if="scope.row.bizStatus === PLATFORM_BIZ_STATUS_MAP.KEY_S"
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

      <!-- 审核/审批流 -->
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
              <el-button type="primary" @click="handleVerify">确 定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </CheckFlow>

      <!-- 转让详情 -->
      <el-dialog
        title="转让详情"
        :visible.sync="detailDialogVisible"
        :append-to-body="true"
        width="520px"
      >
        <el-form
          ref="detailForm"
          v-loading="detailFormLoading"
          :model="detailForm"
          label-position="left"
          label-width="120px"
        >
          <el-form-item label="应付资产">
            <asset-link class="asset-widht" :asset-no="detailForm.assetNo" asset-type="PAY">{{ detailForm.asset.assetName }}</asset-link>
          </el-form-item>
          <el-form-item :label="`${TOKEN__NAME}发出方`">
            <span>{{ detailForm.fromCorpName }}</span>
          </el-form-item>
          <el-form-item :label="`${TOKEN__NAME}接收方`">
            <span>{{ detailForm.toCorpName }}</span>
          </el-form-item>
          <el-form-item label="签发有效期">
            <span>{{ detailForm.expireDate }}</span>
          </el-form-item>
          <el-form-item label="转让数量">
            <span>{{ detailForm.amount }}个</span>
            <span class="zhehe">折合人民币 {{ detailForm.amount }}元</span>
          </el-form-item>
          <el-form-item label="合约">
            <Download v-if="detailForm.contractUrl" type="primary" direct :url="detailForm.contractUrl">
              <el-button class="download-button" type="text">{{ TOKEN__NAME }}合约</el-button>
            </Download>
            <span v-else>-</span>
          </el-form-item>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tableMixin from '@/utils/tableMixin'
import { PlatformApi } from '@/api'
import { PLATFORM_BIZ_STATUS_MAP, BIZ_STATUS_LIST, ORDER_STATUS_LIST, ORDER_STATUS_MAP, ORDER_STATUS_COLOR, FLOW_POP_TYPE, CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME } from '@/utils/constant/transfer'
import { numToStr } from '@/utils/validator'

const filterForm = {
  range: null,
  fromCorpName: '',
  toCorpName: '',
  status: '',
  bizStatus: ''
}
const detailForm = {
  asset: '',
  fromCorpName: '',
  toCorpName: '',
  expireDate: '',
  amount: ''
}

export default {
  name: 'PlatformTransferManage',
  mixins: [tableMixin],
  data() {
    return {
      fromCorp: `${this.TOKEN__NAME}发出方`,
      toCorp: `${this.TOKEN__NAME}接收方`,
      PLATFORM_BIZ_STATUS_MAP,
      FLOW_POP_TYPE,
      ORDER_STATUS_LIST,
      ORDER_STATUS_MAP,
      ORDER_STATUS_COLOR,
      BIZ_STATUS_LIST,
      CHECK_FLOW_STATUS,
      ruleForm: { ...filterForm },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '110px', 'show-overflow-tooltip': true },
        { slot: 'txhash' },
        { slot: 'fromCorpName' },
        { slot: 'toCorpName' },
        { label: '转让时间', prop: 'transferDate', width: '150px' },
        { label: '转让数量(个)', prop: 'amount', width: '130px', formatter: (row) => this.numToStr(row.amount, ''), 'show-overflow-tooltip': true },
        { label: '签发有效期', prop: 'expireDate', width: '100px' },
        { slot: 'bizStatus' },
        { slot: 'status' },
        { label: '驳回原因', prop: 'reason', 'min-width': '150px', 'show-overflow-tooltip': true },
        { slot: 'opt' }
      ],

      detailDialogVisible: false,
      detailFormLoading: false,
      detailForm: { ...detailForm },
      transNo_viewDetail: null,
      transNo_viewContract: null,
      transNo_verify: null,
      verifyDialogVisible: false,
      verifyForm: {
        transNo: '',
        approve: true,
        reason: ''
      },
      rules: {
        reason: [
          { required: true, message: '请输入驳回原因', trigger: 'blur' }
        ]
      },
      contractDialogVisible: false,
      contractUrl: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'currentDict']),
    bizStatusList() {
      return this.currentDict[BUSINESS_FLOW_NAME.CHAIN_TRANSFER] || []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    numToStr,
    handleSearch() {
      this.pageNum = 1
      this.getData()
    },
    handleReset() {
      this.ruleForm = { ...filterForm }
    },
    getData() {
      if (this.loading) return

      const params = {
        beginTransDate: this.ruleForm.range
          ? this.ruleForm.range[0]
          : '',
        endTransDate: this.ruleForm.range
          ? this.ruleForm.range[1]
          : '',
        fromCorpName: this.ruleForm.fromCorpName,
        toCorpName: this.ruleForm.toCorpName,
        bizStatus: this.ruleForm.bizStatus,
        status: this.ruleForm.status,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      Object.keys(params).forEach(key => {
        if (params[key] === '') {
          delete params[key]
        }
      })
      this.loading = true
      PlatformApi.queryTransferTrans({
        ...params
      }).then(response => {
        this.list = response.data
        this.total = response.total
      }).finally(() => {
        this.loading = false
      })
    },
    // 审核
    verify(row, approve = true) {
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
      PlatformApi.endNodeTransferTrans({
        ...this.verifyForm,
        securityCode: code,
      }).then(() => {
        this.$message.success('提交成功')
        this.getData()
      }).finally(() => {

      })
    },
    // 取消审核
    cancelCheck() {
      this.$refs.checkFlow.close()
    },
    // 审批流
    showFlow(row, type, title) {
      this.verifyForm = {
        transNo: row.transNo,
        approve: row.approve,
        reason: row.reason
      }
      this.$refs.checkFlow.open({ type: type, transNo: row.transNo, title })
    },
    // 转让详情
    viewTransferDetail(row) {
      this.transNo_viewDetail = row.transNo
      this.detailForm = row
      this.detailDialogVisible = true
    },
    // 查看合约
    viewContract(row) {
      if (!row.contractUrl) {
        PlatformApi.previewTransferTokenContract({
          transNo: row.transNo
        }).then(res => {
          this.contractUrl = res.data
          row.contractUrl = res.data
          this.$refs['pdfDialogView'].open(this.contractUrl, '查看合约')
        }).finally(() => {

        })
        return
      }
      this.contractUrl = row.contractUrl
      this.$refs['pdfDialogView'].open(this.contractUrl, '查看合约')
    },
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: $theme;
  cursor: pointer;
}
.zhehe {
  color: #8492a6;
}
.asset-widht{
  white-space:normal;
}
</style>
