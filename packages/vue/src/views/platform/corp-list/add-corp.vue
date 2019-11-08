<template>
  <div class="com-add-info">
    <h3>企业基本信息</h3>
    <el-form ref="basicForm" :model="basicForm" :rules="ruleBasic" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="企业类型" prop="corpType">
        <el-select v-model="basicForm.corpType" placeholder="请选择企业类型" class="el-input">
          <el-option v-for="(item, index) in ROLE_TYPE_LIST_PLATFORM" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="公司LOGO" prop="corpLogo">
        <image-upload :url.sync="basicForm.corpLogo" />
        <el-input v-show="false" v-model="basicForm.corpLogo" />
      </el-form-item>
      <el-form-item label="企业名称" prop="corpName">
        <el-input v-model.trim="basicForm.corpName" type="text" clearable auto-complete="off" :maxlength="30" :show-word-limit="true" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="creditCode">
        <el-input v-model.trim="basicForm.creditCode" type="text" clearable auto-complete="off" placeholder="请输入统一社会信用代码" />
      </el-form-item>
      <el-form-item label="成立日期" prop="buildTime">
        <el-date-picker v-model="basicForm.buildTime" type="date" placeholder="请选择" value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>
      <el-form-item label="注册资本" prop="registerCapital">
        <div class="relative">
          <el-input-number
            v-model="basicForm.registerCapital"
            controls-position="right"
            :controls="false"
            :min="0.0001"
            :max="9999999999.9999"
            :step="0.0001"
            step-strictly
            placeholder="请输入注册资本"
          />
          <div class="suffix">万元</div>
        </div>
      </el-form-item>
      <el-form-item label="注册地址" prop="businessAddress">
        <el-input v-model.trim="basicForm.businessAddress" type="text" clearable auto-complete="off" :maxlength="50" :show-word-limit="true" placeholder="请输入注册地址" />
      </el-form-item>
      <el-form-item label="通信地址" prop="mailAddress">
        <el-input v-model.trim="basicForm.mailAddress" type="text" clearable auto-complete="off" :maxlength="50" :show-word-limit="true" placeholder="请输入通信地址" />
      </el-form-item>
      <el-form-item label="所属行业" prop="industry">
        <el-select v-model="basicForm.industry " placeholder="请选择企业所在行业" class="el-input">
          <el-option value>请选择</el-option>
          <el-option v-for="s in industrys" :key="s.value" :label="s.label" :value="s.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="企业规模" prop="scale">
        <el-select v-model="basicForm.scale " placeholder="请选择企业所在行业" class="el-input">
          <el-option value>请选择</el-option>
          <el-option v-for="s in scales" :key="s.value" :label="s.label" :value="s.value" />
        </el-select>
        <div class="disabled">中小企业的划分标准可参考
          <a :href="QIYE_TYPE_URL" target="_blank" class="theme">
            《关于印发中小企业划型标准规定的通知》
          </a>
          工信部联企业【2011】300号。
        </div>
      </el-form-item>
      <el-form-item label="营业执照-正件" prop="businessLicensePic">
        <image-upload :url.sync="basicForm.businessLicensePic" />
        <el-input v-show="false" v-model="basicForm.businessLicensePic" />
      </el-form-item>
      <el-form-item label="营业执照-副件" prop="businessLicenseDuplicatePic">
        <image-upload :url.sync="basicForm.businessLicenseDuplicatePic" />
        <el-input v-show="false" v-model="basicForm.businessLicenseDuplicatePic" />
      </el-form-item>
      <el-form-item label="补充资质证件 （选填）" prop="corpAttachmentDtos">
        <file-upload :url-arr.sync="basicForm.corpAttachmentDtos" />
      </el-form-item>
    </el-form>

    <h3>企业法人信息</h3>
    <el-form ref="corporationForm" :model="corporationForm" :rules="ruleCorporation" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="法人姓名" prop="legalName">
        <el-input v-model.trim="corporationForm.legalName" type="text" clearable auto-complete="off" :maxlength="20" :show-word-limit="true" placeholder="请输入法人姓名" />
      </el-form-item>
      <el-form-item label="法人手机号" prop="legalMobile">
        <el-input v-model.trim="corporationForm.legalMobile" type="text" clearable auto-complete="off" placeholder="请输入法人手机号" />
      </el-form-item>
      <el-form-item label="法人身份证号" prop="legalCard">
        <el-input v-model.trim="corporationForm.legalCard" type="text" clearable auto-complete="off" placeholder="请输入法人身份证号" />
      </el-form-item>
      <el-form-item label="身份证正面" prop="legalCardPic">
        <image-upload :url.sync="corporationForm.legalCardPic" />
        <el-input v-show="false" v-model="corporationForm.legalCardPic" />
      </el-form-item>
      <el-form-item label="身份证反面" prop="legalCardBackPic">
        <image-upload :url.sync="corporationForm.legalCardBackPic" />
        <el-input v-show="false" v-model="corporationForm.legalCardBackPic" />
      </el-form-item>
    </el-form>

    <h3>业务负责人信息</h3>
    <el-form ref="managerForm" :model="managerForm" :rules="ruleManager" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="业务负责人姓名" prop="contractUser">
        <el-input v-model.trim="managerForm.contractUser" type="text" clearable auto-complete="off" :maxlength="20" :show-word-limit="true" placeholder="请输入业务负责人姓名" />
      </el-form-item>
      <el-form-item label="职务" prop="contractPost">
        <el-input v-model.trim="managerForm.contractPost" type="text" clearable auto-complete="off" :maxlength="20" :show-word-limit="true" placeholder="请输入业务负责人职务" />
      </el-form-item>
      <el-form-item label="身份证号" prop="contractCard">
        <el-input v-model.trim="managerForm.contractCard" type="text" clearable auto-complete="off" placeholder="请输入业务负责人身份证号" />
      </el-form-item>
      <el-form-item label="手机号" prop="contractTel">
        <el-input v-model.trim="managerForm.contractTel" type="text" clearable auto-complete="off" placeholder="请输入业务负责人手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="contractEmail">
        <el-input v-model.trim="managerForm.contractEmail" type="text" clearable auto-complete="off" placeholder="请输入业务负责人邮箱" />
      </el-form-item>
    </el-form>

    <h3>企业账号信息</h3>
    <el-form ref="accountForm" :model="accountForm" :rules="ruleAccount" class="form-container" label-position="left" label-width="135px">
      <el-form-item label="企业账号" prop="operName">
        <el-input v-model.trim="accountForm.operName" type="text" clearable auto-complete="off" :maxlength="20" :show-word-limit="true" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="企业联系人" prop="nickName">
        <el-input v-model.trim="accountForm.nickName" type="text" clearable auto-complete="off" :maxlength="20" :show-word-limit="true" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="联系人邮箱" prop="email">
        <el-input v-model.trim="accountForm.email" type="text" clearable auto-complete="off" placeholder="请输入联系人邮箱" />
      </el-form-item>
      <el-form-item class="tac">
        <!-- <el-button @click="back">取消</el-button> -->
        <el-button type="primary" @click="submit">确认添加</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImageUpload from '@/views/common/corp-info/components/ImageUpload'
