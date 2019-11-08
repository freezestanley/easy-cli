<template>
  <div class="wrap">
    <slot />
    <span v-if="index!=0" class="del" @click="handleDel">删除</span>
    <el-form ref="form" :model="attachParamForm" :rules="rules" label-width="100px">
      <el-form-item label="结算金额" prop="settlementAmount">
        <el-input v-model="attachParamForm.settlementAmount" class="inline">
          <div slot="suffix" style="color:#000">万元</div>
        </el-input>
      </el-form-item>
      <el-form-item label="结算日期" prop="settlementDate">
        <el-date-picker
          v-model="attachParamForm.settlementDate"
          :picker-options="selectDateRules"
          placeholder="选择日期"
          style="width: 100%;"
          type="date"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="结算编号" prop="settlementNo">
        <el-input v-model="attachParamForm.settlementNo" maxlength="50" />
      </el-form-item>
      <el-form-item label="结算附件">
        <file-upload
          :files="oldFileList"
          :picker-options="selectDateRules"
          :url-arr.sync="form.uploadFile"
          @delete="handleFileDel"
          @success="handleFileChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import FileUpload from '@/components/FileUpload/index'
import { isRequired, beforeDate, isFourPointNumber } from '@/utils/validator'
import FormMixin from './FormMixin'
export default {
  name: 'ContractBlock',
  components: {
    FileUpload
  },
  mixins: [FormMixin],
  data() {
    return {
      selectDateRules: beforeDate,
      rules: {
        settlementAmount: isFourPointNumber('请输入总金额'),
        settlementDate: isRequired('结算日期'),
        settlementNo: isRequired('请输入结算编号')
      },
      oldFileList: []
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 0;
}

.inputContent {
  width: 550px;
  .el-form {
    .el-form-item__label {
      text-align: left !important;
    }
  }
}
</style>
