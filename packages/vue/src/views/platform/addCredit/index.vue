<template>
  <div>
    <div class="corpName">{{ corpName }}</div>

    <quarter-and-year ref="quarterAndYear" :values="quarterAndYearData" class="marb-20" />

    <div class="block-title">资产负债（单位：万元）</div>
    <input-item ref="receiveTotal" :title="config.receiveTotal.title" :values="config.receiveTotal.values" class="marb-20" />
    <input-item ref="assetTotal" :title="config.assetTotal.title" :values="config.assetTotal.values" class="marb-20" />
    <input-item ref="payTotal" :title="config.payTotal.title" :values="config.payTotal.values" class="marb-20" />
    <input-item ref="debtTotal" :title="config.debtTotal.title" :values="config.debtTotal.values" class="marb-20" />
    <input-item ref="ownerBenefit" :title="config.ownerBenefit.title" :values="config.ownerBenefit.values" class="marb-20" />

    <div class="block-title">利润（单位：万元）</div>
    <input-item ref="totalIncome" :title="config.totalIncome.title" :values="config.totalIncome.values" class="marb-20" />
    <input-item ref="totalCost" :title="config.totalCost.title" :values="config.totalCost.values" class="marb-20" />
    <input-item ref="netProfit" :title="config.netProfit.title" :values="config.netProfit.values" class="marb-20" />

    <div class="block-title">现金流量（单位：万元）</div>
    <input-item ref="cashFlow" :title="config.cashFlow.title" :values="config.cashFlow.values" class="marb-20" />

    <div class="block-title">主要财务指标</div>
    <input-item ref="debtAssetRate" :title="config.debtAssetRate.title" :unit="config.debtAssetRate.unit" :values="config.debtAssetRate.values" class="marb-20" />
    <input-item ref="receiveRate" :title="config.receiveRate.title" :unit="config.receiveRate.unit" :values="config.receiveRate.values" class="marb-20" />
    <input-item ref="stockRate" :title="config.stockRate.title" :unit="config.stockRate.unit" :values="config.stockRate.values" class="marb-20" />
    <input-item ref="totalAssetDay" :title="config.totalAssetDay.title" :unit="config.totalAssetDay.unit" :values="config.totalAssetDay.values" class="marb-20" />
    <input-item ref="profitLoopInc" :title="config.profitLoopInc.title" :unit="config.profitLoopInc.unit" :values="config.profitLoopInc.values" class="marb-20" />
    <input-item ref="interestRate" :title="config.interestRate.title" :unit="config.interestRate.unit" :values="config.interestRate.values" class="marb-20" />

    <div class="block-title">其他</div>
    <input-item ref="taxesCertificate" :title="config.taxesCertificate.title" :unit="config.taxesCertificate.unit" :values="config.taxesCertificate.values" :input-type="'file'" class="marb-20" />
    <div class="item-block flex-start marb-20">
      <div class="item-name-width">
        <div class="item-name">上传验资报告</div>
      </div>
      <div class="items">
        <file-upload :url-arr.sync="checkAssetReport" :limit="1" />
      </div>
    </div>
    <div class="item-block flex-start marb-20">
      <div class="item-name-width">
        <div class="item-name">上传公司章程报告</div>
      </div>
      <div class="items">
        <file-upload :url-arr.sync="corpReport" :limit="1" />
      </div>
    </div>

    <div class="item-block marb-20">
      <div class="item-name-width">
        <div class="item-name">公司简介</div>
      </div>
      <div class="items">
        <el-input v-model="corpIntroduction" type="textarea" resize="none" :rows="7" placeholder="请输入" :maxlength="500" show-word-limit />
      </div>
    </div>

    <div class="item-block">
      <div class="item-name-width" />
      <div class="items">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import QuarterAndYear from './components/QuarterAndYear'
import InputItem from './components/InputItem'
import FileUpload from '@/components/FileUpload/index'
import { PlatformApi } from '@/api/index'

