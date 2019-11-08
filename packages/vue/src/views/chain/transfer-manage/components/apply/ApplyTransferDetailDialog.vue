<template>
  <el-dialog
    title="申请详情"
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
        <el-form-item :label="label2">
          {{ numToStr(originInfo.tokenNum,'个') }}
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
      visible: false,
      originInfo: {
        assetsName: '',
        corpName: '',
        tokenNum: 0,
      },
      label1: '',
      label2: '',
      assetType: ''
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    numToStr,
    open(data, type,) {
      this.visible = true
      this.label1 = type === 'PAY' ? '应付资产' : '应收资产' // 默认是应付
      this.label2 = '申请转让数量'// type === 'PAY' ? '转让数量' : '申请转让数量' // 默认是应付'
      this.assetType = type
      this.originInfo.assetNo = data.asset.assetNo
      this.originInfo.assetsName = data.asset.assetName
      this.originInfo.corpName = data.fromCorpName
      this.originInfo.tokenNum = data.applyAmount
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
