// 合同
const newContractItem = {
  assetAttachFiles: [],
  assetAttachType: 'CONTRACT',
  attachParam: {
    breakPromiseHandle: '',
    contracServiceContent: '',
    contractAmount: '',
    contractEffectDate: '',
    contractExpireDate: '',
    contractName: '',
    contractNo: '',
    paymentCycle: '',
    paymentDate: '',
    paymentMethod: ''
  }
}
// 发票
const newInvoiceItem = {
  assetAttachFiles: [],
  assetAttachType: 'INVOICE',
  attachParam: {
    invoiceAmount: '',
    startDate: '',
    endDate: '',
    invoiceNo: '',
    invoiceCode: '',
  }
}
// 结算
const newSettlementItem = {
  assetAttachFiles: [],
  assetAttachType: 'SETTLEMENT',
  attachParam: {
    settlementAmount: '',
    settlementDate: '',
    settlementNo: ''
  }
}

import { PAY_ADD, PAY_ASSETS, COLLECT_ADD, COLLECT_ASSETS } from '@/utils/constant/assets'

import { isRequired, beforeDate, afterDate, isNumber } from '@/utils/validator'

export default {
  data() {
    return {
      selectDateRules: beforeDate,
      selectDateRules1: afterDate,
      otherUploadFile: [],
      payasset: PAY_ASSETS,
      assetsType: PAY_ADD || COLLECT_ADD,
      corpList: [],
      delAttaches: [], // 删除发票、结算单、合同
      assetForm: {
        registerCorpPaymentType: PAY_ASSETS,
        assetExpireDate: '',
        assetName: '',
        contractAmt: '',
        contractDate: '',
        contractNo: '',
        corpNo: '',
        realAmt: '',
        remark: '',
        otherAttachName: ''
      },
      otherAttaches: [
        {
          assetAttachType: 'OTHER',
          assetAttachFiles: [],
          attachParam: {
            attachName: ''
          }
        }
      ],
      contractList: [newContractItem], // 合同
      invoiceList: [newInvoiceItem], // 发票
      settlementAttaches: [newSettlementItem], // 结算
      FormListHandle: {
        settlementAttaches: [],
        invoiceList: [],
        contractList: []
      }, // 子组件form的句柄
      rules: {
        assetName: isRequired('请输入资产名'),
        realAmt: isNumber('请输入应付资产', false),
        assetExpireDate: isRequired('请输入应付到期日'),
        contractNo: isRequired('请输入合同编号'),
        corpNo: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        contractAmt: isNumber('请输入合同金额'),
        contractDate: isRequired('请输入合同签署日期')
        // attachName: isRequired('请输入附件名称')
        // otherAttachName: isRequired('请输入附件名称')
      }
    }
  },
  watch: {
    otherUploadFile: function(val, oldval) {
      if (Array.isArray(val)) {
        // 导出为url-list，非item-list
        const tempUpload = val.map(url => ({
          fileName: this.getName(url),
          fileUrl: url
        }))
        this.otherAttaches[0].assetAttachFiles = [...tempUpload]
      }
    }
  },
  methods: {
    getName(url) {
      let str = ''
      if (url) {
        const i = url.lastIndexOf('/')
        str = url.slice(i + 1)
      }
      return str
    },
    handleChangeDate(index, alias, data) {
      this[alias].splice(index, 1, data)
    },
    handleDel(index, alias) {
      if (this[alias].length > 1) {
        // 删除 结算、合同、发票等 记录ID
        if (this[alias][index].id) {
          this.delAttaches.push(this[alias][index].id)
        }
        this[alias].splice(index, 1)
      }
    },
    handleContractAdd() {
      const { contractList } = this.FormListHandle
      // p判断附件
      if (
        !this.contractList[this.contractList.length - 1].assetAttachFiles
          .length > 0
      ) {
        this.$message.error('新增需填写完整,附件为必传')
        return
      }

      contractList[contractList.length - 1].validate(vaild => {
        if (vaild) this.contractList.push(newContractItem)
      })
    },
    handleInvoiceAdd() {
      const { invoiceList } = this.FormListHandle
      // p判断附件
      if (
        !this.invoiceList[this.invoiceList.length - 1].assetAttachFiles.length >
        0
      ) {
        this.$message.error('新增需填写完整,附件为必传')
        return
      }
      invoiceList[invoiceList.length - 1].validate(vaild => {
        if (vaild) this.invoiceList.push(newInvoiceItem)
      })
    },
    handleFinalSAdd() {
      const { settlementAttaches } = this.FormListHandle
      // p判断附件
      if (
        !this.settlementAttaches[this.settlementAttaches.length - 1]
          .assetAttachFiles.length > 0
      ) {
        this.$message.error('新增需填写完整,附件为必传')
        return
      }
      settlementAttaches[settlementAttaches.length - 1].validate(vaild => {
        if (vaild) this.settlementAttaches.push(newSettlementItem)
      })
    },
    pushFormHandle(handle, formName) {
      this.FormListHandle[formName].push(handle)
    },
    goBack() {
      this.routeSkipUrl('payassets')
    },
    checkUploadFile() {
      // 合同附件
      if (!this.contractList.every(form => form.assetAttachFiles.length > 0)) {
        this.$message.error('请上传合同附件')
        return false
      }
      // 发票附件
      if (!this.invoiceList.every(form => form.assetAttachFiles.length > 0)) {
        this.$message.error(`请上传发票附件`)
        return false
      }
      // 结算单
      if (
        !this.settlementAttaches.every(form => form.assetAttachFiles.length > 0)
      ) {
        this.$message.error('请上传结算单附件')
        return false
      }
      return true
    },
    getSkipUrl(lastPath) {
      const { path } = this.$router.history.current
      if (!lastPath) return
      let url = path.split('/')
      url.splice(2, 1, lastPath)
      url = url.join('/')
      return url
    },
    routeSkipUrl(lastPath) {
      const { name, path } = this.$router.history.current
      const assetType = name === 'business-payadd' ? PAY_ASSETS : COLLECT_ASSETS
      if (!lastPath) return
      let url = path.split('/')
      url.splice(2, 1, lastPath)
      url = url.join('/')
      this.$router.push({
        path: url,
        query: {
          assetType
        }
      })
    }
  }
}
