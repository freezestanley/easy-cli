<template>
  <div class="page page-assets-edit">
    <div v-loading="loading" class="inputContent">
      <el-form ref="form" :model="assetForm" :rules="rules" label-width="96px">
        <h4 style="margin-top: 0;">基本信息</h4>
        <el-form-item label="资产名称" prop="assetName">
          <el-input v-model="assetForm.assetName" />
        </el-form-item>
        <el-form-item :label="assetType==PAY_ASSETS?'应付金额':'应收金额'" prop="realAmt">
          <el-input v-model="assetForm.realAmt" class="inline">
            <div slot="suffix" style="color:#000">万元</div>
          </el-input>
        </el-form-item>
        <el-form-item :label="assetType==PAY_ASSETS?'供应商名称':'客户名称'" prop="corpNo">
          <el-select v-model="assetForm.corpNo" filterable :filter-method="(e) => word = e" placeholder="请输入后搜索" style="width:100%">
            <el-option
              v-for="corp in filterdCorps"
              :key="corp.corpNo"
              :label="corp.name"
              :value="corp.corpNo"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="assetType==PAY_ASSETS?'应付到期日':'应收到期日'" prop="assetExpireDate">
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
        <el-form-item label="合同签署日期" prop="contractDate">
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
            resize="none"
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
        <h4>其他(选填)</h4>
        <el-form-item label="附件名称" prop="otherAttachName">
          <el-input v-model="assetForm.otherAttachName" maxlength="50" />
        </el-form-item>
        <el-form-item label="其他附件">
          <file-upload :files.sync="otherAsyncFile" :url-arr.sync="otherUploadFile" />
        </el-form-item>
        <p>
          <el-button @click="goBack">取 消</el-button>
          <el-button v-permission="'assets-register-list__edit'" type="primary" :loading="confirmLoading" @click="handleAddConfirm">确 定</el-button>
        </p>
      </el-form>
    </div>
  </div>
</template>
<script>
import { PAY_ASSETS } from '@/utils/constant/assets'
import ContractBlock from '../base/ContractBlock'
import InvoiceBlock from '../base/InvoiceBlock'
import FinalSBlock from '../base/FinalSBlock'
import { mapGetters } from 'vuex'
// import OtherBlock from '../base/OtherBlock'

