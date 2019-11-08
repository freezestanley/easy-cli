<template>
  <el-dialog
    v-if="visible"
    :visible.sync="visible"
    :before-close="close"
    :title="title"
    width="600px"
    custom-class="CheckFlow-dialog"
  >
    <div v-loading="loading">
      <FlowTabs :type="type" :tab="tab" :flows="flows" :s-flows="sFlows">
        <div v-if="tab === FLOW_POP_TYPE.CHECK" slot="check">
          <slot name="check" />
        </div>
        <div v-if="tab === FLOW_POP_TYPE.SIGN" slot="sign">
          <slot name="sign" />
        </div>
      </FlowTabs>
    </div>

  </el-dialog>
</template>

<script>
import FlowTabs from './FlowTabs'
import { FLOW_POP_TYPE } from '@/utils/constant/index'
import { CommonApi } from '@/api/index'
export default {
  name: 'CheckFlow',
  components: {
    FlowTabs
  },
  data () {
    return {
      FLOW_POP_TYPE,
      type: '',
      tab: '',
      title: '',
      visible: false,
      loading: false,
      flows: [],
      sFlows: []
    }
  },

  methods: {
    close() {
      this.visible = false
      this.tab = ''
      this.flows = []
      this.sFlows = []
      this.$emit('close')
    },
    open({ type, transNo, title = '' }) {
      if (type === '') {
        this.$message.warning('请传入正确的操作类型')
        return
      }
      this.title = title
      this.type = type
      switch (type) {
        case FLOW_POP_TYPE.CHECK:
          this.tab = FLOW_POP_TYPE.CHECK
          this.getFlowData(transNo, 'CHECK')
          break
        case FLOW_POP_TYPE.FLOW:
          this.tab = FLOW_POP_TYPE.FLOW
          this.getFlowData(transNo, 'CHECK')
          break
        case FLOW_POP_TYPE.SEAL: // 兼容作用
          this.tab = FLOW_POP_TYPE.SIGN
          this.getFlowData(transNo, 'SEAL')
          break
        case FLOW_POP_TYPE.SIGN:
          this.tab = FLOW_POP_TYPE.SIGN
          this.getFlowData(transNo, 'SEAL')
          this.getFlowData(transNo, 'CHECK')
          break
        case FLOW_POP_TYPE.SFLOW:
          this.tab = FLOW_POP_TYPE.SFLOW
          this.getFlowData(transNo, 'CHECK')
          this.getFlowData(transNo, 'SEAL')
          break
        case FLOW_POP_TYPE.SEALFLOW: // 兼容作用
          this.tab = FLOW_POP_TYPE.SFLOW
          this.getFlowData(transNo, 'SEAL')
          break
        default:
          break
      }
      this.visible = true
    },
    getFlowData(transNo, nodeType) {
      this.loading = true
      CommonApi.getHandleFlow({
        transNo: transNo,
        nodeType: nodeType,
      }).then(res => {
        console.log('nodeType', nodeType)
        if (nodeType === 'CHECK') {
          this.flows = res.activityModelChildDtos
        }
        if (nodeType === 'SEAL') {
          this.sFlows = res.activityModelChildDtos
        }
        console.log('sFlows', this.sFlows)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" >
.CheckFlow-dialog {
  margin-top: 5vh!important;
  min-height: 150px;
}
</style>
