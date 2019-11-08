<template>
  <div class="page page-system">
    <el-tabs v-model="roleType" type="card" @tab-click="getData">
      <el-tab-pane label="平台方" name="PLATFORM" />
      <el-tab-pane label="资金方" name="FUND" />
      <el-tab-pane label="核心企业" name="CORE" />
      <el-tab-pane label="链属企业" name="CHAIN" />
    </el-tabs>
    <div v-loading="loading" class="tree-wrap">
      <el-tree
        ref="authTree"
        :data="data"
        show-checkbox
        node-key="authNo"
        :default-checked-keys="checkedAuth"
      />
    </div>
    <div class="opts">
      <el-button class="opt-btn" @click="getData">重 置</el-button>
      <el-button type="primary" class="opt-btn" @click="saveConfig">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { SuperApi } from '@/api/'

export default {
  name: 'System',
  data () {
    return {
      roleType: 'PLATFORM',
      data: [],
      loading: false,
      checkedAuth: ['']
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      SuperApi.listAuth({
        roleType: this.roleType
      }).then(res => {
        console.log(res.data)
        const checkeds = res.data.checkedAuth
        this.setIndexChecked(checkeds)
        this.data = this.transform(res.data.allAuth)
        // debugger
        this.$nextTick(() => {
          this.$refs.authTree.setCheckedKeys(checkeds)
        })
        // this.checkedAuth = checkeds
      }).finally(() => {
        this.loading = false
      })
    },
    setIndexChecked(checkeds) {
      if (!checkeds.includes(this.roleType + '_index__todo')) {
        // checkeds.push(this.roleType + '_index')
        checkeds.push(this.roleType + '_index__todo')
      }
    },
    transform(data) {
      return data.map((item) => {
        if (item.children && item.children.length) {
          return {
            label: item.authName,
            authNo: item.authNo,
            children: this.transform(item.children),
            disabled: item.authNo === this.roleType + '_index'
          }
        } else {
          return {
            label: item.authName,
            authNo: item.authNo,
            children: item.chidren,
            disabled: item.authNo === this.roleType + '_index__todo'
          }
        }
      })
    },
    saveConfig() {
      const leafs = this.$refs.authTree.getCheckedKeys(false)
      const halfs = this.$refs.authTree.getHalfCheckedKeys()
      console.log('leafs:', leafs)
      console.log('getHalfCheckedKeys:', halfs)
      const params = {
        roleNo: this.roleType,
        authNoList: halfs,
        showAuthNoList: leafs
      }
      // this.setIndexChecked(params.authNoList)
      SuperApi.setAuth(params).then(res => {
        this.$message.success('提交成功')
      })
    }
  }
}
</script>

<style lang="scss" >
.page-system {
  .tree-wrap {
    min-height: 400px;
  }
  .opts {
    width: 600px;
    text-align: center;
  }
  .opt-btn {
    width: 100px;
  }
}
</style>
