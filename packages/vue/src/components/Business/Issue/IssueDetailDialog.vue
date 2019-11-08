<template>
  <div>
    <el-dialog
      title="签发详情"
      :visible.sync="digDetail"
      :before-close="close"
      :append-to-body="true"
      width="520px"
    >
      <div v-loading="loading" class="dialog-wrap">
        <p>
          <label>应{{ assetType?'收':'付' }}资产</label>
          <asset-link :asset-no="sign.asset.assetNo" :asset-type="assetTypeConst">{{ sign.asset&&sign.asset.assetName }}</asset-link>
        </p>
        <p>
          <label>企业名称</label>
          <span>{{ assetType? sign.fromCorpName : sign.toCorpName }}</span>
        </p>
        <p>
          <label>资产方签发</label>
          <span>{{ TOKEN__NAME }} ({{ sign.quota&&sign.quota.issueCorpName }})</span>
        </p>
        <p>
          <label>授信有效期</label>
          <span>{{ sign.quota&&sign.quota.effectiveDate }} ~ {{ sign.quota&&sign.quota.expireDate }}</span>
        </p>
        <p>
          <label>签发数量</label>
          <span>{{ sign.amount }}个 折合人民币{{ numToStr(sign.amount) }}</span>
        </p>
        <p>
          <label>签发有效期至</label>
          <span>{{ sign.expireDate }}</span>
        </p>
        <p>
          <label>合约：</label>
          <span class="primary" @click="openPdf()">付款承诺函+{{ TOKEN__NAME }}合约</span>
        </p>
      </div>
    </el-dialog>
    <!-- 创建合约 -->
    <PDF ref="pdfDialog">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <Download type="primary" direct :url="contractUrl||''">
          <el-button class="next-button" type="primary">下载合约</el-button>
        </Download>
      </template>
    </PDF>
  </div>
</template>
<script>
import { COLLECT_ASSETS } from '@/utils/constant/assets'
import { numToStr } from '@/utils/validator'
import { CommonApi } from '@/api/index'

export default {
  name: 'IssueDetailDialog',
  props: {},
  data() {
    return {
      loading: false,
      digDetail: false,
      sign: {
        asset: {
          assetNo: '',
          assetName: ''
        }
      },
      assetType: false,
      assetTypeConst: '',
      contractUrl: ''
    }
  },
  methods: {
    numToStr,
    open(data, asset) {
      console.log(data, asset)
      this.digDetail = true
      this.sign = data
      this.assetType = asset === COLLECT_ASSETS // 不传为支付PAY
      this.assetTypeConst = asset
    },
    openPdf() {
      this.loading = true
      CommonApi.previewIssueTokenContract({
        transNo: this.sign.transNo,
      }).then(res => {
        if (res.data) {
          this.contractUrl = res.data
          this.$refs['pdfDialog'].open(res.data, `查看付款承诺函+${this.TOKEN__NAME}合约`)
        } else {
          this.$message.error('预览地址有误')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    close() {
      this.digDetail = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrap {
  .primary {
    color: $theme;
    cursor: pointer;
  }
  font-size: 14px;
  > p {
    padding: 5px 0;
  }
  label {
    display: inline-block;
    width: 110px;
    color: $labelColor;
    font-weight: 400 !important;
    float: left;
  }
  span {
    color: $titleColor;
    display: inline-block;
    width: 330px;
  }
}
</style>
