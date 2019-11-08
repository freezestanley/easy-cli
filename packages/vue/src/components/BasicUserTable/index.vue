<template>
  <el-table :data="data" v-bind="$attrs" :empty-text="' '" v-on="$listeners" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <template v-for="(colConfig, index) in colConfigs">
      <slot v-if="colConfig.slot" :name="colConfig.slot" />
      <component
        :is="colConfig.component"
        v-else-if="colConfig.component"
        :key="index"
        :col-config="colConfig"
      />
      <el-table-column v-else :key="index" v-bind="colConfig" :show-overflow-tooltip="true" />
    </template>
    <div slot="append">
      <NoData v-if="!data.length" title="暂时没有数据" />
    </div>
  </el-table>
</template>

<script>
export default {
  name: 'BasicTable',
  props: {
    colConfigs: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('deleteBatch', this.multipleSelection)
    }
  }
}
</script>
