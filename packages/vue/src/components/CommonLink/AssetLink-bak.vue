<template>
  <router-link :to="url" class="ellipsis theme" target="_blank">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'AssetLink',
  props: {
    assetNo: {
      type: String,
      default: ''
    },
    assetType: {
      type: String,
      default: 'PAY'
    }
  },
  computed: {
    url() {
      const path = this.assetType === 'PAY' ? '/common/payexamine' : '/common/colletexamine'
      return `${path}?assetNo=${this.assetNo}&assetType=${this.assetType}`
    }
  },
}
</script>
<style lang="scss" scoped>
  a {
    color: $theme;
  }
</style>
