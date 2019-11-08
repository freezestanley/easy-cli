<template>
  <div class="com-QuotaList">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="授信有效期" prop="range" label-width="84px">
              <el-date-picker
                v-model="ruleForm.range"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col> -->
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
          <el-col :span="16">
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
        <el-table-column slot="hash" label="hash" width="132px" show-overflow-tooltip>
          <template slot-scope="scope">
            <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash">{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column slot="usedAmt" label="已使用（个）" width="132px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.usedAmt }}</span>
          </template>
        </el-table-column>
        <el-table-column slot="status" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status" :class="CREDIT_STATUS_MAP_COLOR[scope.row.status].class">{{ CREDIT_STATUS_MAP_COLOR[scope.row.status].value }}</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-button v-if="scope.row.status === 'AVALIABLE' && checkPermission('quota-manage__up')" type="text" @click="adjust(scope.row)">申请调增</el-button>
              <el-button type="text" @click="viewCreditDetail(scope.row.quotaNo)">授信明细</el-button>
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

    <!-- 授信明细 -->
    <credit-detail-dialog ref="creditDetailDialog" />

    <!-- 申请调额 -->
    <apply-adjust-dialog ref="applyAdjustDialog" @onOkHandle="onOkHandle" />

  </div>
</template>
<script>

import BasicTable from '@/components/BasicTable'
import CreditDetailDialog from '@/components/CommonDialogs/credit/CreditDetailDialog'
import ApplyAdjustDialog from '@/components/CommonDialogs/credit/ApplyAdjustDialog'

import tableMixin from '@/utils/tableMixin'
import { CREDIT_STATUS, CREDIT_STATUS_MAP_COLOR } from '@/utils/constant/quota'
import { thousands } from '@/utils/index'

import { PlatformApi } from '@/api/index'

export default {
  name: 'QuotaList',
  components: {
    BasicTable,
    CreditDetailDialog,
    ApplyAdjustDialog,
  },
  mixins: [tableMixin],
  data() {
    return {
      CREDIT_STATUS,
      CREDIT_STATUS_MAP_COLOR,
      ruleForm: {
        effectiveDate: '',
        expireDate: '',
        range: '',
        status: ''
      },
      loading: false,
      list: [],
      colConfigs: [
        { slot: 'hash' },
        { label: '资金方', prop: 'issueCorpName', minWidth: '132px', 'show-overflow-tooltip': true },
        { label: '授信时间', prop: 'issueDate', width: '150px', },
        { label: '授信有效期', prop: '', minWidth: '190px', formatter: (row) => { return this.formatterTime(row.effectiveDate, 'YYYY-MM-DD') + '  ~  ' + this.formatterTime(row.expireDate, 'YYYY-MM-DD') } },
        { label: '授信数量（个）', prop: 'issueAmt', width: '132px', formatter: (row) => { return this.thousands(row.issueAmt) } },
        { slot: 'usedAmt' },
        { label: '可用余额 (个)', prop: 'balAmt', width: '132px', formatter: (row) => { return this.thousands(row.balAmt) } },
        { slot: 'status' },
        { slot: 'opt' }
      ]
    }
  }, watch: {
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
  mounted() {
    this.getData()
  },
  methods: {
    thousands,
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
    // 授信明细弹窗
    viewCreditDetail(quotaNo) {
      this.$refs.creditDetailDialog.open(quotaNo, 'core')
    },
    // 打开调增弹窗
    adjust(row) {
      this.$refs.applyAdjustDialog.open({
        quotaNo: row.quotaNo,
        toCorpNo: row.corpNo,
        fromCorpNo: row.issueCorpNo,
        balAmt: row.balAmt,
        effectiveDate: row.effectiveDate,
        expireDate: row.expireDate
      })
    },
    onOkHandle() {
      this.getData()
    }
  }
}
</script>
