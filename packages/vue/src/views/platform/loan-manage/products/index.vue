<template>
  <LoanProductList :loading="loading" :result="result" :count="count" @getDataHandle="getData" />
</template>

<script>
import { PlatformApi } from '@/api'
import LoanProductList from '@/components/Business/Loan/LoanProductList'
export default {
  name: 'LoanProductManage', // 融资产品管理
  components: {
    LoanProductList
  },
  data() {
    return {
      loading: false,
      result: [],
      count: 0
    }
  },
  methods: {
    getData(params) {
      if (this.loading) return
      this.loading = true

      PlatformApi.queryLoanProductByPlatform(params)
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

