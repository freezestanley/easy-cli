<template>
  <div>
    <fill-info v-show="showAdd" ref="addPage" :update="update" @handleAdd="handleAdd" @cancel="cancel" />
    <show-info v-show="!showAdd" ref="showPage" @handleUpdate="handleUpdate" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import FillInfo from './add-info'
import ShowInfo from './show-info'

export default {
  name: 'CorpInfo', // 企业信息
  components: {
    FillInfo,
    ShowInfo
  },
  data () {
    return {
      update: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    corpStatus() {
      return this.userInfo.corpStatus
    },
    corpOrderStatus() {
      return this.userInfo.corpOrderStatus
    },
    showAdd() {
      return this.corpStatus === 'INIT' && this.corpOrderStatus !== 'REJECTED' || this.update
    }
  },
  watch: {
    corpOrderStatus(val, oldVal) {
      if (val !== oldVal) {
        this.reGetData()
      }
    }
  },
  created() {
    this.$store.dispatch('user/getInfo')
  },
  methods: {
    cancel() {
      this.update = false
      this.reGetData()
    },
    handleUpdate(data) {
      this.update = true
      this.$refs.addPage.setData(data)
    },
    handleAdd(data) {
      this.update = false
    },
    reGetData() {
      this.$refs.showPage.getData()
    }
  }
}
</script>

<style lang="" >

</style>
