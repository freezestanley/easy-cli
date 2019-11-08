<template>
  <el-dialog
    title="拒绝收款"
    :visible.sync="dialogVisible"
    :before-close="close"
    :append-to-body="true"
    width="520px"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="96px" label-position="left" class="form-class">
      <el-form-item label="拒绝原因" prop="opinion">
        <el-input v-model="form.opinion" type="textarea" maxlength="100" :show-word-limit="true" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { CommonApi } from '@/api'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        repayPlanDetailNo: '',
        collectionCorpNo: '',
        opinion: ''
      },
      rules: {
        opinion: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] },
        ]
      }
    }
  },
  methods: {
    open(data) {
      this.dialogVisible = true
      this.form = data
    },
    close() {
      this.dialogVisible = false
      this.form = {
        repayPlanDetailNo: '',
        collectionCorpNo: '',
        opinion: ''
      }
      this.$refs.form.resetFields()
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$securityCode().then(code => {
            CommonApi.rejectCollection({
              ...this.form,
              securityCode: code,
            }).then(() => {
              this.close()
              this.$message({
                message: '拒绝成功',
                type: 'success'
              })
              this.$emit('callback')
            })
          })
        }
      })
    },
  }
}
</script>
