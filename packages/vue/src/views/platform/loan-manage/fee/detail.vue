<template>
  <div v-loading="loading" class="page-finance-fee-detail">
    <div class="info-items">
      <div class="title fs16">
        融资申请信息
      </div>
      <div class="flex flex-wrap">
        <div class="item-entrys">
          <label>融资方</label>
          <span>{{ feeDetail.corpName }}</span>
        </div>
        <div class="item-entrys">
          <label>{{ TOKEN__NAME }}所属</label>
          <span>{{ feeDetail.tokenName }}</span>
        </div>
        <div class="item-entrys">
          <label>融资到期日</label>
          <span>{{ feeDetail.dueDate }}</span>
        </div>
        <div class="item-entrys">
          <label>申请融资{{ TOKEN__NAME }}数量</label>
          <span>{{ feeDetail.tokenCount }}个 折合人民币 {{ thousands(feeDetail.tokenCount / 10000) }}万元</span>
        </div>
      </div>
    </div>
    <div class="info-items">
      <div class="title fs16">
        融资产品信息
      </div>
      <div class="flex flex-wrap">
        <div class="item-entrys">
          <label>资金方</label>
          <span>{{ feeDetail.fundCorpName }}</span>
        </div>
        <div class="item-entrys">
          <label>融资产品</label>
          <span>{{ feeDetail.productName }}</span>
        </div>
        <div class="item-entrys">
          <label>融资额度</label>
          <span>{{ thousands(feeDetail.loanMinAmount / 10000) }}万元 ~ {{ thousands(feeDetail.loanMaxAmount / 10000) }}万元</span>
        </div>
        <div class="item-entrys">
          <label>融资利率</label>
          <span>{{ feeDetail.loanInterestRate }}%</span>
        </div>
        <div class="item-entrys" style="width: 500px;">
          <label>融资期限</label>
          <span>{{ feeDetail.loanStartTime }} ~ {{ feeDetail.loanEndTime }}</span>
        </div>
      </div>
    </div>
    <div class="info-items">
      <div class="title fs16">
        融资方收款账号
      </div>
      <div class="flex flex-wrap">
        <div class="item-entrys">
          <label>银行</label>
          <span>{{ feeDetail.payeeBankName }}</span>
        </div>
        <div class="item-entrys">
          <label>银行账号</label>
          <span>{{ feeDetail.payeeBankAccountNo }}</span>
        </div>
      </div>
    </div>
    <div class="info-items bob">
      <div class="title fs16">
        融资方联系人信息
      </div>
      <div class="flex flex-wrap">
        <div class="item-entrys">
          <label>联系人</label>
          <span>{{ feeDetail.contactsUser }}</span>
        </div>
        <div class="item-entrys">
          <label>联系电话</label>
          <span>{{ feeDetail.contactsTel }}</span>
        </div>
      </div>
    </div>
    <div class="info-items">
      <div class="title fs16">
        编辑抽成
      </div>
      <el-form ref="persentForm" label-width="120px">
        <!-- <label class="title">技术服务费</label>
        <el-form-item label="抽成比例(线上)">
          {{ feeDetail.technologyServiceRate }} % 折合人民币 {{ technologyServiceAmount }}元
        </el-form-item>
        <label class="title">金融服务费</label>
        <el-form-item label="抽成比例(线上)" prop="onlinePercentageRate">
          <el-input-number
            v-model="onlinePercentageRate"
            class="edit-input"
            :controls="false"
            :precision="2"
            :step="0.1"
            :min="0"
            :max="100"
            :disabled="feeDetail.payMethod === PAY_METHOD.OFF_LINE || feeDetail.payMethod === PAY_METHOD.NONE || feeDetail.loanPercentageStatus === PAY_STATUS.KEY_OFFLINE_UNPAID"
            placeholder="请输入数字（保留2位小数）"
          >
        <div slot="suffix" style="color:#000">%</div>
          </el-input-number>%
          <div class="tips"> 折合人民币 {{ persentOnline }} 元 </div>
        </el-form-item> -->

        <el-form-item label="抽成比例" prop="offlinePercentageRate">
          <el-input-number
            v-model="offlinePercentageRate"
            class="edit-input"
            :controls="false"
            :precision="2"
            :step="0.1"
            :min="0"
            :max="100"
            :disabled="feeDetail.payMethod === PAY_METHOD.ON_LINE || feeDetail.payMethod === PAY_METHOD.NONE"
            placeholder="请输入数字（保留2位小数）"
          >
            <!-- @blur="cc($event, 'offlinePercentageRate')" -->
            <div slot="suffix" style="color:#000">%</div>
          </el-input-number>%
          <div class="tips"> 折合人民币 {{ persentOffline }} 元 </div>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-cacel" style="width: 100px" @click="cancel">取消</el-button>
          <el-button type="primary" class="btn-submit" style="width: 200px" @click="submit"> 确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { PlatformApi } from '@/api'
