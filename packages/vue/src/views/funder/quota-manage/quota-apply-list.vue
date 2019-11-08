<template>
  <div>
    <div class="filter-form">
      <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-position="left" label-width="96px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="核心企业名称" prop="coreCorpName">
              <el-input v-model="ruleForm.coreCorpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信有效期" prop="range">
              <el-date-picker
                v-model="ruleForm.range"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请内容" prop="quotaOperateTransType" label-width="70px">
              <el-select v-model="ruleForm.quotaOperateTransType" placeholder="请选择">
                <el-option label="全部" :value="''" />
                <el-option
                  v-for="item in AQUOTA_OPERATE_LIST"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="流程状态" prop="bizStatus">
              <el-select v-model="ruleForm.bizStatus" placeholder="请选择">
                <el-option label="全部" :value="''" />
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
        <el-table-column slot="toCorpName" label="核心企业名称" width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.toCorpNo">{{ scope.row.toCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column slot="attachments" label="附件" width="180px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.attachments" :key="index" class="ellipsis cursor">
              <Download :direct="true" :url="item" class="theme">{{ getUrlFileName(item) }}</Download>
            </span>
          </template>
        </el-table-column>
        <el-table-column slot="bizStatusName" label="流程状态" width="120px" fixed="right">
          <template slot-scope="scope">
            <div :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ scope.row.bizStatusName }}</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="140px" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="viewAssets(scope.row)">资产浏览</el-button>
              <el-button v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE && checkPermission('quota-manage__apply-list_check')" type="text" @click="showCheck(scope.row)">审核</el-button>
              <el-button v-if="scope.row.button === CHECK_FLOW_STATUS.DONE" type="text" @click="showFlow(scope.row)">审批流</el-button>
            </div>
          </template>
        </el-table-column>
        <div slot="append">
          <NoData v-if="!list.length && !loading" title="暂时没有数据" />
        </div>
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

import tableMixin from '@/utils/tableMixin'
import checkPermission from '@/utils/permission'

import { AQUOTA_OPERATE_LIST, } from '@/utils/constant/quota'
import { ORDER_STATUS_COLOR, FLOW_POP_TYPE, CHECK_FLOW_STATUS } from '@/utils/constant/index'

import { CommonApi } from '@/api/index'

import { getUrlFileName } from '@/utils/'
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
      AQUOTA_OPERATE_LIST,
      ORDER_STATUS_COLOR,
      FLOW_POP_TYPE,
      CHECK_FLOW_STATUS,
      ruleForm: {
        coreCorpName: '',
        effectiveDate: '',
        expireDate: '',
        range: '',
        quotaOperateTransType: '',
        bizStatus: '',
        transNo: ''
      },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '220px' },
        { label: '时间', prop: 'gmtCreated', width: '150px', },
        { slot: 'toCorpName' },
        { label: '信用额度（个）', prop: 'amount', width: '120px' },
        { label: '授信有效期', prop: 'expireDate', width: '280px', formatter: (row) => { return this.formatterTime(row.effectiveDate, 'YYYY-MM-DD') + ' ~ ' + this.formatterTime(row.expireDate, 'YYYY-MM-DD') } },
        { label: '申请内容', prop: 'transType', width: '300px', 'show-overflow-tooltip': true, formatter: this.formatterTransType },
        { label: '备注', prop: 'reason', width: '280px', 'show-overflow-tooltip': true },
        { slot: 'attachments' },
        { slot: 'bizStatusName' },
        { slot: 'opt' }
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
      // 'FUND_ADJUST_CREDIT', // 资金方调整授信
      // 'CORE_APPLY_ADJUST_CREDIT', // 核心授信调增申请
      // 'PLATFORM_APPLY_ADJUST_CREDIT', // 平台对核心的授信调整申请
      const valueList = []
      const result = []
      const data1 = this.currentDict.FUND_ADJUST_CREDIT || []
      const data2 = this.currentDict.CORE_APPLY_ADJUST_CREDIT || []
      const data3 = this.currentDict.PLATFORM_APPLY_ADJUST_CREDIT || []
      const allData = data1.concat(data2, data3)

      allData.forEach(item => {
        if (!valueList.includes(item.value)) {
          valueList.push(item.value)
          result.push(item)
        }
      })

      return result
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
  created() {
    this.getData()
    // this.getBizStatus()
  },
  methods: {
    checkPermission,
    getUrlFileName,
    formatterTransType(row) {
      return row.applyContent + (row.applyReason ? ' 备注：' + row.applyReason : '')
    },
    getData() {
      if (this.loading) return
      this.loading = true
      const data = Object.assign({}, {
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      CommonApi.queryManageQuotaTrans(data).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    // getBizStatus() {
    //   CommonApi.getBizStatusCondition({
    //     flowTypes: [
    //       'FUND_ADJUST_CREDIT', // 资金方调整授信
    //       'CORE_APPLY_ADJUST_CREDIT', // 核心授信调增申请
    //       'PLATFORM_APPLY_ADJUST_CREDIT', // 平台对核心的授信调整申请
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

