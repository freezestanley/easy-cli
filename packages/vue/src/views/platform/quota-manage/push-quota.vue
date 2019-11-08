<template>
  <div class="page page-push-credit">
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-width="96px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="核心企业名称" prop="corpName">
              <el-input v-model="ruleForm.corpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推送状态" prop="isPushIncTrust">
              <el-select v-model="ruleForm.isPushIncTrust">
                <el-option value="">全部</el-option>
                <el-option v-for="(value, name) in CORE_PUSH_STATUS" :key="name" :value="name" :label="value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tar">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-box">
      <el-table
        :data="list"
        :default-sort="{prop: 'corpType', order: 'asc'}"
        :empty-text="' '"
        fit
        stripe
        highlight-current-row
      >
        <el-table-column label="编号" prop="corpNo" width="200px" />
        <el-table-column label="核心企业名称" min-width="150px" show-overflow-tooltip>
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.corpNo">{{ scope.row.corpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column label="认证通过时间" prop="auditTime" width="200px" />
        <el-table-column label="主账号" prop="operName" width="200px" show-overflow-tooltip />
        <el-table-column label="推送状态" fixed="right">
          <template slot-scope="scope">
            <span v-if="scope.row.isPushIncTrust === 'N'" class="warning">未推送</span>
            <span v-else-if="scope.row.isPushIncTrust === 'Y'" class="success">已推送</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="240px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewAssets(scope.row)">资产浏览</el-button>
            <el-button
              v-permission="'push-quota__push'"
              type="text"
              size="small"
              @click="clickPush(scope.row)"
            >推送</el-button>
            <el-button
              v-if="scope.row.isPushIncTrust === 'Y'"
              type="text"
              size="small"
              @click="showPushDetail(scope.row)"
            >推送/授信情况</el-button>
          </template>
        </el-table-column>
        <div slot="append">
          <NoData v-if="!list.length && !loading" title="暂时没有可推送的企业" />
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
      :visible.sync="pushDialogVisible"
      title="推送授信"
      :before-close="handleDialogClose"
      :append-to-body="true"
      width="600px"
    >
      <div v-loading="dialogLoading">
        <el-form ref="pushForm" :model="pushForm" :rules="pushRules" label-position="left" label-width="96px" class="form-class">
          <el-form-item label="资金方" prop="fromCorpNo">
            <el-select v-model="pushForm.fromCorpNo" filterable placeholder="请选择资金方">
              <el-option v-for="item in fundList" :key="item.key" :value="item.key" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="授信额度" prop="amount">
            <div class="relative">
              <el-input-number
                v-model="pushForm.amount"
                controls-position="right"
                :controls="false"
                :min="1"
                :max="99999999999999"
                :step="1"
                step-strictly
              />
              <div class="suffix">个</div>
            </div>
          </el-form-item>
          <el-form-item label="授信有效期" prop="range">
            <el-date-picker
              v-model="pushForm.range"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :clearable="false"
            />
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" :loading="pushLoading" @click="handlePush">确 定</el-button>
      </div>
    </el-dialog>
    <assets-preview-dialog ref="assetsDialog" />
    <push-credit-detail ref="creditDetail" />
  </div>
</template>

<script>
import { CommonApi } from '@/api'
import { CORE_PUSH_STATUS } from '@/utils/constant/quota.js'
import tableMixin from '@/utils/tableMixin'

import AssetsPreviewDialog from '@/components/CommonDialogs/AssetsPreviewDialog'
import PushCreditDetail from './components/PushCreditDetail'

export default {
  name: 'PushCredit',
  components: {
    AssetsPreviewDialog,
    PushCreditDetail
  },
  mixins: [tableMixin],
  data() {
    return {
      CORE_PUSH_STATUS,
      ruleForm: {
        corpName: '',
        isPushIncTrust: ''
      },
      loading: false,
      list: [],
      pushDialogVisible: false, // 推送弹窗
      assetDialogVisible: false, // 资产浏览弹窗
      fundList: [],
      dialogLoading: false,
      pushLoading: false,
      pushForm: {
        fromCorpNo: '',
        toCorpNo: '',
        amount: undefined,
        range: '',
        effectiveDate: '',
        expireDate: '',
      },
      pushRules: {
        fromCorpNo: [
          { required: true, message: '请选择资金方', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入授信额度', trigger: 'change' }
        ],
        range: [
          { required: true, message: '请选择授信有效期', trigger: 'change' }
        ],
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() <= +this.$dayjs().subtract(1, 'day')
        }
      },
    }
  },
  watch: {
    'pushForm.range': function(val) {
      if (val) {
        this.pushForm.effectiveDate = val[0] || ''
        this.pushForm.expireDate = val[1] || ''
      } else {
        this.pushForm.effectiveDate = ''
        this.pushForm.expireDate = ''
      }
    }
  },
  created() {
    this.getData()
    // this.getFundList()
  },
  methods: {
    getData() {
      if (this.loading) return
      this.loading = true
      CommonApi.queryQuotaCorp({
        corpType: 'CORE',
        ...this.ruleForm,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.list = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    // 查询指定核心企业待授信的资金方列表
    getFundList(corpNo) {
      if (this.dialogLoading) return
      this.dialogLoading = true
      CommonApi.queryQuotafundCorps({
        toCorpNo: corpNo
      }).then((res) => {
        this.fundList = res.data.map((fund) => {
          return {
            key: fund.corpNo,
            label: fund.corpName,
          }
        })
      }).finally(() => {
        this.dialogLoading = false
      })
    },
    // 资产浏览
    viewAssets(corp) {
      this.$refs.assetsDialog.open(corp.corpNo, 'CORE', 'ALL')
    },
    // 查看推送情况
    showPushDetail(corp) {
      this.detailDialog = true
      this.$refs.creditDetail.open(corp.corpNo)
    },
    // 点击推送按钮
    clickPush(corp) {
      this.pushForm.toCorpNo = corp.corpNo
      this.pushDialogVisible = true
      this.fundList = []
      this.getFundList(corp.corpNo)
    },
    // 确认推送
    handlePush() {
      this.$refs.pushForm.validate(valid => {
        if (valid) {
          this.$securityCode().then((code) => {
            if (this.pushLoading) return
            this.pushLoading = true
            CommonApi.applyIssueQuotaTrans({
              ...this.pushForm,
              securityCode: code
            }).then(() => {
              this.$message.success('推送成功')
              this.handleDialogClose()
              this.getData()
            }).finally(() => {
              this.pushLoading = false
            })
          })
        }
      })
    },
    handleDialogClose() {
      this.pushDialogVisible = false
      this.$refs.pushForm.resetFields()
      this.pushForm.toCorpNo = ''
      this.pushForm.range = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 100%;
}
.form-class {
  /deep/ .el-select, .el-date-editor, .el-input-number {
    width: 100%;
  }
  /deep/ .el-input-number__decrease {
    display: none;
  }
  /deep/ .el-input-number__increase {
    display: none;
  }
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
}
.relative {
  position: relative;
}
.suffix {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
}
</style>
