<template>
  <!-- 审核 -->
  <el-dialog
    :visible.sync="digAudit"
    :append-to-body="true"
    title="签发复核"
    width="520px"
    @closed="handleAuditClose"
  >
    <el-form ref="auditFormEl" :model="auditForm" :rules="auditRules">
      <el-form-item label="企业名称" prop="corpName">{{ corpName }}</el-form-item>
      <el-form-item label="审核结果">
        <el-radio-group v-model="auditForm.approve" prop="approve" style="width:400px">
          <el-radio :label="true">复核通过</el-radio>
          <el-radio :label="false" style="margin-left:15%">复核驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="auditForm.approve==false" label="驳回原因" prop="reason">
        <el-input
          v-model="auditForm.reason"
          :rows="4"
          :maxlength="100"
          show-word-limit
          style="width:400px"
          type="textarea"
          resize="none"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleAuditClose">取 消</el-button>
      <el-button type="primary" @click="handleAuditSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Validator from '@/utils/validator'
export default {
  name: 'ReCheckDialog',
  props: {},
  data() {
    return {
      digAudit: false,
      corpName: '',
      auditForm: {
        // 复核
        approve: true,
        reason: '',
        transNo: ''
      },
      auditRules: {
        reason: [Validator.isRequired('请输入驳回原因')]
      }
    }
  },
  methods: {
    open(obj) {
      this.corpName = obj.name
      this.auditForm.transNo = obj.transNo
      this.digAudit = true
    },
    close() {
      this.digAudit = false
    },
    handleAuditClose() {
      this.digAudit = false
      this.resetAuditForm()
    },
    resetAuditForm() {
      this.auditForm.approve = true
      this.$refs.auditFormEl.resetFields()
    },
    handleAuditSubmit() {
      this.$refs.auditFormEl.validate(vaild => {
        if (vaild) {
          this.$emit('submit', this.auditForm)
          // this.handleAuditClose()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.digWrap {
  font-size: 14px;
  > p {
    padding: 5px 0;
  }
  label {
    display: inline-block;
    width: 100px;
    color: $labelColor;
  }
  span {
    color: $titleColor;
  }
}
</style>
