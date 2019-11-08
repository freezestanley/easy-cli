<template>
  <el-dialog
    title="申请上游转让"
    :visible="visible"
    :before-close="close"
    :append-to-body="true"
    width="520px"
  >
    <div v-loading="loading" class="body">
      <el-form ref="form" class="transfer-apply-form" :model="form" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="应收资产" prop="assetNo" class="assets-item">
          <el-select v-model="form.assetNo" placeholder="请选择">
            <el-option
              v-for="item in assetsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <p>{{ assetsListDes }}</p>
        </el-form-item>
        <el-form-item label="企业名称">
          <span>{{ assetsCorpName }}</span>
        </el-form-item>
        <el-form-item label="申请转让数量" prop="applyAmount">
          <el-input v-model="form.applyAmount" class="sp-input" type="number" placeholder="请输入">
            <template slot="suffix" class="textTitle">个</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { EnterprisApi } from '@/api/index'
import { COLLECT_ASSETS } from '@/utils/constant/assets'
import Validator, { numToStr } from '@/utils/validator'

export default {
  components: {},
  data() {
    return {
      visible: false,
      loading: false,
      assetsListDes: '', // 资产额度描述
      assetsCorpName: '', // 资产企业名
      assetsList: [], // 资产列表
      form: {
        assetNo: '',
        applyAmount: '',
      },
      rules: {
        assetNo: Validator.isRequired('请选择应收资产'),
        applyAmount: Validator.isRequired('请输入申请转让数量'),
      }
    }
  },
  watch: {
    'form.assetNo': function(val) {
      var item = this.getListInfo(this.assetsList, val)
      if (!item) return
      this.assetsListDes = `剩余资产额度:${numToStr(item.data.balAmt, '元', true)}`
      this.assetsCorpName = item.data.payCorpName
    }
  },
  methods: {
    numToStr,
    getListInfo(list, val) {
      return list.find((i) => {
        return i.value === val
      })
    },
    getAssetsList() {
      this.loading = true
      // 查询应收资产
      EnterprisApi.queryAssetList({
        assetType: COLLECT_ASSETS,
        assetStatus: 'VALID',
        amountScope: 'NOT_ZERO',
        queryType: 'CHAIN_APPLY_TRANSFER'
      }).then(res => {
        this.loading = false
        this.assetsList = res.data.map((i) => {
          return { value: i.assetNo, label: i.assetName, data: i }
        })
        if (this.assetsList.length > 0) {
          this.form.assetNo = this.assetsList[0].value
        }
      }).finally(() => {
        this.loading = false
      })
    },
    open(data) {
      this.visible = true
      this.getAssetsList()
    },
    close() {
      this.$refs['form'].resetFields()
      this.visible = false
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        this.visible = false
        this.handleAdd()
      })
    },
    // 新增确认
    handleAdd() {
      this.$securityCode().then(code => {
        this.triggerAddApi(code)
      })
    },
    triggerAddApi(code) {
      EnterprisApi.downFromUpFirstNodeTransferTrans({
        assetNo: this.form.assetNo,
        amount: this.form.applyAmount,
        securityCode: code
      }).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.$emit('success')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 360px;
}
/deep/.el-input__inner{
  width: 360px;
}
.sp-input{
  /deep/.el-input__inner{
    width: 340px;
  }
}
.assets-item{
  position: relative;
  margin-bottom: 30px;
  p{
    position: absolute;
    font-size: 10px;
    top:30px;
    margin: 0px auto 0px 10px;
  }
}
.body{
  padding-top: 20px;
}
.transfer-apply-form {
  /deep/.el-form-item__content {
    font-size: 12px;
  }
}
</style>
