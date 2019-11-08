<template>
  <div class="wrap">
    <slot />
    <span v-if="index!=0" class="del" @click="handleDel">删除</span>
    <el-form ref="form" :model="attachParamForm" :rules="rules" label-width="100px">
      <el-form-item label="发票代码" prop="invoiceCode">
        <el-input v-model="attachParamForm.invoiceCode" class="inline" placeholder="请填写发票代码" maxlength="50" />
      </el-form-item>
      <el-form-item label="发票编号" prop="invoiceNo">
        <el-input v-model="attachParamForm.invoiceNo" placeholder="可填多个，用“、”间隔;联票可用“-”；发票编号需对应您的发票代码" maxlength="50" />
      </el-form-item>
      <el-form-item label="发票金额" prop="invoiceAmount">
        <el-input v-model="attachParamForm.invoiceAmount" class="inline" placeholder="请填写发票金额">
          <div slot="suffix" style="color:#000">万元</div>
        </el-input>
      </el-form-item>
      <el-form-item label="开始日期" prop="startDate">
        <el-date-picker
          v-model="attachParamForm.startDate"
          :picker-options="selectDateRules"
          placeholder="选择日期"
          style="width: 100%"
          type="date"
          value-format="yyyy-MM-dd"
          clearable
        />
      </el-form-item>
      <el-form-item label="结束日期" prop="endDate">
        <el-date-picker
          v-model="attachParamForm.endDate"
          :picker-options="selectAfterDate()"
          placeholder="选择日期"
          style="width: 100%"
          type="date"
          value-format="yyyy-MM-dd"
          clearable
        />
      </el-form-item>
      <el-form-item label="发票附件">
        <file-upload
          :files="oldFileList"
          :url-arr.sync="form.uploadFile"
          :max-size="2"
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
      form: { uploadFile: [] },
      rules: {
        startDate: isRequired('请选择开始日期'),
        endDate: isRequired('请选择结束日期'),
        invoiceCode: isRequired('请填写发票代码'),
        invoiceNo: isRequired('请填写发票编号'),
        invoiceAmount: isFourPointNumber('请输入发票金额')
      },
      oldFileList: []
    }
  },
  methods: {
    selectBeforeDate(time) {
      const that = this
      return {
        disabledDate(time) {
          const { endDate } = that.attachParamForm
          return (
            time.getTime() >= new Date(endDate).getTime() ||
            time.getTime() > Date.now()
          )
        }
      }
    },
    selectAfterDate(time) {
      const that = this
      return {
        disabledDate(time) {
          const { startDate } = that.attachParamForm
          return (
            time.getTime() < new Date(startDate).getTime() - 8.64e7 ||
            // (startDate ? new Date(startDate).getTime() : Date.now() - 8.64e7)
            time.getTime() > Date.now()
          )
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 10px 0 0;
  // border-top: 1px solid rgba(101, 85, 246, 0.2);
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
