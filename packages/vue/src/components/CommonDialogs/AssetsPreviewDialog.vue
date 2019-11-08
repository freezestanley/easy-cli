<template>
  <el-drawer
    title="资产浏览"
    :visible="visible"
    :before-close="close"
    size="1000px"
    :append-to-body="true"
  >
    <div class="table">
      <el-table v-loading="loading" stripe :data="list" empty-text=" ">
        <el-table-column label="hash" prop="txHash" width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash" type="1">{{ scope.row.txHash }}</hash-link>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="资产名称" prop="assetName" width="150px" show-overflow-tooltip />
        <el-table-column label="资产类型" prop="assetType" width="100px" :formatter="row => assetTypeMap[row.assetType]" />
        <el-table-column label="应付金额(万元)" prop="realAmt" width="120px" :formatter="row => numToStr(row.realAmt,'',true)" show-overflow-tooltip />
        <el-table-column label="应付到期日" prop="assetExpireDate" width="100px" />
        <el-table-column label="供应商名称" prop="receiveCorpName" width="200px" show-overflow-tooltip />
        <el-table-column label="客户名称" prop="payCorpName" width="200px" show-overflow-tooltip />
        <el-table-column label="合同编号" prop="contractNo" width="130px" show-overflow-tooltip />
        <el-table-column label="合同金额(万元)" prop="contractAmt" width="120px" :formatter="row => numToStr(row.contractAmt,'',true)" show-overflow-tooltip />
        <el-table-column label="合同日期" prop="contractDate" width="100px" />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <asset-link :asset-no="scope.row.assetNo" :asset-type="scope.row.assetType">资产详情</asset-link>
          </template>
        </el-table-column>
        <div slot="append">
          <NoData v-if="!list.length" title="暂时没有资产" />
        </div>
      </el-table>
      <Pagination
        v-if="list.length && !loading"
        :current-change="onCurrentChange"
        :current-page="pageNum"
        :page-size="pageSize"
        :size-change="onSizeChange"
        :total="total"
      />
    </div>
  </el-drawer>
</template>

<script>
import tableMixin from '@/utils/tableMixin'
import { numToStr } from '@/utils/validator'
import { PlatformApi } from '@/api'

const assetTypeMap = {
  'PAY': '应付',
  'RECEIVE': '应收'
}
export default {
  mixins: [tableMixin],
  props: {},
  data() {
    return {
      visible: false,
      loading: false,
      corpNo: '',
      corpRole: '',
      assetType: '',
      list: [],
      assetTypeMap
    }
  },
  watch: {
    corpNo(val, oldVal) {
      if (val !== oldVal && val !== '') {
        this.onSearch()
      }
    }
  },
  methods: {
    numToStr,
    open(corpNo, corpRole, assetType) {
      this.corpNo = corpNo
      this.corpRole = corpRole
      this.assetType = assetType
      this.visible = true
    },
    close() {
      this.visible = false
    },
    getData() {
      // assetType未传就查全部
      const params = {
        assetType: this.assetType || 'All'
      }
      // 链属企业传chainCorpNo，核心企业传coreCorpNo，查询条件：企业编号+资产类型
      if (this.corpRole === 'CHAIN') {
        params.chainCorpNo = this.corpNo
      } else if (this.corpRole === 'CORE') {
        params.coreCorpNo = this.corpNo
      }
      PlatformApi.queryAssetList({
        ...params,
        assetStatus: 'VALID',
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  /deep/ a:hover {
    color: $theme;
  }
}
</style>
