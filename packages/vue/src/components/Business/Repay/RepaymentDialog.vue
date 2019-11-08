<template>
  <el-dialog
    :title="type + '详情'"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="800px"
  >
    <div>
      <div class="block-title">{{ opType + '方信息' }}</div>
      <el-form label-width="96px" :inline="true" label-position="left" class="form-class">
        <el-form-item :label="opType + '方银行'">
          <div>{{ form.item1 }}</div>
        </el-form-item>
        <el-form-item :label="opType + '方账户名'">
          <div>{{ form.item2 }}</div>
        </el-form-item>
        <el-form-item :label="opType + '方账号'">
          <div>{{ form.item3 }}</div>
        </el-form-item>
      </el-form>

      <div class="block-title">付款信息</div>
      <el-form label-width="96px" :inline="true" label-position="left" class="form-class">
        <el-form-item label="付款日期 ">
          <div>{{ $dayjs(form.item4).format('YYYY-MM-DD') }}</div>
        </el-form-item>
        <el-form-item label="付款方账户名">
          <div>{{ form.item5 }}</div>
        </el-form-item>
        <el-form-item label="付款方银行">
          <div>{{ form.item6 }}</div>
        </el-form-item>
        <el-form-item label="回执单号">
          <div>{{ form.item7 }}</div>
        </el-form-item>
        <el-form-item label="付款方账号">
          <div>{{ form.item8 }}</div>
        </el-form-item>
        <el-form-item label="付款凭证">
          <file-show :url="form.item9" :direct="true" class="ellipsis" />
        </el-form-item>
      </el-form>

    </div>
  </el-dialog>
</template>

<script>
import FileShow from '@/components/FileShow/index'
export default {
  components: {
    FileShow
  },
  data() {
    return {
      visible: false,
      form: {
        type: '', // repay、receipt
        item1: '',
        item2: '',
        item3: '',
        item4: '',
        item5: '',
        item6: '',
        item7: '',
        item8: '',
        item9: '',
      },
      rules: {}
    }
  },
  computed: {
    type() {
      if (this.form.type === 'repay') {
        return '还款'
      }
      return '收款'
    },
    opType() {
      if (this.form.type === 'repay') {
        return '收款'
      }
      return '收款'
    }
  },
  methods: {
    open(data) {
      this.visible = true
      this.form = data
    },
    close() {
      this.visible = false
      this.form = {
        type: '', // repay、receipt
        item1: '',
        item2: '',
        item3: '',
        item4: '',
        item5: '',
        item6: '',
        item7: '',
        item8: '',
        item9: '',
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.block-title {
  font-size: 16px;
  line-height: 22px;
  font-weight:500;
  color: $titleColor;
  margin-bottom: 16px;
}
.form-class {
  margin-bottom: 24px;
  /deep/ .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  /deep/ .el-form-item__content {
    width: 264px;
  }
}
</style>
