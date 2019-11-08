<template>
  <div>
    <el-dialog
      title="转让"
      :visible="visible"
      :before-close="close"
      :append-to-body="true"
      width="520px"
    >
      <div v-loading="loading" class="body">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left">
          <el-form-item label="应付资产" class="assets-item">
            <el-input type="text" :disabled="true" :value="assetName" />
            <p>{{ assetsListDes }}</p>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input type="text" :disabled="true" :value="assetsCorpName" />
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
                <div>{{ `${TOKEN__NAME}（item.issueQuotaCorpName）` }}</div>
                <div>{{ `余额：${item.balAmt || 0 }` }}</div>
                <div>{{ `签发有效期至${item.expireDate}` }}</div>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转让数量:" prop="amount">
            {{ numToStr(form.amount,'个') }}
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { EnterprisApi } from '@/api/index'
import { numToStr } from '@/utils/validator'

export default {
  components: {
  },
  data() {
    const checkNo = (rule, value, callback) => {
      if ((value === '')) {
        return callback(new Error('请输入'))
      } else {
        var amount = this.getListInfo(this.tokenList, value).data.balAmt
        if (amount < this.form.amount) {
          return callback(new Error('数量不足' + this.form.amount + '个'))
        }
        callback()
      }
    }
    return {
      visible: false,
      loading: false,
      assetsListDes: '', // 资产额度描述
      assetsCorpName: '', // 资产企业名
      assetName: '', // 资产名
      tokenList: [], // token列表
      tokenTotle: -1, // token数
      form: {
        approve: true,
        transNo: '',
        tokenNo: '',
        assetNo: ''
      },
      rules: {
        tokenNo: [
          { required: true, message: '请选择' + this.TOKEN__NAME, trigger: 'change' },
          { validator: checkNo, trigger: ['blur', 'change'] }
        ],
      }
    }
  },
  watch: {
    'form.tokenNo': function(val) {
      this.tokenTotle = this.getListInfo(this.tokenList, val).data.balAmt
    }
  },
  methods: {
    numToStr,
    getListInfo(list, val) {
      return list.find((i) => {
        return i.value === val
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
    open(data) {
      this.visible = true
      this.assetsListDes = `剩余资产额度:${numToStr(data.asset.balAmt, '元', true)}`
      this.assetsCorpName = data.toCorpName
      this.assetName = data.asset.assetName
      this.form.assetNo = data.asset.assetNo
      this.form.transNo = data.transNo
      this.form.amount = data.applyAmount
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
      })
    },
    handleAdd() {
      this.$securityCode().then(code => {
        this.triggerTransferApi(code)
      })
    },
    triggerTransferApi(code) {
      EnterprisApi.downFromUpSecondNodeTransferTrans({
        ...this.form,
        securityCode: code
      }).then(res => {
        this.$message({
          type: 'success',
          message: '提交成功!'
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
  padding-right: 36px;
}
</style>
