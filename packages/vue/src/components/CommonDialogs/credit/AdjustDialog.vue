<template>
  <el-dialog
    title="调额"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="548px"
  >
    <div class="body">
      <div class="origin-info">
        <div class="corpName common-text">{{ originInfo.corpName }}</div>
        <div class="item-container">
          <div class="item">{{ '信用可用额度 ' + originInfo.balAmt }}个</div>
          <div class="item">{{ '授信有效期 ' + originInfo.effectiveDate + '~' + originInfo.expireDate }}</div>
        </div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="70px" class="form-class">
        <el-form-item label="调额" prop="changeQuotaType">
          <el-radio-group v-model="form.changeQuotaType" @change="handleRadioChange">
            <el-radio label="UP">调增</el-radio>
            <el-radio label="DOWN">调减</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="调整为" prop="changeTargetQuota">
          <div class="relative">
            <el-input-number
              v-model="form.changeTargetQuota"
              controls-position="right"
              :controls="false"
              :min="1"
              :max="99999999999999"
              :step="1"
              step-strictly
            />
            <div class="suffix">个</div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="applyReason">
          <el-input v-model="form.applyReason" type="textarea" resize="none" :rows="4" :maxlength="100" show-word-limit />
        </el-form-item>
        <el-form-item label="附件" prop="attachments">
          <file-upload :url-arr.sync="form.attachments" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FileUpload from '@/components/FileUpload/index'
import { CommonApi } from '@/api/index'

export default {
  components: {
    FileUpload
  },
  data() {
    const checkNo = (rule, value, callback) => {
      if ((value === '' || value === '0' || value === undefined)) {
        return callback(new Error('请输入'))
      } else {
        const changeQuotaType = this.form.changeQuotaType
        const issueAmt = parseInt(this.originInfo.issueAmt) // 总额度
        const usedAmt = parseInt(this.originInfo.usedAmt) // 已使用
        // const balAmt = parseInt(this.originInfo.balAmt) // 可用额度
        if (changeQuotaType === 'DOWN' && (value > issueAmt || value < usedAmt)) {
          if (value > issueAmt) {
            return callback(new Error('输入数量不能大于现在总额度' + issueAmt))
          }
          if (value < usedAmt) {
            return callback(new Error('输入数量不能小于已使用额度' + usedAmt))
          }
          // return callback(new Error('输入数量需要在' + balAmt + '~' + issueAmt + '之间'))
        } else if (changeQuotaType === 'UP' && value < issueAmt) {
          return callback(new Error('输入数量不能小于当前信用可用额度' + issueAmt))
        }
        callback()
      }
    }
    return {
      visible: false,
      originInfo: {
        initiator: '',
        quotaNo: '',
        toCorpNo: '',
        fromCorpNo: '',
        corpName: '',
        issueAmt: '',
        usedAmt: '',
        balAmt: '',
        effectiveDate: '',
        expireDate: ''
      },
      form: {
        changeQuotaType: 'UP',
        changeTargetQuota: undefined,
        applyReason: '',
        attachments: []
      },
      rules: {
        changeQuotaType: [
          { required: true, message: '请选择调额方式', trigger: 'change' }
        ],
        changeTargetQuota: [
          { required: true, message: '请输入', trigger: 'change' },
          { validator: checkNo, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    open(data) {
      this.visible = true
      this.originInfo = data
    },
    close() {
      this.visible = false
      this.originInfo = {
        initiator: '',
        quotaNo: '',
        toCorpNo: '',
        fromCorpNo: '',
        corpName: '',
        issueAmt: '',
        usedAmt: '',
        balAmt: '',
        effectiveDate: '',
        expireDate: ''
      }
      this.$refs.form.resetFields()
    },
    handleInput(e) {
      this.form.changeTargetQuota = +e.target.value
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {
            quotaOperateTransType: 'CHANGE_QUOTA',
            quotaNo: this.originInfo.quotaNo,
            toCorpNo: this.originInfo.toCorpNo,
            fromCorpNo: this.originInfo.fromCorpNo,
            applyReason: this.form.applyReason,
            attachments: this.form.attachments,
            transParam: {
              changeQuotaType: this.form.changeQuotaType,
              changeTargetQuota: +this.form.changeTargetQuota
            }
          }
          this.$securityCode().then(code => {
            data.securityCode = code
            this.triggerApi(data)
          })
        }
      })
    },
    triggerApi(data) {
      CommonApi.applyManageQuotaTrans(data).then(() => {
        this.close()
        this.$message({
          message: '调额申请创建成功',
          type: 'success'
        })
      })
    },
    handleRadioChange() {
      this.form.changeTargetQuota = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.origin-info {
  padding: 12px 24px;
  background: rgba(101,85,246,0.14);
  margin-bottom: 30px;
}
.common-text {
  height:22px;
  line-height: 22px;
  font-size:16px;
}
.corpName {
  font-weight:500;
  margin-bottom: 8px;
}
.item-container {
  display: flex;
  .item {
    &:not(:first-child) {
      margin-left: 30px;
    }
  }
}
.body {
  /deep/ .el-input-number {
    width: 100%;
  }
  /deep/ .el-input-number__decrease {
    display: none;
  }
  /deep/ .el-input-number__increase {
    display: none;
  }
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
}
.sp-input{
  /deep/.el-input__inner{
    width: 290px;
  }
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
}
</style>
