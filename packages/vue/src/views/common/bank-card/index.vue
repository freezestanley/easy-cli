<template>
  <div class="page page-bank-card">
    <div class="tips-box">
      <div class="title">
        <i class="el-icon-warning" />
        <span>温馨提示</span>
      </div>
      <div class="content">
        <div>请绑定您的企业对公账号，并确认信息正确，以便交易收付款。收付款卡只能各绑定一张，如需更换请先删除已绑定类型的银行卡</div>
        <div>提交对公账号信息后平台会打款到您的对公账号，以确保您的账号正常。在您收到平台打款后可以标记已打款，并等待平台审核信息。审核通过后您的对公账号可用来交易</div>
      </div>
    </div>
    <!--  v-permission="'bank-card__look'" -->
    <div class="df">
      <div v-for="card in cards" :key="card.id">
        <div class="card-container">
          <div class="card-title">{{ card.type | typeText }}</div>
          <div :class="['card-inner', 'type-' + card.type ]">
            <div class="card-line df">
              <div class="bank-address nowarp">{{ card.bankName }}  {{ card.branchBankName }}</div>
              <div :class="['order-status ', BIZ_STATUS_CLS[card.bizStatus]]">{{ card.bizStatus | bizStatusText }}</div>
            </div>
            <div class="bank-account-bumber">
              <label>银行卡号</label>
              <span>{{ card.bankAccountNo | cardText }}</span>
            </div>
            <div class="bank-account-name">
              <label>账户名</label>
              <span class="nowarp" style="flex: 1">{{ card.bankAccountName | overdot }}</span>
            </div>
            <div class="btn-row clearfix">
              <!-- 待平台打款 -->
              <div v-if="CARD_BIZ_STATUS.KEY_I === card.bizStatus" />
              <!-- 待企业确认 -->
              <div v-else-if="CARD_BIZ_STATUS.KEY_P === card.bizStatus" v-permission="'bank-card__opt'" class="btn-wrap">
                <el-tooltip content="录入打款信息" effect="dark" placement="top-end">
                  <span
                    class="button btn-mark"
                    @click="mark(card, true)"
                  >
                    <svg-icon icon-class="mark" />
                  </span>
                </el-tooltip>
                <!-- <el-tooltip content="驳回" effect="dark" placement="top-end">
                  <span
                    class="button btn-reject"
                    @click="mark(card, false)"
                  >
                    <svg-icon icon-class="forbid" />
                  </span>
                </el-tooltip> -->
              </div>
              <!-- 待审核 -->
              <div v-else-if="CARD_BIZ_STATUS.KEY_C === card.bizStatus" />
              <!-- <span>已完成、平台打款驳回、平台审核驳回</span> -->
              <div v-if="card.orderStatus === ORDER_STATUS_MAP.KEY_SUCCESS || card.orderStatus === ORDER_STATUS_MAP.KEY_REJECTED" v-permission="'bank-card__opt'" class="btn-wrap">
                <!-- <el-tooltip content="编辑对公账号" effect="dark" placement="top-end">
                  <span
                    class="button btn-edit"
                    @click="editCard(card)"
                  >
                    <svg-icon icon-class="edit" />
                  </span>
                </el-tooltip> -->
                <el-tooltip content="删除对公账号" effect="dark" placement="top-end">
                  <span
                    class="button btn-delete fff"
                    @click="deleteCard(card.id)"
                  >
                    <svg-icon icon-class="delete" />
                  </span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isFull" class="w100">
        <div v-permission="'bank-card__opt'" class="card-add" @click="addCard">
          <div class="card-inner">
            <img src="@/assets/images/card_icon.png" class="bank-card-img" :style="{marginTop: unbandTip ? '15px': '30px'}">
            <div class="text">+绑定对公账号</div>
            <div v-if="unbandTip" class="card-tip">{{ unbandTip }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <NoData
      v-if="!cards.length"
      title="您没有权限操作对公账户"
      style="margin: 150px auto; width: 500px;"
    /> -->

    <!-- 录入打款信息/驳回 -->
    <el-dialog
      :title="markTitle"
      :visible.sync="markDialogVisible"
      width="520px"
      @close="cancel('markForm', 'markDialogVisible')"
    >
      <el-form ref="markForm" class="mark-form" :model="markForm" :rules="rules" label-width="100px" label-position="left">
        <div v-if="markForm.approve">
          <el-form-item label="打款金额" prop="payAmount">
            <el-input v-model="markForm.payAmount" placeholder="请输入平台的打款金额">
              <div slot="suffix" class="">元</div>
            </el-input>
          </el-form-item>
          <el-form-item label="打款备注" prop="payRemark">
            <el-input v-model="markForm.payRemark" max-length="50" placeholder="请输入平台的打款备注" />
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="驳回原因" prop="reason">
            <el-input v-model="markForm.reason" type="textarea" resize="none" :rows="4" :maxlength="100" show-word-limit placeholder="请输入驳回原因" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="cancel('markForm', 'markDialogVisible')"
        >取 消</el-button>
        <el-button type="primary" @click="markConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加/编辑银行卡 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="530px"
      @close="cancel('bindForm', 'dialogFormVisible')"
    >
      <el-form ref="bindForm" class="bind-form" :model="bindForm" :rules="bindRules" label-width="96px" label-position="left">
        <el-form-item label="企业名称" prop="corpName">
          <span>{{ userInfo.corpName }}</span>
        </el-form-item>
        <el-form-item label="开户行" prop="bankName">
          <el-input v-model="bindForm.bankName" autocomplete="off" placeholder="请输入开户行" maxlength="12" />
        </el-form-item>
        <el-form-item label="开户行地区" prop="areaName">
          <el-select
            v-model="bindForm.provinceName"
            class="ssq-input"
            placeholder="请选择省"
            @change="changeProvince"
          >
            <el-option
              v-for="p in provinceNames"
              :key="p"
              :label="p"
              :value="p"
            />
          </el-select>
          <el-select
            v-model="bindForm.cityName"
            class="ssq-input"
            placeholder="请选择市"
            @change="changeCity"
          >
            <el-option
              v-for="item in citys"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-select
            v-model="bindForm.areaName"
            class="ssq-input"
            placeholder="请选择区/县"
            @change="changeArea"
          >
            <el-option
              v-for="item in areas"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="支行名称" prop="branchBankName">
          <el-input v-model="bindForm.branchBankName" autocomplete="off" placeholder="请输入支行名称" maxlength="30" />
        </el-form-item>
        <el-form-item label="账户名" prop="bankAccountName" class="item-box">
          <el-input v-model="bindForm.bankAccountName" autocomplete="off" placeholder="请输入账户名" />
          <el-tooltip class="item" effect="dark" placement="top-end">
            <div slot="content" style="min-width: 130px">
              <span>银行账户名是公司或个人</span>
              <br>
              <span>在银行开户时使用的名称</span>
            </div>
            <span class="show-pwd">
              <i class="el-icon-question" />
            </span>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankAccountNo">
          <el-input v-model="bindForm.bankAccountNo" autocomplete="off" :maxlength="20" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item label="账号类型标记" prop="type">
          <el-radio-group v-if="formType === 'add'" v-model="bindForm.type">
            <el-radio label="PAYMENT" :disabled="(!!hasSFcard || hasPayCard)">付款</el-radio>
            <el-radio label="COLLECT" :disabled="(!!hasSFcard || hasShouCard)">收款</el-radio>
            <el-radio label="ALL" :disabled="!!cards.length">收/付款</el-radio>
          </el-radio-group>
          <el-radio-group v-else-if="formType === 'edit'" v-model="bindForm.type">
            <el-radio label="PAYMENT" :disabled="twoCard">付款</el-radio>
            <el-radio label="COLLECT" :disabled="twoCard">收款</el-radio>
            <el-radio label="ALL" :disabled="twoCard">收/付款</el-radio>
          </el-radio-group>
          <div class="tip">收/付款账号只能各绑定一个，如需更换请先删除已绑定类型的银行卡</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('bindForm', 'dialogFormVisible')">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  CommonApi
} from '@/api'
import {
  ORDER_STATUS_MAP,
  CARD_TYPE,
  CARD_BIZ_STATUS
} from '@/utils/constant/card'
import {
  mapGetters
} from 'vuex'
import AREAS from '@/utils/city.json'
import checkPermission from '@/utils/permission'
import Validator from '@/utils/validator'

