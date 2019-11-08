<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    :append-to-body="true"
    :title="odata.title"
    :btnstr="odata.btnStr"
    width="430px"
  >
    <div class="msg-box">
      <svg-icon :icon-class="odata.icon" :class="iconColor" />
      <div class="msg">{{ odata.msg }}</div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="odata.showCancel" @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">{{ odata.btnstr ? odata.btnstr : '确 定' }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
const colorMap = {
  forbid: 'forbid',
  delete: 'error',
  warning: 'warning',
  start: 'warning'
}
export default {
  name: 'CustomConfirm',
  data() {
    return {
      odata: {
        icon: 'warning',
        title: '提示',
        msg: '提示',
        btnstr: '确 定',
        showCancel: true
      },
      visible: false,
      resolve: null,
      reject: () => {}
    }
  },
  computed: {
    iconColor() {
      return colorMap[this.odata.icon] || 'warning'
    }
  },
  methods: {
    callback() {},
    cancel() {
      this.visible = false
      this.reject()
      this.callback()
    },
    confirm() {
      this.visible = false
      this.resolve('succ')
    }
  }
}
</script>
<style lang="scss" scoped>
.msg-box {
  svg {
    display: inline-block;
    font-size: 20px
  }
  .msg {
    display: inline-block;
    vertical-align: text-top;
    color: $textColor;
    margin-top: -2px;
    font-size: 14px;
    width: 340px;
  }
}
</style>
