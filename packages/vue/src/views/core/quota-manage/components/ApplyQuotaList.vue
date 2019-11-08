<template>
  <div>
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left" label-width="96px">
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="授信有效期" prop="range">
              <el-date-picker
                v-model="ruleForm.range"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="流程状态" prop="bizStatus">
              <el-select v-model="ruleForm.bizStatus" placeholder="请选择">
                <el-option label="全部" value />
                <el-option
                  v-for="item in bizStatusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编号" prop="transNo">
              <el-input
                v-model.trim="ruleForm.transNo"
                type="text"
                placeholder="请输入编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-box">
      <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
        <el-table-column slot="bizStatusName" label="流程状态" width="120px" fixed="right">
          <template slot-scope="scope">
            <div :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ scope.row.bizStatusName }}</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="140px" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="viewAssets(scope.row)">资产浏览</el-button>
              <el-button v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE && checkPermission('quota-manage__check')" type="text" @click="showCheck(scope.row)">审核</el-button>
              <el-button v-if="scope.row.button === CHECK_FLOW_STATUS.DONE" type="text" @click="showFlow(scope.row)">审批流</el-button>
            </div>
          </template>
        </el-table-column>
      </basic-table>

      <Pagination
        v-if="list.length && !loading"
        :current-change="onCurrentChange"
        :current-page="pageNum"
        :page-size="pageSize"
        :size-change="onSizeChange"
        :total="total"
      />
    </div>

    <CheckFlow ref="checkFlow">
      <div slot="check">
        <el-form ref="verifyForm" class="mark-form" :model="verifyForm" :rules="rules" label-width="100px" label-position="left" style="width: 90%">
          <el-form-item label="企业名称">
            <span>{{ verifyForm.corpName }}</span>
          </el-form-item>
          <el-form-item label="审核结果" prop="approve">
            <el-radio-group v-model="verifyForm.approve">
              <el-radio :label="true">审核通过</el-radio>
              <el-radio :label="false">审核驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="!verifyForm.approve" label="驳回原因" prop="reason">
            <el-input v-model="verifyForm.reason" type="textarea" resize="none" :rows="4" :maxlength="100" show-word-limit placeholder="请输入驳回原因" />
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelCheck">取 消</el-button>
            <el-button type="primary" :loading="checkLoading" @click="handleVerify">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </CheckFlow>

    <!-- 资产浏览 -->
    <assets-preview-dialog ref="assetsDialog" />

  </div>
</template>
<script>

import BasicTable from '@/components/BasicTable'
import AssetsPreviewDialog from '@/components/CommonDialogs/AssetsPreviewDialog'
import CheckFlow from '@/components/CheckFlow/index'

import { thousands } from '@/utils/index'

import tableMixin from '@/utils/tableMixin'
import { ORDER_STATUS_COLOR, FLOW_POP_TYPE, CHECK_FLOW_STATUS } from '@/utils/constant/index'

import { CommonApi } from '@/api/index'
import Validator from '@/utils/validator'

import { mapGetters } from 'vuex'

export default {
  components: {
    BasicTable,
    AssetsPreviewDialog,
    CheckFlow,
  },
  mixins: [tableMixin],
  data() {
    return {
      ORDER_STATUS_COLOR,
      FLOW_POP_TYPE,
      CHECK_FLOW_STATUS,
      ruleForm: {
        effectiveDate: '',
        expireDate: '',
        range: '',
        bizStatus: '',
        transNo: '',
        triggerCorpType: 'CORE',
      },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', minWidth: '130px', 'show-overflow-tooltip': true },
        { label: '时间', prop: 'gmtCreated', width: '170px', },
        { label: '信用额度(个)', prop: 'amount', width: '132px', formatter: (row) => { return this.thousands(row.amount) } },
        { label: '授信有效期', prop: '', minWidth: '290px', formatter: (row) => { return this.formatterTime(row.effectiveDate, 'YYYY-MM-DD') + ' ~ ' + this.formatterTime(row.expireDate, 'YYYY-MM-DD') } },
        // { label: '申请内容', prop: 'applyReason', width: '190px', 'show-overflow-tooltip': true },
        { label: '申请内容', prop: 'transType', width: '200px', formatter: (row) => { return '调增至' + row.transParam.changeTargetQuota + '个' } },
        { label: '备注', prop: 'reason', minWidth: '132px', formatter: (row) => { return row.reason === '' ? '-' : row.reason }, 'show-overflow-tooltip': true },
        { slot: 'bizStatusName' },
        { slot: 'opt' },
      ],
      // bizStatusArr: [],
      verifyForm: {
        corpName: '',
        approve: true,
        reason: '', // 原因
      },
      rules: {
        corpName: [
          Validator.isRequired('请输入企业名称'),
          { min: 2, max: 5, message: '长度在 2 到 30 个字符' }
        ],
        reason: Validator.isRequired('请填写驳回原因')
      },
      checkLoading: false,
    }
  },
  computed: {
    ...mapGetters(['currentDict']),
    bizStatusArr: function() {
      return this.currentDict.CORE_APPLY_ADJUST_CREDIT || []
    }
  },
  watch: {
    'ruleForm.range': function(val) {
      if (val) {
        this.ruleForm.effectiveDate = val[0] || ''
        this.ruleForm.expireDate = val[1] || ''
      } else {
        this.ruleForm.effectiveDate = ''
        this.ruleForm.expireDate = ''
      }
    }
  },
  mounted() {
    this.getData()
    // this.getBizStatus()
  },
  methods: {
    thousands,
    getData() {
      if (this.loading) return
      this.loading = true
      this.ruleForm.quotaOperateTransStatus = this.ruleForm.status === '' ? [] : [this.ruleForm.status]
      CommonApi.queryManageQuotaTrans({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    // getBizStatus() {
    //   CommonApi.getBizStatusCondition({
    //     flowTypes: [
    //       'CORE_APPLY_ADJUST_CREDIT', // 核心授信调增申请
    //     ],
    //   }).then(res => {
    //     this.bizStatusArr = res.data || []
    //   })
    // },
    viewAssets(row) {
      this.$refs.assetsDialog.open(row.toCorpNo, 'CORE', 'ALL')
    },
    // 审核
    showCheck(item, approve = true) {
      this.verifyForm = {
        ...this.verifyForm,
        corpName: item.toCorpName,
        transNo: item.transNo,
        approve: approve,
        reason: ''
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: item.transNo, title: '授信审核' })
    },
    cancelCheck() {
      this.$refs.checkFlow.close()
    },
    handleVerify() {
      this.$refs.verifyForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then((code) => {
            this.checkLoading = true
            CommonApi.updateManageQuotaTrans({
              ...this.verifyForm,
              securityCode: code,
            }).then(() => {
              this.$message.success('审核成功')
              this.$refs.checkFlow.close()
              this.$refs.verifyForm.resetFields()
              this.getData()
            }).finally(() => {
              this.checkLoading = false
            })
          })
        }
      })
    },
    // 审核流
    showFlow(item) {
      this.verifyForm = {
        ...this.verifyForm,
        corpName: item.toCorpName,
        transNo: item.transNo,
        approve: item.approve,
        reason: item.reason
      }
      this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.FLOW, transNo: item.transNo, title: '授信审批流' })
    },
  }
}
</script>

<style lang="scss" scoped>
  .primary {
    color: $theme;
  }
  .success {
    color: $success;
  }
  .error {
    color: $error;
  }
  .disabled {
    color: $disabled
  }
  .warning{
    color: $warning
  }
  /deep/ .el-form-item__content .el-date-editor{
    width: 210px !important;
  }
</style>