const Provinces = AREAS.provinces
const provinceNames = Object.keys(AREAS.provinces)
const Citys = AREAS.citys
const _temp = {
  bankName: '', // 银行名称
  branchBankName: '', // 支行名称
  bankAccountName: '', // 账户名
  bankAccountNo: '', // 卡号
  provinceName: '', // 省
  cityName: '', // 市
  areaName: '', // 区
  type: ''
}
export default {
  name: 'BankCard', // 对公账号管理
  filters: {
    typeText(t) {
      return CARD_TYPE[t]
    },
    bizStatusText(s) {
      return CARD_BIZ_STATUS[s]
    },
    cardText(val = '') {
      return '**** **** **** ' + val.slice(-4) // val.replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
    },
    overdot(name) {
      return name.length > 10 ? name.slice(0, 8) + '...' : name
    },
  },
  data() {
    function checkCard(rule, value, callback) {
      const reg = /\d{12}|\d{20}/g
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的银行卡号'))
      }
    }
    const validateAmount = (rule, value, callback) => {
      value = Number(value)
      const f = value.toString().split('.')[1]
      if (isNaN(value)) {
        callback(new Error('请输入数字'))
      } else if (!(value > 0)) {
        callback(new Error('请输入大于零的数字'))
      } else if (value > 9999999999) {
        callback(new Error('打款金额不能超过9999999999'))
      } else if (f && f.length > 2) {
        callback(new Error('小数点后不能超过两位小数'))
      } else {
        callback()
      }
    }
    return {
      ORDER_STATUS_MAP,
      CARD_BIZ_STATUS,
      provinceNames,
      citys: [],
      areas: [],
      dialogFormVisible: false,
      BIZ_STATUS_CLS: {
        PLATFORM_PAYMENT: 'wait',
        CORP_PAYMENT: 'wait',
        PLATFORM_BIND_CARD_CHECK: 'wait',
        PLATFORM_PAYMENT_REJECT: 'reject',
        PLATFORM_BIND_CARD_CHECK_REJECT: 'reject',
        SUCCESS: 'success',
        FAIL: 'error'
      },
      cards: [],
      bindForm: {
        corpName: '', // 企业名称
        bankName: '', // 银行名称
        branchBankName: '', // 支行名称
        bankAccountName: '', // 账户名
        bankAccountNo: '', // 卡号
        provinceName: '', // 省
        cityName: '', // 市
        areaName: '', // 区
        type: ''
      },
      bindRules: {
        bankName: Validator.isRequired('请输入开户银行名称'),
        areaName: Validator.isRequired('请选择开户行省市区'),
        branchBankName: Validator.isRequired('请输入银行支行名称'),
        bankAccountName: Validator.isRequired('请输入账户名'),
        bankAccountNo: [
          Validator.isRequired('请输入银行卡号'),
          { validator: checkCard, trigger: 'blur' }
        ],
        type: Validator.isRequired('请选择账号类型'),
      },
      formType: 'edit', // 绑定： add， 编辑：edit
      markDialogVisible: false,
      markForm: {
        corpBankNo: '',
        approve: true,
        payAmount: '',
        payRemark: '',
        // reason: ''
      },
      rules: {
        payAmount: [
          Validator.isRequired('请输入打款金额'),
          { validator: validateAmount, trigger: ['change', 'blur'] }
        ],
        payRemark: [
          Validator.isRequired('请输入打款备注'),
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    formTitle() {
      return this.formType === 'add' ? '绑定对公账号' : '编辑对公账号'
    },
    hasSFcard() {
      return this.cards.some(c => c.type === CARD_TYPE.KEY_ALL)
    },
    hasPayCard() {
      return this.cards.some(c => c.type === CARD_TYPE.KEY_PAYMENT)
    },
    hasShouCard() {
      return this.cards.some(c => c.type === CARD_TYPE.KEY_COLLECT)
    },
    twoCard() {
      return this.cards.length === 2
    },
    isFull() {
      return this.cards.length && (this.hasSFcard || this.twoCard)
    },
    unbandTip() {
      if (!this.cards.length) return ''
      if (this.cards.length < 2 && !this.hasSFcard) {
        if (this.hasPayCard) return '您还未绑定收款账号'
        if (!this.hasShouCard) return '您还未绑定付款账号'
      }
      return '您还未绑定付款账号'
    },
    markTitle() {
      return this.markForm.approve ? '录入打款信息' : '驳回'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    checkPermission,
    getData() {
      CommonApi.getCorpBankAccount().then((res) => {
        this.cards = res.data
      })
    },
    changeProvince(p) {
      this.citys = Provinces[p]
      this.bindForm.cityName = ''
      this.bindForm.areaName = ''
      this.areas = []
    },
    changeCity(c) {
      this.areas = Citys[c]
    },
    changeArea() {
      this.$refs.bindForm.clearValidate('areaName')
    },
    handleConfirm() {
      this.$refs.bindForm.validate((valid) => {
        if (valid) {
          if (this.formType === 'edit') {
            CommonApi.updateCorpBankAccount({
              ...this.bindForm
            }).then((res) => {
              this.dialogFormVisible = false
              this.$message.success('提交成功')
              this.getData()
            })
          } else {
            const text1 = `确定要绑定 ${this.bindForm.bankAccountNo} 作为您的${CARD_TYPE[this.bindForm.type]}吗? 如卡号错误，将影响您的交易`
            this.$confirm(text1, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              CommonApi.addCorpBankAccount({
                ...this.bindForm,
                corpName: this.userInfo.corpName,
                corpNo: this.userInfo.corpNo
              }).then((res) => {
                this.dialogFormVisible = false
                this.$message.success('提交成功')
                this.getData()
              })
            }).catch(() => {})
          }
        }
      })
    },
    handleEditConfirm() {
      this.dialogVisible = false
    },
    addCard() {
      this.formType = 'add'
      this.bindForm = { ..._temp
      }
      this.dialogFormVisible = true
    },
    deleteCard(id) {
      this.$myConfirm({
        title: '警告',
        msg: '是否确认删除此对公账号',
        icon: 'delete'
      }).then(() => {
        CommonApi.deleteCorpBankAccount(id).then((res) => {
          console.log(res)
          this.$message.success('删除成功')
          this.getData()
        })
      }).catch(() => {})
    },
    editCard(item) {
      this.bindForm = {
        ..._temp,
        ...item
      }
      this.citys = Provinces[this.bindForm.provinceName]
      this.areas = Citys[this.bindForm.cityName]
      this.formType = 'edit'
      this.dialogFormVisible = true
    },
    mark(item, approve) {
      this.markForm = {
        ...this.markForm,
        corpBankNo: item.corpBankNo,
        approve: approve,
        reason: ''
      }
      this.markDialogVisible = true
    },
    cancel(formName, dialog) {
      this.$refs[formName].resetFields()
      this[dialog] = false
    },
    markConfirm() {
      this.$refs.markForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then(code => {
            this.triggerMarkConfirmApi(code)
          })
        }
      })
    },
    triggerMarkConfirmApi(code) {
      CommonApi.updateBankAccountAuthTransCorpPayInfo({
        ...this.markForm,
        securityCode: code
      }).then((res) => {
        this.markDialogVisible = false
        this.$message.success('提交成功')
        this.$refs.markForm.resetFields()
        this.getData()
      })
    }
  }
}
</script>
<style lang="scss">
    .el-input__suffix-inner {
        color: $textColor;
    }
