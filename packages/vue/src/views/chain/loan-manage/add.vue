<template>
  <div v-loading="loading" class="form-container">
    <h4>
      融资申请信息
    </h4>
    <el-form ref="form" :model="form" :rules="rules" class="form-info" label-width="138px" label-position="left">
      <el-form-item :label="TOKEN__NAME" prop="tokenType">
        <el-select v-model="form.tokenType" placeholder="请选择">
          <el-option
            v-for="item in tokenList"
            :key="item.value"
            class="token-option"
            :label="item.label"
            :value="item.value"
          >
            <div>{{ TOKEN__NAME + '（' + item.issueQuotaCorpName + '）' }}</div>
            <div>{{ `余额：${thousands(item.balAmt)}个` }}</div>
            <div>{{ `签发有效期 ~ ${item.expireDate}` }}</div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="融资到期日">
        <div>{{ tokenTime }}</div>
      </el-form-item>
      <el-form-item :label="'申请融资' + TOKEN__NAME + '数量'" prop="tokenNum" class="token-item">
        <el-input v-model="form.tokenNum" type="number" autocomplete="off" placeholder="请输入融资数量">
          <div slot="suffix" class="textTitle">个</div>
        </el-input>
        <p>折合人民币 {{ form.tokenNum | thousands }}元</p>
      </el-form-item>
      <h4>
        融资产品信息
      </h4>
      <el-form-item label="资金方">
        <div>{{ financingInfo.fundCorpName }}</div>
      </el-form-item>
      <el-form-item class="sp-form-item" label="融资产品" prop="financingType">
        <el-select
          v-model="form.financingType"
          placeholder="请选择"
          :no-data-text="'没有符合签发' + TOKEN__NAME + '条件的融资产品'"
        >
          <el-option
            v-for="item in financingList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span v-if="tokenList.length>0" class="active" style="cursor:pointer" @click="showDialogEntInfo">查看产品详情</span>
      </el-form-item>
      <el-form-item label="融资额度">
        <div>{{ financingInfo.formatMoney }}</div>
      </el-form-item>
      <el-form-item label="融资期限">
        <div>{{ financingInfo.formatDate }}</div>
      </el-form-item>
      <el-form-item label="融资利率">
        <div>{{ financingInfo.formatRate }}</div>
      </el-form-item>
      <el-form-item label="合约">
        <el-button v-if="issueTokenContractUrl!==''" type="text" @click="viewPdfHandle1">融资申请合约</el-button>
        <span v-else>-</span>
      </el-form-item>
      <h4>
        我的收款账号
      </h4>
      <div v-if="!form.isExaminedBank&&isBindBank" class="title">
        <i class="el-icon-error icon icon-error" />
        <span>该收款账号暂未通过审核，请通过审核后再申请融资！</span>
      </div>
      <el-form-item class="bank-content" label="我的收款账号" prop="isExaminedBank">
        <div v-if="!isBindBank" class="no-bank">
          <p>您暂未绑定收款账号，请先绑定收款账号并通过审核后，再发起融资申请。</p><el-button type="primary" @click="onGoBank">去绑定收款账号</el-button>
        </div>
        <div v-else class="have-bank">
          <el-form class="bank-info" label-width="140px" label-position="left">
            <el-form-item label="开户银行">
              <div>{{ myBankInfo.bankName }}</div>
            </el-form-item>
            <el-form-item label="账号名称">
              <div>{{ myBankInfo.bankAccountName }}</div>
            </el-form-item>
            <el-form-item label="银行账号">
              <div>{{ myBankInfo.bankAccountNo }}</div>
            </el-form-item>
          </el-form>
        </div>
      </el-form-item>
    </el-form>
    <h4>
      融资方联系人信息
    </h4>
    <el-form class="form-info" :inline="true" label-width="140px" label-position="left">
      <el-form-item label="联系人">
        <div>{{ financingName }}</div>
      </el-form-item>
      <el-form-item label="联系电话">
        <div>{{ financingTele }}</div>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button @click="onCancelHandle">取消</el-button>
      <el-button v-fast-click="wrapClick(viewPdfHandle)" type="primary" style="width:240px">下一步</el-button>
    </div>

    <!-- pdf 签约-->
    <PDF ref="pdfDialogSign">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定融资</el-button>
      </template>
    </PDF>

    <!-- pdf 查看 -->
    <PDF ref="pdfDialogView">
      <template slot-scope="props">
        <el-button @click="props.close()">取消</el-button>
        <Download type="primary" direct :url="issueTokenContractUrl">
          <el-button class="next-button" type="primary">下载合约</el-button>
        </Download>
      </template>
    </PDF>

    <!-- 产品详情 -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      title="产品详情"
      width="700px"
    >
      <el-form v-loading="formLoading" label-width="72px" class="financing-product-detail">
        <h4>融资合同信息</h4>
        <p>1.本企业是一家在中华人民共和国依法注册的<span class="inline-input">{{ financingInfo.enterpriseStatement }}</span>公司，依法可提供<span class="inline-input">{{ financingInfo.serviceStatement }}</span>服务。</p>
        <p>2.融资生成的合同词汇具有明确定义与解释，未特别解释的专业术语，可参照国家法律规定或<span class="inline-input">{{ financingInfo.contractStatement }}</span>的国际惯例予以解释。</p>
        <h4>融资产品信息</h4>
        <el-form-item label="产品名称">{{ financingInfo.productName }}</el-form-item>
        <el-form-item label="融资额度">{{ financingInfo.formatMoney }}</el-form-item>
        <el-form-item label="融资利率">{{ financingInfo.formatRate }}</el-form-item>
        <el-form-item label="融资期限">{{ financingInfo.formatDate }}</el-form-item>
        <el-form-item label="逾期利率">{{ financingInfo.overdueInterestRate }}%</el-form-item>
        <el-form-item label="产品介绍">{{ financingInfo.productIntroduction }}</el-form-item>
        <el-form-item label="申请条件">{{ financingInfo.applyRequirement }}</el-form-item>
        <el-form-item label="申请流程">{{ financingInfo.applyProcess }}</el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>

