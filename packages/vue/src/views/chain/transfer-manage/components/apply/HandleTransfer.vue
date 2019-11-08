<template>
  <div class="page page-sign-manage">
    <el-tabs v-model="activeName" class="transfer-tabs" @tab-click="handleClick">
      <el-tab-pane label="我的申请" name="launched">
        <launched-transfer v-if="isChildUpdate1" />
      </el-tab-pane>
      <el-tab-pane label="下游申请" name="accept">
        <accept-transfer v-if="isChildUpdate2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import LaunchedTransfer from './handle/LaunchedTransfer'
import AcceptTransfer from './handle/AcceptTransfer'

export default {
  name: 'HandleTransferApply', // 申请管理
  components: {
    LaunchedTransfer,
    AcceptTransfer,
  },
  data() {
    return {
      activeName: 'launched',
      isChildUpdate1: true,
      isChildUpdate2: false
    }
  },
  mounted() {
    if (this.$route.query.tab) {
      this.activeName = this.$route.query.tab
    }
    this.handleClick({ name: this.$route.query.tab || 'launched' })
  },

  methods: {
    handleClick(tab) {
      if (tab.name === 'launched') {
        this.isChildUpdate1 = true
        this.isChildUpdate2 = false
      } else {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
