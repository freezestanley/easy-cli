<template>
  <div class="page">
    <div class="inputContent">
      <h4>基本信息</h4>
      <el-form ref="form" :model="assetForm" :rules="rules" label-width="100px">
        <el-form-item label="资产名称" prop="assetName">
          <el-input v-model="assetForm.assetName" maxlength="50" />
        </el-form-item>
        <el-form-item :label="assetsType==payasset?'应付金额':'应收金额'" prop="realAmt">
          <el-input v-model="assetForm.realAmt" class="inline">
            <div slot="suffix" style="color:#000">万元</div>
          </el-input>
        </el-form-item>
        <el-form-item :label="assetsType==payasset?'供应商信息':'客户名称'" prop="corpNo">
          <el-select v-model="assetForm.corpNo" filterable :filter-method="(e) => word = e" placeholder="请输入后搜索" style="width:100%">
            <el-option
              v-for="(core,index) in filterdCorps"
              :key="core.no+index"
              :label="core.name"
              :value="core.no"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="assetsType==payasset?'应付到期日':'应收到期日'" prop="assetExpireDate">
          <el-date-picker
            v-model="assetForm.assetExpireDate"
            :picker-options="selectDateRules1"
            end-placeholder
            placeholder="选择日期"
            style="width:100%"
            type="date"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNo">
          <el-input v-model="assetForm.contractNo" maxlength="20" show-word-limit />
        </el-form-item>

        <el-form-item label="合同金额" prop="contractAmt">
          <el-input v-model="assetForm.contractAmt" class="inline">
            <div slot="suffix" style="color:#000">万元</div>
          </el-input>
        </el-form-item>
        <el-form-item label="合同日期" prop="contractDate">
          <el-date-picker
            v-model="assetForm.contractDate"
            :picker-options="selectDateRules"
            placeholder="选择日期"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="备注(选填)" prop="remark">
          <el-input
            v-model="assetForm.remark"
            :rows="3"
            maxlength="50"
            show-word-limit
            type="textarea"
          />
        </el-form-item>
        <!-- 基本合同 -->
        <h4>基本合同</h4>
        <contract-block
          v-for="(contract,index) in contractList"
          :key="index+10"
          :index="index"
          :params="contract"
          alias="contractList"
          @formHandle="pushFormHandle"
          @handleChange="handleChangeDate"
          @handleDel="handleDel"
        >
          <p class="block-index">合同{{ index+1 }}</p>
        </contract-block>
        <el-form-item>
          <p>
            <el-button type="primary" @click="handleContractAdd">
              <i class="el-icon-plus" />新增子合同
            </el-button>
          </p>
        </el-form-item>
        <!-- 发票 -->
        <h4>发票</h4>
        <el-form-item label="总金额">
          <strong>{{ invoiceTotalAmount }}</strong> 万元
        </el-form-item>
        <invoice-block
          v-for="(invoice,index) in invoiceList"
          :key="index+20"
          :index="index"
          :params="invoice"
          alias="invoiceList"
          @formHandle="pushFormHandle"
          @handleChange="handleChangeDate"
          @handleDel="handleDel"
        >
          <div class="block-index">发票{{ index+1 }}</div>
        </invoice-block>
        <el-form-item>
          <el-button type="primary" @click="handleInvoiceAdd">
            <i class="el-icon-plus" />新增发票
          </el-button>
        </el-form-item>
        <!-- 结算单 -->
        <h4>结算单</h4>
        <final-s-block
          v-for="(finals,index) in settlementAttaches"
          :key="index+30"
          :index="index"
          :params="finals"
          alias="settlementAttaches"
          @formHandle="pushFormHandle"
          @handleChange="handleChangeDate"
          @handleDel="handleDel"
        >
          <p class="block-index">结算单{{ index+1 }}</p>
        </final-s-block>.
        <el-form-item>
          <el-button type="primary" @click="handleFinalSAdd">
            <i class="el-icon-plus" />新增结算单
          </el-button>
        </el-form-item>
        <!-- 其他 -->
        <h4>其他</h4>
        <el-form-item label="附件名称" prop="otherAttachName">
          <el-input v-model="assetForm.otherAttachName" maxlength="50" />
        </el-form-item>
        <el-form-item label="其他附件">
          <file-upload :files="otherUploadFile" :url-arr.sync="otherUploadFile" />
        </el-form-item>
        <p>
          <el-button @click="goBack">取 消</el-button>
          <el-button v-permission="'assets-register-list__add'" type="primary" @click="handleAddConfirm">确 定</el-button>
        </p>
      </el-form>
    </div>
  </div>
