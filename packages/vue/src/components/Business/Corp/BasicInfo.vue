<template>
  <div>
    <h3>
      企业基本信息
      <el-button type="primary" @click="openTab">前往天眼查</el-button>
    </h3>
    <el-form :inline="false" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="公司LOGO" class="block-form-item">
        <image-upload v-if="basicInfo.corpLogo" :url.sync="basicInfo.corpLogo" :no-delete="true" />
      </el-form-item>
      <el-form-item label="企业名称">
        <div>{{ basicInfo.corpName }}</div>
      </el-form-item>
      <el-form-item label="统一社会信用代码">
        <div>{{ basicInfo.creditCode }}</div>
      </el-form-item>
      <el-form-item label="成立日期">
        <div>{{ basicInfo.buildTime ? $dayjs(basicInfo.buildTime).format('YYYY-MM-DD') : '' }}</div>
      </el-form-item>
      <el-form-item label="注册资本">
        <div>{{ basicInfo.registerCapital ? basicInfo.registerCapital + '万元' : '' }}</div>
      </el-form-item>
      <el-form-item label="注册地址">
        <div>{{ basicInfo.businessAddress }}</div>
      </el-form-item>
      <el-form-item label="通信地址">
        <div>{{ basicInfo.mailAddress }}</div>
      </el-form-item>
      <el-form-item label="所属行业">
        <div>{{ industryMap[basicInfo.industry] }}</div>
      </el-form-item>
      <el-form-item label="企业规模">
        <div>{{ scaleMap[basicInfo.scale] }}</div>
      </el-form-item>
      <el-form-item class="block-form-item" label="营业执照-正件">
        <image-upload
          v-if="basicInfo.businessLicensePic"
          :no-delete="true"
          :url.sync="basicInfo.businessLicensePic"
        />
      </el-form-item>
      <el-form-item class="block-form-item" label="营业执照-副件">
        <image-upload
          v-if="basicInfo.businessLicenseDuplicatePic"
          :no-delete="true"
          :url.sync="basicInfo.businessLicenseDuplicatePic"
        />
      </el-form-item>
      <el-form-item class="block-form-item" label="补充资质证件">
        <div v-if="basicInfo.corpAttachmentDtos && basicInfo.corpAttachmentDtos.length">
          <div v-for="(item, index) in basicInfo.corpAttachmentDtos" :key="index">
            <file-show :url="item" :direct="true" />
          </div>
        </div>
      </el-form-item>
    </el-form>

    <h3>企业法人信息</h3>
    <el-form :inline="false" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="法人姓名">
        <div>{{ corporationInfo.legalName }}</div>
      </el-form-item>
      <el-form-item label="法人手机号">
        <div>{{ corporationInfo.legalMobile }}</div>
      </el-form-item>
      <el-form-item label="法人身份证号">
        <div>{{ corporationInfo.legalCard }}</div>
      </el-form-item>
      <el-form-item class="block-form-item" label="身份证正面">
        <image-upload
          v-if="corporationInfo.legalCardPic"
          :no-delete="true"
          :url.sync="corporationInfo.legalCardPic"
        />
      </el-form-item>
      <el-form-item class="block-form-item" label="身份证反面">
        <image-upload
          v-if="corporationInfo.legalCardBackPic"
          :no-delete="true"
          :url.sync="corporationInfo.legalCardBackPic"
        />
      </el-form-item>
    </el-form>

    <h3>业务负责人信息</h3>
    <el-form :inline="false" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="业务负责人姓名">
        <div>{{ managerInfo.contractUser }}</div>
      </el-form-item>
      <el-form-item label="职务">
        <div>{{ managerInfo.contractPost }}</div>
      </el-form-item>
      <el-form-item label="身份证号">
        <div>{{ managerInfo.contractCard }}</div>
      </el-form-item>
      <el-form-item label="手机号">
        <div>{{ managerInfo.contractTel }}</div>
      </el-form-item>
      <el-form-item label="邮箱">
        <div>{{ managerInfo.contractEmail }}</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from '@/views/common/corp-info/components/ImageUpload'
