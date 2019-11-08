<template>
  <div>
    <el-dialog
      title="新增转让"
      :visible="visible"
      :append-to-body="true"
      width="520px"
    >
      <div v-loading="loading" class="body">
        <el-form ref="form" class="transfer-form" :model="form" :rules="rules" label-width="100px" label-position="left">
          <el-form-item label="应付资产" prop="assetNo" class="assets-item">
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
          <el-form-item :label="`选择${TOKEN__NAME}`" prop="tokenNo">
            <el-select v-model="form.tokenNo" placeholder="请选择">
              <el-option
                v-for="item in tokenList"
                :key="item.value"
                class="token-option"
                :label="item.label"
                :value="item.value"
              >
                <div>{{ `${TOKEN__NAME}（${item.issueQuotaCorpName})` }}</div>
                <div>{{ `余额：${item.balAmt || 0 }` }}</div>
                <div>{{ `签发有效期：${item.expireDate}` }}</div>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转让数量" prop="amount">
            <el-input v-model="form.amount" type="number" class="sp-input" :placeholder="limit">
              <div slot="suffix" class="textTitle">个</div>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">下一步</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { EnterprisApi } from '@/api/index'
import { PAY_ASSETS } from '@/utils/constant/assets'
import Validator, { numToStr } from '@/utils/validator'

export default {
  components: {
  },
  data() {
    const checkAmount = (rule, value, callback) => {
      if (value < 1 || parseInt(value).toString() !== value.toString()) {
        return callback(new Error('请输入正整数'))
      }
      if (value > this.currTotal) {
        return callback(new Error('输入数量不能大于' + this.currTotal))
      }
      callback()
    }
    return {
      visible: false,
      loading: false,
      tokenList: [], // token列表
      tokenTotal: 0, // token数
      assetsTotle: 0, // 资产额度值
      currTotal: 0, // 当前最小值
      assetsListDes: '', // 资产额度描述
      assetsCorpName: '', // 资产企业名
      limit: '', // 数字默认文本
      assetsList: [], // 资产列表
      form: {
        assetNo: '',
        tokenNo: '',
        amount: '',
      },
      rules: {
        assetNo: [
          Validator.isRequired('请选择应付资产')
        ],
        tokenNo: [
          Validator.isRequired('请选择' + this.TOKEN__NAME)
        ],
        amount: [
          Validator.isRequired('请输入转让数量'),
          { validator: checkAmount, trigger: ['blur', 'change'] }
        ],
      }
    }
  },
  watch: {
    'form.assetNo': function(val) {
      var item = this.getListInfo(this.assetsList, val)
      if (!item) return
      this.assetsTotle = item.data.balAmt
      this.assetsListDes = `剩余资产额度：${numToStr(item.data.balAmt, '元', true)}`
      this.assetsCorpName = item.data.receiveCorpName

      this.currTotal = Math.min(this.tokenTotal, this.assetsTotle)
      this.limit = `最多${numToStr(this.currTotal, '')}`
      this.form.amount = ''
    },
    'form.tokenNo': function(val) {
      this.tokenTotal = this.getListInfo(this.tokenList, val).data.balAmt
      this.currTotal = Math.min(this.tokenTotal, this.assetsTotle)
      this.limit = `最多${numToStr(this.currTotal, '')}`
      this.form.amount = ''
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
      // 查询应付资产
      EnterprisApi.queryAssetList({
        assetType: PAY_ASSETS,
        assetStatus: 'VALID',
        amountScope: 'NOT_ZERO',
        queryType: 'CHAIN_TRANSFER'
      }).then(res => {
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
    getTokenList() {
      EnterprisApi.queryToken({}).then(res => {
        this.loading = false
        this.tokenList = res.data.map((i) => {
          return { value: i.tokenNo, label: this.getTokenTxt(i), data: i, ...i }
        })
        if (this.tokenList.length > 0) {
          this.form.tokenNo = this.tokenList[0].value
        }
      }).finally(() => {
        this.loading = false
      })
    },
    getTokenTxt(data) {
      return `${this.TOKEN__NAME}(${data.issueQuotaCorpName}),余额${data.balAmt}个,签发有效期至${data.expireDate}`
    },
    open() {
      this.visible = true
      this.getAssetsList()
      this.getTokenList()
    },
    close() {
      this.visible = false
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        this.close()
        this.handleAdd()
        // EnterprisApi.previewTransferTokenContract({
        //   ...this.form
        // }).then(response => {
        //   this.close()
        //   this.$emit('callback', { url: response.data, data: this.form })
        // }).finally(() => {
        //   this.close()
        // })
      })
    },
    // 新增确认
    handleAdd() {
      this.$securityCode().then(code => {
        this.triggerAddApi(code)
      })
    },
    triggerAddApi(code) {
      EnterprisApi.upToDownFirstNodeTrans({
        ...this.form,
        securityCode: code
      }).then(response => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        this.$refs.form.clearValidate('amount')
        this.close()
        this.$emit('success')
      }).finally(() => {

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
.transfer-form {
  /deep/.el-form-item__content {
    font-size: 12px;
  }
}
</style>