</template>
<script>
import { COLLECT_ASSETS, PAY_ASSETS } from '@/utils/constant/assets'
import ContractBlock from '../base/ContractBlock'
import InvoiceBlock from '../base/InvoiceBlock'
import FinalSBlock from '../base/FinalSBlock'
import FileUpload from '@/components/FileUpload/index'
import { EnterprisApi } from '@/api/index'
import SubmitFormMixin from '../base/SubmitFormMixin'
import { mapGetters } from 'vuex'

const WAN = 10000
export default {
  name: 'AssestAdd',
  components: {
    ContractBlock,
    InvoiceBlock,
    FinalSBlock,
    FileUpload
  },
  mixins: [SubmitFormMixin],
  data() {
    return {
      word: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    filterdCorps() {
      if (this.word.length < 4) return []
      return this.corpList.filter(c => c.name.indexOf(this.word) > -1)
    },
    invoiceTotalAmount() {
      let count = 0
      this.invoiceList.forEach(i => {
        count += +i.attachParam.invoiceAmount
      })
      return count
    },
  },
  mounted: async function() {
    const { name } = this.$router.history.current
    if (!name) return
    // 判断是否是 应收应付
    this.assetsType = name === 'business-payadd' ? PAY_ASSETS : COLLECT_ASSETS

    this.assetForm.registerCorpPaymentType = this.assetsType

    // 获取供应商列表
    const { data } = await EnterprisApi.queryRegCorpList({
      assetType: this.assetsType
    })
    this.corpList = [
      ...data.map(item => ({ no: item.corpNo, name: item.corpName }))
    ]
  },

  methods: {
    filterCorp(e) {
      this.word = e
      console.log(e)
    },
    handleAddConfirm() {
      const tempHandle = []
      const formHandle = this.FormListHandle
      for (const x in formHandle) {
        tempHandle.push(...formHandle[x])
      }

      // 对数据做特殊处理
      this.otherAttaches[0].attachParam.attachName = this.assetForm.otherAttachName

      Promise.all([
        ...tempHandle.map(async item => item.validate()),
        this.$refs.form.validate()
      ]).then(arrResult => {
        if (!this.checkUploadFile()) {
          return
        }
        if (arrResult.every(r => r)) {
          delete this.assetForm.otherAttachName
          // 处理金额 变成万元
          const contractList = this.contractList.map(item => {
            return {
              ...item,
              attachParam: {
                ...item.attachParam,
                contractAmount: +item.attachParam.contractAmount * WAN
              }
            }
          })
          // 处理结算单
          const settlementAttaches = this.settlementAttaches.map(item => {
            return {
              ...item,
              attachParam: {
                ...item.attachParam,
                settlementAmount: +item.attachParam.settlementAmount * WAN
              }
            }
          })
          // 处理发票
          const invoiceList = this.invoiceList.map(item => {
            return {
              ...item,
              attachParam: {
                ...item.attachParam,
                invoiceAmount: +item.attachParam.invoiceAmount * WAN
              }
            }
          })
          const params = {
            ...this.assetForm,
            contractAmt: +this.assetForm.contractAmt * WAN,
            realAmt: +this.assetForm.realAmt * WAN,
            attaches: [
              ...contractList,
              ...settlementAttaches,
              ...invoiceList,
              ...this.otherAttaches
            ],
            roleType: this.userInfo.roleType
          }
          this.$securityCode().then((code) => {
            EnterprisApi.registerAsset({
              ...params,
              securityCode: code
            }).then(res => {
              if (res) {
                this.$message.success('添加成功')
                this.routeSkipUrl('payassets')
              }
            }).finally(() => {
              this.confirmLoading = false
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  padding: 0 12px;
}
.inputContent {
  .block-index {
    font-size: 14px;
    padding: 10px 0;
  }
  /deep/.del {
    color: $theme;
    font-size: 14px;
    float: right;
    margin-top: -38px;
    cursor: pointer;
  }
  h4 {
    color: $titleColor;
  }
  width: 550px;
  /deep/.el-form {
    .el-form-item__label {
      text-align: left !important;
    }
    .el-input .el-input__count .el-input__count-inner {
      background: transparent;
    }
  }
}
</style>
