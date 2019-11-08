<template>
  <el-drawer
    class="com-corp-info-dialog"
    :visible.sync="visible"
    title="企业信息"
    size="800px"
    :append-to-body="true"
  >
    <div v-loading="loading" class="corp-info-wrap">
      <BasicInfo :corp-info="corpInfo" />
    </div>
  </el-drawer>
</template>

<script>
import BasicInfo from './BasicInfo'
import { CommonApi } from '@/api'

export default {
  name: 'CorpInfoDialog',
  components: {
    BasicInfo
  },
  data () {
    return {
      visible: false,
      loading: false,
      corpNo: '', // 查看企业信息no
      transNo: '', // 平台审核时的no
      corpInfo: {},
      basicInfo: {
        corpLogo: '',
        corpName: '',
        creditCode: '',
        buildTime: '',
        registerCapital: '',
        businessAddress: '',
        mailAddress: '',
        businessLicensePic: '',
        businessLicenseDuplicatePic: '',
        corpAttachmentDtos: []
      },
      corporationInfo: {
        legalName: '',
        legalMobile: '',
        legalCard: '',
        legalCardPic: '',
        legalCardBackPic: ''
      },
      managerInfo: {
        contractUser: '',
        contractPost: '',
        contractCard: '',
        contractTel: '',
        contractEmail: ''
      }
    }
  },

  methods: {
    open(corpNo = '', transNo = '') {
      this.corpNo = corpNo
      this.transNo = transNo
      this.getData()
      this.visible = true
    },
    close() {
      this.visible = false
    },
    getData() {
      let api = CommonApi.getCorpInfo
      this.loading = true
      if (this.transNo !== '') {
        api = CommonApi.getEntDetail
      }
      api({
        transNo: this.transNo,
        corpNo: this.corpNo
      }).then(res => {
        this._dataInterfaceA(res.data)
        this.corpInfo = {
          basicInfo: this.basicInfo,
          corporationInfo: this.corporationInfo,
          managerInfo: this.managerInfo
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 对数据处理，后端给的数据无法直接使用
    _dataInterfaceA(data) {
      const { corpBaseDto, corpAttachmentDtos, corpLeaderDto } = data
      this.basicInfo = {
        corpLogo: corpBaseDto.corpLogo,
        corpName: corpBaseDto.corpName,
        creditCode: corpBaseDto.creditCode,
        buildTime: corpBaseDto.buildTime,
        registerCapital: corpBaseDto.registerCapital,
        businessAddress: corpBaseDto.businessAddress,
        mailAddress: corpBaseDto.mailAddress,
        industry: corpBaseDto.industry,
        scale: corpBaseDto.scale,
        businessLicensePic: corpBaseDto.businessLicensePic,
        businessLicenseDuplicatePic: corpBaseDto.businessLicenseDuplicatePic,
        corpAttachmentDtos: this._dataInterfaceB(corpAttachmentDtos)
      }
      this.corporationInfo = {
        legalName: corpBaseDto.legalName,
        legalMobile: corpBaseDto.legalMobile,
        legalCard: corpBaseDto.legalCard,
        legalCardPic: corpBaseDto.legalCardPic,
        legalCardBackPic: corpBaseDto.legalCardBackPic
      }
      this.managerInfo = {
        contractUser: corpLeaderDto.contractUser,
        contractPost: corpLeaderDto.contractPost,
        contractCard: corpLeaderDto.contractCard,
        contractTel: corpLeaderDto.contractTel,
        contractEmail: corpLeaderDto.contractEmail
      }
    },
    // 对数据处理，后端给的数据无法直接使用，补充资质证件数据处理
    _dataInterfaceB(data) {
      const result = []
      data.forEach(item => {
        if (item.filePath) {
          result.push(item.filePath)
        }
      })
      return result
    },
  }
}
</script>
