<template>
  <div>
    <div class="marb-16">
      <div class="summary-container flex">
        <div>
          <div v-for="(item, index) in summaryData" :key="index" class="item">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value | thousands }}</div>
          </div>
        </div>
        <div class="apply-button">
          <el-button v-if="checkPermission('repay-manage__apply')&& unpaidTokenCount && unpaidTokenCount !== '0'" type="primary" @click="applyRepay">申请还款</el-button>
          <el-button @click="$router.back()">返回</el-button>
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
        <el-table-column slot="paidTokenCount" :label="`还款${TOKEN__NAME}数（个）`" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.paidTokenCount }}</span>
          </template>
        </el-table-column>
        <el-table-column slot="orderStatus" label="状态" width="120px" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.orderStatus === 'APPLYED'" class="warning">已申请</div>
            <div v-else-if="scope.row.orderStatus === 'CANCEL'" class="warning">已取消</div>
            <div v-else-if="scope.row.orderStatus === 'SIGN'" class="warning">待对方确认</div>
            <div v-else-if="scope.row.orderStatus === 'REJECTED'" class="error">对方已拒绝</div>
            <div v-else-if="scope.row.orderStatus === 'CONFIRM'" class="success">已完成</div>
            <div v-else-if="scope.row.orderStatus === 'INIT'" class="warning">申请中</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="240px" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.orderStatus === 'APPLYED'">
              <el-button v-permission="'repay-manage__sign'" type="text" @click="signRepayed(scope.row)">标记已还款</el-button>
              <el-button v-permission="'repay-manage__cancel'" type="text" @click="cancelApply(scope.row)">取消申请</el-button>
            </div>
            <div v-if="['CONFIRM', 'REJECTED', 'SIGN'].includes(scope.row.orderStatus) && checkPermission('repay-manage__view')">
              <el-button type="text" @click="viewRepaymentDetail(scope.row)">还款详情</el-button>
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
    <apply-repay-dialog ref="applyRepayDialog" @callback="callback" />

    <!-- 还款详情 -->
    <repayment-dialog ref="repaymentDialog" />

    <!-- 标记还款 -->
    <sign-repayed-dialog ref="signRepayedDialog" @callback="callback" />

    <!-- 通证流转详情 -->
    <token-flow-record ref="tokenFlowDialog" />
  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'
import ApplyRepayDialog from '@/components/Business/Repay/ApplyRepayDialog'
import RepaymentDialog from '@/components/Business/Repay/RepaymentDialog'
import SignRepayedDialog from '@/components/Business/Repay/SignRepayedDialog'

import tableMixin from '@/utils/tableMixin'
import { CommonApi } from '@/api'

export default {
  components: {
    BasicTable,
    ApplyRepayDialog,
    RepaymentDialog,
    SignRepayedDialog
  },
  mixins: [tableMixin],
  // props: {
  //   repayPlanNo: {
  //     type: [String, Number],
  //     required: true
  //   },
  //   repayCorpNo: {
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
      repayCorpNo: this.$route.query.repayCorpNo,
      tokenNo: this.$route.query.tokenNo,
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '300px' },
        { slot: 'txHash' },
        { slot: 'paidTokenCount' },
        { label: '申请时间', prop: 'applyDate', width: '150px', formatter: (row) => { return row.applyDate ? this.formatterTime(row.applyDate) : '-' } },
        { label: '标记还款时间', prop: 'signDate', width: '150px', formatter: (row) => { return row.signDate ? this.formatterTime(row.signDate) : '-' } },
        { label: '确认/拒绝时间', prop: 'checkDate', width: '150px', formatter: (row) => { return row.checkDate ? this.formatterTime(row.checkDate) : '-' } },
        { label: '备注', prop: 'opinion', width: '250px', 'show-overflow-tooltip': true },
        { slot: 'orderStatus' },
        { slot: 'opt' }
      ],
      transNo: '',
      tokenCount: '',
      paidTokenCount: '',
      unpaidTokenCount: '',
      frozenTokenCount: ''
    }
  },
  computed: {
    summaryData() {
      return [
        { name: `还款${this.TOKEN__NAME}总数（个）`, value: this.tokenCount },
        { name: `已还${this.TOKEN__NAME}数（个）`, value: this.paidTokenCount },
        { name: `待还${this.TOKEN__NAME}数（个）`, value: this.unpaidTokenCount },
        { name: `已冻结${this.TOKEN__NAME}数（个）`, value: this.frozenTokenCount },
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
      CommonApi.queryRepayDetailList({
        repayPlanNo: this.repayPlanNo,
        // repayCorpNo: this.repayCorpNo,
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
    getTokenData() {
      CommonApi.getRepayPlan({
        repayPlanNo: this.repayPlanNo
      }).then(res => {
        this.tokenCount = res.data.tokenCount
        this.paidTokenCount = res.data.paidTokenCount
        this.unpaidTokenCount = res.data.unpaidTokenCount
        this.frozenTokenCount = res.data.frozenTokenCount
        this.transNo = res.data.transNo
      })
    },
    viewRepaymentDetail(row) {
      this.$refs.repaymentDialog.open({
        type: 'repay',
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
    // 链属还款
    applyRepay() {
      this.$refs.applyRepayDialog.open({
        unpaidTokenCount: this.unpaidTokenCount,
        repayCorpNo: this.$store.getters.userInfo.corpNo,
        repayCorpType: 'CHAIN', // CORE-核心企业, CHAIN-链属企业 ,
        repayPlanNo: this.repayPlanNo,
        tokenNo: this.tokenNo
      })
    },
    signRepayed(row) {
      this.$refs.signRepayedDialog.open({
        repayPlanDetailNo: row.transNo,
        payeeBankName: row.payeeBankName,
        payeeBankAccountName: row.payeeBankAccountName,
        payeeBankAccountNo: row.payeeBankAccountNo,
        payerTime: '',
        payerAmount: '',
        payerBankName: row.payerBankName,
        payerBankAccountName: row.payerBankAccountName,
        payerBankAccountNo: row.payerBankAccountNo,
        payerReceiptNumber: '',
        payerVoucherUrl: ''
      })
    },
    cancelApply(row) {
      this.$confirm('确定要取消还款申请吗?', '取消申请', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$securityCode().then(code => {
          CommonApi.cancelRepay({
            repayCorpNo: row.repayCorpNo,
            repayPlanDetailNo: row.transNo,
            securityCode: code,
          }).then(() => {
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            this.callback()
          })
        })
      }).catch(() => {

      })
    },
    // viewTokenFlowDetail(row) {
    //   if (row.orderStatus !== 'CONFIRM') { // 已完成才可以查看
    //     this.$message.warning(`该${this.TOKEN__NAME}暂时没有流转记录`)
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
    margin-right: 24px;
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
  .apply-button {
    width: 156px;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
