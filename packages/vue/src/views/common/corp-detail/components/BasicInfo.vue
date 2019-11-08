<template>
  <div>
    <h3>
      企业基本信息
      <el-button size="medium" type="primary" @click="openTab">前往天眼查</el-button>
    </h3>
    <el-form :inline="true" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="公司LOGO" class="block-form-item">
        <image-upload v-if="basicForm.corpLogo" :url.sync="basicForm.corpLogo" :no-delete="true" />
      </el-form-item>
      <el-form-item label="企业名称">
        <div>{{ basicForm.corpName }}</div>
      </el-form-item>
      <el-form-item label="统一社会信用代码">
        <div>{{ basicForm.creditCode }}</div>
      </el-form-item>
      <el-form-item label="成立日期">
        <div>{{ basicForm.buildTime ? $dayjs(basicForm.buildTime).format('YYYY-MM-DD') : '' }}</div>
      </el-form-item>
      <el-form-item label="注册资本">
        <div>{{ basicForm.registerCapital ? basicForm.registerCapital + '万元' : '' }}</div>
      </el-form-item>
      <el-form-item label="注册地址">
        <div>{{ basicForm.businessAddress }}</div>
      </el-form-item>
      <el-form-item label="通信地址">
        <div>{{ basicForm.mailAddress }}</div>
      </el-form-item>
      <el-form-item class="block-form-item" label="营业执照-正件">
        <image-upload
          v-if="basicForm.businessLicensePic"
          :no-delete="true"
          :url.sync="basicForm.businessLicensePic"
        />
      </el-form-item>
      <el-form-item class="block-form-item" label="营业执照-副件">
        <image-upload
          v-if="basicForm.businessLicenseDuplicatePic"
          :no-delete="true"
          :url.sync="basicForm.businessLicenseDuplicatePic"
        />
      </el-form-item>
      <el-form-item class="block-form-item" label="补充资质证件">
        <div v-if="basicForm.corpAttachmentDtos.length">
          <div v-for="(item, index) in basicForm.corpAttachmentDtos" :key="index">
            <file-show :url="item" :direct="true" />
          </div>
        </div>
      </el-form-item>
    </el-form>

    <h3>企业法人信息</h3>
    <el-form :inline="true" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="法人姓名">
        <div>{{ corporationForm.legalName }}</div>
      </el-form-item>
      <el-form-item label="法人手机号">
        <div>{{ corporationForm.legalMobile }}</div>
      </el-form-item>
      <el-form-item label="法人身份证号">
        <div>{{ corporationForm.legalCard }}</div>
      </el-form-item>
      <el-form-item class="block-form-item" label="身份证正面">
        <image-upload
          v-if="corporationForm.legalCardPic"
          :no-delete="true"
          :url.sync="corporationForm.legalCardPic"
        />
      </el-form-item>
      <el-form-item class="block-form-item" label="身份证反面">
        <image-upload
          v-if="corporationForm.legalCardBackPic"
          :no-delete="true"
          :url.sync="corporationForm.legalCardBackPic"
        />
      </el-form-item>
    </el-form>

    <h3>业务负责人信息</h3>
    <el-form :inline="true" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="业务负责人姓名">
        <div>{{ managerForm.contractUser }}</div>
      </el-form-item>
      <el-form-item label="职务">
        <div>{{ managerForm.contractPost }}</div>
      </el-form-item>
      <el-form-item label="身份证号">
        <div>{{ managerForm.contractCard }}</div>
      </el-form-item>
      <el-form-item label="手机号">
        <div>{{ managerForm.contractTel }}</div>
      </el-form-item>
      <el-form-item label="邮箱">
        <div>{{ managerForm.contractEmail }}</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from '@/views/common/corp-info/components/ImageUpload'
import FileShow from '@/components/FileShow/index'

import { CommonApi, PlatformApi } from '@/api'

export default {
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
    }
  },
  data() {
    return {
      basicForm: {
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
      corporationForm: {
        legalName: '',
        legalMobile: '',
        legalCard: '',
        legalCardPic: '',
        legalCardBackPic: ''
      },
      managerForm: {
        contractUser: '',
        contractPost: '',
        contractCard: '',
        contractTel: '',
        contractEmail: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // 判断是否从企业认证过来 查看企业审核中信息
      if (this.transNo !== '') {
        PlatformApi.getEntDetail({
          transNo: this.transNo
        }).then(res => {
          this._dataInterfaceA(res.data)
        })
      } else {
        CommonApi.getCorpInfo({
          corpNo: this.corpNo
        }).then(res => {
          this._dataInterfaceA(res.data)
        })
      }
    },
    // 对数据处理，后端给的数据无法直接使用
    _dataInterfaceA(data) {
      this.basicForm = {
        corpLogo: data.corpBaseDto.corpLogo,
        corpName: data.corpBaseDto.corpName,
        creditCode: data.corpBaseDto.creditCode,
        buildTime: data.corpBaseDto.buildTime,
        registerCapital: data.corpBaseDto.registerCapital,
        businessAddress: data.corpBaseDto.businessAddress,
        mailAddress: data.corpBaseDto.mailAddress,
        businessLicensePic: data.corpBaseDto.businessLicensePic,
        businessLicenseDuplicatePic:
          data.corpBaseDto.businessLicenseDuplicatePic,
        corpAttachmentDtos: this._dataInterfaceB(data.corpAttachmentDtos)
      }
      this.corporationForm = {
        legalName: data.corpBaseDto.legalName,
        legalMobile: data.corpBaseDto.legalMobile,
        legalCard: data.corpBaseDto.legalCard,
        legalCardPic: data.corpBaseDto.legalCardPic,
        legalCardBackPic: data.corpBaseDto.legalCardBackPic
      }
      this.managerForm = {
        contractUser: data.corpLeaderDto.contractUser,
        contractPost: data.corpLeaderDto.contractPost,
        contractCard: data.corpLeaderDto.contractCard,
        contractTel: data.corpLeaderDto.contractTel,
        contractEmail: data.corpLeaderDto.contractEmail
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
    openTab() {
      window.open(
        `https://www.tianyancha.com/search?key=${encodeURIComponent(this.basicForm.corpName)}`
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
.float-right {
  float: right;
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
  /deep/ .el-date-editor.el-input {
    width: 100%;
  }
  /deep/ .el-form-item {
    width: 497px;
  }
  /deep/ .el-form-item__content {
    width: 362px;
  }
}
.marb-20 {
  margin-bottom: 20px;
}
</style>