import FileShow from '@/components/FileShow/index'

import { industryMap, scaleMap } from '@/utils/industry'

export default {
  name: 'CorpBasicInfo',
  components: {
    ImageUpload,
    FileShow
  },
  props: {
    corpNo: {
      type: String,
      default: ''
    },
    transNo: {
      type: String,
      default: ''
    },
    corpInfo: {
      type: Object,
      default() {
        return {
          basicInfo: {},
          corporationInfo: {},
          managerInfo: {}
        }
      }
    }
  },
  data() {
    return {
      industryMap,
      scaleMap,
    }
  },
  computed: {
    basicInfo() {
      return this.corpInfo.basicInfo || {}
    },
    corporationInfo() {
      return this.corpInfo.corporationInfo || {}
    },
    managerInfo() {
      return this.corpInfo.managerInfo || {}
    },
  },
  created() {
    // this.getData()
  },
  methods: {
  //   getData() {
  //     // 判断是否从企业认证过来 查看企业审核中信息
  //     if (this.transNo !== '') {
  //       PlatformApi.getEntDetail({
  //         transNo: this.transNo
  //       }).then(res => {
  //         this._dataInterfaceA(res.data)
  //       })
  //     } else {
  //       CommonApi.getCorpInfo({
  //         corpNo: this.corpNo
  //       }).then(res => {
  //         this._dataInterfaceA(res.data)
  //       })
  //     }
  //   },
  //   // 对数据处理，后端给的数据无法直接使用
  //   _dataInterfaceA(data) {
  //     const { corpBaseDto, corpAttachmentDtos, corpLeaderDto } = this.corpInfo
  //     return {
  //       corpLogo: corpBaseDto.corpLogo,
  //       corpName: corpBaseDto.corpName,
  //       creditCode: corpBaseDto.creditCode,
  //       buildTime: corpBaseDto.buildTime,
  //       registerCapital: corpBaseDto.registerCapital,
  //       businessAddress: corpBaseDto.businessAddress,
  //       mailAddress: corpBaseDto.mailAddress,
  //       businessLicensePic: corpBaseDto.businessLicensePic,
  //       businessLicenseDuplicatePic:corpBaseDto.businessLicenseDuplicatePic,
  //       corpAttachmentDtos: this._dataInterfaceB(corpAttachmentDtos)
  //     }
  //     this.corporationForm = {
  //       legalName: corpBaseDto.legalName,
  //       legalMobile: corpBaseDto.legalMobile,
  //       legalCard: corpBaseDto.legalCard,
  //       legalCardPic: corpBaseDto.legalCardPic,
  //       legalCardBackPic: corpBaseDto.legalCardBackPic
  //     }
  //     this.managerInfo = {
  //       contractUser: corpLeaderDto.contractUser,
  //       contractPost: corpLeaderDto.contractPost,
  //       contractCard: corpLeaderDto.contractCard,
  //       contractTel: corpLeaderDto.contractTel,
  //       contractEmail: corpLeaderDto.contractEmail
  //     }
  //   },
  //   // 对数据处理，后端给的数据无法直接使用，补充资质证件数据处理
  //   _dataInterfaceB(data) {
  //     const result = []
  //     data.forEach(item => {
  //       if (item.filePath) {
  //         result.push(item.filePath)
  //       }
  //     })
  //     return result
  //   },
    openTab() {
      window.open(
        `https://www.tianyancha.com/search?key=${encodeURIComponent(this.basicInfo.corpName)}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
  line-height: 22px;
  color: $titleColor;
}
.form-container {
  padding: 20px 0;
  .block-form-item {
    display: block;
    width: 100% !important;
    // max-width: 1004px;
  }
  .inline-image {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 18px;
  }
}
.marb-20 {
  margin-bottom: 20px;
}
</style>
