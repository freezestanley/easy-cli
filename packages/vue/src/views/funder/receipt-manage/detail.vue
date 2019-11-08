<template>
  <div>
    <div class="marb-16">
      <div class="summary-container">
        <div v-for="(item, index) in summaryData" :key="index" class="item">
          <div class="name">{{ item.name }}</div>
          <div class="value">{{ item.value | thousands }}</div>
        </div>
      </div>
    </div>

    <div>
      <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
        <el-table-column slot="txHash" label="hash" width="250px" show-overflow-tooltip>
          <template slot-scope="scope">
            <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash" type="0">{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column slot="paidTokenCount" :label="`收款${TOKEN__NAME}数（个）`" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.paidTokenCount }}</span>
          </template>
        </el-table-column>
        <el-table-column slot="orderStatus" label="状态" width="110px" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.orderStatus === 'APPLYED'" class="warning">已申请</div>
            <div v-else-if="scope.row.orderStatus === 'CANCEL'" class="warning">已取消</div>
            <div v-else-if="scope.row.orderStatus === 'SIGN'" class="warning">待确认</div>
            <div v-else-if="scope.row.orderStatus === 'REJECTED'" class="error">已拒绝</div>
            <div v-else-if="scope.row.orderStatus === 'CONFIRM'" class="success">已完成</div>
            <div v-else-if="scope.row.orderStatus === 'INIT'" class="warning">申请中</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="240px" fixed="right">
          <template slot-scope="scope">
            <div>
              <span>
                <el-button v-if="scope.row.orderStatus === 'SIGN' && checkPermission('receipt-manage__accept')" type="text" @click="confirmReceipt(scope.row)">确认收款</el-button>
                <el-button v-if="scope.row.orderStatus === 'SIGN' && checkPermission('receipt-manage__reject')" type="text" @click="rejectReceipt(scope.row)">拒绝收款</el-button>
              </span>
              <el-button v-if="['CONFIRM', 'REJECTED', 'SIGN'].includes(scope.row.orderStatus)" type="text" @click="viewReceiptDetail(scope.row)">收款详情</el-button>
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

    <repayment-dialog ref="repaymentDialog" />

    <reject-receipt-dialog ref="rejectReceiptDialog" @callback="callback" />

    <!-- 通证流转详情 -->
    <token-flow-record ref="tokenFlowDialog" />

  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'
import RepaymentDialog from '@/components/Business/Repay/RepaymentDialog'
import RejectReceiptDialog from '@/components/Business/Repay/RejectReceiptDialog'

import tableMixin from '@/utils/tableMixin'
import { CommonApi } from '@/api'

export default {
  components: {
    BasicTable,
    RepaymentDialog,
    RejectReceiptDialog
  },
  mixins: [tableMixin],
  // props: {
  //   repayPlanNo: {
  //     type: [String, Number],
  //     required: true
  //   },
  //   collectionCorpNo: {
  //     type: [String, Number],
  //     required: true
  //   },
  //   tokenNo: {
  //     type: [String, Number],
  //     required: true
  //   },
  // },
  data() {
    return {
      repayPlanNo: this.$route.query.repayPlanNo,
      collectionCorpNo: this.$route.query.collectionCorpNo,
      tokenNo: this.$route.query.tokenNo,
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '300px' },
        { slot: 'txHash' },
        { slot: 'paidTokenCount' },
        { label: '对方申请时间', prop: 'applyDate', width: '150px', formatter: (row) => { return row.applyDate ? this.formatterTime(row.applyDate) : '-' } },
        { label: '标记还款时间', prop: 'signDate', width: '150px', formatter: (row) => { return row.signDate ? this.formatterTime(row.signDate) : '-' } },
        { label: '确认/拒绝时间', prop: 'checkDate', width: '150px', formatter: (row) => { return row.checkDate ? this.formatterTime(row.checkDate) : '-' } },
        { label: '备注', prop: 'opinion', width: '250px', 'show-overflow-tooltip': true },
        { slot: 'orderStatus' },
        { slot: 'opt' }
      ],
      tokenCount: '',
      paidTokenCount: '',
      unpaidTokenCount: '',
      frozenTokenCount: ''
    }
  },
  computed: {
    summaryData() {
      return [
        { name: `收款${this.TOKEN__NAME}总数（个）`, value: this.tokenCount || '' },
        { name: `已收${this.TOKEN__NAME}数（个）`, value: this.paidTokenCount || '' },
        { name: `待收${this.TOKEN__NAME}数（个）`, value: this.unpaidTokenCount || '' },
        { name: `已冻结${this.TOKEN__NAME}数（个）`, value: this.frozenTokenCount || '' },
      ]
    }
  },
  created() {
    this.getData()
    this.getTokenData()
  },
  methods: {
    callback() {
      this.getData()
      this.getTokenData()
    },
    getData() {
      CommonApi.queryCollectionDetailList({
        repayPlanNo: this.repayPlanNo,
        collectionCorpNo: this.collectionCorpNo,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    // 查${this.TOKEN__NAME}数量
    getTokenData() {
      CommonApi.getCollectionPlan({
        repayPlanNo: this.repayPlanNo
      }).then(res => {
        const data = res.data || {}
        this.tokenCount = data.tokenCount
        this.paidTokenCount = data.paidTokenCount
        this.unpaidTokenCount = data.unpaidTokenCount
        this.frozenTokenCount = data.frozenTokenCount
        this.transNo = data.transNo
      })
    },
    viewReceiptDetail(row) {
      this.$refs.repaymentDialog.open({
        type: 'receipt',
        item1: row.payeeBankName,
        item2: row.payeeBankAccountName,
        item3: row.payeeBankAccountNo,
        item4: row.payerTime,
        item5: row.payerBankAccountName,
        item6: row.payerBankName,
        item7: row.payerReceiptNumber,
        item8: row.payerBankAccountNo,
        item9: row.payerVoucherUrl || '',
      })
    },
    confirmReceipt(row) {
      this.$confirm('确定已经收到对方打款了吗?', '确认收款', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$securityCode().then(code => {
          CommonApi.confirmCollection({
            collectionCorpNo: this.collectionCorpNo,
            repayPlanDetailNo: row.transNo,
            securityCode: code,
          }).then(() => {
            this.$message({
              type: 'success',
              message: '确认成功!'
            })
            this.callback()
          })
        })
      }).catch(() => {

      })
    },
    rejectReceipt(row) {
      this.$refs.rejectReceiptDialog.open({
        repayPlanDetailNo: row.transNo,
        collectionCorpNo: this.collectionCorpNo,
        opinion: ''
      })
    },
    // viewTokenFlowDetail(row) {
    //   if (row.orderStatus !== 'CONFIRM') { // 已完成才可以查看
    //     this.$message.warning('该${this.TOKEN__NAME}暂时没有流转记录')
    //   } else {
    //     this.$refs.tokenFlowDialog.open(row.transNo)
    //   }
    // },
  }
}
</script>

<style lang="scss" scoped>
.marb-16 {
  margin-bottom: 16px;
}
.summary-container {
  padding: 20px 20px;
  border-radius:8px;
  border:1px solid $borderColor;
  .item {
    display: inline-block;
    width: 200px;
    margin-right: 36px;
    .name {
      color: $tipColor;
      font-size: 14px;
      line-height: 20px;
      height: 20px;
      margin-bottom: 12px;
    }
    .value {
      color: $titleColor;
      font-size: 24px;
      line-height: 33px;
      height: 33px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
