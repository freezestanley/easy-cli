<template>
  <span>
    <span class="theme cursor" @click="showDialog">
      <slot />
    </span>
    <AssetDialog ref="assetDialog" :asset-no="assetNo" :asset-type="assetType" />
  </span>
</template>

<script>
import AssetDialog from '../Business/Assets/AssetDialog'
export default {
  name: 'CorpLink',
  components: {
    AssetDialog
  },
  props: {
    assetNo: {
      type: String,
      default: ''
    },
    assetType: {
      type: String,
      default: ''
    }
  },
  methods: {
    showDialog() {
      this.$refs.assetDialog.open(this.assetNo, this.assestType)
    }
  }
}
</script>
<style lang="scss" scoped>
  a {
    color: $theme;
  }
</style>
