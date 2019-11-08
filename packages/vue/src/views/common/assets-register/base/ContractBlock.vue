<template>
  <div class="wrap">
    <slot />
    <span v-if="index!=0" class="del" @click="handleDel">删除</span>
    <el-form ref="form" :model="attachParamForm" :rules="rules" label-width="100px">
      <el-form-item label="合同名称" prop="contractName">
        <el-input v-model="attachParamForm.contractName" maxlength="50" />
      </el-form-item>
      <el-form-item label="合同编号" prop="contractNo">
        <el-input v-model="attachParamForm.contractNo" maxlength="50" />
      </el-form-item>
      <el-form-item label="合同有效期" prop="contractExpireDate">
        <el-date-picker
          v-model="attachParamForm.contractValidDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%;"
          @change="changeDate"
        />
      </el-form-item>
      <el-form-item label="总金额" prop="contractAmount">
        <el-input v-model="attachParamForm.contractAmount">
          <div slot="suffix" style="color:#000">万元</div>
        </el-input>
      </el-form-item>
      <el-form-item label="付款周期" prop="paymentCycle">
        <el-input v-model="attachParamForm.paymentCycle">
          <div slot="suffix" style="color:#000">天</div>
        </el-input>
      </el-form-item>
      <el-form-item label="付款方式" prop="paymentMethod">
        <el-input v-model="attachParamForm.paymentMethod" />
      </el-form-item>
      <el-form-item label="付款日期" prop="paymentDate">
        <el-date-picker
          v-model="attachParamForm.paymentDate"
          :picker-options="afterDate"
          placeholder="选择日期"
          style="width: 100%;"
          type="date"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="合同服务内容  (选填)" prop="contracServiceContent">
        <el-input
          v-model="attachParamForm.contracServiceContent"
          :rows="3"
          type="textarea"
          maxlength="50"
          show-word-limit
          resize="none"
        />
      </el-form-item>
      <el-form-item label="违约处理      (选填)" prop="breakPromiseHandle">
        <el-input
          v-model="attachParamForm.breakPromiseHandle"
          :rows="3"
          type="textarea"
          maxlength="50"
          show-word-limit
          resize="none"
        />
      </el-form-item>
      <el-form-item label="合同附件">
        <file-upload
          :files="oldFileList"
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
import { isRequired, beforeDate, afterDate, isPositiveInteger, isFourPointNumber } from '@/utils/validator'
import FormMixin from './FormMixin'
export default {
  name: 'ContractBlock',
  components: {
    FileUpload
  },
  mixins: [FormMixin],
  data() {
    return {
      beforeDate,
      afterDate,
      form: { uploadFile: [] },
      contractValidDate: [],
      rules: {
        contractName: isRequired('请输入合同名称'),
        contractNo: isRequired('请输入合同编号'),
        contractExpireDate: isRequired('请输入合同开始有效日期'),
        contractEffectDate: isRequired('请输入合同结束有效日期'),
        contractAmount: isFourPointNumber('请输入合同金额'),
        paymentCycle: isPositiveInteger('请输入付款周期'),
        paymentMethod: isRequired('请输入付款方式'),
        paymentDate: isRequired('请输入付款日期'),
        contractValidDate: [
          { required: true, type: 'array', message: '请选择合同有效期', trigger: 'blur,change' }
        ],
      },
      oldFileList: []
    }
  },
  methods: {
    changeDate(val) {
      console.log('=====', val)
      this.attachParamForm.contractEffectDate = val[0]
      this.attachParamForm.contractExpireDate = val[1]
    },
    selectAfterDate(time) {
      const that = this
      return {
        disabledDate(time) {
          const { contractEffectDate } = that.attachParamForm
          return (
            time.getTime() <
            (contractEffectDate
              ? new Date(contractEffectDate).getTime()
              : Date.now()) -
              8.64e7
          )
        }
      }
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
