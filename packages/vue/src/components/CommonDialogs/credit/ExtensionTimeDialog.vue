<template>
  <el-dialog
    title="延长有效期"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="548px"
  >
    <div>
      <div class="origin-info">
        <div class="corpName common-text">{{ originInfo.corpName }}</div>
        <div class="item-container">
          <div class="item">{{ '信用可用额度 ' + originInfo.balAmt }}个</div>
          <div class="item">{{ '授信有效期 ' + originInfo.effectiveDate + '~' + originInfo.expireDate }}</div>
        </div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="延长有效期至" prop="changeTargetDate">
          <el-date-picker
            v-model="form.changeTargetDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            :clearable="false"
          />
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
    return {
      visible: false,
      originInfo: {
        initiator: '',
        quotaNo: '',
        toCorpNo: '',
        fromCorpNo: '',
        corpName: '',
        balAmt: '',
        effectiveDate: '',
        expireDate: ''
      },
      form: {
        changeTargetDate: '',
        applyReason: '',
        attachments: []
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() <= +this.$dayjs(this.originInfo.expireDate)
        }
      },
      rules: {
        changeTargetDate: [
          { required: true, message: '请选择', trigger: 'change' }
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
        balAmt: '',
        effectiveDate: '',
        expireDate: ''
      }
      this.$refs.form.resetFields()
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {
            quotaOperateTransType: 'EXTEND_EXPIRE_DATE',
            quotaNo: this.originInfo.quotaNo,
            toCorpNo: this.originInfo.toCorpNo,
            fromCorpNo: this.originInfo.fromCorpNo,
            transParam: {
              changeTargetDate: this.form.changeTargetDate
            },
            ...this.form
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
          message: '延长有效期申请创建成功',
          type: 'success'
        })
      })
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
</style>