import { thousands } from '@/utils'
import { PAY_STATUS, PAY_METHOD } from '@/utils/constant/loan'

export default {
  name: 'FinanceFeeDetail', // 融资抽成详情
  data () {
    return {
      PAY_STATUS,
      PAY_METHOD,
      loading: false,
      transNo: '',
      onlinePercentageRate: '',
      offlinePercentageRate: '',
      feeDetail: {
        corpName: '哈哈', // 融资方
        loanInterestRate: '', // 融资利率
        loanStartTime: '', // 融资期限(开始时间)
        loanEndTime: '', // 融资到期日 (结束时间)
        loanMaxAmount: '', // 融资最大额度(万元) ,
        loanMinAmount: '', // 融资最小额度(万元) ,
        fundCorpName: '', // 资金方
        productName: '', // 产品名称
        tokenCount: '', // 融资个数
        tokenName: '', // TOKEN__NAME名称
        payeeBankAccountNo: '', // 融资方收款对公账号编号
        payeeBankName: '', // 融资方收款银行名称
        contactsUser: '', // 融资方负责人名称
        contactsTel: '', // 融资方负责人联系电话
      }
    }
  },
  computed: {
    technologyServiceAmount() {
      const num = 1 * +this.feeDetail.technologyServiceRate * 1000000 // 避免出现 小数溢出
      return Number.parseFloat((num * this.feeDetail.tokenCount / 100000000).toFixed(2))
    },
    persentOnline() {
      if (!this.onlinePercentageRate) return 0
      const num = 1 * +this.onlinePercentageRate * 1000000 // 避免出现 小数溢出
      return Number.parseFloat((num * this.feeDetail.tokenCount / 100000000).toFixed(2))
    },
    persentOffline() {
      if (!this.offlinePercentageRate) return 0
      const num = 1 * +this.offlinePercentageRate * 1000000 // 避免出现 小数溢出
      return Number.parseFloat((num * this.feeDetail.tokenCount / 100000000).toFixed(2))
    },
  },
  mounted () {
    this.transNo = this.$route.params.id
    this.getData(this.$route.params.id)
  },
  methods: {
    thousands,
    getData(id) {
      this.loading = true
      PlatformApi.getLoanTrans({
        transNo: this.transNo || id
      }).then(res => {
        this.feeDetail = res.data
        this.onlinePercentageRate = res.data.onlinePercentageRate
        this.offlinePercentageRate = res.data.offlinePercentageRate
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.error(err)
      })
    },
    submit() {
      // if (this.onlinePercentageRate && !isRightNum(this.onlinePercentageRate)) {
      //   this.$message.error('请输入正确的抽成比例')
      //   this.onlinePercentageRate = parseFloat(this.onlinePercentageRate)
      //   return
      // }
      // if (this.offlinePercentageRate && !isRightNum(this.offlinePercentageRate)) {
      //   this.$message.error('请输入正确的抽成比例')
      //   this.offlinePercentageRate = parseFloat(this.offlinePercentageRate)
      //   return
      // }
      this.$securityCode().then(securityCode => {
        PlatformApi.platformUpdateLoanPercentage({
          onlinePercentageRate: this.onlinePercentageRate,
          offlinePercentageRate: this.offlinePercentageRate,
          transNo: this.transNo,
          securityCode
        }).then(res => {
          this.$message.success('修改成功')
          this.cancel()
        })
      })
    },
    cancel() {
      this.$router.back()
    },
    cc(e, name) {
      // const num = e.target.value
      // if (!isRightNum(num)) {
      //   this.$message.error('请输入正确的抽成比例')
      //   this[name] = 0
      //   return
      // } else {
      //   this[name] = Number(num).toFixed(2)
      // }
    }
  }
}
</script>

<style lang="scss">
.page-finance-fee-detail {
  .info-items {
    .title {
      color: $titleColor;
      line-height: 40px;
      font-weight: 500;
    }
    .flex-wrap {
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .item-entrys {
      width: 33%;
      display: inline-flex;
      line-height: 30px;
      font-size: 14px;
      span {
        flex: 1;
        color: $titleColor;
        padding-left: 20px;
      }
    }
    label {
      width: 130px;
      color: $labelColor;
      font-size: 14px;
      font-weight: 400;
    }
    .tips {
      color: $labelColor;
      font-size: 12px;
      font-weight: 400;
      text-indent: 6px;
      line-height: 26px;
    }
    .edit-input {
      width: 500px;
      margin-left: 5px;
      span {
        padding-left: 0;
        width: 20px;
        padding-top: 2px;
      }
      .el-input__inner {
        text-align: left;
      }
    }
  }
  .bob {
    border-bottom: 1px solid rgb(224,230,237);
  }
  .last-item {
    margin-top: 30px;
  }
}
</style>
