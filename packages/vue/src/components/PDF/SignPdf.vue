<template>
  <div class="PDF">
    <div v-loading="loading" class="pdf-wrap" :style="{height: calcHeight}">
      <iframe :src="pdfUrl" frameborder="0" style="width:100%; height:100%" @load="loadPdf" />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    pdfUrl: {
      type: String,
      default: 'https://za-charity-tst.oss-cn-hzfinance.aliyuncs.com/2019/10/22/签发电子合约_1571738162752.pdf'
    },
  },
  data() {
    return {
      loading: false,
      calcHeight: (window.innerHeight - 300) + 'px'
    }
  },
  created() {
    this.open(this.pdfUrl)
  },
  methods: {
    open(pdfUrl) {
      if (pdfUrl === '' || !pdfUrl) {
        this.$message.error('pdf链接不存在')
        return
      }
      this.pdfUrl = pdfUrl
      this.loading = true
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
