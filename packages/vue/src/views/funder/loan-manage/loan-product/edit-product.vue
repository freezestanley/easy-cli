<template>
  <financing-product :product-no="productNo" />
</template>

<script>
import FinancingProduct from '../components/FinancingProduct'

export default {
  name: 'FundEditProduct',
  components: {
    FinancingProduct
  },
  data() {
    return {
      productNo: null
    }
  },
  created() {
    this.getQueryParams()
  },
  methods: {
    getQueryParams() {
      if (this.$route.query.productNo) {
        this.productNo = this.$route.query.productNo
      }
    }
  }
}
</script>

