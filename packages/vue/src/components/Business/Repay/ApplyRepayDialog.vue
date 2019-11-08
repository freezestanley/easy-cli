<template>
  <el-dialog
    title="申请还款"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="520px"
  >
    <div>
      <div class="tip-container marb-24">
        <div class="tip-main">申请还款会先冻结收款方{{ TOKEN__NAME }}</div>
        <div class="tip-desc">在您标记还款且对方确认收款后，授信有效期内还款对应的{{ TOKEN__NAME }}数量会返回您的授信额度，您可再次签发使用。</div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="138px" label-position="left" class="form-class">
        <el-form-item :label="`${TOKEN__NAME}数量`">
          <div class="flex">
            <div>
              {{ otherData.unpaidTokenCount!=null ? numToStr(otherData.unpaidTokenCount,'个') : '' }}
              <span v-if="otherData.unpaidTokenCount!=null">{{ `，折合 人民币 ${numToStr(otherData.unpaidTokenCount)}` }}</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="`本次还款${TOKEN__NAME}数量`" prop="paidTokenCount">
          <div>
            <div class="relative">
              <el-input-number
                v-model="form.paidTokenCount"
                controls-position="right"
                :controls="false"
                :min="1"
                :max="Number(otherData.unpaidTokenCount)"
                :step="1"
                step-strictly
              />
              <div class="suffix">个</div>
            </div>
            <div v-if="form.paidTokenCount">{{ `折合 人民币 ${numToStr(form.paidTokenCount)}` }}</div>
          </div>

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
import { CommonApi } from '@/api'
import { numToStr } from '@/utils/validator'

export default {
  data() {
    const checkNo = (rule, value, callback) => {
      if ((value === '' || value === undefined)) {
        return callback(new Error('请输入'))
      } else {
        const unpaidTokenCount = parseInt(this.otherData.unpaidTokenCount) // 需要还的token总数
        if (value > unpaidTokenCount) {
          return callback(new Error('输入数量不能大于' + this.otherData.unpaidTokenCount))
        }
        callback()
      }
    }
    return {
      visible: false,
      form: {
        paidTokenCount: undefined,
      },
      rules: {
        paidTokenCount: [
          { required: true, message: '请输入还款数量', trigger: ['blur', 'change'] },
          { validator: checkNo, trigger: ['blur', 'change'] }
        ]
      },
      otherData: {
        unpaidTokenCount: '',
        repayCorpNo: '',
        repayCorpType: '', // CORE-核心企业, CHAIN-链属企业 ,
        repayPlanNo: '',
        tokenNo: ''
      },
    }
  },
  methods: {
    numToStr,
    open(data) {
      this.visible = true
      this.otherData = data
    },
    close() {
      this.visible = false
      this.otherData = {
        unpaidTokenCount: '',
        repayCorpNo: '',
        repayCorpType: '', // CORE-核心企业, CHAIN-链属企业 ,
        repayPlanNo: '',
        tokenNo: ''
      }
      this.$refs.form.resetFields()
    },
    handleInput(e) {
      this.form.paidTokenCount = e.target.value
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$securityCode().then(code => {
            CommonApi.applyRepay({
              ...this.form,
              ...this.otherData,
              securityCode: code,
            }).then(() => {
              this.close()
              this.$message({
                message: '申请成功',
                type: 'success'
              })
              this.$emit('callback')
            }).catch((e) => {
              if (e === '400001') {
                this.$confirm(`您还有还款未确认订单, 对方确认后才可继续申请!`, {
                  title: '提示',
                  type: 'warning',
                  showCancelButton: false
                }).then(() => {
                }).catch(() => {
                })
              }
              this.close()
            })
          })
        }
      })
    },
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
.tip-container {
  background:rgba(104,88,246,0.098);
  border-radius:4px;
  padding: 8px 16px;
}
.tip-main {
  height:22px;
  font-size:16px;
  font-weight:500;
  color: $titleColor;
  line-height:22px;
  margin-bottom: 8px;
}
.tip-desc {
  font-size:14px;
  color: $textColor;
  line-height:20px;
}
.marb-24 {
  margin-bottom: 24px;
}
.form-class {
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
.flex {
  display: flex;
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