import FileUpload from '@/components/FileUpload/index'
import { Regs } from '@/utils/validator.js'
import { industrys, scales } from '@/utils/industry'
import { QIYE_TYPE_URL, ROLE_TYPE_LIST_PLATFORM } from '@/utils/constant/corp-info'
import { CommonApi } from '@/api'

export default {
  name: '',
  components: {
    ImageUpload,
    FileUpload
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!Regs.isPhone(value)) {
        return callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    const validateUSCC = (rule, value, callback) => {
      if (!Regs.isUSCC(value)) {
        return callback(new Error('统一社会信用代码格式不正确'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value && !Regs.isEmail(value)) {
        return callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const validateIdNo = (rule, value, callback) => {
      if (!Regs.isIdCardNo(value)) {
        return callback(new Error('身份证号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      industrys,
      scales,
      QIYE_TYPE_URL,
      ROLE_TYPE_LIST_PLATFORM,
      basicForm: {
        corpType: '',
        corpLogo: '',
        corpName: '',
        creditCode: '',
        buildTime: '',
        registerCapital: undefined,
        businessAddress: '',
        mailAddress: '',
        industry: '',
        scale: '',
        businessLicensePic: '',
        businessLicenseDuplicatePic: '',
        corpAttachmentDtos: []
      },
      ruleBasic: {
        corpType: [
          { required: true, message: '请选择企业类型', trigger: 'change' }
        ],
        corpLogo: [
          { required: true, message: '请上传企业LOGO', trigger: 'change' }
        ],
        corpName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { validator: validateUSCC, trigger: 'blur' }
        ],
        buildTime: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        registerCapital: [
          { required: true, message: '请输入注册资本', trigger: 'blur' },
        ],
        businessAddress: [
          { required: true, message: '请输入注册地址', trigger: 'blur' }
        ],
        mailAddress: [
          { required: true, message: '请输入通信地址', trigger: 'blur' }
        ],
        industry: [
          { required: true, message: '请选择所属行业', trigger: 'blur' }
        ],
        scale: [
          { required: true, message: '请选择企业规模', trigger: 'blur' }
        ],
        businessLicensePic: [
          { required: true, message: '请上传营业执照-正件', trigger: 'change' }
        ],
        businessLicenseDuplicatePic: [
          { required: true, message: '请上传营业执照-副件', trigger: 'change' }
        ]
      },
      corporationForm: {
        legalName: '',
        legalMobile: '',
        legalCard: '',
        legalCardPic: '',
        legalCardBackPic: ''
      },
      ruleCorporation: {
        legalName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        legalMobile: [
          { required: true, message: '请输入法人手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        legalCard: [
          { required: true, message: '请输入法人身份证号', trigger: 'blur' },
          { validator: validateIdNo, trigger: 'blur' }
        ],
        legalCardPic: [
          { required: true, message: '请上传', trigger: 'change' }
        ],
        legalCardBackPic: [
          { required: true, message: '请上传', trigger: 'change' }
        ]
      },
      managerForm: {
        contractUser: '',
        contractPost: '',
        contractCard: '',
        contractTel: '',
        contractEmail: ''
      },
      ruleManager: {
        contractUser: [
          { required: true, message: '请输入业务负责人姓名', trigger: 'blur' }
        ],
        contractPost: [
          { required: true, message: '请输入业务负责人职务', trigger: 'blur' }
        ],
        contractCard: [
          { required: true, message: '请输入业务负责人身份证号', trigger: 'blur' },
          { validator: validateIdNo, trigger: 'blur' }
        ],
        contractTel: [
          { required: true, message: '请输入业务负责人手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        contractEmail: [
          { required: true, message: '请输入业务负责人邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      accountForm: {
        operName: '',
        nickName: '',
        email: '',
      },
      ruleAccount: {
        operName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        nickName: [
          { required: true, message: '请输入企业联系人', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入企业联系人邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    submit() {
      const promises = ['basicForm', 'corporationForm', 'managerForm', 'accountForm'].map((item) => this.validateForm(item))
      Promise.all(promises).then(() => {
        const addData = this._dataInterfaceA()
        CommonApi.platformAddCorpInfo(addData).then(() => {
          // this.$message({ message: '已发送该账户信息（账号+初始密码）和秘钥（登录时绑定动态码使用）到该用户 wijiang@zhongan.io 邮箱，请该用户及时下载App，完成动态码绑定后并修改登录密码', type: 'success' })
          // this.$router.go(-1)
          this.$confirm(`已发送该账户信息（账号+初始密码）和秘钥（登录时绑定动态码使用）到该用户 ${addData.email} 邮箱，请该用户及时下载App，完成动态码绑定后并修改登录密码`, '提交成功', {
            confirmButtonText: '知道了',
            showCancelButton: false,
            type: 'success'
          }).then(() => {
            this.$router.go(-1)
          }).catch(() => {
            this.$router.go(-1)
          })
        })
      }).catch(() => {})
    },
    validateForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 对数据处理，传给后端
    _dataInterfaceA() {
      return {
        corpNo: this.userInfo.corpNo,
        corpType: this.basicForm.corpType,
        operName: this.accountForm.operName,
        nickName: this.accountForm.nickName,
        email: this.accountForm.email,
        corpBaseDto: {
          ...this.basicForm,
          ...this.corporationForm
        },
        corpLeaderDto: {
          ...this.managerForm
        },
        corpAttachmentDtos: this._dataInterfaceB()
      }
    },
    // 对数据处理，传给后端，补充资质证件数据处理
    _dataInterfaceB() {
      const result = []
      this.basicForm.corpAttachmentDtos.forEach(item => {
        if (item) {
          result.push({
            filePath: item,
            fileType: 'Other'
          })
        }
      })
      return result
    },
    setData(data) {
      this.basicForm = data.basicForm
      this.corporationForm = data.corporationForm
      this.managerForm = data.managerForm
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
.form-container {
  width: 628px;
  padding: 32px 0;
  /deep/ .el-date-editor.el-input {
    width: 100%;
  }
  /deep/ .el-input-number {
    width: 100%;
  }
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
  /deep/ .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }
  /deep/ .el-form-item__label::before {
    display: none;
  }
  /deep/ .el-input .el-input__count .el-input__count-inner {
    line-height: initial;
  }
}
.submit-buttons {
  text-align: center;
}
.relative {
  position: relative;
}
.suffix {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #909399;
}
</style>

