<template>
  <div class="com-dialog-wrap">
    <div class="form-wrap">
      <el-form
        ref="newSignForm"
        :inline="true"
        :model="newSignForm"
        :rules="newSignRules"
        label-width="120px"
      >
        <el-form-item label="应付资产" prop="assetNo">
          <el-select
            v-if="type=='NEW'"
            v-model="newSignForm.assetNo"
            placeholder="请选择"
            @change="handleAssetChange"
          >
            <el-option
              v-for="item in curCorpAssest"
              :key="item.assetNo"
              :label="item.assetName"
              :value="item.assetNo"
            />
          </el-select>
          <span v-if="type=='APPLY'">{{ curSign.assetName }}</span>
          <div class="tips">资产剩余金额: {{ curSign.balAmt | formatWan }}万元</div>
        </el-form-item>
        <div style="margin-top:-10px">
          <el-form-item
            label="企业名称"
            prop="assetName"
          >{{ curSign.corpName || newSignForm.assetName }}</el-form-item>
        </div>
        <el-form-item label="资产方签发" prop="quotaNo">
          <el-select v-model="newSignForm.quotaNo" placeholder="请选择" @change="handleTokenChange">
            <el-option
              v-for="item in valibleTokens"
              :key="item.quotaNo"
              class="token-option"
              :label="TOKEN__NAME + '（' + item.issueCorpName + '）\n余额：' + item.balAmt || 0 "
              :value="item.quotaNo"
            >
              <div>{{ TOKEN__NAME + '（' + item.issueCorpName + '）' }}</div>
              <div>{{ `授信额度：${item.issueAmt} (余额：${item.balAmt || 0 })` }}</div>
              <div>{{ `授信有效期：${item.effectiveDate} ~ ${item.expireDate}` }}</div>
            </el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="授信有效期">{{ assetDate.effectiveDate }} ~ {{ assetDate.expireDate }}</el-form-item>
        </div>
        <el-form-item label="签发数量" prop="amount">
          <el-input
            v-if="type == 'NEW'"
            v-model="newSignForm.amount"
            :disabled="type=='APPLY'"
            type="number"
            :placeholder="maxCount"
          >
            <div slot="suffix" style="color:#000">个</div>
          </el-input>
          <div>折合人民币 {{ newSignForm.amount || 0 }} 元</div>
        </el-form-item>
        <div>
          <el-form-item label="签发有效期" prop="expireDate">
            <el-date-picker
              v-model="newSignForm.expireDate"
              :picker-options="selectRangeDate()"
              type="date"
              laceholder="签发有效期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </div>
        <el-form-item label=" ">
          <div>
            <el-button @click="goBack">取消</el-button>
            <el-button
              v-permission="'issue-manage__new'"
              type="primary"
              style="width:170px"
              :loading="loading"
              @click="onPreviewContract"
            >下一步</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 预览合约 -->
    <PDF ref="pdfDialog" :title="type=='NEW' ? '签发申请' : '确定签发'">
      <template slot-scope="props">
        <el-button @click="props.close()">上一步</el-button>
        <el-button
          v-if="type == 'NEW'"
          type="primary"
          class="next-button"
          @click="handleNewSign()"
        >确认签发</el-button>
        <el-button
          v-if="type == 'APPLY'"
          type="primary"
          class="next-button"
          @click="handleApplySign()"
        >确认签发</el-button>
      </template>
    </PDF>
  </div>
