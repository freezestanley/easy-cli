<template>
  <el-dialog
    title="推送/授信情况"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="1200px"
  >
    <div>
      <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
        <el-table-column slot="status" label="状态" width="150px" fixed="right">
          <template slot-scope="scope">
            <div :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ scope.row.bizStatusName }}</div>
          </template>
        </el-table-column>
      </basic-table>
    </div>

    <Pagination
      v-if="list.length && !loading"
      :current-change="onCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      :size-change="onSizeChange"
      :total="total"
    />
  </el-dialog>
</template>

<script>
import { CommonApi } from '@/api'
import BasicTable from '@/components/BasicTable'
import tableMixin from '@/utils/tableMixin'
import { thousands } from '@/utils/index'
import { ORDER_STATUS_COLOR } from '@/utils/constant/index'

export default {
  components: {
    BasicTable
  },
  mixins: [tableMixin],
  data() {
    return {
      ORDER_STATUS_COLOR,
      visible: false,
      loading: false,
      corpNo: '',
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '150px', 'show-overflow-tooltip': true },
        { label: '推送时间', prop: 'applyDate', width: '150px', },
        { label: '资金方', prop: 'fromCorpName', width: '200px', 'show-overflow-tooltip': true },
        { label: '授信时间', prop: 'issueDate', width: '150px', },
        { label: '授信额度(元)', prop: 'amount', width: '150px', 'show-overflow-tooltip': true, formatter: (row) => { return this.thousands(row.amount, 0) } },
        { label: '授信有效期', prop: 'effectiveDate', width: '200px', formatter: (row) => { return row.effectiveDate ? (this.formatterTime(row.effectiveDate, 'YYYY-MM-DD') + '~' + this.formatterTime(row.expireDate, 'YYYY-MM-DD')) : '' } },
        { label: '备注', prop: 'reason', width: '200px', 'show-overflow-tooltip': true },
        { slot: 'status' },
      ],
    }
  },
  methods: {
    thousands,
    open(corpNo) {
      this.corpNo = corpNo
      this.visible = true
      this.getData()
    },
    close() {
      this.visible = false
      this.list = []
      this.total = 0
      this.pageNum = 1
      this.pageSize = 10
    },
    getData() {
      if (this.loading) return
      this.loading = true
      CommonApi.queryIssueQuotaTrans({
        toCorpNo: this.corpNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
