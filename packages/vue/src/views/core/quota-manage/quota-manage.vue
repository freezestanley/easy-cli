<template>
  <div class="page page-quota-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 授信列表 -->
      <el-tab-pane label="授信列表" name="quotaList">
        <QuotaList v-if="isChildUpdate1" />
      </el-tab-pane>

      <el-tab-pane label="授信调增申请" name="addGrantCredit">
        <ApplyQuotaList v-if="isChildUpdate2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import QuotaList from './components/QuotaList'
import ApplyQuotaList from './components/ApplyQuotaList'

export default {
  name: 'QuotaManage', // 授信管理
  components: {
    QuotaList,
    ApplyQuotaList
  },
  data () {
    return {
      activeName: 'quotaList',
      isChildUpdate1: true,
      isChildUpdate2: false
    }
  },
  created() {
    if (this.$route.query) {
      // if(){

      // }
    }
  },
  methods: {
    handleClick(tab) {
      if (tab.name === 'quotaList') {
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

