<template>
  <div class="page page-corp-manage">
    <el-tabs v-model="ruleForm.auditType" @tab-click="switchTab">
      <!-- 授信列表 -->
      <el-tab-pane label="认证审核" name="AUTH" />
      <el-tab-pane label="变更审核" name="CHANGE" />
    </el-tabs>
    <div class="filter-form">
      <el-form
        ref="ruleForm"
        :inline="true"
        :model="ruleForm"
        label-position="left"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业类型" prop="corpType">
              <el-select v-model="ruleForm.corpType" placeholder="请选择">
                <el-option v-for="(ent,key) in role_type" :key="key" :label="ent" :value="key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程状态" prop="bizStatus">
              <el-select v-model="ruleForm.bizStatus" placeholder="请选择">
                <el-option key="all" label="全部" value />
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
            <el-form-item label="企业名称" prop="corpName">
              <el-input v-model="ruleForm.corpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="注册时间" prop="regdate">
              <el-date-picker
                v-model="ruleForm.regdate"
                end-placeholder="结束日期"
                start-placeholder="开始日期"
                type="daterange"
                value-format="yyyy-MM-dd"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button class="search" type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
              <span v-if="ruleForm.auditType === 'AUTH' && checkPermission('corp-list__add')" class="opt-add-btn">
                <el-button type="primary" @click="handlePlatAddCorp">添加企业</el-button>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div>
      <div v-loading="loading">
        <el-table
          v-loading="loading"
          :data="list"
          empty-text=" "
          element-loading-text="Loading"
          highlight-current-row
          stripe
        >
          <el-table-column label="hash" width="165px" show-overflow-tooltip>
            <template slot-scope="scope">
              <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash" type="1">{{ scope.row.txHash }}</hash-link>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" prop="gmtCreated" width="100px" />
          <el-table-column label="企业类型" prop="corpType1" />
          <el-table-column label="企业名称" prop="corpName" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="ruleForm.auditType === 'AUTH'">
                <corp-link :corp-no="scope.row.corpNo">{{ scope.row.corpName }}</corp-link>
              </div>
              <div v-else>
                <corp-link :trans-no="scope.row.transNo">{{ scope.row.corpName }}</corp-link>
              </div>

            </template>
          </el-table-column>
          <el-table-column label="主账号" prop="operName" width="200px" show-overflow-tooltip />
          <el-table-column label="备注" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.reason }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="流程状态" prop="bizStatusName" fixed="right">
            <template slot-scope="scope">
              <div :class="ORDER_STATUS_COLOR[scope.row.orderStatus]">{{ scope.row.bizStatusName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.orderStatus === 'PROCESSING' && (checkPermission('corp-list__auth_check') || checkPermission('corp-list__change_check'))"
                type="text"
                @click="showCheck(scope.row)"
              >审核</el-button>
              <!-- <el-button v-if="scope.row.button === CHECK_FLOW_STATUS.DONE" type="text" @click="showFlow(scope.row)">审批流</el-button> -->
            </template>
          </el-table-column>
          <div slot="append">
            <NoData v-if="!list.length" title="暂时没有数据" />
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
    </div>

    <!-- 审核 -->
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
            <el-button type="primary" @click="handleVerify">确 定</el-button>
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

  </div>
</template>

<script>
// import CheckFlow from '@/components/CheckFlow/index'

import { PlatformApi } from '@/api'
import tableMixin from '@/utils/tableMixin'
import { ROLE_TYPE } from '@/utils/constant/corp-info'
import { ORDER_STATUS_COLOR, FLOW_POP_TYPE, CHECK_FLOW_STATUS } from '@/utils/constant/index'
import Validator from '@/utils/validator'

import { mapGetters } from 'vuex'

delete ROLE_TYPE.PLATFORM
export default {
  name: 'CorpManage',
  // components: {
  //   CheckFlow,
  // },
  mixins: [tableMixin],
  data() {
    return {
      role_type: ROLE_TYPE,
      ORDER_STATUS_COLOR,
      FLOW_POP_TYPE,
      CHECK_FLOW_STATUS,
      auditForm: {
        transNo: '',
        reason: '',
        corpName: '',
        approve: true,
        securityCode: '',
        corpNo: '',
        id: ''
      },
      ruleForm: {
        corpType: null,
        corpName: '',
        bizStatus: '',
        status: '',
        endTime: '',
        startTime: '',
        auditType: 'AUTH'
      },
      loading: false,
      list: [],
      form: {
        type: '',
        enterpris: '',
        name: '',
        email: ''
      },
      // bizStatusArr: [],
      dialogVisible: false,
      verifyForm: {
        id: '',
        corpNo: '',
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
      return this.currentDict.CORP_AUTH || []
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
    // this.getBizStatus()
  },
  methods: {
    getData() {
      PlatformApi.getEntList({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        // 处理时间和状态等
        this.list = data.data.map(item => {
          item.corpType1 = ROLE_TYPE[item.corpType]
          return item
        })
        this.total = data.total
      })
    },
    // getBizStatus() {
    //   CommonApi.getBizStatusCondition({
    //     flowTypes: ['CORP_AUTH'],
    //   }).then(res => {
    //     this.bizStatusArr = res.data || []
    //   })
    // },
    onSearch() {
      const { regdate } = this.ruleForm
      if (Array.isArray(regdate)) {
        this.ruleForm.startTime = this.ruleForm.regdate[0]
        this.ruleForm.endTime = this.ruleForm.regdate[1]
      }
      this.getData()
    },
    showDialogRemark(remark) {
      this.$alert(remark, '查看备注')
    },
    switchTab(target) {
      this.ruleForm.auditType = target.name
      this.getData()
    },
    handlePlatAddCorp() {
      this.$router.push({
        path: '/corp-manage/add-corp'
      })
    },
    // 审核
    showCheck(item, approve = true) {
      this.verifyForm = {
        ...this.verifyForm,
        corpName: item.corpName,
        corpNo: item.corpNo,
        transNo: item.transNo,
        approve: approve,
        reason: '',
        id: item.id,
      }
      // this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.CHECK, transNo: item.transNo，, title: '认证审核' })
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
            PlatformApi.setEntAudit({
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
    // // 审核流
    // showFlow(item) {
    //   this.verifyForm = {
    //     ...this.verifyForm,
    //     corpName: item.toCorpName,
    //     transNo: item.transNo,
    //     approve: item.approve,
    //     reason: item.reason
    //   }
    //   this.$refs.checkFlow.open({ type: this.FLOW_POP_TYPE.FLOW, transNo: item.transNo, })
    // },
  }
}
</script>

<style lang="scss" scoped>

.blue {
  color: $wait;
}
.green {
  color: $success;
}
.red {
  color: $error;
}
.yellow {
  color: $warning;
}
.disabled {
  color: $disabled;
}
.entInfo {
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.dialog-class {
  /deep/ .el-dialog__body {
    padding: 20px;
  }
}
.entInfo,
.busInfo {
  > .item {
    display: flex;
    width: 100%;
    > p:first-child {
      flex: 1 1 18%;
      label {
        width: 125px;
      }
    }
    > p {
      margin: 8px;
      flex: 1;
      label {
        display: inline-block;
        vertical-align: top;
        color: $info;
        width: 100px;
      }
      span {
        display: inline-block;
        width: 60%;
        > img {
          width: 150px;
        }
      }
    }
  }
}
.plat-add-btn {
  margin-bottom: 18px;
}
</style>
