<template>
  <div class="page page-issue-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 授信列表 -->
      <el-tab-pane label="签发列表" name="signList">
        <IssueList v-if="isChildUpdate1" />
      </el-tab-pane>

      <el-tab-pane label="申请签发" name="applySign">
        <ApplyIssueList v-if="isChildUpdate2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApplyIssueList from './apply-list'
import IssueList from './issue-list'

export default {
  name: 'IssueManage',
  components: {
    ApplyIssueList,
    IssueList
  },
  data() {
    return {
      activeName: 'signList',
      isChildUpdate1: true,
      isChildUpdate2: false
    }
  },
  mounted() {
    console.log(this.$route.query)
    if (this.$route.query.tab) {
      this.activeName = this.$route.query.tab
      if (this.activeName === 'applySign') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
      }
    }
  },
  methods: {
    handleClick(tab) {
      if (tab.name === 'signList') {
        this.$router.push('/business/issue')
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
