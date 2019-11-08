<template>
  <div v-loading="loading" class="asset-wrap">
    <div class="info">
      <p>
        <strong>基本信息</strong>
      </p>
      <div class="item">
        <p>
          <label>资产名称</label>
          <span>{{ assestInfo.assetName }}</span>
        </p>
        <p v-if="curType === PAY_ASSETS">
          <label>应付金额</label>
          <span>{{ assestInfo.realAmt | formatWan }}万</span>
        </p>
        <p v-else>
          <label>应收金额</label>
          <span>{{ assestInfo.realAmt | formatWan }}万</span>
        </p>
        <p v-if="curType === PAY_ASSETS">
          <label>供应商名称</label>
          <span>{{ assestInfo.receiveCorpName }}</span>
        </p>
        <p v-else>
          <label>客户名称</label>
          <span>{{ assestInfo.payCorpName }}</span>
        </p>
      </div>
      <div class="item">
        <p v-if="curType === PAY_ASSETS">
          <label>应付到期日</label>
          <span>{{ assestInfo.assetExpireDate }}</span>
        </p>
        <p v-else>
          <label>应收到期日</label>
          <span>{{ assestInfo.assetExpireDate }}</span>
        </p>
        <p>
          <label>合同编号</label>
          <span>{{ assestInfo.contractNo }}</span>
        </p>
        <p>
          <label>合同金额</label>
          <span>{{ assestInfo.contractAmt | formatWan }} 万</span>
        </p>
      </div>
      <div class="item">
        <p>
          <label>合同日期</label>
          <span>{{ assestInfo.contractDate }}</span>
        </p>
        <p>
          <label>备注</label>
          <span>{{ assestInfo.remark }}</span>
        </p>
        <p />
      </div>
    </div>
    <div class="info">
      <p>
        <strong>基础合同</strong>
      </p>
      <contract v-for="(item,index) in contractList" :key="item.assetAttachNo" :param="item">
        <p class="subTitle">合同{{ index+1 }}</p>
      </contract>
    </div>
    <div class="info">
      <p>
        <strong>发票</strong>
      </p>
      <div><label>总金额</label> <strong> {{ assestInfo.invoiceTotalAmount | formatWan }} 万</strong></div>
      <invoice v-for="(item,index) in invoiceList" :key="item.assetAttachNo" :param="item">
        <p class="subTitle">发票{{ index+1 }}</p>
      </invoice>
    </div>
    <div class="info">
      <p>
        <strong>结算单</strong>
      </p>
      <settlement v-for="(item,index) in settlementList" :key="item.assetAttachNo" :param="item">
        <p class="subTitle">结算{{ index+1 }}</p>
      </settlement>
    </div>
    <div class="info">
      <p>
        <strong>其他</strong>
      </p>
      <other v-for="item in otherList" :key="item.assetAttachNo" :param="item" />
    </div>
  </div>
</template>
<script>
import { PAY_ASSETS } from '@/utils/constant/assets'
import { EnterprisApi } from '@/api'
import Contract from './Contract'
import Invoice from './Invoice'
import Settlement from './Settlement'
import Other from './Other'
export default {
  name: 'Examine',
  components: {
    Contract,
    Invoice,
    Settlement,
    Other
  },
  data() {
    return {
      PAY_ASSETS,
      assestInfo: {},
      contractList: [],
      invoiceList: [],
      settlementList: [],
      otherList: [],
      curType: PAY_ASSETS,
      loading: false
    }
  },
  created() {
    const { assetNo, assetType } = this.$router.history.current.query
    if (assetNo) {
      this.getData(assetNo)
      this.curType = assetType
    }
  },
  methods: {
    getData: async function(assetNo) {
      this.loading = true
      const { data } = await EnterprisApi.queryAssetDetail({ assetNo: assetNo })
      if (data) {
        this.assestInfo = { ...data }
        data.attaches.map(item => {
          switch (item.assetAttachType) {
            case 'CONTRACT':
              this.contractList.push(item)
              break
            case 'INVOICE':
              this.invoiceList.push(item)
              break
            case 'SETTLEMENT':
              this.settlementList.push(item)
              break
            case 'OTHER':
              this.otherList.push(item)
              break
          }
        })
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss">
.asset-wrap {
  .info {
    font-size: 14px;
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e0e6ed;
    .subTitle {
      font-size: 14px;
    }
    h4 {
      color: $titleColor;
      font-size: 16px;
    }
    p {
      > strong {
        font-size: 16px;
      }
    }
    .block {
      margin-bottom: 20px;
    }
    .item {
      display: flex;
      width: 100%;
      // > p:first-child {
      //   label {
      //     width: 80px;
      //   }
      // }
      > p {
        margin: 8px;
        flex: 1;

        label {
          display: inline-block;
          vertical-align: top;
          color: $info;
          width: 80px;
        }
        > span {
          display: inline-block;
          color: $titleColor;
          width: 65%;
          > img {
            width: 150px;
          }
        }
        .download {
          display: block;
          min-width: 220px;
          // width: 33%;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 30px;
          position: relative;
          > a {
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
