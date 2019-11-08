<template>
  <div class="page-finance-fee">
    <div class="filter-form">
      <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="corpName" label="融资方">
              <el-input v-model.trim="ruleForm.corpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="status" label="支付状态">
              <el-select v-model="ruleForm.status" placeholder="请选择" class="el-input">
                <el-option label="全部" value />
                <el-option
                  v-for="s in PAY_STATUS_LIST"
                  :key="s.value"
                  :label="s.label"
                  :value="s.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="编号" prop="percentageNo">
              <el-input
                v-model.trim="ruleForm.percentageNo"
                type="text"
                placeholder="请输入编号"
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item />
            <el-form-item prop="status" label="支付方式">
              <el-select v-model="ruleForm.payMethod" placeholder="请选择" class="el-input">
                <el-option label="全部" value />
                <el-option label="线上+线下" value="ALL" />
                <el-option label="线上" value="ON_LINE" />
                <el-option label="线下" value="OFF_LINE" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </div>
    <div class="table-box">
      <el-table
        v-loading="loading"
        :data="list"
        :default-sort="{prop: 'corpType', order: 'asc'}"
        :empty-text="' '"
        fit
        stripe
        highlight-current-row
      >
        <el-table-column label="抽成编号" prop="percentageNo" width="200px" show-overflow-tooltip />
        <el-table-column label="融资方" width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.corpNo">{{ scope.row.corpName }}</corp-link>
          </template>
        </el-table-column>
        <!-- <el-table-column label="技术服务费(线上)" align="center">
          <el-table-column
            prop="technologyServiceRate"
            label="抽成比率(%)"
            width="100"
          />
          <el-table-column
            prop="technologyServiceAmount"
            label="折合人民币(元)"
            width="120"
          />
        </el-table-column>
        <el-table-column label="金融服务费(线上)" align="center">
          <el-table-column
            prop="onlinePercentageRate"
            label="抽成比率(%)"
            width="100"
          />
          <el-table-column label="线上抽成金额(元)" prop="onlinePercentageRate" width="130px">
            <template slot-scope="scope">{{ scope.row.onlinePercentageAmount | thousands }}</template>
          </el-table-column>
        </el-table-column> -->
        <!-- <el-table-column label="金融服务费(线下)" align="center">
          <el-table-column label="抽成比率(%)" prop="offlinePercentageRate" width="100px" />
          <el-table-column label="折合人民币(元)" prop="offlinePercentageAmount" width="120px">
            <template slot-scope="scope">{{ scope.row.offlinePercentageAmount | thousands }}</template>
          </el-table-column>
        </el-table-column> -->
        <el-table-column label="抽成比率(%)" prop="offlinePercentageRate" width="100px" />
        <el-table-column label="抽成金额(元)" prop="offlinePercentageAmount" width="120px">
          <template slot-scope="scope">{{ scope.row.offlinePercentageAmount | thousands }}</template>
        </el-table-column>
        <!-- <el-table-column label="支付金额(元)" prop="percentageAmount" width="120px">
          <template slot-scope="scope">{{ scope.row.payerAmount | thousands }}</template>
        </el-table-column> -->
        <el-table-column label="融资产品" prop="productName" :min-width="170" show-overflow-tooltip />
        <el-table-column label="融资额度(万元)" prop="loanAmount" width="120px">
          <template slot-scope="scope">{{ formatWan(scope.row.loanAmount) }}</template>
        </el-table-column>
        <el-table-column label="融资利率(%)" prop="loanInterestRate" width="100px" />
        <el-table-column label="融资到期日" prop="loanEndTime" width="110" />
        <el-table-column label="支付状态" fixed="right" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status === PAY_STATUS.KEY_UNPAID" class="warning">待支付</span>
            <span v-if="scope.row.status === PAY_STATUS.KEY_PAID" class="wait">已支付</span>
            <span v-if="scope.row.status === PAY_STATUS.KEY_INIT" class="warning">待支付</span>
            <span v-if="scope.row.status === PAY_STATUS.KEY_OFFLINE_UNPAID" class="warning">线下待支付</span>
            <span v-if="scope.row.status === PAY_STATUS.KEY_CONFIRMED" class="success">已确认</span>
            <span v-if="scope.row.status === PAY_STATUS.KEY_REJECTED" class="error">已驳回</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="reason" width="130" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="(scope.row.status === PAY_STATUS.KEY_UNPAID
                || (scope.row.status === PAY_STATUS.KEY_OFFLINE_UNPAID && scope.row.payMethod !== PAY_METHOD.ON_LINE))
                && scope.row.payMethod !== PAY_METHOD.NONE"
              v-permission="'loan-manage-fee__edit'"
              type="text"
              size="small"
              @click="clickEdit(scope.row)"
            >编辑抽成</el-button>
            <el-button
              v-if="scope.row.status === PAY_STATUS.KEY_PAID
                || scope.row.status === PAY_STATUS.KEY_CONFIRMED
                || scope.row.status === PAY_STATUS.KEY_REJECTED"
              type="text"
              size="small"
              @click="clickDetial(scope.row)"
            >抽成明细</el-button>
            <el-button
              v-if="(scope.row.status === PAY_STATUS.KEY_PAID)
                && (scope.row.payMethod === PAY_METHOD.ALL || scope.row.payMethod === PAY_METHOD.OFF_LINE)"
              v-permission="'loan-manage-fee__sure'"
              type="text"
              size="small"
              @click="clickCheck(scope.row)"
            >确认收款</el-button>
          </template>
        </el-table-column>
        <div slot="append">
          <NoData v-if="!list.length && !loading" title="暂时没有融资信息" />
        </div>
      </el-table>
      <Pagination
        v-if="list.length && !loading"
        :current-change="onCurrentChange"
        :current-page="pageNum"
        :page-size="pageSize"
        :size-change="onSizeChange"
        :total="total"
      />
    </div>
    <el-dialog
      title="服务费明细"
      :visible.sync="detailDialog"
      :append-to-body="true"
      width="800px"
    >
      <div class="info-items">
        <div class="title fs16">
          平台服务费信息
        </div>
        <div class="flex flex-wrap">
          <div class="item-entrys">
            <label>技术服务费</label>
            <span>{{ percentDetail.percentageRate }} 折合人民币{{ percentDetail.percentageAmount }}元</span>
          </div>
          <div class="item-entrys">
            <label>金融服务费(线上)</label>
            <span>{{ percentDetail.percentageRate }} 折合人民币{{ percentDetail.percentageAmount }}元</span>
          </div>
          <div class="item-entrys">
            <label>金融服务费(线下)</label>
            <span>{{ percentDetail.percentageRate }} 折合人民币{{ percentDetail.percentageAmount }}元</span>
          </div>
          <div class="item-entrys">
            <label>平台开户名称</label>
            <span>{{ percentDetail.payeeBankAccountName }}</span>
          </div>
          <div class="item-entrys">
            <label>开户银行</label>
            <span>{{ percentDetail.payeeBankName }}</span>
          </div>
          <div class="item-entrys">
            <label>平台银行账号</label>
            <span>{{ percentDetail.payeeBankAccountNo }}</span>
          </div>
        </div>
        <div class="info-items">
          <div class="title fs16">
            抽成付款信息
          </div>
          <div class="flex flex-wrap">
            <div class="item-entrys">
              <label>付款日期</label>
              <span>{{ percentDetail.payerTime }}</span>
            </div>
            <div class="item-entrys">
              <label>付款金额</label>
              <span>{{ percentDetail.payerAmount }}</span>
            </div>
            <div class="item-entrys">
              <label>付款方银行</label>
              <span>{{ percentDetail.payerBankName }}</span>
            </div>
            <div class="item-entrys">
              <label>付款方账户名</label>
              <span>{{ percentDetail.payerBankAccountName }}</span>
            </div>
            <div class="item-entrys">
              <label>付款方账户</label>
              <span>{{ percentDetail.payerBankAccountNo }}</span>
            </div>
            <div class="item-entrys">
              <label>回执单号</label>
              <span>{{ percentDetail.payerReceiptNumber }}</span>
            </div>
            <div class="item-entrys">
              <label>付款凭证</label>
              <span>{{ percentDetail.payerVoucherUrl }}</span>
              <Download v-if="percentDetail.payerVoucherUrl" direct :url="percentDetail.payerVoucherUrl">
                <el-button type="text">下载</el-button>
              </Download>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="确认收款"
      :visible.sync="checkDialog"
      :append-to-body="true"
      :before-close="closeCheck"
      width="520px"
    >
      <el-form
        ref="auditForm"
        :inline="true"
        :model="auditForm"
        label-width="100px"
      >
        <el-form-item label="结果：">
          <el-radio-group v-model="auditForm.approve" prop="approve" style="width:340px">
            <el-radio :label="true">通过</el-radio>
            <el-radio :label="false" style="margin-left:15%">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="auditForm.approve === false"
          label="驳回原因"
          :rules="[{ required: true, message: '请填写驳回原因', trigger: 'blur'}]"
          prop="reason"
        >
          <el-input
            v-model="auditForm.reason"
            :rows="4"
            :maxlength="100"
            show-word-limit
            style="width:340px"
            type="textarea"
            resize="none"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCheck">取消</el-button>
        <el-button type="primary" @click="handleCheck()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 抽成详情 -->
    <financing-cut-dialog ref="financingCutDialog" />
  </div>
