<template>
  <financing-list :loading="loading" :result="result" :count="count" @getDataHandle="getData" />
</template>

<script>
import { FunderApi } from '@/api'
import FinancingList from '@/components/Business/Loan/FinancingList'
import { mapGetters } from 'vuex'
export default {
  name: 'FundFinancing',
  components: {
    FinancingList
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

