<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="ukeyVisible"
    :append-to-body="true"
    :show-close="false"
    title="请插入Ukey"
    width="520"
  >
    <ukey-pop v-if="ukeyVisible" :odata="odata" @cancel="cancel" @ok="setSign" />
  </el-dialog>
</template>

<script>
import UkeyPop from './UkeyPop'
// odata是由创建实例的时候传入的
export default {
  components: {
    UkeyPop
  },
  data() {
    return {
      odata: {},
      ukeyVisible: false,
      resolve: null,
      reject: null
    }
  },
  methods: {
    callback() {},
    cancel() {
      this.ukeyVisible = false
      this.odata = {}
      this.callback()
    },
    setSign(signData) {
      this.ukeyVisible = false
      this.resolve(signData)
    }
  }
}
</script>
