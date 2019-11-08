<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="548px"
  >
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item :label="title + '企业'">
          <div>{{ originInfo.corpName }}</div>
        </el-form-item>
        <el-form-item :label="'信用额度' + title + '数量'">
          <div>{{ originInfo.showNo + '个' }}</div>
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
        type: '', // FROZEN:冻结 THAW:解冻
        quotaNo: '',
        toCorpNo: '',
        fromCorpNo: '',
        corpName: '',
        showNo: '',
      },
      form: {
        applyReason: '',
        attachments: []
      },
      rules: {}
    }
  },
  computed: {
    title() {
      return this.originInfo.type === 'FROZEN' ? '冻结' : '解冻'
    }
  },
  watch: {

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
        type: '', // FROZEN:冻结 THAW:解冻
        quotaNo: '',
        toCorpNo: '',
        fromCorpNo: '',
        corpName: '',
        showNo: '',
      }
      this.$refs.form.resetFields()
    },
    handleSubmit() {
      const data = {
        quotaOperateTransType: this.originInfo.type === 'FROZEN' ? 'FROZEN_QUOTA' : 'THAW_QUOTA',
        quotaNo: this.originInfo.quotaNo,
        toCorpNo: this.originInfo.toCorpNo,
        fromCorpNo: this.originInfo.fromCorpNo,
        applyReason: this.form.applyReason,
        attachments: this.form.attachments,
        transParam: {},
      }
      this.$securityCode().then(code => {
        data.securityCode = code
        this.triggerApi(data)
      })
    },
    triggerApi(data) {
      CommonApi.applyManageQuotaTrans(data).then(() => {
        this.$message({
          message: `${this.originInfo.type === 'FROZEN' ? '冻结' : '解冻'}申请创建成功`,
          type: 'success'
        })
        this.close()
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
