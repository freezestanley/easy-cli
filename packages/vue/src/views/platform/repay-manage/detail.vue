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
            <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash">{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column slot="paidTokenCount" :label="`还款${TOKEN__NAME}数（个）`" width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.paidTokenCount }}</span>
          </template>
        </el-table-column>
        <el-table-column slot="orderStatus" label="状态" width="80px" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.orderStatus === 'APPLYED'" class="warning">已申请</div>
            <div v-else-if="scope.row.orderStatus === 'CANCEL'" class="warning">已取消</div>
            <div v-else-if="scope.row.orderStatus === 'SIGN'" class="warning">待确认</div>
            <div v-else-if="scope.row.orderStatus === 'REJECTED'" class="error">已拒绝</div>
            <div v-else-if="scope.row.orderStatus === 'CONFIRM'" class="success">已完成</div>
            <div v-else-if="scope.row.orderStatus === 'PLATFORM_THAW_TOKEN'" class="success">平台方已解冻</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" fixed="right" width="130">
          <template slot-scope="scope">
            <el-button v-if="['CONFIRM', 'REJECTED', 'SIGN'].includes(scope.row.orderStatus)" type="text" @click="viewRepaymentDetail(scope.row)">还款详情</el-button>
            <el-button v-if="checkPermission('repay-manage__frozen') && 'REJECTED' === scope.row.orderStatus && scope.row.collectionCorpType === 'CHAIN'" type="text" @click="showDialog(scope.row)">解冻</el-button>
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

    <!-- 通证流转详情 -->
    <token-flow-record ref="tokenFlowDialog" />

    <!-- 通证手动处理弹窗 -->
    <el-dialog
      :title="`${TOKEN__NAME}解冻`"
      :visible="unfreezeDialog"
      :append-to-body="true"
      width="520px"
    >
      <div class="body">
        <el-form ref="unfreezeForm" :model="unfreezeForm" label-width="170px">
          <el-form-item :label="`已冻结${TOKEN__NAME}(个)`">
            {{ 50 }}
          </el-form-item>
          <el-form-item label="归还方" prop="returnTokenCorpNo" :rules="[{ required: true, message: `请选择${TOKEN__NAME}解冻归还方`, trigger: 'blur' }]">
            <el-select v-model.trim="unfreezeForm.returnTokenCorpNo" type="number" :placeholder="`请选择${TOKEN__NAME}解冻归还方`">
              <el-option v-for="c in selectCotps" :key="c.value" :value="c.value" :label="c.label" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unfreezeDialog = false">取 消</el-button>
        <el-button type="primary" @click="unfreeze">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'
import RepaymentDialog from '@/components/Business/Repay/RepaymentDialog'

import tableMixin from '@/utils/tableMixin'
import { CommonApi } from '@/api'

export default {
  components: {
    BasicTable,
    RepaymentDialog
  },
  mixins: [tableMixin],
  // props: {
  //   repayPlanNo: {
  //     type: [String, Number],
  //     required: true
  //   },
  // },
  data() {
    return {
      repayPlanNo: this.$route.query.repayPlanNo,
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '300px' },
        { slot: 'txHash' },
        { slot: 'paidTokenCount' },
        { label: '申请时间', prop: 'applyDate', width: '150px', formatter: (row) => { return row.applyDate ? this.formatterTime(row.applyDate) : '-' } },
        { label: '标记还款时间', prop: 'signDate', width: '150px', formatter: (row) => { return row.signDate ? this.formatterTime(row.signDate) : '-' } },
        { label: '确认/拒绝时间', prop: 'checkDate', width: '150px', formatter: (row) => { return row.checkDate ? this.formatterTime(row.checkDate) : '-' } },
        { label: '是否逾期', prop: 'isOverdue', width: '80px', formatter: (row) => row.isOverdue === 'Y' ? '是' : '否' },
        { slot: 'orderStatus' },
        { slot: 'opt' }
      ],
      tokenCount: '',
      paidTokenCount: '',
      unpaidTokenCount: '',
      frozenTokenCount: '',
      unfreezeDialog: false,
      unfreezeForm: {
        repayPlanDetailNo: '', // 还款详情id
        returnTokenCorpNo: '', // 解冻后
      },
      corp1: { value: '', label: '' },
      corp2: { value: '', label: '' },
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
    },
    selectCotps() {
      return [
        this.corp1,
        this.corp2
      ]
    }
  },
  created() {
    this.getData()
    this.getTokenData()
  },
  methods: {
    getData() {
      CommonApi.queryRepayDetailList({
        repayPlanNo: this.repayPlanNo,
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
      CommonApi.getRepayPlan({
        repayPlanNo: this.repayPlanNo
      }).then(res => {
        const data = res.data
        this.tokenCount = data.tokenCount
        this.paidTokenCount = data.paidTokenCount
        this.unpaidTokenCount = data.unpaidTokenCount
        this.frozenTokenCount = data.frozenTokenCount
        this.transNo = data.transNo
        this.corp1 = {
          value: data.repayCorpNo,
          label: data.repayCorpName
        }
        this.corp2 = {
          value: data.collectionCorpNo,
          label: data.collectionCorpName
        }
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
    showDialog (row) {
      this.unfreezeForm.repayPlanDetailNo = row.transNo
      this.unfreezeDialog = true
    },
    // 解冻
    unfreeze(row) {
      this.$refs.unfreezeForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then(securityCode => {
            CommonApi.platformThawToken({
              ...this.unfreezeForm,
              securityCode
            })
          })
        }
      })
    }
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
</style>
