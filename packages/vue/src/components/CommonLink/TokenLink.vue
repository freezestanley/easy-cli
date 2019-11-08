<template>
  <router-link :to="toPath">
    <slot />
    <span class="theme">{{ tokenNo }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'HashLink',
  props: {
    tokenNo: {
      type: String,
      default: ''
    },
    transNo: {
      type: [String, Number],
      required: true
    },
  },
  computed: {
    toPath() {
      return `/token-common/token-detail?transNo=${this.transNo}`
    }
  },
}
</script>

