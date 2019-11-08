<template>
  <div class="page page-bank-card-check">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业类型" prop="corpType">
              <el-select v-model="ruleForm.corpType" placeholder="请选择">
                <el-option label="全部" value="" />
                <el-option v-for="s in ROLE_TYPE_LIST_PLATFORM" :key="s.value" :label="s.label" :value="s.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="corpName">
              <el-input v-model="ruleForm.corpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tar">
            <el-form-item label="状态" prop="bizStatus">
              <el-select v-model="ruleForm.bizStatus" placeholder="请选择">
                <el-option label="全部" value="" />
                <el-option v-for="(item, index) in CARD_BIZ_STATUS_LIST" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="tar">
            <el-form-item>
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <div v-loading="loading">
        <el-table
          :data="list"
          fit
          stripe
          highlight-current-row
          :empty-text="' '"
        >
          <el-table-column align="center" type="index" label="序号" width="55" />
          <el-table-column label="提交时间" prop="gmtCreated" width="150px" />
          <el-table-column label="企业类型" prop="corpType" width="80px">
            <template slot-scope="scope">
              {{ ROLE_TYPE[scope.row.corpType] }}
            </template>
          </el-table-column>
          <el-table-column label="企业名称" prop="corpName" width="200px" show-overflow-tooltip />
          <el-table-column label="卡类型" prop="type" width="100px">
            <template slot-scope="scope">
              {{ CARD_TYPE[scope.row.type] }}
            </template>
          </el-table-column>
          <el-table-column label="开户银行" prop="bankName" width="100px" show-overflow-tooltip />
          <el-table-column label="开户行地区" width="160px" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.provinceName }} {{ scope.row.cityName }} {{ scope.row.areaName }}
            </template>
          </el-table-column>
          <el-table-column label="支行名称" prop="branchBankName" width="120px" show-overflow-tooltip />
          <el-table-column label="账户名" prop="bankAccountName" width="200px" show-overflow-tooltip />
          <el-table-column label="银行账号" prop="bankAccountNo" width="170px" />
          <el-table-column label="企业确认金额(元)" prop="corpPayAmount" width="130px">
            <template slot-scope="scope">{{ scope.row.corpPayAmount | thousands }}</template>
          </el-table-column>
          <el-table-column label="企业确认备注" prop="corpPayRemark" width="120px" />
          <el-table-column fixed="right" label="状态" prop="bizStatus" width="120px">
            <template slot-scope="scope">
              <span :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ scope.row.bizStatusName }}</span>
              <!-- <span :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ CARD_BIZ_STATUS[scope.row.bizStatus] }}</span> -->
            </template>
          </el-table-column>
          <el-table-column label="驳回原因" prop="reason" width="130px" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="150px">
            <template slot-scope="scope">
              <!-- v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE"  不走审批流，就去掉这里 -->
              <template>
                <!-- 待平台打款时，展示 -->
                <el-button
                  v-if="scope.row.bizStatus === CARD_BIZ_STATUS.KEY_I"
                  v-permission="'bank-card-check__mark'"
                  type="text"
                  @click="showMark(scope.row, true)"
                >标记已打款</el-button>
                <!-- 待平台打款时，展示 -->
                <el-button
                  v-if="scope.row.bizStatus === CARD_BIZ_STATUS.KEY_I"
                  v-permission="'bank-card-check__mark'"
                  type="text"
                  class="error"
                  @click="showMark(scope.row, false)"
                >驳回</el-button>
                <!-- 待审核时，展示 -->
                <el-button
                  v-if="scope.row.bizStatus === CARD_BIZ_STATUS.KEY_C"
                  v-permission="'bank-card-check__check'"
                  type="text"
                  @click="showVerify(scope.row, true)"
                >审核</el-button>
              </template>
              <!-- 待平台打款/平台打款驳回时，不展示 -->
              <el-button
                v-if="!(scope.row.bizStatus == CARD_BIZ_STATUS.KEY_I || scope.row.bizStatus == CARD_BIZ_STATUS.KEY_N)"
                type="text"
                @click="showDetail(scope.row)"
              >查看打款信息</el-button>
            </template>
          </el-table-column>
          <div slot="append">
            <NoData v-if="!list.length && !loading" title="暂时没有对公账号审核申请" />
          </div>
        </el-table>
        <Pagination v-if="list.length && !loading" :page-size="pageSize" :current-page="pageNum" :total="total" :current-change="onCurrentChange" :size-change="onSizeChange" />
      </div>
    </div>
    <!-- 标记打款信息/驳回 -->
    <el-dialog :title="markTitle" :visible.sync="markDialogVisible" :append-to-body="true" width="520px" @close="cancel">
      <el-form ref="markForm" class="mark-form" :model="markForm" :rules="rules" label-width="100px" label-position="left" style="width: 90%">
        <el-form-item label="企业名称">
          <span>{{ markForm.corpName }}</span>
        </el-form-item>
        <div v-if="markForm.approve">
          <el-form-item label="打款金额" prop="payAmount">
            <el-input v-model="markForm.payAmount" placeholder="输入平台打款的金额">
              <div slot="suffix" class="">元</div>
            </el-input>
          </el-form-item>
          <el-form-item label="打款备注" prop="payRemark">
            <el-input v-model="markForm.payRemark" max-length="50" placeholder="建议6位数字" />
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="驳回原因" prop="reason">
            <el-input v-model="markForm.reason" type="textarea" resize="none" :rows="4" :maxlength="100" show-word-limit placeholder="请输入驳回原因" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleMark">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 审核 -->
    <!-- <el-dialog title="审核" :visible.sync="verifyDialogVisible" :append-to-body="true" width="520px">
      <el-form ref="verifyForm" class="mark-form" :model="verifyForm" :rules="rules" label-width="100px" label-position="left" style="width: 90%">
        <el-form-item label="企业名称">
          <span>{{ verifyForm.corpName }}</span>
        </el-form-item>
        <el-form-item label="审核结果" prop="approve">
          <el-radio-group v-model="verifyForm.approve">
            <el-radio v-if="approve" :label="true">审核通过</el-radio>
            <el-radio :label="false">审核驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="!verifyForm.approve" label="驳回原因" prop="reason">
          <el-input v-model="verifyForm.reason" type="textarea" resize="none" :rows="4" :maxlength="100" show-word-limit placeholder="请输入驳回原因" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="verifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleVerify">确 定</el-button>
      </div>
    </el-dialog> -->
    <CheckFlow ref="checkFlow">
      <div slot="check">
        <el-form ref="verifyForm" class="mark-form" :model="verifyForm" :rules="rules" label-width="100px" label-position="left" style="width: 90%">
          <el-form-item label="企业名称">
            <span>{{ verifyForm.corpName }}</span>
          </el-form-item>
          <el-form-item label="审核结果" prop="approve">
            <el-radio-group v-model="verifyForm.approve">
              <el-radio v-if="approve" :label="true">审核通过</el-radio>
              <el-radio :label="false">审核驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="!verifyForm.approve" label="驳回原因" prop="reason">
            <el-input v-model="verifyForm.reason" type="textarea" resize="none" :rows="4" :maxlength="100" show-word-limit placeholder="请输入驳回原因" />
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelCheck">取 消</el-button>
            <el-button type="primary" @click="handleVerify">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </CheckFlow>
  </div>
