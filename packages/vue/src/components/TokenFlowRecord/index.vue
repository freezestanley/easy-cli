<template>
  <el-dialog
    :title="`${TOKEN__NAME}流转记录`"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="1000px"
    height="400px"
    class="token-dialog"
  >
    <div
      v-loading="loading"
      class="shadow"
      :style="{minHeight: calcHeight, height: height * 90 + 'px', width: depth * 300 + 'px', margin: '0 auto'}"
    >
      <Tree v-if="visible && !loading && !error" :data="data" />
      <div v-show="!loading && error" style="height: 100px;" />
      <NoData v-show="!loading && error" title="暂无数据" />
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
import Tree from '@/components/Charts/Tree'
import { CommonApi } from '@/api/index'
import { getDepth, getMaxChild } from '@/utils/'
export default {
  name: 'TokenRecord',
  components: {
    Tree
  },
  data() {
    return {
      loading: false,
      visible: false,
      data: {},
      error: false,
      calcHeight: (window.innerHeight - 700) + 'px'
    }
  },
  computed: {
    firstChildren() {
      return this.data && this.data.children || []
    },
    height() {
      const levels = getMaxChild(this.firstChildren)
      return Math.max(...Object.values(levels), 6)
    },
    depth() {
      return Math.max(...getDepth(this.firstChildren))
    }
  },
  methods: {
    open(transNo) {
      this.loading = true
      this.visible = true
      CommonApi.tokenRecord({ transNo: transNo }).then(res => {
        this.data = res.data
        this.error = false
      }).catch(() => {
        this.error = true
      }).finally(() => {
        this.loading = false
      })
    },
    close() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
.token-dialog .el-dialog__body {
  overflow-y: auto;
  text-align: center;
  overflow-x: hidden;
}
.shadow {
  box-shadow: 0px 0px 12px 0px rgba(101, 85, 246, 0.2);
}
</style>
