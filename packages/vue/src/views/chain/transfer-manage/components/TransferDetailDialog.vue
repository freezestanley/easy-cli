<template>
  <el-dialog
    title="转让详情"
    :visible="visible"
    :before-close="handleClose"
    :append-to-body="true"
    width="520px"
  >
    <div class="body">
      <el-form ref="form" label-width="100px" label-position="left">
        <el-form-item :label="label1" class="corp-name">
          <asset-link class="asset-widht" :asset-no="originInfo.assetNo" :asset-type="assetType">{{ originInfo.assetsName }}</asset-link>
        </el-form-item>
        <el-form-item label="企业名称">
          {{ originInfo.corpName }}
        </el-form-item>
        <el-form-item :label="TOKEN__NAME">
          {{ `${TOKEN__NAME}（${originInfo.tokenName}）` }}
        </el-form-item>
        <el-form-item label="转让数量">
          {{ numToStr(originInfo.tokenNum,'个') }}
        </el-form-item>
        <el-form-item label="签发有效期">
          {{ originInfo.time }}
        </el-form-item>
        <el-form-item label="合约" class="corp-name">
          <Download v-if="originInfo.contractUrl" type="primary" direct :url="originInfo.contractUrl">
            <el-button class="next-button" type="text">{{ contractName }}</el-button>
          </Download>
          <span v-else>-</span>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { numToStr } from '@/utils/validator'
export default {
  components: {
  },
  data() {
    return {
      contractName: `${this.TOKEN__NAME}合约`,
      visible: false,
      label1: '',
      originInfo: {
        assetsName: '',
        corpName: '',
        tokenNum: 0,
        tokenName: '',
        time: ''
      },
      assetType: ''
    }
  },
  methods: {
    numToStr,
    open(data, type) {
      this.visible = true
      this.label1 = type === 'PAY' ? '应付资产' : '应收资产' // 默认是应付
      this.assetType = type
      this.originInfo.assetNo = data.asset.assetNo
      this.originInfo.assetsName = data.asset.assetName
      this.originInfo.corpName = data.toCorpName
      this.originInfo.tokenNum = data.amount
      this.originInfo.tokenName = data.quota.issueCorpName
      this.originInfo.time = data.expireDate ? data.expireDate : '-'
      this.originInfo.contractUrl = data.contractUrl ? data.contractUrl : ''
    },
    handleClose() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.body{
  padding: 24px;
}
.corp-name
{
  color: $theme
}
/deep/.el-dialog__body{
  padding-top: 12px;
}
.asset-widht{
  white-space:normal;
}
</style>