</style>

<style lang="scss" scoped>
    $dark_gray: #889aa4;
    .page-inner {
        padding: 12px 16px;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 0px;
        z-index: 1;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .tips-box {
        background: rgba(0,188,112,.1);
        border-radius: 4px;
        width: 100%;
        padding: 16px 0;
        margin-bottom: 32px;
        .title {
            height: 20px;
            line-height: 20px;
            padding-left: 48px;
            position: relative;
            i {
                display: inline-block;
                width: 20px;
                height: 20px;
                font-size: 20px;
                border-radius: 50%;
                position: absolute;
                left: 20px;
                top: 50%;
                color: #00BC70;
                transform: translateY(-50%);
            }
            span {
                font-size: 14px;
                color: $titleColor;
            }
        }
        .content {
            padding-left: 48px;
            color: #475669;
            font-size: 12px;
            line-height: 20px;
            margin-top: 4px;
        }
    }

    .card-add {
        width: 280px;
        height: 175px;
        position: relative;
        margin-top: 42px;
        cursor: pointer;
        .card-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            box-shadow: 0px 0px 12px 0px rgba(101, 85, 246, 0.2);
            background-color: #fff;
            border-radius: 12px;
            text-align: center;
            &:hover {
                box-shadow: 0px 0px 16px 0px rgba(78, 65, 194, 0.4);
            }
            .bank-card-img {
                width: 118px;
                height: 86px;
            }
            .text {
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                font-weight: 400;
                color: $theme;
            }
            .card-tip {
                color: #8492A6;
                font-size: 12px;
                line-height: 20px;
            }
        }
    }

    .ssq-input {
        width: 126px;
    }

    .card-container {
        width: 280px;
        margin-right: 40px;
        .card-title {
            font-size: 16px;
            font-weight: 700;
            color: #262626;
            height: 30px;
            line-height: 30px;
            margin-bottom: 12px;
        }
        .card-inner {
            width: 280px;
            height: 175px;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            &.type-ALL {
                background: url('../../../assets/images/card_cp_bg.png') no-repeat;
                background-size: 280px 175px;
            }
            &.type-PAYMENT {
                background: url('../../../assets/images/card_payment_bg.png') no-repeat;
                background-size: 280px 175px;
            }
            &.type-COLLECT {
                background: url('../../../assets/images/card_collect_bg.png') no-repeat;
                background-size: 280px 175px;
            }
            .bank-address {
                font-size: 14px;
                font-weight: 500;
                height: 24px;
                line-height: 24px;
                width: 180px;
                flex: 1;
                margin-right: 6px;
            }
            .order-status {
                height: 24px;
                line-height: 24px;
                background-color: #fff;
                box-shadow:0px 0px 4px 0px rgba(0,0,0,0.2);
                border-radius:4px;
                font-size: 10px;
                padding: 0 6px;
                text-align: center;
                color: #000;
                &.wait {
                    color: #027AFF;
                }
                &.reject {
                    color: #BCBCBC;
                }
                &.success {
                    color: #343434;
                }
                &.error {
                    color: $error;
                }
            }
            .bank-account-bumber,
            .bank-account-name {
                height: 25px;
                line-height: 25px;
                label {
                    font-size: 12px;
                    vertical-align: middle;
                    width: 60px;
                }
                span {
                    font-size: 18px;
                    font-weight: 500;
                    vertical-align: middle;
                }
            }
            .bank-account-bumber {
                margin-top: 16px;
            }
            .bank-account-name {
                margin-top: 10px;
                margin-bottom: 16px;
            }
            .btn-wrap {
                float: right;
                .button {
                    display: inline-block;
                    vertical-align: top;
                    width: 28px;
                    height: 28px;
                    border-radius: 4px;
                    background: rgba(255, 255, 255, .204);
                    text-align: center;
                    line-height: 28px;
                }
                .button+.button {
                    margin-left: 10px;
                }
            }
            .button {
                cursor: pointer;
            }
        }
    }

    // .card-container+.card-container {
    // 	margin-left: 60px;
    // }
    .card-gathering {
        background: #94C6FF;
    }

    .card-payment {
        background: #56C6FF;
    }

    .card-both {
        background: #A807FF;
    }

    .card-container {
        .card-add {
            .card-inner {
                .bank-card-icon {
                    margin: 32px 0 20px;
                }
            }
            .tip {
                height: 17px;
                font-size: 12px;
                color: rgba(132, 146, 166, 1);
                line-height: 17px;
                margin-top: 8px;
            }
        }
    }

    .bind-form {
        .tip {
            height: 17px;
            font-size: 12px;
            color: rgba(132, 146, 166, 1);
            line-height: 17px;
            margin-top: 5px;
        }
    }
</style>
