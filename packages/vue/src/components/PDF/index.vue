<template>
  <el-dialog
    :title="titleTxet"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
    height="600px"
    class="PDF"
  >
    <div v-loading="loading" class="pdf-wrap" :style="{height: calcHeight}">
      <iframe :src="pdfUrl" frameborder="0" style="width:100%; height:100%" @load="loadPdf" />
    </div>
    <div slot="footer" class="dialog-footer">
      <slot :close="close" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'PDF',
  data() {
    return {
      loading: false,
      titleTxet: '',
      visible: false,
      pdfUrl: '',
      calcHeight: (window.innerHeight - 200) + 'px'
    }
  },
  created() {
    this.$on('close', this.close)
  },
  methods: {
    open(pdfUrl, title = '签约') {
      if (pdfUrl === '' || !pdfUrl) {
        this.$message.error('pdf链接不存在')
        this.close()
        return
      }
      this.titleTxet = title
      this.pdfUrl = pdfUrl
      this.loading = true
      this.visible = true
      setTimeout(() => {
        if (this.loading) {
          // this.$message.error('PDF加载失败，请稍后再试')
          this.loading = false
        }
      }, 8000)
    },
    loadPdf(e) {
      this.loading = false
    },
    close() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
.PDF .el-dialog {
  margin-top: 50px !important;
}
.PDF .el-dialog__body {
  padding: 10px 24px;
}
.PDF .pdf-wrap {
  max-height: 100%;
  max-width: 750px;
}
</style>
