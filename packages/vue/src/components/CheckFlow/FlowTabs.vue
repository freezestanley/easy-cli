<template>
  <el-tabs :value.sync="tab">
    <el-tab-pane v-if="isCheck" label="审核" name="CHECK">
      <slot name="check" />
    </el-tab-pane>
    <el-tab-pane v-if="isSign" label="签约" name="SIGN">
      <slot name="sign" />
    </el-tab-pane>
    <el-tab-pane v-if="isCheckFlow" label="审核流" name="FLOW">
      <Tab :list="flows" />
    </el-tab-pane>
    <el-tab-pane v-if="isSignFlow" label="签约流" name="SFLOW">
      <Tab :list="sFlows" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Tab from './Tab'
import { FLOW_POP_TYPE } from '@/utils/constant/index'
export default {
  name: 'FlowTabs',
  components: {
    Tab
  },
  props: {
    flows: {
      type: Array,
      default() {
        return []
      }
    },
    sFlows: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default: '',
      required: true
    },
    tab: {
      type: String,
      default: '',
      required: true
    },
  },
  data () {
    return {
      FLOW_POP_TYPE,
    }
  },
  computed: {
    isCheck() {
      return this.type === FLOW_POP_TYPE.CHECK
    },
    isSign() {
      return this.type === FLOW_POP_TYPE.SIGN || this.type === FLOW_POP_TYPE.SEAL
    },
    isCheckFlow() {
      return [FLOW_POP_TYPE.CHECK, FLOW_POP_TYPE.SIGN, FLOW_POP_TYPE.SFLOW, FLOW_POP_TYPE.FLOW].includes(this.type)
    },
    isSignFlow() {
      return [FLOW_POP_TYPE.SIGN, FLOW_POP_TYPE.SEAL, FLOW_POP_TYPE.SFLOW, FLOW_POP_TYPE.SEALFLOW].includes(this.type)
    },
  }
}
</script>
