<template>
  <div>
    <el-tabs v-model="tabValue" type="card" :before-leave="handleBeforeLeave">
      <el-tab-pane
        v-for="item in subProcessData"
        :key="item.flowType"
        :label="item.nodeName"
        :name="item.flowType"
        :lazy="true"
      >
        <DagreSvg :ref="tabValue" :process-data="item" :common-flow-id="commonFlowId" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { CommonApi } from '@/api'

import DagreSvg from './dagre-svg'
import { Promise } from 'q'

export default {
  components: {
    DagreSvg,
  },
  props: {
    commonFlowId: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      tabValue: '',
      subProcessData: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    commonFlowId: function(val) {
      this.getSubProcess()
    }
  },
  created() {
    this.getSubProcess()
  },
  methods: {
    getSubProcess() {
      if (this.loading) {
        return
      }
      this.$emit('update:loading', true)
      CommonApi.getSubProcess({
        corpNo: this.userInfo.corpNo,
        corpType: this.userInfo.roleType,
        commonFlowId: this.commonFlowId,
      }).then(res => {
        if (res.data.length) {
          this.subProcessData = res.data
          this.tabValue = res.data[0].flowType
        }
      }).finally(() => {
        this.$emit('update:loading', false)
      })
    },
    handleBeforeLeave() {
      return new Promise((resolve, reject) => {
        if (this.tabValue && this.$refs[this.tabValue]) { // 初始化时候也会进这个
          // console.log('tabValue', this.tabValue, this.$refs)
          const index = this._getTabIndex()
          const changed = this.$refs[this.tabValue][index].hasChanged()
          if (changed) {
            this.$confirm('您的变更未保存，确定离开吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              distinguishCancelAndClose: false
            }).then(() => {
              this.$refs[this.tabValue][index].reset()
              resolve()
            }).catch(() => {
              reject()
            })
          } else {
            resolve()
          }
        } else {
          resolve()
        }
      })
    },
    hasChanged() {
      const index = this._getTabIndex()
      return this.$refs[this.tabValue][index].hasChanged()
    },
    _getTabIndex() {
      if (this.tabValue) {
        for (let i = 0; i < this.subProcessData.length; i++) {
          if (this.subProcessData[i].flowType === this.tabValue) {
            return i
          }
        }
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
