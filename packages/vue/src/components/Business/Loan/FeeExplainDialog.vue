<template>
  <el-dialog
    title="平台服务费说明"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
  >
    <div class="form-container">
      <h3>
        平台账户信息
      </h3>
      <el-form ref="form" class="form-info" :inline="true" label-width="100px" label-position="left">
        <el-form-item label="银行">
          <div>{{ originInfo.bankName }}</div>
        </el-form-item>
        <el-form-item label="平台开户名称">
          <div>{{ originInfo.bankAccountName }}</div>
        </el-form-item>
        <el-form-item label="平台银行账号">
          <div>{{ originInfo.bankAccountNo }}</div>
        </el-form-item>
      </el-form>
      <h3>
        抽成付款信息
      </h3>
      <p class="des-con" v-html="originInfo.feeExplanation" />
    </div>
  </el-dialog>
</template>
<script>

export default {
  name: 'FeeExplainDialog',
  components: {
  },
  data() {
    return {
      visible: false,
      originInfo: {
        bankName: '',
        bankAccountName: '6',
        bankAccountNo: '',
        feeExplanation: ''
      },
    }
  },
  computed: {

  },
  watch: {
  },
  methods: {
    open(data) {
      this.visible = true
      this.originInfo = data.data
      console.log(this.originInfo)
    },
    close() {
      this.visible = false
    },
  }
}
</script>

<style lang="scss" scoped>
.form-container{
  .form-info{
    /deep/ .el-form-item {
      width: 340px;
    }
    /deep/ .el-form-item__content {
      width: 200px;
    }
  }
  .des-con{
    height: 364px;
    overflow: auto;
  }
}
</style>
