<template>
  <div class="page">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="收款企业" prop="collectionCorpName">
              <el-input v-model="ruleForm.collectionCorpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="还款日期" prop="range">
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
            <el-form-item label="还款状态" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option label="全部" :value="''" />
                <el-option
                  v-for="(item, index) in REPAY_MANAGE_STATUS"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="是否逾期" prop="isOverdue">
              <el-select v-model="ruleForm.isOverdue" placeholder="请选择">
                <el-option label="全部" :value="''" />
                <el-option label="否" :value="'N'" />
                <el-option label="是" :value="'Y'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编号" prop="repayPlanNo">
              <el-input
                v-model.trim="ruleForm.repayPlanNo"
                type="text"
                placeholder="请输入编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tar">
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
        <!-- <el-table-column slot="repayCorpName" label="还款企业" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.repayCorpNo">{{ scope.row.repayCorpName }}</corp-link>
          </template>
        </el-table-column> -->
        <el-table-column slot="collectionCorpName" label="收款企业" :min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.collectionCorpNo">{{ scope.row.collectionCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column slot="status" label="还款状态" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'UNDUE'" class="wait">待还款</div>
            <div v-else-if="scope.row.status === 'REPAYED'" class="success">还清</div>
            <div v-else-if="scope.row.status === 'OVERDUED'" class="error">逾期</div>
            <div v-else-if="scope.row.status === 'OVERDUED_REPAYED'" class="success">逾期还清</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="240px" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-button v-if="!scope.row.isApplyed && checkPermission('repay-manage-list__apply')" type="text" @click="applyRepay(scope.row)">申请还款</el-button>
              <el-button v-if="scope.row.isApplyed && checkPermission('repay-manage-list__view')" type="text" @click="viewRepayDetail(scope.row)">查看还款</el-button>
              <el-button v-permission="'repay-manage-list__contract'" type="text" @click="viewContract(scope.row)">查看合约</el-button>
            </div>
          </template>
        </el-table-column>
        <div slot="append">
          <NoData v-if="!list.length && !loading" title="暂时没有还款" />
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

    <!-- 申请还款 -->
    <apply-repay-dialog ref="applyRepayDialog" @callback="getData" />

    <!-- pdf 查看 -->
    <PDF ref="pdfDialogView">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <Download type="primary" direct :url="currViewData.contractUrl ||''">
          <el-button class="next-button" type="primary">下载合约</el-button>
        </Download>
      </template>
    </PDF>

  </div>
</template>

<script>
import ApplyRepayDialog from '@/components/Business/Repay/ApplyRepayDialog'

import { REPAY_MANAGE_STATUS } from '@/utils/constant/repay'
import tableMixin from '@/utils/tableMixin'
import { CommonApi } from '@/api'

export default {
  components: {
    ApplyRepayDialog,
  },
  mixins: [tableMixin],
  data() {
    return {
      REPAY_MANAGE_STATUS,
      ruleForm: {
        collectionCorpName: '',
        range: '',
        dueDateBegin: '',
        dueDateEnd: '',
        status: '',
        isOverdue: '',
        repayPlanNo: ''
      },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'repayPlanNo', width: '300px' },
        // { slot: 'repayCorpName' },
        { slot: 'collectionCorpName' },
        { label: '对应资产', prop: 'assetName', width: '150px' },
        { label: `还款${this.TOKEN__NAME}总数（个）`, prop: 'tokenCount', width: '150px' },
        { label: `已还${this.TOKEN__NAME}数（个）`, prop: 'paidTokenCount', width: '150px' },
        { label: `待还${this.TOKEN__NAME}数（个）`, prop: 'unpaidTokenCount', width: '150px' },
        { label: '还款日期', prop: 'dueDate', width: '150px', formatter: (row) => { return this.formatterTime(row.dueDate, 'YYYY-MM-DD') } },
        { label: '是否逾期', prop: 'isOverdue', width: '80px', formatter: (row) => row.isOverdue === 'Y' ? '是' : '否' },
        { slot: 'status' },
        { slot: 'opt' }
      ],
      currViewData: { contractUrl: '' },
    }
  },
  watch: {
    'ruleForm.range': function(val) {
      if (val) {
        this.ruleForm.dueDateBegin = val[0] || ''
        this.ruleForm.dueDateEnd = val[1] || ''
      } else {
        this.ruleForm.dueDateBegin = ''
        this.ruleForm.dueDateEnd = ''
      }
    }
  },
  created() {
    const query = this.$route.query
    if (query) {
      this.ruleForm = {
        ...this.ruleForm,
        ...query
      }
    }
    this.getData()
  },
  methods: {
    getData() {
      CommonApi.queryRepayPlan({
        ...this.ruleForm,
        repayCorpNo: this.$store.getters.userInfo.corpNo,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    viewRepayDetail(row) {
      this.$router.push({
        path: '/business/repay-manage/detail',
        query: {
          repayPlanNo: row.repayPlanNo,
          repayCorpNo: row.repayCorpNo,
          tokenNo: row.tokenNo,
        }
      })
    },
    // 核心还款
    applyRepay(row) {
      this.$refs.applyRepayDialog.open({
        unpaidTokenCount: row.unpaidTokenCount,
        repayCorpNo: this.$store.getters.userInfo.corpNo,
        // repayCorpNo: row.repayCorpNo,
        repayCorpType: 'CORE', // CORE-核心企业, CHAIN-链属企业 ,
        repayPlanNo: row.repayPlanNo,
        tokenNo: row.tokenNo
      })
    },
    // corpType (string): 企业类型:FUND-资金方, CORE-核心企业, CHAIN-链属企业 ,repayPlanNo (string): 还款计划编号 ,transType (string): 类型:COLLECT_TOKEN-收款,REPAY_TOKEN-还款
    viewContract(row) {
      CommonApi.getContractByCorp({
        corpType: 'CORE',
        repayPlanNo: row.repayPlanNo,
        transType: 'REPAY_TOKEN',
      }).then(res => {
        this.currViewData.contractUrl = res.data.contractUrl || ''
        this.$refs['pdfDialogView'].open(this.currViewData.contractUrl, '查看合约')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