import FileUpload from '@/components/FileUpload/index'
import { EnterprisApi } from '@/api/index'
import SubmitFormMixin from '../base/SubmitFormMixin'
const WAN = 10000
export default {
  name: 'AssestEdit',
  components: {
    ContractBlock,
    InvoiceBlock,
    FinalSBlock,
    FileUpload
  },
  mixins: [SubmitFormMixin],
  data() {
    return {
      loading: false,
      confirmLoading: false,
      word: '',
      PAY_ASSETS,
      assetType: 'PAY_ASSETS',
      // 其他附件上传 因为层级比较深 数据没有时会报错 而且vue 监听不到变化
      otherAsyncFile: [],
      // 编辑需清除初始数据
      contractList: [],
      invoiceList: [],
      settlementAttaches: [],
      otherAttaches: [
        {
          assetAttachFiles: [],
          attachParam: {}
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    filterdCorps() {
      console.log('223124123==' + this.word)
      if (this.word.length < 4) return []
      return this.corpList.filter(c => c.name.indexOf(this.word) > -1)
    },
    invoiceTotalAmount() {
      let count = 0
      this.invoiceList.forEach(i => {
        count += +i.attachParam.invoiceAmount
      })
      if (count.toString().indexOf('.') !== -1) {
        return count.toFixed(4)
      }
      return count
    },
  },
  created() {
    const { assetNo, assetType } = this.$router.history.current.query

    this.assetType = assetType
    this.assetForm.registerCorpPaymentType = this.assetType

    // 获取供应商/客户列表
    EnterprisApi.queryRegCorpList({
      assetType: this.assetType
    }).then(({ data }) => {
      this.corpList = data.map(item => ({ corpNo: item.corpNo, name: item.corpName }))
    })
    if (!assetNo) return
    // 获取数据
    this.getData(assetNo)
  },
  methods: {
    getData: async function(assetNo) {
      this.loading = true
      const { data } = await EnterprisApi.queryAssetDetail({ assetNo: assetNo })
      if (data) {
        // Object.keys(this.assetForm).forEach(
        //   key => (this.assetForm[key] = data[key])
        // )
        this.word = this.assetType === PAY_ASSETS ? data.receiveCorpName : data.payCorpName
        this.assetForm = {
          ...data,
          balAmt: +data.balAmt / WAN,
          contractAmt: +data.contractAmt / WAN,
          realAmt: +data.realAmt / WAN,
          otherAttachName: '',
          corpNo:
            this.assetType === PAY_ASSETS ? data.receiveCorpNo : data.payCorpNo
        }
        data.attaches.map(item => {
          switch (item.assetAttachType) {
            case 'CONTRACT':
              if (this.contractList.length === 1 && !this.contractList[0].id) {
                this.contractList.shift()
              }
              this.contractList.push({
                ...item,
                attachParam: {
                  ...item.attachParam,
                  contractAmount: +item.attachParam.contractAmount / WAN,
                  contractValidDate: [item.attachParam.contractEffectDate, item.attachParam.contractExpireDate]
                }
              })
              break
            case 'INVOICE':
              if (this.invoiceList.length === 1 && !this.invoiceList[0].id) {
                this.invoiceList = [{
                  ...item,
                  attachParam: {
                    ...item.attachParam,
                    invoiceAmount: +item.attachParam.invoiceAmount / WAN,
                  }
                }]
              } else {
                this.invoiceList.push({
                  ...item,
                  attachParam: {
                    ...item.attachParam,
                    invoiceAmount: +item.attachParam.invoiceAmount / WAN
                  }
                })
              }
              break
            case 'SETTLEMENT':
              if (
                this.settlementAttaches.length === 1 &&
                !this.settlementAttaches[0].id
              ) {
                this.settlementAttaches = [{
                  ...item,
                  attachParam: {
                    ...item.attachParam,
                    settlementAmount: +item.attachParam.settlementAmount / WAN,
                  }
                }]
              } else {
                this.settlementAttaches.push({
                  ...item,
                  attachParam: {
                    ...item.attachParam,
                    settlementAmount: +item.attachParam.settlementAmount / WAN,
                  }
                })
              }
              break
            case 'OTHER':
              if (
                this.otherAttaches.length === 1 &&
                !this.otherAttaches[0].id
              ) {
                this.otherAttaches.splice(0, 1, item)
              } else {
                this.otherAttaches.push(item)
              }
              // 做特殊处理
              this.assetForm.otherAttachName = item.attachParam.attachName
              item.assetAttachFiles.map(file => {
                this.otherAsyncFile.push({
                  name: file.fileName,
                  url: file.fileUrl
                })
              })
              break
          }
        })
        this.$refs.form.resetFields()
      }
      this.loading = false
    },
    handleAddConfirm() {
      const tempHandle = []
      const formHandle = this.FormListHandle
      for (const x in formHandle) {
        tempHandle.push(...formHandle[x])
      }
      // 对文件附件数据做特殊处理 后台结构让这样传
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
          const contractList = this.contractList.map(item => {
            return {
              ...item,
              attachParam: {
                ...item.attachParam,
                contractAmount: +item.attachParam.contractAmount * WAN,
              }
            }
          })

          const settlementAttaches = this.settlementAttaches.map(item => {
            return {
              ...item,
              attachParam: {
                ...item.attachParam,
                settlementAmount: +item.attachParam.settlementAmount * WAN,
              }
            }
          })
          const invoiceList = this.invoiceList.map(item => {
            return {
              ...item,
              attachParam: {
                ...item.attachParam,
                invoiceAmount: +item.attachParam.invoiceAmount * WAN,
              }
            }
          })
          this.confirmLoading = true
          const params = {
            ...this.assetForm,
            contractAmt: +this.assetForm.contractAmt * WAN,
            realAmt: +this.assetForm.realAmt * WAN,
            delAttaches: this.delAttaches,
            attaches: [
              ...contractList,
              ...settlementAttaches,
              ...invoiceList,
              ...this.otherAttaches
            ],
            roleType: this.userInfo.roleType
          }
          this.$securityCode().then((code) => {
            EnterprisApi.editAsset({
              ...params,
              securityCode: code
            }).then(res => {
              if (res) {
                this.$message.success('更新成功')
                this.routeSkipUrl('payassets')
              }
            })
          }, () => {
            this.confirmLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-assets-edit {
  padding-left: 10px;
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
