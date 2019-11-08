<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="平台申请列表" name="plat-apply-list">
        <plat-apply-list />
      </el-tab-pane>
      <el-tab-pane label="核心调增申请" name="core-up-list">
        <core-up-list />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PlatApplyList from './components/PlatApplyList'
import CoreUpList from './components/CoreUpList'

export default {
  components: {
    PlatApplyList,
    CoreUpList
  },
  data() {
    return {
      activeName: 'plat-apply-list'
    }
  },
  mounted () {
    if (this.$route.query.tab) {
      this.activeName = this.$route.query.tab
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
