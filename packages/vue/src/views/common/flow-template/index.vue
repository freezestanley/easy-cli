<template>
  <div v-loading="loading">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" label-width="96px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="主流程名称：">
              <el-select
                v-model="editableTabsValue"
                value-key="commonFlowId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in editableTabs"
                  :key="item.commonFlowId"
                  :label="item.commonFlowName"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="handleClick">搜 索</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8" />
        </el-row>
      </el-form>
    </div>
    <div v-for="item in editableTabs" :key="item.commonFlowId">
      <div v-if="finalTabsValue && item.commonFlowId === finalTabsValue.commonFlowId" class="mar">
        <tab-content :ref="'tab_' + item.commonFlowId" :common-flow-id="finalTabsValue.commonFlowId" :loading.sync="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { CommonApi } from '@/api'

import TabContent from './tab-content'

export default {
  provide() {
    return {
      indexData: this
    }
  },
  components: {
    TabContent,
  },
  beforeRouteLeave(to, from, next) {
    const changed = this.$refs['tab_' + this.currentFlowId][0].hasChanged()
    if (changed) {
      this.$confirm('您的变更未保存，确定离开吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        distinguishCancelAndClose: false
      }).then(() => {
        next()
      }).catch(() => {
        next(false)
      })
    } else {
      next()
    }
  },
  data() {
    return {
      loading: false,
      editableTabsValue: null,
      finalTabsValue: null,
      editableTabs: [],
      userData: [],
      tempFlag: true,
    }
  },
  computed: {
    currentFlowId: function() {
      return this.finalTabsValue.commonFlowId || ''
    }
  },
  created() {
    this.getTabs()
    this.getAllUser()
  },
  methods: {
    getTabs() {
      CommonApi.getAllTemplate().then(res => {
        if (res.data.length) {
          this.editableTabs = res.data
          this.editableTabsValue = res.data[0]
          this.finalTabsValue = res.data[0]
        }
      })
    },
    getAllUser() {
      CommonApi.getAllUserByCorpNo().then(res => {
        if (res.data.length) {
          this.userData = res.data
        }
      })
    },
    handleClick() {
      const changed = this.$refs['tab_' + this.currentFlowId][0].hasChanged()
      if (changed) {
        this.$confirm('您的变更未保存，确定更换流程吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.finalTabsValue = this.editableTabsValue
        }).catch(() => {

        })
      } else {
        this.finalTabsValue = this.editableTabsValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mar {
  margin-top: 20px;
}
</style>