</template>
<script>
import Validator from '@/utils/validator'
import { PAY_ASSETS } from '@/utils/constant/assets'
import { EnterprisApi, PlatformApi, CommonApi } from '@/api/index'
export default {
  name: 'NewSign',
  components: {
  },
  data() {
    return {
      newSignRules: {
        assetNo: Validator.isRequired('请选择资产', { trigger: ['blur', 'change'] }),
        amount: [
          Validator.isRequired('请填写签发数量'),
          Validator.isNumber('请填写正确的签发数量'),
          // { type: 'number', max: this.mix, message: '超过最大数量' }
        ],
        expireDate: [Validator.isRequired('请选择签发有效期')],
        quotaNo: [
          Validator.isRequired(`请选择签发${this.TOKEN__NAME}`, { trigger: ['blur', 'change'] })],
      },
      curSign: {}, // 当前签发信息 链属申请的
      curCorpAssest: [], // 当前资产列表
      valibleTokens: [], // 当前可用的TOKEN__NAME列表
      curToken: {}, // 当前选中的TOKEN__NAME
      loading: false,
      type: 'NEW', // NEW 新增 APPLY 链属申请
      assetDate: {
        // TOKEN__NAME的授信有效期
        effectiveDate: '',
        expireDate: ''
      },
      newSignForm: {
        surplusAssest: '',
        assetName: '',
        amount: '',
        assetNo: '',
        expireDate: '',
        quotaNo: ''
      }
    }
  },
  computed: {
    mix() {
      return Math.min(this.curSign.balAmt, this.curToken.balAmt)
    },
    maxCount() {
      return '最大' + (this.mix || 0) + '个'
    }
  },
  mounted() {
    const { current } = this.$router.history
    const { name, query } = current
    console.log(name, JSON.stringify(query))
    if (name === 'new-issue' && JSON.stringify(query) === '{}') {
      this.type = 'NEW'
      this.getCorpAssest()
    } else {
      this.type = 'APPLY'
      this.curSign = query
      this.newSignForm.transNo = query.transNo
      this.newSignForm.amount = query.applyAmount
      this.newSignForm.assetNo = ' '
    }
    this.getToken()
  },
  methods: {
    getCorpAssest: async function(name) {
      const assetList = await EnterprisApi.queryAssetList({
        assetType: PAY_ASSETS,
        assetStatus: 'VALID',
        amountScope: 'NOT_ZERO'
      })
      this.curCorpAssest = assetList.data
    },
    getToken() {
      PlatformApi.queryQuotaCorpList({
        status: 'AVALIABLE'
      }).then(res => {
        this.valibleTokens = res.data
      })
    },
    // 时间范围
    selectRangeDate() {
      const that = this
      return {
        disabledDate(time) {
          return (
            time.getTime() <
              Math.max(
                Date.now(),
                new Date(that.assetDate.effectiveDate).getTime()
              ) ||
            time.getTime() > new Date(that.assetDate.expireDate).getTime()
          )
        }
      }
    },
    // 初始化
    onSignResetForm() {
      this.newSignForm.surplusAssest = ''
      this.newSignForm.assetName = ''
      this.$refs.newSignForm.resetFields()
    },
    goBack() {
      if (this.type === 'APPLY') {
        this.$router.push('/business/issue?tab=applySign')
      } else {
        this.$router.push('/business/issue')
      }
    },
    // 新增核心主动签发
    handleNewSign() {
      // const { range } = this.newSignForm
      // if (Array.isArray(range)) {
      //   this.newSignForm.effectiveDate = this.newSignForm.range[0]
      //   this.newSignForm.expireDate = this.newSignForm.range[1]
      // }
      this.$refs.newSignForm.validate(valid => {
        if (!valid) return
        this.$securityCode().then((code) => {
          this.$refs['pdfDialog'].close()
          this.loading = true
          EnterprisApi.coreCorpApplyIssueTokenTrans({
            ...this.newSignForm,
            securityCode: code
          }).then(res => {
            if (res) {
              this.loading = false
              this.$message.success('签发成功')
              this.$router.push('/business/issue')
            }
            this.onSignResetForm()
          }).finally(() => {
            this.loading = false
          })
        })
      })
    },
    // 链属申请签发
    handleApplySign: async function() {
      this.$securityCode().then((code) => {
        this.loading = true
        this.$refs['pdfDialog'].close()
        EnterprisApi.coreCorpCheckIssueTokenTrans({
          ...this.newSignForm,
          approve: true,
          securityCode: code
        }).then(res => {
          if (res) {
            this.loading = false
            this.$message.success('签发成功')
            this.$router.push('/business/issue?tab=applySign')
          }
          this.onSignResetForm()
        }).finally(() => {
          this.loading = false
        })
      })
    },
    // pdf
    onPreviewContract() {
      this.$refs.newSignForm.validate(valid => {
        if (valid) {
          if (+this.newSignForm.amount > this.mix) {
            this.$message.error(
              `签发数量不能大于资产剩余金额或当前${this.TOKEN__NAME}数量，请修改签发数量后重试`
            )
            return
          }
          this.loading = true
          CommonApi.previewIssueTokenContract({
            ...this.newSignForm
          })
            .then(res => {
              if (res.data) {
                this.$refs['pdfDialog'].open(
                  res.data,
                  this.type === 'NEW' ? '新增签发' : '确认签发'
                )
              } else {
                this.$message.error('预览地址有误')
              }
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    // 资产切换 带出信息
    handleAssetChange(assetNo) {
      const tempToken = this.curCorpAssest.filter(
        item => item.assetNo === assetNo
      )
      console.log(tempToken)
      this.curSign = tempToken[0]
      this.newSignForm.surplusAssest = tempToken[0].balAmt || 0
      this.newSignForm.assetName = tempToken[0].receiveCorpName
      this.newSignForm.assetNo = tempToken[0].assetNo
    },
    // ${this.TOKEN__NAME}选择切换
    handleTokenChange(qno) {
      const tempToken = this.valibleTokens.filter(item => item.quotaNo === qno)
      this.curToken = tempToken[0]
      this.assetDate.effectiveDate = tempToken[0].effectiveDate
      this.assetDate.expireDate = tempToken[0].expireDate
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  color: $labelColor;
  font-size: 12px;
}
/deep/.el-form-item__label {
  text-align: left;
}
.com-dialog-wrap {
  font-size: 14px;
  color: $titleColor;
}
.form-wrap {
  width: 450px;
  .el-form-item {
    width: 100%;
    .el-select,
    .el-input,
    .el-range-editor {
      width: 320px;
    }
  }
}
</style>
