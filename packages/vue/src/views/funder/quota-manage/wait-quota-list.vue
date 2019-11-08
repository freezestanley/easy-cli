<template>
  <div>
    <div class="filter-form">
      <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-position="left" label-width="96px">
        <el-row :gutter="20">
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
            <el-form-item label="核心企业名称" prop="toCorpName">
              <el-input v-model="ruleForm.toCorpName" placeholder="请输入" />
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
        <el-table-column slot="bizStatusName" label="流程状态" width="120px" fixed="right">
          <template slot-scope="scope">
            <div :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ scope.row.bizStatusName }}</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="240px" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="viewAssets(scope.row)">资产浏览</el-button>
              <Download v-if="scope.row.contractNo !== null" :url="scope.row.contractUrl" direct>
                <el-button type="text">下载合约</el-button>
              </Download>
              <!-- <el-button v-if="scope.row.button === CHECK_FLOW_STATUS.OPERATE && checkPermission('quota-manage__wait-list_check')" type="text" @click="showCheck(scope.row)">审核</el-button>
              <el-button v-if="scope.row.button === CHECK_FLOW_STATUS.DONE" type="text" @click="showFlow(scope.row)">审批流</el-button> -->
              <el-button v-if="scope.row.orderStatus === 'PROCESSING' && checkPermission('quota-manage__wait-list_check')" type="text" @click="showCheck(scope.row)">审核</el-button>
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

    <!-- <CheckFlow ref="checkFlow">
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
    </CheckFlow> -->
    <!-- 审核 -->
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="520px"
      @close="cancelCheck"
    >
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCheck">取 消</el-button>
        <el-button type="primary" :loading="checkLoading" @click="handleVerify">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 资产浏览 -->
    <assets-preview-dialog ref="assetsDialog" />
  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'
// import CheckFlow from '@/components/CheckFlow/index'
import AssetsPreviewDialog from '@/components/CommonDialogs/AssetsPreviewDialog'

import tableMixin from '@/utils/tableMixin'
import checkPermission from '@/utils/permission'
import { ORDER_STATUS_COLOR, FLOW_POP_TYPE, CHECK_FLOW_STATUS } from '@/utils/constant/index'
import { thousands } from '@/utils/index'

import { CommonApi } from '@/api/index'
import Validator from '@/utils/validator'

export default {
  components: {
    BasicTable,
    // CheckFlow,
    AssetsPreviewDialog
  },
  mixins: [tableMixin],
  data() {
    return {
      ORDER_STATUS_COLOR,
      FLOW_POP_TYPE,
      CHECK_FLOW_STATUS,
      ruleForm: {
        toCorpName: '',
        transNo: ''
      },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', prop: 'transNo', width: '220px' },
        { label: '推送时间', prop: 'gmtCreated', width: '150px', },
        { slot: 'toCorpName' },
        { label: '授信额度(元)', prop: 'amount', width: '150px', 'show-overflow-tooltip': true, formatter: (row) => { return this.thousands(row.amount, 0) } },
        { label: '授信有效期', prop: 'effectiveDate', width: '200px', formatter: (row) => { return row.effectiveDate ? (this.formatterTime(row.effectiveDate, 'YYYY-MM-DD') + '~' + this.formatterTime(row.expireDate, 'YYYY-MM-DD')) : '' } },
        { slot: 'bizStatusName' },
        { label: '备注', prop: 'reason', minWidth: '120px', 'show-overflow-tooltip': true },
        { slot: 'opt' }
      ],
      dialogVisible: false,
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
  created() {
    this.getData()
  },
  methods: {
    checkPermission,
    thousands,
    getData() {
      if (this.loading) return
      this.loading = true
      CommonApi.queryIssueQuotaTrans({
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
      // this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: item.transNo, title: '授信审核' })
      this.dialogVisible = true
    },
    cancelCheck() {
      // this.$refs.checkFlow.close()
      this.dialogVisible = false
      this.$refs.verifyForm.resetFields()
    },
    handleVerify() {
      this.$refs.verifyForm.validate((valid) => {
        if (valid) {
          this.$securityCode().then((code) => {
            this.checkLoading = true
            CommonApi.updateIssueQuotaTrans({
              ...this.verifyForm,
              securityCode: code,
            }).then(() => {
              this.$message.success('审核成功')
              // this.$refs.checkFlow.close()
              this.cancelCheck()
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
.file-block {
  margin: 10px 0 30px;
  width: 500px;
}

</style>
