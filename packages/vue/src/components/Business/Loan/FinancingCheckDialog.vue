<template>
  <el-dialog
    title="复核"
    :visible.sync="dialogVisible"
    :before-close="close"
    :append-to-body="true"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="form-class">
      <el-form-item label="复核结果">
        <el-radio-group v-model="form.status">
          <el-radio :label="true">复核通过</el-radio>
          <el-radio :label="false">复核驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.status === false" label="备注" prop="opinion">
        <el-input
          v-model="form.opinion"
          type="textarea"
          :rows="4"
          :maxlength="100"
          :show-word-limit="true"
          placeholder="请输入驳回原因"
          resize="none"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'FinancingCheckDialog',
  data() {
    return {
      dialogVisible: false,
      form: {
        transNo: '',
        status: true,
        opinion: ''
      },
      rules: {
        opinion: [
          { required: true, message: '请输入驳回原因', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open(data) {
      this.dialogVisible = true
      this.form.transNo = data.transNo
      this.form.corpNo = data.corpNo
    },
    close() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      this.form.status = true
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.status = this.form.status ? 'CHAIN_CORP_REVIEWED' : 'CHAIN_CORP_REVIEW_REJECTED'
          const data = JSON.stringify(this.form)
          this.close()
          this.$emit('callback', JSON.parse(data))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