export default {
  components: {
    QuarterAndYear,
    InputItem,
    FileUpload,
  },
  props: {
    corpNo: {
      type: String,
      default: ''
    },
    corpName: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      config: {
        receiveTotal: {
          title: ['应收总计(应收票据、账款)'],
          values: ['', '', '', '']
        },
        assetTotal: {
          title: ['资产总计'],
          values: ['', '', '', '']
        },
        payTotal: {
          title: ['应付总计(应付票据、账款)'],
          values: ['', '', '', '']
        },
        debtTotal: {
          title: ['负债总计'],
          values: ['', '', '', '']
        },
        ownerBenefit: {
          title: ['所有者权益'],
          values: ['', '', '', '']
        },
        totalIncome: {
          title: ['总收入'],
          values: ['', '', '', '']
        },
        totalCost: {
          title: ['总成本'],
          values: ['', '', '', '']
        },
        netProfit: {
          title: ['净利润'],
          values: ['', '', '', '']
        },
        cashFlow: {
          title: ['经营活动产生的净', '现金流'],
          values: ['', '', '', '']
        },
        debtAssetRate: {
          title: ['资产负债率'],
          unit: '%',
          values: ['', '', '', '']
        },
        receiveRate: {
          title: ['应收账款周转率'],
          unit: '%',
          values: ['', '', '', '']
        },
        stockRate: {
          title: ['存货周转率'],
          unit: '%',
          values: ['', '', '', '']
        },
        totalAssetDay: {
          title: ['总资产周转天数'],
          unit: '天',
          values: ['', '', '', '']
        },
        profitLoopInc: {
          title: ['净利润环比增长'],
          unit: '%',
          values: ['', '', '', '']
        },
        interestRate: {
          title: ['净利率'],
          unit: '%',
          values: ['', '', '', '']
        },
        taxesCertificate: {
          title: ['上传年度纳税证明'],
          unit: '%',
          values: ['', '', '', '']
        }
      },
      checkAssetReport: [],
      corpReport: [],
      corpIntroduction: '',
      quarterAndYearData: [
        {
          year: '',
          quarter: ''
        },
        {
          year: '',
          quarter: ''
        },
        {
          year: '',
          quarter: ''
        },
        {
          year: '',
          quarter: ''
        }
      ],
      storeId: []
    }
  },
  created() {
    if (this.model === 'edit') {
      PlatformApi.queryCorpIncTrust({ corpNo: this.corpNo }).then(({ data, resultCode, resultMessage }) => {
        if (data) {
          this.evaluate(data)
          console.log(data)
        } else {
          this.$message.error(resultMessage)
          this.$router.go(-1)
        }
      })
    }
  },
  methods: {
    evaluate(data) {
      this.corpReport = data.corpReport ? [data.corpReport] : []
      this.corpIntroduction = data.corpIntroduction
      this.checkAssetReport = data.respList && data.respList[0] && data.respList[0].checkAssetReport ? [data.respList[0].checkAssetReport] : []

      const keys = []
      Object.keys(this.config).forEach((item) => {
        if (this.config.hasOwnProperty(item)) {
          keys.push(item)
        }
      })

      keys.forEach((keyName) => {
        data.respList.forEach((item, index) => {
          this.config[keyName].values.splice(index, 1, item[keyName])
        })
      })

      this.storeId = [data.respList[0].id, data.respList[1].id, data.respList[2].id, data.respList[3].id]
    },
    handleSubmit() {
      this.$securityCode().then(code => {
        this.setCode(code)
      })
    },
    setCode(code) {
      const baseData = this.getBaseData()
      const data = {
        corpNo: this.corpNo,
        corpReport: this.corpReport.toString(),
        corpIntroduction: this.corpIntroduction,
        reqList: baseData,
        securityCode: code
      }
      console.log(data)
      if (this.model === 'add') {
        PlatformApi.addCorpIncTrust(data).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$router.go(-1)
        }).finally(() => {
          this.codeDialogVisible = false
        })
      } else {
        this.storeId.forEach((item, index) => {
          data.reqList[index].id = item
        })
        PlatformApi.updateCorpIncTrust(data).then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.go(-1)
        }).finally(() => {
          this.codeDialogVisible = false
        })
      }
    },
    getBaseData() {
      const configData = this.getConfigData()
      configData.checkAssetReport = [this.checkAssetReport.toString(), this.checkAssetReport.toString(), this.checkAssetReport.toString(), this.checkAssetReport.toString()]

      const keys = []
      Object.keys(configData).forEach((item) => {
        if (configData.hasOwnProperty(item)) {
          keys.push(item)
        }
      })
      const result = []

      for (let i = 0; i < 4; i++) {
        const temp = {}
        keys.forEach(item => {
          temp[item] = configData[item][i]
        })
        result.push(temp)
      }

      const quarterAndYearData = this.$refs.quarterAndYear.getData()
      quarterAndYearData.forEach((item, index) => {
        result[index].yearTime = item.year
        result[index].quarterTime = item.quarter
      })

      return result
    },
    getConfigData() {
      const keys = []
      Object.keys(this.config).forEach((item) => {
        if (this.config.hasOwnProperty(item)) {
          keys.push(item)
        }
      })
      const data = {}
      keys.forEach(item => {
        data[item] = this.$refs[item].getData()
      })
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.corpName {
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 16px;
}
.block-title {
  height: 44px;
  font-size: 14px;
  line-height: 44px;
  background: $theme-light;
  padding: 0 18px;
  margin-bottom: 20px;
}
.marb-20 {
  margin-bottom: 20px;
}
.item-block {
  display: flex;
  align-items: center;
}
.item-name-width {
  width: 137px;
  margin-right: 12px;
}
.item-name {
  height:21px;
  font-size:14px;
  // &:not(:last-child){
  //   margin-bottom: 4px;
  // }
}
.items {
  flex: 1;
  display: flex;
  justify-content: space-between;
  // .item-class {
  //   &:not(:last-child) {
  //     margin-right: 30px;
  //   }
  // }
  /deep/ .el-input__icon {
    width: 40px;
  }
  /deep/ .el-input {
    width: 226px;
  }
}
.flex-start {
  align-items: flex-start;
}
</style>
