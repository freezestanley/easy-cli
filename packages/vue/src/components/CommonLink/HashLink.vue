<template>
  <router-link :to="toPath">
    <slot />
    <!-- <img src="../../assets/images/" class="hash-icon" alt>
    <a href="/browser" class="text">查看</a> -->
  </router-link>
</template>

<script>
export default {
  name: 'HashLink',
  props: {
    txhash: {
      type: String,
      default: ''
    },
    // type: 0:交易, 1: 存证, 2: 云信证
    type: {
      type: [String, Number],
      default: '0'
    }
  },
  computed: {
    toPath() {
      return `/browser/index?txhash=${this.txhash}&type=${this.type}`
    }
  },
}
</script>
<style lang="scss" scoped>
  a {
    color: $theme;
  }
  .hash-icon {
    width: 92px;
    height: 18px;
    line-height: 18px;
    vertical-align: middle;
  }
  .text {
    padding: 2px 6px;
    border: 1px solid $theme;
    border-radius: 4px;
  }
</style>
