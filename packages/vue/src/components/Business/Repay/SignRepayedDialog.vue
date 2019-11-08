<template>
  <el-dialog
    title="标记已还款"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
  >
    <div>
      <div class="block-title">收款方信息</div>
      <el-form label-width="96px" :inline="true" label-position="left" class="form-class">
        <el-form-item label="收款方银行">
          <div>{{ form.payeeBankName }}</div>
        </el-form-item>
        <el-form-item label="收款方账户名">
          <div>{{ form.payeeBankAccountName }}</div>
        </el-form-item>
        <el-form-item label="收款方账号">
          <div>{{ form.payeeBankAccountNo }}</div>
        </el-form-item>
      </el-form>

      <div class="block-title">标记付款信息</div>
      <el-form ref="form" :model="form" :rules="rules" label-width="96px" :inline="true" label-position="left" class="form-class-2">
        <el-form-item label="付款日期" prop="payerTime">
          <el-date-picker
            v-model="form.payerTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :clearable="false"
          />
        </el-form-item>
        <!-- <el-form-item label="付款金额" prop="payerAmount">
          <el-input-number v-model="form.payerAmount" :step="1" :min="1" :max="Number.MAX_SAFE_INTEGER" :step-strictly="true" controls-position="right" />
          <div class="unit">元</div>
        </el-form-item> -->
        <el-form-item label="付款方银行" prop="payerBankName">
          <el-input v-model="form.payerBankName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="付款方账户名" prop="payerBankAccountName">
          <el-input v-model="form.payerBankAccountName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="付款方账号" prop="payerBankAccountNo">
          <el-input v-model="form.payerBankAccountNo" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="回执单号" prop="payerReceiptNumber">
          <el-input v-model="form.payerReceiptNumber" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="上传凭证" prop="payerVoucherUrl">
          <file-upload :url-arr.sync="payerVoucherUrlArr" :limit="1" />
          <el-input v-show="false" v-model="form.payerVoucherUrl" />
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
import { mapGetters } from 'vuex'
import { CommonApi } from '@/api'
import { getUrlFileName } from '@/utils/'

export default {
  components: {
    FileUpload
  },
  data() {
    return {
      visible: false,
      form: {
        repayPlanDetailNo: '',
        payeeBankName: '',
        payeeBankAccountName: '',
        payeeBankAccountNo: '',
        payerTime: '',
        payerAmount: '',
        payerBankName: '',
        payerBankAccountName: '',
        payerBankAccountNo: '',
        payerReceiptNumber: '',
        payerVoucherUrl: ''
      },
      payerVoucherUrlArr: [],
      rules: {
        payerTime: [
          { required: true, message: '请选择', trigger: ['change', 'blur'] },
        ],
        payerAmount: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] },
        ],
        payerBankName: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] },
        ],
        payerBankAccountName: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] },
        ],
        payerBankAccountNo: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] },
        ],
        payerReceiptNumber: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] },
        ],
        payerVoucherUrl: [
          { required: true, message: '请上传附件', trigger: ['change', 'blur'] },
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    'payerVoucherUrlArr': {
      handler(val) {
        this.form.payerVoucherUrl = val.toString()
      }
    }
  },
  methods: {
    open(data) {
      this.visible = true
      this.form = data
    },
    close() {
      this.visible = false
      this.payerVoucherUrlArr = []
      this.$refs.form.resetFields()
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$securityCode().then(code => {
            CommonApi.signRepay({
              repayPlanDetailNo: this.form.repayPlanDetailNo,
              payerTime: this.form.payerTime,
              payerAmount: this.form.payerAmount,
              payerBankName: this.form.payerBankName,
              payerBankAccountName: this.form.payerBankAccountName,
              payerBankAccountNo: this.form.payerBankAccountNo,
              payerReceiptNumber: this.form.payerReceiptNumber,
              payerVoucher: getUrlFileName(this.form.payerVoucherUrl),
              payerVoucherUrl: this.form.payerVoucherUrl,
              repayCorpNo: this.userInfo.corpNo,
              securityCode: code,
            }).then(() => {
              this.close()
              this.$message({
                message: '标记成功',
                type: 'success'
              })
              this.$emit('callback')
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block-title {
  font-size: 16px;
  line-height: 22px;
  font-weight:500;
  color: $titleColor;
  margin-bottom: 16px;
}
.form-class {
  margin-bottom: 24px;
  /deep/ .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  /deep/ .el-form-item__content {
    width: 264px;
  }
}
.form-class-2 {
  margin-bottom: 24px;
  .unit {
    position: absolute;
    top: 0;
    right: 6px;
  }
  /deep/ .el-form-item--small.el-form-item {
    margin-bottom: 20px;
  }
  /deep/ .el-form-item__content {
    width: 264px;
  }
  /deep/ .el-date-editor.el-input {
    width: 100%;
  }
  /deep/ .el-input-number__decrease {
    display: none;
  }
  /deep/ .el-input-number__increase {
    display: none;
  }
  /deep/ .el-input-number--small {
    width: 100%;
  }
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
    width: 100%;
  }
  /deep/ .el-form-item__label::before {
    display: none;
  }
}
</style>
