<template>
  <div class="upload">
    <el-upload
      :action="action"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :file-list="files"
      :headers="{ token: token }"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      class="upload-demo"
      multiple
    >
      <el-button size="small" type="text">
        <i class="el-icon-plus" /> 点击上传
      </el-button>
      <div slot="tip" class="el-upload__tip">请选择文件，且不超过{{ maxSize }}M</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="430px" :append-to-body="true">
      <img v-if="previewUrl" :src="previewUrl" alt width="100%">
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { CommonApi } from '@/api'
import store from '@/store'
import { FILE_TYEPS } from '@/utils//constant/index'
export default {
  name: 'UploadFile',
  props: {
    url: {
      type: [Array, String],
      required: true
    },
    limit: {
      type: Number,
      default: 10
    },
    suffix: {
      type: Array,
      default: function() {
        return [...FILE_TYEPS, 'mp4']
      }
    },
    maxSize: {
      type: Number,
      default: 2
    },
    files: { type: Array, default: () => [] },
    noDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      action: CommonApi.UPLOAD_URL,
      dialogImageUrl: '',
      dialogVisible: false,
      previewUrl: '',
      token: store.getters.token,
      uploadFile: [] // 上传文件列表
    }
  },
  updated(val) {
    // console.log('updated')
  },
  mounted() {
  },
  methods: {
    beforeRemove() {},
    getFileType(type) {
      const dotIndex = type.lastIndexOf('.')
      return type.slice(dotIndex + 1)
    },
    // // 上传前校验文件类型和文件大小
    beforeUpload(file) {
      const isAllowFile = this.suffix.includes(this.getFileType(file.name))
      const isOverSize = file.size <= 1024 * 1024 * +this.maxSize
      if (!isAllowFile) {
        this.$message.error(`上传文件只能是 ${this.suffix.join('/')} 格式!`)
        return false
      }
      if (!isOverSize) {
        this.$alert(`上传文件已超过 ${this.maxSize}M`, '提示', {
          confirmButtonText: '知道了'
        }).catch(() => {})
      }
      return isAllowFile && isOverSize
    },
    uploadSuccess(res, file) {
      if (res.resultCode === '000000') {
        this.uploadFile.push({ ...res, name: file.name })
        this.$emit('update:url', [...this.files, ...this.uploadFile])
        this.$emit('success')
      } else {
        this.$message.error(res.resultMessage)
      }
    },
    handleRemove(file, fileList) {
      // 原本存在文件的数据解构
      // name: "WechatIMG1132.jpg"
      // status: "success"
      // uid: 1560408036536
      // url: "http://za-charity-tst.os
      this.uploadFile = fileList.map(file => {
        if (!file.response && file.status === 'success') {
          return { ...file }
        }
        // 新上传的文件数据结构
        if (file.response) {
          return {
            name: file.name,
            ...file.response
          }
        }
      })
      this.$emit('update:url', [...this.uploadFile])
      this.$emit('del')
    },
    handlePictureCardPreview(e) {
      this.dialogVisible = true
      this.previewUrl = e.response.data
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传一张，请先删除已上传图片`)
    }
  }
}
</script>