import { EnterprisApi, CommonApi } from '@/api/index'
import tableMixin from '@/utils/tableMixin'
import { mapGetters } from 'vuex'
import { thousands } from '@/utils'

export default {
  name: 'AddFinancing',
  mixins: [tableMixin],
  data() {
    const checkNo = (rule, value, callback) => {
      if ((value === '' || value === undefined || value === -1 || value === 0)) {
        return callback(new Error('请输入'))
      } else if (value > this.tokenTotle) {
        return callback(new Error('可用' + this.TOKEN__NAME + '余额只有' + this.tokenTotle + '元'))
      } else if (value < this.financingInfo.loanMinAmount) {
        return callback(new Error('输入数量不能小于' + this.financingInfo.loanMinAmount + '元,' + '可用' + this.TOKEN__NAME + '余额只有' + this.tokenTotle + '个'))
      }
      callback()
    }
    const checkBank = (rule, value, callback) => {
      if (!this.isBindBank) {
        return callback(new Error('请先绑定收款账号并通过审核后再申请融资'))
      }
      if (!value) {
        return callback(new Error('对公账号通过审核后再申请融资'))
      }
      callback()
    }
    return {
      loading: false,
      tokenList: [],
      financingList: [],
      formLoading: false,
      dialogFormVisible: false,
      isBindBank: false, // 是否绑定
      myBankInfo: {
        bankName: '',
        bankAccountName: '',
        bankAccountNo: 0
      },
      financingInfo: {
        fundCorpName: '',
        formatDate: '',
        formatMoney: '',
        formatRate: '',
      },
      financingName: '',
      financingTele: '',
      tokenTime: '',
      tokenTotle: 0,
      issueTokenContractUrl: '',
      form: {
        financingType: '',
        tokenNum: '',
        tokenType: '',
        isExaminedBank: false,
        preContractUrl: ''
      },
      rules: {
        tokenNum: [
          { required: true, message: '请输入', trigger: 'change' },
          { validator: checkNo, trigger: ['blur', 'change'] }
        ],
        tokenType: [
          { required: true, message: '请选择' + this.TOKEN__NAME, trigger: 'change' },
        ],
        financingType: [
          { required: true, message: '请选择产品' }
        ],
        isExaminedBank: [
          { required: true, validator: checkBank }
        ],
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    'form.tokenType': function(val) {
      var item = this.getListInfo(this.tokenList, val)
      this.tokenTime = item.data.expireDate
      this.tokenTotle = item.data.balAmt
      this.issueTokenContractUrl = item.data.contractUrl || ''
      const obj = {
        fundCorpName: item.data.issueQuotaCorpName,
        fundCorpNo: item.data.issueQuotaCorpNo,
        loanEndTime: '',
        loanStartTime: '',
        productName: '',
        status: '',
        regdate: '',
        pageNum: 1,
        pageSize: 50
      }
      this.form.financingType = ''
      this.getFinancingList(obj)
    },
    'form.financingType': function(val) {
      var item = this.getListInfo(this.financingList, val)
      this.financingInfo = item && item.data || {}
      if (this.$refs.form.tokenNum) {
        this.$refs.form.validateField('tokenNum')
      }
      this.getCorpInfo()
      this.form.tokenNum = ''
    }
  },
  mounted() {
    this.getTokenList()
    this.getBankInfo()
  },
  methods: {
    thousands,
    // 获取资金方信息
    getCorpInfo: async function() {
      const info = await CommonApi.getCorpInfo({
        corpNo: this.userInfo.corpNo,
      })
      this.financingName = info.data.corpLeaderDto.contractUser
      this.financingTele = info.data.corpLeaderDto.contractTel
    },
    // 获取对公账号信息
    getBankInfo() {
      CommonApi.getCorpBankAccount().then((res) => {
        const cards = res.data
        cards.some((card) => { // 会有已作废 所以遍历
          if (card.type === 'COLLECT' || card.type === 'ALL') { // 如果找到是收款账号或者是支收卡
            if (card.status === 'INIT') { // 已绑定
              this.isBindBank = true
              this.myBankInfo = card
            }
            if (card.status === 'VALID') { // 已激活
              this.isBindBank = true
              this.form.isExaminedBank = true
              this.myBankInfo = card
            }
            return card.status === 'VALID'
          } else {
            return false
          }
        }, this)
      })
    },
    // 获取列表数据
    getListInfo(list, val) {
      return list.find((i) => {
        return i.value === val
      })
    },
    // 获取融资信息列表
    getFinancingList(data) {
      EnterprisApi.queryLoanProductByChain(
        data
      ).then(res => {
        // 查询融资产品的时候，将返回的结果，先根据所选择的token过滤一下最小值
        this.financingList = res.data.filter(t => t.loanMinAmount < this.tokenTotle || 0).map((i) => {
          i.formatDate = `${i.loanStartTime} ~ ${i.loanEndTime}`
          i.formatMoney = `${thousands(i.loanMinAmount / 10000)}万元 ~ ${thousands(i.loanMaxAmount / 10000)}万元`
          i.formatRate = `${i.loanInterestRate}%`
          return { value: i.productNo, label: i.productName, data: i, loanMinAmount: i.loanMinAmount }
        })
        // 赋值第一个
        if (this.financingList.length > 0) {
          this.form.financingType = this.financingList[0].value
          this.financingInfo = this.getListInfo(this.financingList, this.form.financingType).data
        }
        this.form.tokenNum = ''
      }).finally(() => {
        this.loading = false
      })
    },
    // 获取TOKEN列表
    getTokenList() {
      EnterprisApi.queryToken({}).then(res => {
        this.tokenList = res.data.map((i) => {
          return { value: i.tokenNo, label: this.getTokenTxt(i), data: i, ...i }
        })
        if (this.tokenList.length > 0) {
          this.form.tokenType = this.tokenList[0].value
        }
      }).finally(() => {
        this.loading = false
      })
    },
    getTokenTxt(data) {
      return `${this.TOKEN__NAME} + (${data.issueQuotaCorpName}),余额${data.balAmt}个,签发有效期 ~ ${data.expireDate}`
    },
    onCancelHandle() {
      this.$router.go(-1)
    },
    viewPdfHandle1() {
      this.$refs['pdfDialogView'].open(this.issueTokenContractUrl, '查看合约')
    },
    viewPdfHandle() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // return this.$refs['pdfDialogSign'].open('123', '新增融资')
          var item = this.getListInfo(this.tokenList, this.form.tokenType)// TOKEN__NAME信息
          const params = {
            corpName: this.userInfo.corpName, // 融资方企业名称 ,
            corpNo: this.userInfo.corpNo, // 融资方企业编号 ,
            fundCorpName: this.financingInfo.fundCorpName, // 资金方企业名称 ,
            fundCorpNo: this.financingInfo.fundCorpNo, // 资金方企业编号 ,
            loanStartTime: this.financingInfo.loanStartTime, // 融资期限(开始时间) ,
            loanEndTime: this.financingInfo.loanEndTime, // 融资期限(结束时间) ,
            loanInterestRate: Number(this.financingInfo.loanInterestRate), // 融资利率 ,
            overdueInterestRate: Number(this.financingInfo.overdueInterestRate), // 逾期利率 ,
            loanMaxAmount: this.financingInfo.loanMaxAmount, // 融资最大额度(万元) ,
            loanMinAmount: this.financingInfo.loanMinAmount, // 融资最小额度(万元) ,
            productName: this.financingInfo.productName, // 产品名称 ,
            productNo: this.financingInfo.productNo, // 产品编号 ,
            tokenCount: Number(this.form.tokenNum), // 融资个数 ,
            loanAmount: Number(this.form.tokenNum), // 融资金额 ,
            tokenNo: item.data.tokenNo, // 通证编号
            tokenName: item.data.issueQuotaCorpName, // 通证名
            preContractUrl: this.form.preContractUrl
          }
          EnterprisApi.preview(
            params
          ).then(response => {
            this.form.preContractUrl = response.data.contractUrl
            this.$refs['pdfDialogSign'].open(response.data.contractUrl, '新增融资')
          }).finally(() => {

          })
        }
      })
    },

    handleSubmit() {
      var item = this.getListInfo(this.tokenList, this.form.tokenType)// TOKEN__NAME信息
      const params = {
        corpName: this.userInfo.corpName, // 融资方企业名称 ,
        corpNo: this.userInfo.corpNo, // 融资方企业编号 ,
        fundCorpName: this.financingInfo.fundCorpName, // 资金方企业名称 ,
        fundCorpNo: this.financingInfo.fundCorpNo, // 资金方企业编号 ,
        loanStartTime: this.financingInfo.loanStartTime, // 融资期限(开始时间) ,
        loanEndTime: this.financingInfo.loanEndTime, // 融资期限(结束时间) ,
        loanInterestRate: Number(this.financingInfo.loanInterestRate), // 融资利率 ,
        overdueInterestRate: Number(this.financingInfo.overdueInterestRate), // 逾期利率 ,
        loanMaxAmount: this.financingInfo.loanMaxAmount, // 融资最大额度(万元) ,
        loanMinAmount: this.financingInfo.loanMinAmount, // 融资最小额度(万元) ,
        productName: this.financingInfo.productName, // 产品名称 ,
        productNo: this.financingInfo.productNo, // 产品编号 ,
        tokenCount: Number(this.form.tokenNum), // 融资个数 ,
        loanAmount: Number(this.form.tokenNum), // 融资金额 ,
        tokenNo: item.data.tokenNo, // 通证编号
        tokenName: item.data.issueQuotaCorpName, // 通证名
        preContractUrl: this.form.preContractUrl
      }
      this.$securityCode().then(securityCode => {
        EnterprisApi.addLoanTrans({
          ...params,
          securityCode
        }).then(res => {
          if (res) {
            this.$refs['pdfDialogSign'].close()
            this.$message.success('新增融资成功')
            this.cancel()
          }
        }).finally(() => {
          this.loading = false
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    cancel() {
      this.$router.back()
    },
    // 去绑银行
    onGoBank() {
      this.$router.push('/account/bank-card')
    },
    showDialogEntInfo() {
      this.getProduct()
      this.dialogFormVisible = true
    },
    getProduct() {
      if (!this.form.financingType) return false
      this.formLoading = true
      CommonApi.getLoanProduct({
        productNo: this.form.financingType
      }).then(res => {
        res.data.formatDate = `${res.data.loanStartTime} ~ ${res.data.loanEndTime}`
        res.data.formatMoney = `${thousands(res.data.loanMinAmount / 10000)}万元 ~ ${thousands(res.data.loanMaxAmount / 10000)}万元`
        res.data.formatRate = `${res.data.loanInterestRate}%`
        this.financingInfo = res.data
      }).finally(() => {
        this.formLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container{
  .form-info{
    /deep/ .el-form-item {
      width: 638px;
      .el-select{
        width: 500px;
      }
      .el-input{
        width: 500px;
      }
    }
  }
  .token-item{
    position: relative;
    margin-bottom: 30px;
    p{
      font-size: 10px;
      margin: 0px auto 0px 10px;
    }
  }
  .bank-content{
    background: rgba(104, 88, 246, .05);
    width: 100% !important;
    height: 100%;
    overflow:hidden;
    padding: 30px;
  }
}
.no-bank{
  p{
    color: $info;
    font-size: 14px;
    margin: 0px;
  }
}
.title {
  background: #feebe9;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 10px 0;
  padding-left: 40px;
  position: relative;
  i {
    display: inline-block;
    font-size: 24px;
    border-radius: 50%;
    position: absolute;
    color: red;
    left: 10px;
    top: 20px;
    transform: translateY(-50%);
  }
  span{
    font-size: 13px;
    color: $titleColor;
  }
}
.sp-form-item{
  /deep/ .el-form-item__content{
    width: 700px !important;
  }
  span{
    margin-left: 10px;
  }
}

.financing-product-detail {
  p {
    color: $labelColor;
    line-height: 34px;
    margin: 8px 0;
  }
  .inline-input {
    border-bottom: 1px solid $info;
  }
}
</style>
