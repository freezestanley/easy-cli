<template>
  <el-table :data="data" v-bind="$attrs" :empty-text="' '" v-on="$listeners">
    <template v-for="(colConfig, index) in colConfigs">
      <slot v-if="colConfig.slot" :name="colConfig.slot" />
      <component
        :is="colConfig.component"
        v-else-if="colConfig.component"
        :key="index"
        :col-config="colConfig"
      />
      <el-table-column v-else :key="index" v-bind="colConfig" />
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
    }
  }
}
</script>
