<template>
  <el-drawer
    class="com-asset-info-dialog"
    :visible.sync="visible"
    title="资产详情"
    size="1000px"
    :append-to-body="true"
  >
    <div v-loading="loading" class="asset-info-wrap">
      <AssetShow :asset-info="assetInfo" :asset-type="assetType" />
    </div>
  </el-drawer>
</template>

<script>
import AssetShow from '@/views/common/assets-register/examine/AssetShow'
import { EnterprisApi } from '@/api'

export default {
  name: 'CorpInfoDialog',
  components: {
    AssetShow
  },
  props: {
    assetNo: {
      type: String,
      default: ''
    },
    assetType: {
      type: String,
      default: 'PAY'
    }
  },
  data () {
    return {
      visible: false,
      loading: false,
      assetInfo: {
        attaches: []
      },
    }
  },

  methods: {
    open(assetNo = '', assetType = '') {
      this.assetNo = assetNo
      this.transNo = assetType
      this.getData()
      this.visible = true
    },
    close() {
      this.visible = false
    },
    getData() {
      this.loading = true
      EnterprisApi.queryAssetDetail({ assetNo: this.assetNo }).then(res => {
        this.assetInfo = { ...res.data }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" >
.com-corp-info-dialog {
  padding-left: 30px;
  .asset-info-wrap {
    padding-left: 30px;
    overflow-y: auto;
    height: calc(100vh - 70px);
    border-bottom: 12px solid blue;
  }
}
</style>
