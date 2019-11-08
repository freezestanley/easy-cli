<template>
  <div class="page">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="还款企业" prop="repayCorpName">
              <el-input v-model="ruleForm.repayCorpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款企业" prop="collectionCorpName">
              <el-input v-model="ruleForm.collectionCorpName" placeholder="请输入" />
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
        <el-table-column slot="repayCorpName" label="还款企业" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.repayCorpNo">{{ scope.row.repayCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column slot="assetName" label="对应资产" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.assetName }}</span>
          </template>
        </el-table-column>
        <el-table-column slot="collectionCorpName" label="收款企业" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.collectionCorpNo">{{ scope.row.collectionCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column slot="status" label="还款状态" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'UNDUE'" class="warning">待还款</div>
            <div v-else-if="scope.row.status === 'REPAYED'" class="success">还清</div>
            <div v-else-if="scope.row.status === 'OVERDUED'" class="error">逾期</div>
            <div v-else-if="scope.row.status === 'OVERDUED_REPAYED'" class="success">逾期还清</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="viewRepayDetail(scope.row)">查看详情</el-button>
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

  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'

import { REPAY_MANAGE_STATUS } from '@/utils/constant/repay'
import tableMixin from '@/utils/tableMixin'
import { CommonApi } from '@/api'

export default {
  components: {
    BasicTable
  },
  mixins: [tableMixin],
  data() {
    return {
      REPAY_MANAGE_STATUS,
      ruleForm: {
        repayCorpName: '',
        collectionCorpName: '',
        status: '',
        isOverdue: '',
        repayPlanNo: ''
      },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'repayPlanNo', width: '300px' },
        { slot: 'repayCorpName' },
        { slot: 'assetName' },
        { slot: 'collectionCorpName' },
        { label: `还款${this.TOKEN__NAME}总数（个）`, prop: 'tokenCount', width: '150px' },
        { label: `已还${this.TOKEN__NAME}数（个）`, prop: 'paidTokenCount', width: '150px' },
        { label: `待还${this.TOKEN__NAME}数（个）`, prop: 'unpaidTokenCount', width: '150px' },
        { label: '还款日期', prop: 'dueDate', width: '150px', formatter: (row) => { return this.formatterTime(row.dueDate, 'YYYY-MM-DD') } },
        { label: '是否逾期', prop: 'isOverdue', width: '80px', formatter: (row) => row.isOverdue === 'Y' ? '是' : '否' },
        { slot: 'status' },
        { slot: 'opt' }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      CommonApi.queryRepayPlan({
        ...this.ruleForm,
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
        }
      })
    }
  }
}
</script>
