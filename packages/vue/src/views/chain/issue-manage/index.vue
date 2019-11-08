<template>
  <div class="page page-quota-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="签发列表" name="signList">
        <IssueList v-if="isChildUpdate1" />
      </el-tab-pane>

      <el-tab-pane label="签发申请" name="applySign">
        <ApplyIssue v-if="isChildUpdate2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApplyIssue from './apply-issue'
import IssueList from './issue-list'

export default {
  name: 'SignManage',
  components: {
    ApplyIssue,
    IssueList
  },
  data() {
    return {
      activeName: 'signList',
      isChildUpdate1: true,
      isChildUpdate2: false
    }
  },
  created () {
    const query = this.$route.query
    if (query && query.tab) {
      this.activeName = query.tab
      this.handleClick(query.tab)
    }
  },

  methods: {
    handleClick(tab) {
      if (tab.name === 'signList') {
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

