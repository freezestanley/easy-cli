<template>
  <span>
    <span class="ellipsis theme cursor" @click="showDialog">
      <slot />
    </span>
    <CorpDialog ref="corpDialog" :corp-no="corpNo" :trans-no="transNo" />
  </span>
</template>

<script>
import CorpDialog from '../Business/Corp/CorpInfoDialog'
export default {
  name: 'CorpLink',
  components: {
    CorpDialog
  },
  props: {
    corpNo: {
      type: String,
      default: ''
    },
    transNo: {
      type: String,
      default: ''
    }
  },
  methods: {
    showDialog() {
      this.$refs.corpDialog.open(this.corpNo, this.transNo)
    }
  }
}
</script>
<style lang="scss" scoped>
  a {
    color: $theme;
  }
</style>
