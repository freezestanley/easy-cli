<template>
  <div class="upload">
    <el-upload
      ref="upload"
      :headers="{ token: token }"
      :class="{maxNum: maxNum}"
      :action="action"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :limit="limit"
      :file-list="fileList"
    >
      <div v-if="!maxNum">
        <div class="text-left">
          <el-button icon="el-icon-upload" type="primary">上传文件</el-button>
        </div>
        <div slot="tip" class="el-upload__tip">{{ `上传格式为 ${suffix.join('/')} ，且不超过${maxSize}MB` }}</div>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { CommonApi } from '@/api'
import store from '@/store'
import { FILE_TYEPS } from '@/utils//constant/index'

export default {
  name: 'FileUpload',
  props: {
    urlArr: {
      type: [Array, String],
      required: true
    },
    /* eslint-disable */
    limit: Number,
    maxSize: { // 最大多少M
      type: Number,
      default: 3
    },
    suffix: {
      type: Array,
      default: function() {
        return FILE_TYEPS
      }
    },
    noDelete: {
      type: Boolean,
      default: false
    },
    files: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    console.log('CommonApi.UPLOAD_URL', CommonApi.UPLOAD_URL)
    return {
      action: CommonApi.UPLOAD_URL,
      token: store.getters.token,
      fileList: this.files
    }
  },
  computed: {
    // 是否到最大数量
    maxNum() {
      if (this.limit && this.limit > 0) {
        return this.fileList.length >= this.limit
      } else {
        return false
      }
    }
  },
  watch: {
    urlArr(val) {
      if (val.length) {
        const result = []
        val.forEach((item) => {
          result.push({
            url: item,
            name: this.getName(item)
          })
        })
        this.fileList = result
      } else {
        this.fileList = []
      }
    }
  },
  methods: {
    getFileType(type) {
      const dotIndex = type.lastIndexOf('.')
      return type.slice(dotIndex + 1)
    },
    // 上传前校验文件类型和文件大小
    beforeUpload(file) {
      const type = this.getFileType(file.name).toLowerCase()
      // console.log('file type:', file.type)
      const isAccept = this.suffix.includes(type)
      const isOverSize = file.size <= 1024 * 1024 * +this.maxSize
      if (!isAccept) {
        this.$message.error(`上传文件只能是 ${this.suffix.join('/')} 格式!`)
        return false
      }
      if (!isOverSize) {
        this.$alert(`上传文件已超过 ${this.maxSize}M`, '提示', {
          confirmButtonText: '知道了'
        }).catch(() => {})
      }
      return isAccept && isOverSize
    },
    handleRemove(file, fileList) {
      this.$emit('update:url-arr', this.getUrlArr(fileList))
      this.$emit('delete', fileList)
      this.$refs.upload.clearFiles()
    },
    handlePreview(file) {
      window.open(file.url)
    },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`)
    // },
    handleSuccess(res, file, fileList) {
      if (res.resultCode === '000000') {
        file.url = res.data
        file.name = this.getName(res.data)
        this.$emit('update:url-arr', this.getUrlArr(fileList))
        this.$emit('success', fileList)
      } else {
        this.fileList.splice(this.fileList.length - 1, 1)
      }
    },
    getName(url) {
      let str = ''
      if (url) {
        const i = url.lastIndexOf('/')
        str = url.slice(i +1)
      }
      return str
    },
    getUrlArr(data) {
      const result = []
      data.forEach((item) => {
        result.push(item.url)
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  .maxNum {
    /deep/ .el-upload {
      display: none;
    }
  }
  .text-left {
    text-align: left;
  }
  .padt-0 {
    padding-top: 0;
  }
  /deep/ .el-upload__tip {
    margin-top: 10px;
    text-align: left;
    word-break: break-all;
    line-height: 16px;
  }
  /deep/ .el-icon-close-tip {
    display: none;
    opacity: 0;
  }
  /deep/ .el-upload-list__item {
    margin-top: 0;
  }
}
</style>
