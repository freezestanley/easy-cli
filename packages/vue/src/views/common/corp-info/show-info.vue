<template>
  <div class="com-show-info">
    <div v-if="corpOrderStatus === 'INIT' || corpOrderStatus === 'PROCESSING' || corpOrderStatus === 'REJECTED' || corpOrderStatus === 'SUCCESS' " class="marb-20">
      <state-tip v-if="corpOrderStatus === 'INIT' || corpOrderStatus === 'PROCESSING'" :type="'info'" :tips="auditTypeTip" />
      <state-tip v-else-if="corpOrderStatus === 'REJECTED'" :type="'error'" :tips="reason" class="marb-20" />
      <state-tip v-else-if="corpOrderStatus === 'SUCCESS'" :type="'success'" :tips="reason" class="marb-20" />

      <el-button v-if="corpOrderStatus === 'REJECTED' && checkPermission('account-corp-info__edit')" type="primary" size="medium" class="marb-20" @click="handleUpdate">重新认证</el-button>
    </div>

    <h3>
      企业基本信息
      <div v-if="corpOrderStatus === 'SUCCESS' && checkPermission('account-corp-info__edit')" class="float-right">
        <el-button type="text" size="medium" icon="el-icon-edit" @click="handleUpdate">编辑</el-button>
      </div>
    </h3>
    <el-form class="form-container" :inline="true" label-position="left" label-width="135px">
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
      <el-form-item v-if="basicForm.industry" label="所属行业">
        <div>{{ industryMap[basicForm.industry] }}</div>
      </el-form-item>
      <el-form-item v-if="basicForm.scale" label="企业规模">
        <div>{{ scaleMap[basicForm.scale] }}</div>
      </el-form-item>
      <el-form-item label="营业执照-正件" class="block-form-item">
        <image-upload v-if="basicForm.businessLicensePic" :url.sync="basicForm.businessLicensePic" :no-delete="true" />

      </el-form-item>
      <el-form-item label="营业执照-副件" class="block-form-item">
        <image-upload v-if="basicForm.businessLicenseDuplicatePic" :url.sync="basicForm.businessLicenseDuplicatePic" :no-delete="true" />

      </el-form-item>
      <el-form-item label="补充资质证件" class="block-form-item">
        <div v-if="basicForm.corpAttachmentDtos.length">
          <div v-for="(item, index) in basicForm.corpAttachmentDtos" :key="index">
            <file-show :url="item" :direct="true" />
          </div>
        </div>
      </el-form-item>
    </el-form>

    <h3>企业法人信息</h3>
    <el-form class="form-container" :inline="true" label-position="left" label-width="135px">
      <el-form-item label="法人姓名">
        <div>{{ corporationForm.legalName }}</div>
      </el-form-item>
      <el-form-item label="法人手机号">
        <div>{{ corporationForm.legalMobile }}</div>
      </el-form-item>
      <el-form-item label="法人身份证号">
        <div>{{ corporationForm.legalCard }}</div>
      </el-form-item>
      <el-form-item label="身份证正面" class="block-form-item">
        <image-upload v-if="corporationForm.legalCardPic" :url.sync="corporationForm.legalCardPic" :no-delete="true" />

      </el-form-item>
      <el-form-item label="身份证反面" class="block-form-item">
        <image-upload v-if="corporationForm.legalCardBackPic" :url.sync="corporationForm.legalCardBackPic" :no-delete="true" />

      </el-form-item>
    </el-form>

    <h3>业务负责人信息</h3>
    <el-form class="form-container" :inline="true" label-position="left" label-width="135px">
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
import { mapGetters } from 'vuex'
import StateTip from './components/StateTip'
import ImageUpload from './components/ImageUpload'
import FileShow from '@/components/FileShow/index'
import checkPermission from '@/utils/permission'
import { industryMap, scaleMap } from '@/utils/industry'
import { CommonApi } from '@/api'

export default {
  name: 'ShowInfo',
  components: {
    StateTip,
    ImageUpload,
    FileShow
  },
  data () {
    return {
      industryMap,
      scaleMap,
      reason: '', // 拒绝原因
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
        corpAttachmentDtos: [],
        industry: '',
        scale: '',
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
      },
      auditType: 'AUTH', // 审核类型， AUTH, CHANGE 变更
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    corpStatus() {
      return this.userInfo.corpStatus
    },
    corpOrderStatus() {
      return this.userInfo.corpOrderStatus
    },
    auditTypeTip() {
      return this.auditType === 'CHANGE' ? '企业信息变更审核中' : '企业认证中，审核通过后将开放更多功能'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    checkPermission,
    getData() {
      CommonApi.getCorpInfo({
        corpNo: this.userInfo.corpNo,
      }).then(res => {
        this._dataInterfaceA(res.data)
      })
    },
    // 对数据处理，后端给的数据无法直接使用
    _dataInterfaceA(data) {
      this.reason = data.corpDto.reason || ''
      this.auditType = data.corpDto.auditType || 'AUTH'
      this.basicForm = {
        corpLogo: data.corpBaseDto.corpLogo || '',
        corpName: data.corpBaseDto.corpName,
        creditCode: data.corpBaseDto.creditCode,
        buildTime: data.corpBaseDto.buildTime,
        registerCapital: data.corpBaseDto.registerCapital,
        businessAddress: data.corpBaseDto.businessAddress,
        mailAddress: data.corpBaseDto.mailAddress,
        businessLicensePic: data.corpBaseDto.businessLicensePic,
        businessLicenseDuplicatePic: data.corpBaseDto.businessLicenseDuplicatePic,
        corpAttachmentDtos: this._dataInterfaceB(data.corpAttachmentDtos),
        industry: data.corpBaseDto.industry,
        scale: data.corpBaseDto.scale,
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
    handleUpdate() {
      this.$emit('handleUpdate', {
        basicForm: this.basicForm,
        corporationForm: this.corporationForm,
        managerForm: this.managerForm
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #ffffff;
}
h3 {
  margin: 0;
  line-height: 22px;
  color: $titleColor;
}
.float-right {
  float: right;
}
.form-container {
  padding: 32px 0;
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
    width: 362px
  }
}
.marb-20 {
  margin-bottom: 20px;
}
</style>