</template>

<script>
import { PlatformApi } from '@/api/index'
import { PAY_STATUS, PAY_STATUS_LIST, PAY_METHOD } from '@/utils/constant/loan'
import { formatWan } from '@/utils'
import tableMixin from '@/utils/tableMixin'
import FinancingCutDialog from '@/components/Business/Loan/FinancingCutDialog'
import checkPermission from '@/utils/permission'

export default {
  name: 'FinanceFee',
  components: {
    FinancingCutDialog
  }, // 融资抽成管理
  mixins: [tableMixin],
  data () {
    return {
      PAY_STATUS_LIST,
      PAY_STATUS,
      PAY_METHOD,
      ruleForm: {
        corpName: '',
        status: '',
        // percentageNo: ''
      },
      list: [],
      loading: false,
      detailDialog: false,
      percentDetail: {}, // 弹窗详情
      checkDialog: false, // 审核弹窗
      auditForm: {
        approve: true,
        reason: '',
        transNo: ''
      }
    }
  },
  mounted() {
    if (this.$route.query.status) {
      this.ruleForm.status = this.$route.query.status
    }
    this.getData()
  },
  methods: {
    formatWan,
    checkPermission,
    getData() {
      this.loading = true
      PlatformApi.queryLoanPercentage({
        ...this.ruleForm,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.error(err)
      })
    },
    clickEdit(row) {
      this.$router.push(`fee-detail/${row.transNo}`)
    },
    clickDetial(row) {
      this.$refs['financingCutDialog'].open(row)
    },
    clickCheck(row) {
      this.auditForm.transNo = row.transNo
      this.auditForm.approve = true
      this.checkDialog = true
    },
    closeCheck() {
      this.$refs.auditForm.resetFields()
      this.checkDialog = false
    },
    handleCheck() {
      this.$refs.auditForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then(securityCode => {
            PlatformApi.platformConfirmLoanPercentage({
              ...this.auditForm,
              securityCode
            }).then(() => {
              this.$message.success('操作成功')
              this.getData()
              this.closeCheck()
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" >
.page-finance-fee {
  /deep/ .el-table--border td {
      border-left-color: transparent !important;
      border-right-color: transparent !important;
  }
  .info-items {
    .title {
      color: $titleColor;
      line-height: 40px;
      font-weight: 500;
    }
    .flex-wrap {
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .item-entrys {
      width: 40%;
      display: inline-flex;
      line-height: 30px;
      font-size: 14px;
      span {
        flex: 1;
        color: $titleColor;
        padding-left: 20px;
      }
    }
    label {
      width: 130px;
      color: $labelColor;
      font-size: 14px;
      font-weight: 400;
    }
    .tips {
      color: $labelColor;
      font-size: 12px;
      font-weight: 400;
      text-indent: 66px;
      line-height: 26px;
    }
    .edit-input {
      width: 500px;
      margin-left: 5px;
      span {
        padding-left: 0;
        width: 20px;
        padding-top: 2px;
      }
    }
  }
}
</style>
