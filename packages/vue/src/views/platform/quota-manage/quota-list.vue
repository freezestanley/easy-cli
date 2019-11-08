<template>
  <div class="page">
    <div class="filter-form">
      <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-width="96px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="核心企业名称" prop="toCorpName">
              <el-input v-model="ruleForm.toCorpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资金方查询" prop="fromCorpName">
              <el-input v-model="ruleForm.fromCorpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信状态" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option
                  v-for="item in CREDIT_STATUS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-box">
      <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
        <el-table-column slot="txHash" label="hash" width="132px" show-overflow-tooltip>
          <template slot-scope="scope">
            <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash">{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column slot="corpName" label="核心企业名称" width="132px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.corpNo">{{ scope.row.corpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column slot="usedAmt" label="已使用（个）" width="132px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.usedAmt | thousands }}</span>
          </template>
        </el-table-column>
        <el-table-column slot="status" label="状态" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'AVALIABLE'" class="success">正常</div>
            <div v-else-if="scope.row.status === 'FREEZED'" class="error">已冻结</div>
            <div v-else-if="scope.row.status === 'EXPIRED'" class="disabled">已过期</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'AVALIABLE' && checkPermission('quota-list__modify')">
              <el-button type="text" @click="changeStatus(scope.row)">冻结</el-button>
              <el-button type="text" @click="adjust(scope.row)">调额</el-button>
              <el-button type="text" @click="extensionTime(scope.row)">延长有效期</el-button>
              <el-button type="text" @click="viewCreditDetail(scope.row.quotaNo)">授信明细</el-button>
            </div>
            <div v-else-if="scope.row.status === 'FREEZED' && checkPermission('quota-list__modify')">
              <el-button type="text" @click="changeStatus(scope.row)">解冻</el-button>
              <el-button type="text" @click="viewCreditDetail(scope.row.quotaNo)">授信明细</el-button>
            </div>
            <div v-else>
              <el-button type="text" @click="viewCreditDetail(scope.row.quotaNo)">授信明细</el-button>
            </div>
          </template>
        </el-table-column>
        <div slot="append">
          <NoData v-if="!list.length && !loading" title="暂时没有企业" />
        </div>
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

    <!-- 授信明细 -->
    <credit-detail-dialog ref="creditDetailDialog" />

    <!-- 延长有效期 -->
    <extension-time-dialog ref="extensionTimeDialog" />

    <!-- 调额 -->
    <adjust-dialog ref="adjustDialog" />

    <!-- 解冻/冻结 -->
    <status-dialog ref="statusDialog" />

    <!-- 通证流转详情 -->
    <token-flow-record ref="tokenFlowDialog" />
  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'
import CreditDetailDialog from '@/components/CommonDialogs/credit/CreditDetailDialog'
import ExtensionTimeDialog from '@/components/CommonDialogs/credit/ExtensionTimeDialog'
import AdjustDialog from '@/components/CommonDialogs/credit/AdjustDialog'
import StatusDialog from '@/components/CommonDialogs/credit/StatusDialog'

import tableMixin from '@/utils/tableMixin'
import { CREDIT_STATUS, CREDIT_STATUS_MAP } from '@/utils/constant/quota'

import { PlatformApi } from '@/api/index'
import { thousands } from '@/utils/'

export default {
  name: '',
  components: {
    BasicTable,
    CreditDetailDialog,
    ExtensionTimeDialog,
    AdjustDialog,
    StatusDialog,
  },
  mixins: [tableMixin],
  data () {
    return {
      CREDIT_STATUS,
      CREDIT_STATUS_MAP,
      ruleForm: {
        toCorpName: '',
        effectiveDate: '',
        fromCorpName: '',
        expireDate: '',
        range: '',
        status: ''
      },
      loading: false,
      list: [],
      colConfigs: [
        { slot: 'txHash' },
        { slot: 'corpName' },
        { label: '授信时间', prop: 'issueDate', width: '150px', },
        { label: '授信方', prop: 'issueCorpName', minWidth: '150px', 'show-overflow-tooltip': true },
        { label: '授信有效期', prop: 'expireDate', width: '220px', formatter: (row) => { return this.formatterTime(row.effectiveDate, 'YYYY-MM-DD') + ' ~ ' + this.formatterTime(row.expireDate, 'YYYY-MM-DD') } },
        { label: '授信数量(个)', prop: 'issueAmt', width: '132px', formatter: (row) => { return thousands(row.issueAmt) } },
        { slot: 'usedAmt' },
        { label: '可用余额(个)', prop: 'balAmt', width: '132px', formatter: (row) => { return thousands(row.balAmt) } },
        { slot: 'status' },
        { slot: 'opt' }
      ]
    }
  },
  watch: {
    'ruleForm.range': function(val) {
      if (val) {
        this.ruleForm.effectiveDate = val[0] || ''
        this.ruleForm.expireDate = val[1] || ''
      } else {
        this.ruleForm.effectiveDate = ''
        this.ruleForm.expireDate = ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.loading) return
      this.loading = true
      PlatformApi.queryQuotaCorpList({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    // 表格的一些操作
    viewCreditDetail(quotaNo) {
      this.$refs.creditDetailDialog.open(quotaNo, 'platform')
    },
    extensionTime(row) {
      this.$refs.extensionTimeDialog.open({
        initiator: 'platform',
        quotaNo: row.quotaNo,
        toCorpNo: row.corpNo,
        fromCorpNo: row.issueCorpNo,
        corpName: row.corpName,
        balAmt: row.balAmt,
        effectiveDate: row.effectiveDate,
        expireDate: row.expireDate
      })
    },
    adjust(row) {
      this.$refs.adjustDialog.open({
        initiator: 'platform',
        quotaNo: row.quotaNo,
        toCorpNo: row.corpNo,
        fromCorpNo: row.issueCorpNo,
        corpName: row.corpName,
        issueAmt: row.issueAmt,
        usedAmt: row.usedAmt,
        balAmt: row.balAmt,
        effectiveDate: row.effectiveDate,
        expireDate: row.expireDate
      })
    },
    changeStatus(row) {
      this.$refs.statusDialog.open({
        initiator: 'platform',
        quotaNo: row.quotaNo,
        toCorpNo: row.corpNo,
        fromCorpNo: row.issueCorpNo,
        corpName: row.corpName,
        showNo: row.status === 'FREEZED' ? row.frzAmt : row.balAmt, // 2019 7 12
        type: row.status === 'FREEZED' ? 'THAW' : 'FROZEN'
      })
    },
    // viewTokenFlowDetail(row) {
    //   if (row.usedAmt <= 0) {
    //     this.$message.warning(`该${this.TOKEN__NAME}暂时没有流转记录`)
    //   } else {
    //     debugger
    //     this.$refs.tokenFlowDialog.open(row.transNo)
    //   }
    // },
  }
}
</script>

