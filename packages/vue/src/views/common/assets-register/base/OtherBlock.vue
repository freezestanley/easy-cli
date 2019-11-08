<template>
  <div class="wrap">
    <slot />
    <el-form-item label="发票附件">
      <file-upload
        :files="oldFileList"
        :url-arr.sync="form.uploadFile"
        @delete="handleFileDel"
        @success="handleFileChange"
      />
    </el-form-item>
  </div>
</template>
<script>
import FileUpload from '@/components/FileUpload/index'
import FormMixin from './FormMixin'
export default {
  name: 'OtherBlock',
  components: {
    FileUpload
  },
  mixins: [FormMixin],
  data() {
    return {
      form: { uploadFile: [] },
      oldFileList: []
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 0;
}

.inputContent {
  width: 550px;
  .el-form {
    .el-form-item__label {
      text-align: left !important;
    }
  }
}
</style>
