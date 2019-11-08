<template>
  <financing-product />
</template>

<script>
import { FunderApi } from '@/api'
import FinancingProduct from '../components/FinancingProduct'
import { mapGetters } from 'vuex'
export default {
  name: 'FundAddProduct',
  components: {
    FinancingProduct
  },
  data() {
    return {
      loading: false,
      result: [],
      count: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getData(params) {
      if (this.loading) return
      this.loading = true
      params.fundCorpNo = this.userInfo.corpNo
      delete params.fundCorpName
      FunderApi.queryLoanProductByFund(params)
        .then(res => {
          this.result = [...res.data]
          this.count = res.total
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    }
  }
}
</script>

