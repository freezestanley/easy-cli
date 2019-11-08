<template>
  <div class="page page-transfer-list">
    <handle-transfer />
  </div>
</template>

<script>
import HandleTransfer from './components/list/HandleTransfer'

export default {
  name: 'TransferList', // 我的转让
  components: {
    HandleTransfer,
  },
  data() {
    return {

    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
