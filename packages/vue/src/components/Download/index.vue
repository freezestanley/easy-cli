<template>
  <div class="dib" @click="download"><slot /></div>
  <!-- <el-tooltip :content="url || '链接不存在'" placement="top-start">
  </el-tooltip> -->
</template>

<script>
import { CommonApi } from '@/api'
import { isIE } from '@/utils/browser'
import { directDownload, openPreview } from '@/utils/constant/index'
// const directDownload = ['jpg', 'jpeg', 'png', 'zip', 'rar'] // 直接下载
// const openPreview = ['pdf', 'docx', 'doc'] // 打开预览
export default {
  name: 'DownloadFile',
  props: {
    url: {
      required: true,
      type: String,
      default: ''
    },
    direct: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fileType() {
      if (!this.url) return ''
      const dotIndex = this.url.lastIndexOf('.')
      return this.url.slice(dotIndex + 1)
    }
  },
  mounted() {

  },
  methods: {
    download() {
      if (!this.url) {
        this.$message.error('链接不存在，请稍后再试')
        return
      }
      // 非IE采用直接下载
      if (!isIE() && (this.direct || directDownload.includes(this.fileType))) {
        CommonApi.downloadFile(encodeURIComponent(this.url))
      } else if (isIE() && directDownload.includes(this.fileType)) {
        window.open(this.url)
      } else if (openPreview.includes(this.fileType)) {
        window.open(this.url)
      } else {
        this.$message.error('当前的文件类型不支持下载，请使用其他工具下载')
      }
    }
  }
}
</script>

<style lang="" >

</style>
