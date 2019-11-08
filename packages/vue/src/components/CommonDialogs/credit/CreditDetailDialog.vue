<template>
  <el-dialog
    title="授信明细"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="900px"
  >
    <div class="table-box">
      <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs" border />
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
import BasicTable from '@/components/BasicTable'

import tableMixin from '@/utils/tableMixin'

import { CommonApi } from '@/api/index'

export default {
  components: {
    BasicTable
  },
  mixins: [tableMixin],
  data() {
    return {
      visible: false,
      loading: false,
      quotaNo: '',
      from: '', // 来源
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '220px' },
        { label: '操作时间', prop: 'gmtCreated', width: '150px', formatter: (row) => { return this.formatterTime(row.gmtCreated) } },
        { label: '操作', prop: 'operateContent', width: '150px' },
        { label: '操作数量（个）', prop: 'operateTokenCount' },
        { label: '操作人', prop: 'operateCorpName', width: '200px', 'show-overflow-tooltip': true },
      ],
    }
  },
  watch: {
    quotaNo(val, oldVal) {
      if (val !== oldVal && val !== '') {
        this.onSearch()
      }
    }
  },
  methods: {
    open(quotaNo, from) {
      this.quotaNo = quotaNo
      this.from = from
      this.visible = true
    },
    close() {
      this.visible = false
      this.quotaNo = ''
      this.from = ''
    },
    getData() {
      if (this.loading) return
      this.loading = true
      // let api
      // if (this.from === 'platform') {
      //   api = PlatformApi.platformQueryQuotaDetail
      // } else if (this.from === 'funder') {
      //   api = FunderApi.fundQueryQuotaDetail
      // } else if (this.from === 'core') {
      //   api = EnterprisApi.coreQueryQuotaDetail
      // }
      const api = CommonApi.queryQuotaDetail
      if (!api) return
      api({
        quotaNo: this.quotaNo,
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