</template>

<script>
import {
  PlatformApi
} from '@/api'
import { ROLE_TYPE, ROLE_TYPE_LIST_PLATFORM } from '@/utils/constant/index'
import { ORDER_STATUS_COLOR, CARD_TYPE, CARD_BIZ_STATUS_LIST, CARD_BIZ_STATUS, FLOW_POP_TYPE, CHECK_FLOW_STATUS } from '@/utils/constant/card'
import tableMixin from '@/utils/tableMixin'
import Validator from '@/utils/validator'
import CheckFlow from '@/components/CheckFlow/index'

export default {
  name: 'BankCardCheck',
  components: {
    CheckFlow
  },
  mixins: [tableMixin],
  data() {
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
      ORDER_STATUS_COLOR,
      ROLE_TYPE,
      ROLE_TYPE_LIST_PLATFORM,
      CARD_TYPE,
      CARD_BIZ_STATUS_LIST,
      CARD_BIZ_STATUS,
      FLOW_POP_TYPE,
      CHECK_FLOW_STATUS,
      BIZ_STATUS_CLS: {
        PLATFORM_PAYMENT: 'wait',
        CORP_PAYMENT: 'wait',
        PLATFORM_BIND_CARD_CHECK: 'wait',
        PLATFORM_PAYMENT_REJECT: 'reject',
        PLATFORM_BIND_CARD_CHECK_REJECT: 'reject',
        SUCCESS: 'success',
        FAIL: 'error'
      },
      ruleForm: {
        corpName: '',
        corpType: '',
        bizStatus: '',
      },
      loading: false,
      dialogFormVisible: false, // 表单弹窗
      markDialogVisible: false, // 标记弹窗
      verifyDialogVisible: false, // 审核弹窗
      approve: true, // 同意或拒绝
      list: [],
      markForm: {
        transNo: '',
        corpName: '',
        approve: true,
        payAmount: '',
        payRemark: '',
        reason: '',
      },
      verifyForm: {
        corpName: '',
        approve: true,
        reason: '', // 原因
      },
      rules: {
        payAmount: [
          Validator.isRequired('请输入打款金额'),
          { validator: validateAmount, trigger: ['change', 'blur'] }
        ],
        payRemark: [
          Validator.isRequired('请输入打款备注'),
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        reason: Validator.isRequired('请输入驳回原因')
      }
    }
  },
  computed: {
    markTitle() {
      return this.markForm.approve ? '标记打款信息' : '驳回'
    }
  },
  created() {
    if (this.$route.query) {
      this.ruleForm = {
        ...this.ruleForm,
        ...this.$route.query
      }
    }
    this.getData()
  },

  methods: {
    getData() {
      if (this.loading) return
      this.loading = true
      PlatformApi.queryBankAccountAuthTrans({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(err => {
        console.error(err)
        this.loading = false
      })
    },
    showDetail(item) {
      const h = this.$createElement
      this.$msgbox({
        title: '打款标记详情',
        message: h('div', null, [
          h('p', null, [
            h('span', null, '标记时间：'),
            h('strong', {
              style: 'margin-left: 10px'
            }, item.platformPayTime)
          ]),
          h('p', null, [
            h('span', null, '打款金额：'),
            h('strong', {
              style: 'margin-left: 10px'
            }, item.platformPayAmount + ' 元')
          ]),
          h('p', null, [
            h('span', null, '打款备注：'),
            h('strong', {
              style: 'margin-left: 10px'
            }, item.platformPayRemark)
          ]),
        ]),
        confirmButtonText: '确定'
      }).catch(() => {})
    },
    showMark(item, approve) {
      this.markForm = {
        ...this.markForm,
        transNo: item.transNo,
        corpName: item.corpName,
        approve: approve,
        reason: ''
      }
      this.markDialogVisible = true
    },
    // 标记为已打款/驳回
    handleMark() {
      this.$refs.markForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then(code => {
            this.triggerMarkApi(code)
          })
        }
      })
    },
    triggerMarkApi(code) {
      PlatformApi.updateBankAccountAuthTransPlatformPayInfo({
        ...this.markForm,
        securityCode: code
      }).then(res => {
        this.markDialogVisible = false
        this.$message.success('操作成功')
        this.$refs.markForm.resetFields()
        this.getData()
      }).catch(err => {
        console.error(err)
      })
    },
    // 审核
    showVerify(item, approve = true) {
      this.approve = approve
      this.verifyForm = {
        ...this.verifyForm,
        corpName: item.corpName,
        transNo: item.transNo,
        approve: approve,
        reason: ''
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: item.transNo })
      // this.verifyDialogVisible = true
    },
    cancelCheck() {
      this.$refs.checkFlow.close()
    },
    handleVerify() {
      this.$refs.verifyForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then(code => {
            this.triggerVerifyApi(code)
          })
        }
      })
    },
    triggerVerifyApi(code) {
      PlatformApi.updateBankAccountAuthTrans({
        ...this.verifyForm,
        securityCode: code
      }).then(() => {
        this.$message.success('审核成功')
        this.$refs.verifyForm.resetFields()
        this.getData()
      }).finally(() => {
        this.$refs.checkFlow.close()
      })
    },
    cancel() {
      this.$refs.markForm.resetFields()
      this.markDialogVisible = false
    }
  }
}
</script>
<style lang="scss">
  .order-status {
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
</style>
