<template>
  <div>
    <basic-info :trans-no="transNo" :corp-no="corpNo" />
  </div>
</template>

<script>
import BasicInfo from './components/BasicInfo'

export default {
  components: {
    BasicInfo,
  },
  data() {
    return {
      activeName: 'basic',
      corpNo: '',
      transNo: '',
    }
  },
  created() {
    this.corpNo = this.$route.query.corpNo
    this.transNo = this.$route.query.transNo
  }
}
</script>

<style lang="scss" scoped>
</style>
