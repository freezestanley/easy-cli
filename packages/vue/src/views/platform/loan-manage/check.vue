<template>
  <div v-loading="loading" class="page-finance-fee-detail">
    <div class="info-items">
      <div class="title fs16">
        融资申请信息
      </div>
      <div class="flex flex-wrap">
        <div class="item-entrys">
          <label>融资方</label>
          <span>{{ financeInfo.corpName }}</span>
        </div>
        <div class="item-entrys">
          <label>{{ TOKEN__NAME }}所属</label>
          <span>{{ financeInfo.fundCorpName }}</span>
        </div>
        <div class="item-entrys">
          <label>融资到期日</label>
          <span>{{ financeInfo.dueDate }}</span>
        </div>
        <div class="item-entrys">
          <label>申请融资{{ TOKEN__NAME }}数量</label>
          <span>{{ thousands(financeInfo.tokenCount) }}个 折合人民币 {{ thousands(financeInfo.tokenCount) }}元</span>
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
          <span>{{ financeInfo.fundCorpName }}</span>
        </div>
        <div class="item-entrys">
          <label>融资产品</label>
          <span>{{ financeInfo.productName }}</span>
        </div>
        <div class="item-entrys">
          <label>融资额度</label>
          <span>{{ thousands(financeInfo.loanMinAmount/10000) }}万元 ~ {{ thousands(financeInfo.loanMaxAmount/10000) }}万元</span>
        </div>
        <div class="item-entrys">
          <label>融资利率</label>
          <span>{{ financeInfo.loanInterestRate }}%</span>
        </div>
        <div class="item-entrys">
          <label>融资期限</label>
          <span>{{ financeInfo.loanStartTime }} ~ {{ financeInfo.loanEndTime }}</span>
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
          <span>{{ financeInfo.payeeBankName }}</span>
        </div>
        <div class="item-entrys">
          <label>银行账号</label>
          <span>{{ financeInfo.payeeBankAccountNo }}</span>
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
          <span>{{ financeInfo.contactsUser }}</span>
        </div>
        <div class="item-entrys">
          <label>联系电话</label>
          <span>{{ financeInfo.contactsTel }}</span>
        </div>
      </div>
    </div>
    <div class="info-items" style="margin-top:32px">
      <div class="title fs16">
        设置抽成
      </div>
      <div class="flex ">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form-class">
          <el-form-item label="审核结果">
            <el-radio-group v-model="form.approve">
              <el-radio :label="true">审核通过</el-radio>
              <el-radio :label="false">审核驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="form.approve === true">
            <!-- <el-tooltip class="item" effect="dark" placement="top-end">
              <div slot="content" class="code-help">
                <span>技术服务费是指平台方就融资方从</span>
                <br>
                <span>众企安链平台获得的每笔融资款收</span>
                <br>
                <span>取的一定比例服务费。</span>
              </div>
              <span>
                技术服务费 <i class="el-icon-question success" />
              </span>
            </el-tooltip>
            <el-form-item label="抽成比例(线上)" prop="technologyServiceRate">
              <el-input-number
                v-model="form.technologyServiceRate"
                class="edit-input"
                :controls="false"
                :precision="2"
                :step="0.1"
                :min="0"
                :max="100"
                placeholder="请输入数字(保留2位小数)"
              >
                <div slot="suffix" style="color:#000">%</div>
              </el-input-number>% &nbsp;
              <div class="tips"> 折合人民币 {{ technologyServiceAmount }} 元 </div>
            </el-form-item>
            <el-tooltip class="item" effect="dark" placement="top-end">
              <div slot="content" class="code-help">
                <span>金融服务费是指平台方就融资方从众企安</span>
                <br>
                <span>链平台的资金方处获得的每笔融资款，有</span>
                <br>
                <span>权要求资金方在线上交易时为平台方从融</span>
                <br>
                <span>资款中代扣一定比例的服务费或在线下交</span>
                <br>
                <span>易时要求融资方在获得资金方的融资款后</span>
                <br>
                <span>向平台方支付一定比例的服务费。</span>
              </div>
              <span>
                金融服务费 <i class="el-icon-question success" />
              </span>
            </el-tooltip>
            <el-form-item label="抽成比例(线上)" prop="onlinePercentageRate">
              <el-input-number
                v-model.number="form.onlinePercentageRate"
                class="edit-input"
                :controls="false"
                :precision="2"
                :step="0.1"
                :min="0"
                :max="100"
                placeholder="请输入数字(保留2位小数)"
              >
                <div slot="suffix" style="color:#000">%</div>
              </el-input-number>% &nbsp;
              <div class="tips"> 折合人民币 {{ onlinePercentageAmount }} 元 </div>
            </el-form-item> -->
            <el-form-item label="抽成比例" prop="offlinePercentageRate">
              <el-input-number
                v-model.number="form.offlinePercentageRate"
                class="edit-input"
                :controls="false"
                :precision="2"
                :step="0.1"
                :min="0"
                :max="100"
                :disabled="!financeInfo.isFirstOperator"
                placeholder="请输入数字(保留2位小数)"
              >
                <div slot="suffix" style="color:#000">%</div>
              </el-input-number>% &nbsp;
              <div class="tips"> 折合人民币 {{ offlinePercentageAmount }} 元 </div>
            </el-form-item>
          </template>
          <el-form-item v-if="form.approve === false" label="驳回原因" prop="reason">
            <el-input
              v-model="form.reason"
              type="textarea"
              style="width: 500px"
              :rows="4"
              :maxlength="100"
              :show-word-limit="true"
              placeholder="请输入驳回原因"
              resize="none"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="info-items">
      <div class="flex last-item">
        <el-button class="btn-cacel" style="width: 120px" @click="cancel">取消</el-button>
        <el-button type="primary" class="btn-submit" style="width: 240px" @click.native.prevent="submit"> 确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { PlatformApi } from '@/api'
