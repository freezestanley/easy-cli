<template>
  <div class="upload">
    <el-upload
      ref="uploadImg"
      :headers="{ token: token }"
      :action="action"
      :limit="1"
      :show-file-list="false"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      drag
    >
      <div v-if="!url">
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          <div>将文件拖到此处，或<em>点击上传</em></div>
          <div>只能上传 jp(e)g/png文件，且不超过 2Mb</div>
        </div>
      </div>
      <ul v-if="url" class="el-upload-list el-upload-list--picture-card img-upload-show">
        <li tabindex="0" class="el-upload-list__item is-success">
          <img :src="url" :style="{objectFit: 'contain', }" alt="" class="el-upload-list__item-thumbnail img-orientation">
          <span class="el-upload-list__item-actions" @click="handlePictureCardPreview($event, url)">
            <span class="el-upload-list__item-preview">
              <i class="el-icon-zoom-in" />
            </span>
            <span v-if="!noDelete" class="el-upload-list__item-delete" @click="handleRemove">
              <i class="el-icon-delete" />
            </span>
          </span>
        </li>
      </ul>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img v-if="url" :src="url" style="width:100%;height: auto;" alt="">
    </el-dialog>
  </div>

</template>

<script>
import { CommonApi } from '@/api'
import style from '@/styles/variables.scss'
import store from '@/store'

export default {
  props: {
    url: {
      type: String,
      required: true
    },
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
      token: store.getters.token
    }
  },
  methods: {
    // 上传前校验文件类型和文件大小
    beforeUpload(file) {
      const types = ['image/png', 'image/jpg', 'image/jpeg']
      const isJPG = types.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 png或jp(e)g 格式!')
        return false
      }
      if (!isLt2M) {
        this.$alert(`<div><div>上传图片已超过 2M，请压缩图片后上传！</div>可访问网站 <a href="https://tinypng.com" style="color: ${style.baseTheme}" target="_blank">https://tinypng.com</a> 压缩</div>`, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '知道了'
        }).catch(() => {})
      }
      return isJPG && isLt2M
    },
    uploadSuccess(res, file) {
      if (res.resultCode === '000000') {
        this.$emit('update:url', res.data)
      } else {
        this.$message.error(res.resultMessage)
      }
    },
    handleRemove(e) {
      e.stopPropagation()
      this.$emit('update:url', '')
      this.$refs.uploadImg.clearFiles()
    },
    handlePictureCardPreview(e, url) {
      e.stopPropagation()
      this.dialogVisible = true
      this.previewUrl = url
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传一张，请先删除已上传图片`)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  .avatar {
    display: block;
  }
  /deep/ .el-upload--picture-card {
    width: 360px;
    height: 180px;
    line-height: 32px;
    border: none;
  }
  /deep/ .el-upload-dragger {
    border-style: solid;
    border: 1px solid #E0E6ED;
  }
  /deep/ .el-upload-list__item {
    width: 360px;
    height: 180px;
    margin: 0;
  }
  /deep/ .el-upload-list__item-status-label, .el-icon-close-tip {
    display: none;
  }
}

</style>
