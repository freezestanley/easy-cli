<template>
  <el-dialog
    title="调增"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="548px"
  >
    <div class="body">
      <div class="origin-info">
        <div class="item-container">
          <div class="item">{{ '信用可用额度 ' + originInfo.balAmt }}个</div>
          <div class="item">{{ '授信有效期 ' + originInfo.effectiveDate + ' ~ ' + originInfo.expireDate }}</div>
        </div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="70px" class="form-class">
        <el-form-item label="调增至" prop="no">
          <div class="relative">
            <el-input-number
              v-model="form.no"
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
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('form')">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { CommonApi } from '@/api/index'

export default {
  data() {
    const checkNo = (rule, value, callback) => {
      if ((value === '' || value === undefined || value === 0)) {
        return callback(new Error('请输入'))
      } else {
        const originNum = parseInt(this.originInfo.balAmt)
        if (originNum >= value) {
          return callback(new Error('输入数量不能小于' + originNum))
        }
        callback()
      }
    }
    return {
      visible: false,
      originInfo: {
        corpNo: '',
        availableNo: '',
        startTime: '',
        endTime: ''
      },
      form: {
        no: undefined,
      },
      rules: {
        no: [
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
      this.$refs.form.resetFields()
    },
    handleSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data = {
            quotaOperateTransType: 'CHANGE_QUOTA',
            quotaNo: this.originInfo.quotaNo,
            toCorpNo: this.originInfo.toCorpNo,
            fromCorpNo: this.originInfo.fromCorpNo,
            transParam: {
              changeQuotaType: 'UP',
              changeTargetQuota: +this.form.no
            },
          }
          this.$securityCode().then(code => {
            data.securityCode = code
            this.triggerApi(data)
          })
        }
      })
    },
    triggerApi(signData) {
      CommonApi.applyManageQuotaTrans(signData).then(res => {
        this.visible = false
        this.$emit('onOkHandle')
      }).finally(() => {
        this.loading = false
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
  padding: 20px auto 20px 24px;
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