import tableMixin from '@/utils/tableMixin'
import { isNumber } from '@/utils/validator'
import { thousands } from '@/utils'
export default {
  name: 'FinanceCheck', // 平台融资审核
  mixins: [tableMixin],
  props: {
    // productNo: {
    //   type: String,
    //   default: '',
    //   required: true,
    // },
  },
  data () {
    const checkRAte = (rule, value, callback) => {
      if (+value !== 0 && !isNumber(value)) {
        return callback(new Error('请输入正确的数字'))
      }
      const strLen = value.toString().split('.')
      if (strLen.length > 1 && strLen[1].length > 2) {
        return callback(new Error('小数部分不能超过2位'))
      }
      // const num = 1 * +this.form.percentageRate * 1000 // 避免出现 小数溢出
      // this.persent = num * this.financeInfo.tokenCount / 100000
      callback()
    }
    const checkOpinion = (rule, value, callback) => {
      if ((value === '' && !this.form.approve)) {
        return callback(new Error('请输入驳回原因'))
      }
      callback()
    }
    return {
      thousands,
      loading: false,
      transNo: '',
      financeInfo: {},
      form: {
        transNo: '',
        approve: true,
        reason: '',
        technologyServiceRate: '', // 技术服务费
        onlinePercentageRate: '', // 金融服务费线上
        offlinePercentageRate: '', // 金融服务费线下
      },
      rules: {
        reason: [
          { validator: checkOpinion, trigger: 'blur' }
        ],
        technologyServiceRate: [
          { required: true, message: '请输入抽成比例', trigger: 'blur' },
          { validator: checkRAte, trigger: ['blur', 'change'] }
        ]
      },
      persent: '0'
    }
  },
  computed: {
    technologyServiceAmount() {
      if (!this.form.technologyServiceRate || +this.form.technologyServiceRate < 0) {
        return 0
      }
      const num = 1 * +this.form.technologyServiceRate * 1000 // 避免出现 小数溢出
      return num * this.financeInfo.tokenCount / 100000
    },
    onlinePercentageAmount() {
      if (!this.form.onlinePercentageRate || +this.form.onlinePercentageRate < 0) {
        return 0
      }
      const num = 1 * +this.form.onlinePercentageRate * 1000 // 避免出现 小数溢出
      return num * this.financeInfo.tokenCount / 100000
    },
    offlinePercentageAmount() {
      if (!this.form.offlinePercentageRate || +this.form.offlinePercentageRate < 0) {
        return 0
      }
      const num = 1 * +this.form.offlinePercentageRate * 1000 // 避免出现 小数溢出
      return num * this.financeInfo.tokenCount / 100000
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const result = JSON.parse(sessionStorage.getItem('financeInfo'))
      this.financeInfo = result
      this.form.transNo = this.financeInfo.transNo
    },
    handleSubmit() {
      const data = {
        ...this.form
      }
      this.$securityCode().then(securityCode => {
        PlatformApi.platformCheckLoanTrans({
          ...data,
          securityCode
        }).then(res => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          })
          this.cancel()
        })
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.approve && this.form.technologyServiceRate === 0) {
            this.$confirm('当前设置技术服务费为 0，确定要通过审核吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.handleSubmit()
            })
          } else {
            this.handleSubmit()
          }
        }
      })
    },
    // cc(e, name) {
    //   const num = e.target.value
    //   if (+num !== 0 && !isRightNum(num)) {
    //     this.$message.error('请输入正确的抽成比例')
    //     this.form[name] = 0
    //     return
    //   } else {
    //     this.form[name] = Number(num).toFixed(2)
    //   }
    // },
    cancel() {
      this.$router.back()
    },
  }
}
</script>

<style lang="scss" >
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
        padding-left: 10px;
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
    padding-left: 120px;
  }
}
</style>
