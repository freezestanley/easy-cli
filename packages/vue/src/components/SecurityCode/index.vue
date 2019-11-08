<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="codeDialogVisible"
    :append-to-body="true"
    title="请输入您手机上的动态码"
    style="padding: 0 10px;"
    width="500px"
  >
    <SecurityInput v-if="codeDialogVisible" @cancel="cancel" @ok="setCode" />
  </el-dialog>
</template>

<script>
import SecurityInput from './SecurityInput'

export default {
  name: 'CodeVue',
  components: {
    SecurityInput
  },
  data() {
    return {
      codeDialogVisible: false,
      callback: null,
      resolve: null,
      reject: null
    }
  },
  methods: {
    setCode(code) {
      this.codeDialogVisible = false
      this.resolve(code)
    },
    cancel() {
      this.codeDialogVisible = false
      this.reject()
    }
  }
}
</script>
