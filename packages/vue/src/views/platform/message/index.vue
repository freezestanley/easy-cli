<template>
  <div class="page page-message">
    <div class="filter-form">
      <el-form ref="ruleForm" :model="form" :inline="true" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="发送日期">
              <el-date-picker
                v-model="form.timeRange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="~"
                type="daterange"
                value-format="yyyy-MM-dd"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="消息标题">
              <el-input v-model="form.title" clearable auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收企业类型" label-width="96px">
              <el-select v-model="form.receiverCorpType" placeholder="请选择">
                <el-option
                  v-for="item in entTypeOptions"
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
            <el-form-item label="接收企业">
              <el-input v-model="form.receiverCorpName" clearable auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="消息状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
              <div v-permission="['PLATFORM_3']" class="opt-add-btn">
                <el-button type="primary" icon="el-icon-plus" @click="handleAddMsg">新增消息</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div>
      <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
        <el-table-column slot="receiverCorpType" label="接收企业类型" width="120">
          <template slot-scope="scope">
            <div>{{ corpTypeMap[scope.row.receiverCorpType] }}</div>
          </template>
        </el-table-column>
        <el-table-column slot="status" label="消息状态" width="100">
          <template slot-scope="scope">
            <div :class="statusClassName[scope.row.status]">{{ statusMap[scope.row.status] }}</div>
          </template>
        </el-table-column>
        <el-table-column slot="opt" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleView(scope.row, $event)">查看接收企业</el-button>
            <el-button v-if="scope.row.status === 'I'" type="text" size="small" class="error" @click="cancelSending(scope.row)">取消发送并删除</el-button>
            <el-button v-else-if="scope.row.status === 'F'" type="text" size="small" class="error" @click="handleResend(scope.row)">重发</el-button>
          </template>
        </el-table-column>
      </basic-table>

      <Pagination
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        :current-change="onCurrentChange"
        :size-change="onSizeChange"
      />
    </div>

    <!-- 接收企业 -->
    <el-dialog
      title="接收企业"
      :visible.sync="listDialogVisible"
      :append-to-body="true"
      width="650px"
    >
      <basic-table v-loading="corpListLoading" stripe :data="receiverCorpList" :col-configs="corpColConfigs" style="max-height: 600px;overflow-x: hidden;overflow-y: auto;" />
      <Pagination
        :page-size="corpPageSize"
        :current-page="corpCurrentPage"
        :total="corpTotal"
        :current-change="onCurrentPageChange"
        :size-change="onPageSizeChange"
      />
    </el-dialog>

    <!-- 新增消息 -->
    <el-drawer
      :visible.sync="addDialogVisible"
      title="新增消息"
      :append-to-body="true"
      width="600px"
    >
      <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="80px" label-position="left">
        <el-form-item label="发送对象">
          <el-radio v-model="addForm.target" :label="1">批量发送</el-radio>
          <el-radio v-model="addForm.target" :label="2">自定义</el-radio>
        </el-form-item>
        <div>
          <el-form-item v-if="addForm.target === 1" label="接收企业类型" prop="receiverCorpType">
            <el-select v-model="addForm.receiverCorpType" placeholder="请选择" class="w100">
              <el-option
                v-for="item in corpTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div />
        <div>
          <el-form-item v-if="addForm.target === 2" label="接收企业" prop="receiverCorpNoList">
            <el-select v-model="addForm.receiverCorpNoList" class="w100" multiple filterable placeholder="请选择">
              <el-option
                v-for="item in entOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="消息标题" prop="title">
          <el-input v-model="addForm.title" maxlength="20" autocomplete="off" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
          <el-input v-model="addForm.content" type="textarea" resize="none" :maxlength="100" :rows="4" show-word-limit autocomplete="off" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发送时间">
          <el-radio v-model="addForm.timeType" :label="1">即时发送</el-radio>
          <el-radio v-model="addForm.timeType" :label="2">定时发送</el-radio>
        </el-form-item>
        <el-form-item v-if="addForm.timeType === 2" label="选择时间" prop="signerTime">
          <el-date-picker
            v-model="addForm.signerTime"
            type="datetime"
            default-time="12:00:00"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            :picker-options="pickerOptions"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="addButtonLoading" @click="confirmAddMsg('addForm')">确定</el-button>
      </div>
    </el-drawer>

    <!-- 重发消息 -->
    <el-dialog
      :visible.sync="resendDialogVisible"
      title="重发消息"
      :append-to-body="true"
    >
      <el-form ref="resendForm" :model="resendForm" :rules="resendFormRules" label-width="120px" label-position="left">
        <el-form-item label="发送对象">
          <el-radio v-model="resendForm.target" :label="1">批量发送</el-radio>
          <el-radio v-model="resendForm.target" :label="2">自定义</el-radio>
        </el-form-item>
        <div>
          <el-form-item v-if="resendForm.target === 1" label="接收企业类型">
            <el-select v-model="resendForm.receiverCorpType" placeholder="请选择">
              <el-option
                v-for="item in corpTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div />
        <div>
          <el-form-item v-if="resendForm.target === 2" label="接收企业">
            <el-select v-model="resendForm.receiverCorpNoList" multiple filterable placeholder="请选择">
              <el-option
                v-for="item in entOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="消息标题">
          <el-input v-model="resendForm.title" maxlength="20" autocomplete="off" placeholder="请输入消息标题" />
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input v-model="resendForm.content" type="textarea" resize="none" :maxlength="100" :rows="4" show-word-limit autocomplete="off" placeholder="请输入消息内容" />
        </el-form-item>
        <el-form-item label="发送时间">
          <el-radio v-model="resendForm.timeType" :label="1">即时发送</el-radio>
          <el-radio v-model="resendForm.timeType" :label="2">定时发送</el-radio>
        </el-form-item>
        <el-form-item v-if="resendForm.timeType === 2" label="选择时间">
          <el-date-picker
            v-model="resendForm.signerTime"
            type="datetime"
            default-time="12:00:00"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="resendDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="resendButtonLoading" @click="confirmResend('resendForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import { numToStr } from '@/utils/validator'

import { PlatformApi } from '@/api'

import dayjs from 'dayjs'

const entTypeOptions = [{
  label: '全部',
  value: ''
}, {
  label: '全部企业',
  value: 'ALL'
}, {
  label: '链属企业',
  value: 'CHAIN'
}, {
  label: '核心企业',
  value: 'CORE'
}, {
  label: '资金方',
  value: 'FUND'
}]
const statusOptions = [{
  label: '全部',
  value: ''
}, {
  label: '待发送',
  value: 'I'
}, {
  label: '发送中',
  value: 'P'
}, {
  label: '已发送',
  value: 'S'
}, {
  label: '发送失败',
  value: 'F'
}]
const corpTypeMap = {
  'CUSTOMIZE': '自定义',
  'CHAIN': '链属企业',
  'CORE': '核心企业',
  'FUND': '资金方',
  'ALL': '全部企业'
}
const statusMap = {
  'I': '待发送',
  'P': '发送中',
  'S': '已发送',
  'F': '发送失败'
}
const statusClassName = {
  'I': 'wait',
  'P': 'warning',
  'S': 'success',
  'F': 'error'
}
const filterForm = {
  timeRange: null,
  title: '',
  receiverCorpType: '',
  receiverCorpName: '',
  status: ''
}
const corpTypeOptions = [{
  label: '全部企业',
  value: 'ALL'
}, {
  label: '链属企业',
  value: 'CHAIN'
}, {
  label: '核心企业',
  value: 'CORE'
}, {
  label: '资金方',
  value: 'FUND'
}]
const addForm = {
  target: 1,
  receiverCorpType: 'ALL',
  receiverCorpNoList: null,
  title: '',
  content: '',
  timeType: 1,
  signerTime: ''
}
const resendForm = {
  target: 1,
  receiverCorpType: 'ALL',
  receiverCorpNoList: null,
  title: '',
  content: '',
  timeType: 1,
  signerTime: ''
}

export default {
  name: 'Message',
  components: {
    BasicTable,
    Pagination,
  },
  data () {
    return {
      form: { ...filterForm },
      entTypeOptions,
      statusOptions,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      list: [],
      colConfigs: [
        { label: '发送时间', prop: 'signerTime', width: '150' },
        { slot: 'receiverCorpType' },
        { label: '接收企业数量', prop: 'receiverNum', 'min-width': '120', formatter: (row) => { return numToStr(row.receiverNum, '') } },
        { label: '消息标题', prop: 'title', 'min-width': '120', 'show-overflow-tooltip': true },
        { label: '消息内容', prop: 'content', 'min-width': '150', 'show-overflow-tooltip': true },
        { slot: 'status' },
        { slot: 'opt' }
      ],
      corpTypeMap,
      statusMap,
      statusClassName,
      entOptions: [],
      corpTypeOptions,
      addDialogVisible: false,
      addButtonLoading: false,
      addForm: { ...addForm },
      addFormRules: {
        title: [
          { required: true, message: '请输入消息标题' },
        ],
        content: [
          { required: true, message: '请输入消息内容' },
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          const date = dayjs(time.getTime()).format('YYYY-MM-DD')
          const now = dayjs(Date.now()).format('YYYY-MM-DD')

          return date < now
        }
      },
      resendDialogVisible: false,
      resendButtonLoading: false,
      resendForm: { ...resendForm },
      resendFormRules: {
        title: [
          { required: true, message: '请输入消息标题' },
        ],
        content: [
          { required: true, message: '请输入消息内容' },
        ]
      },
      messageNo_Resend: null,
      listDialogVisible: false,
      corpListLoading: false,
      corpCurrentPage: 1,
      corpPageSize: 10,
      corpTotal: 0,
      receiverCorpList: [],
      corpColConfigs: [
        { label: '企业编号', prop: 'corpNo', width: '200' },
        { label: '企业名称', prop: 'corpName' }
      ],
      messageNo_viewCorp: null,
      messageNo_cancel: null,
    }
  },
  created() {
    this.getData()
    this.getCorp()
  },
  methods: {
    numToStr,
    handleSearch() {
      this.currentPage = 1
      this.getData()
    },
    handleReset() {
      this.form = { ...filterForm }
      // this.getData()
    },
    getData() {
      const params = {
        startTime: this.form.timeRange ? this.form.timeRange[0] : '',
        endTime: this.form.timeRange ? this.form.timeRange[1] : '',
        title: this.form.title,
        receiverCorpType: this.form.receiverCorpType,
        receiverCorpName: this.form.receiverCorpName,
        status: this.form.status,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.loading = true
      PlatformApi.queryAnnouncementList({
        ...params
      }).then(response => {
        this.list = response.data
        this.total = response.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    onCurrentChange(p) {
      this.currentPage = p
      this.getData()
    },
    onSizeChange(page) {
      this.currentPage = 1
      this.pageSize = page
      this.getData()
    },
    getCorp() {
      PlatformApi.getCorpList({}).then(response => {
        this.entOptions = response.data.map(item => {
          return {
            label: item.corpName,
            value: item.corpNo
          }
        })
      })
    },
    handleAddMsg() {
      this.addDialogVisible = true
    },
    confirmAddMsg(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }

        this.$securityCode().then((code) => {
          this.triggerAddApi(code)
        })
      })
    },
    triggerAddApi(code) {
      const params = {
        title: this.addForm.title,
        content: this.addForm.content
      }
      if (this.addForm.target === 1) {
        params.receiverCorpType = this.addForm.receiverCorpType
      } else if (this.addForm.target === 2) {
        params.receiverCorpType = 'CUSTOMIZE'
        params.receiverCorpNoList = this.addForm.receiverCorpNoList
      }
      if (this.addForm.timeType === 1) {
        params.signerTime = this.$dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      } else if (this.addForm.timeType === 2) {
        params.signerTime = this.$dayjs(this.addForm.signerTime.getTime()).format('YYYY-MM-DD HH:mm:ss')
      }

      PlatformApi.addAnnouncement({
        ...params,
        securityCode: code
      }).then(response => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.addForm = { ...addForm }
        this.$refs['addForm'].resetFields()
        this.addDialogVisible = false

        this.getData()
      }).catch(() => {

      })
    },
    handleView(row) {
      this.messageNo_viewCorp = row.messageNo
      this.listDialogVisible = true
      this.corpCurrentPage = 1
      this.corpPageSize = 10
      this.getReceiverCorp()
    },
    getReceiverCorp() {
      this.corpListLoading = true
      PlatformApi.querySendMessageCorp({
        messageNo: this.messageNo_viewCorp,
        pageNum: this.corpCurrentPage,
        pageSize: this.corpPageSize
      }).then(response => {
        this.receiverCorpList = response.data
        this.corpTotal = response.total
        this.corpListLoading = false
      }).catch(() => {
        this.receiverCorpList = []
        this.corpTotal = 0
        this.corpListLoading = false
      })
    },
    onCurrentPageChange(p) {
      this.corpCurrentPage = p
      this.getReceiverCorp()
    },
    onPageSizeChange(page) {
      this.corpCurrentPage = 1
      this.corpPageSize = page
      this.getReceiverCorp()
    },
    handleResend(row) {
      this.messageNo_Resend = row.messageNo
      if (row.receiverCorpType === 'CUSTOMIZE') {
        this.resendForm = {
          target: 2,
          receiverCorpType: 'CUSTOMIZE',
          receiverCorpNoList: JSON.parse(row.receiverCorpJson),
          title: row.title,
          content: row.content,
          timeType: 1,
          signerTime: ''
        }
      } else {
        this.resendForm = {
          target: 1,
          receiverCorpType: row.receiverCorpType,
          receiverCorpNoList: null,
          title: row.title,
          content: row.content,
          timeType: 1,
          signerTime: ''
        }
      }

      this.resendDialogVisible = true
    },
    confirmResend(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        this.$securityCode().then(code => {
          this.triggerResendApi(code)
        })
      })
    },
    triggerResendApi(code) {
      const params = {
        messageNo: this.messageNo_Resend,
        title: this.resendForm.title,
        content: this.resendForm.content
      }
      if (this.resendForm.target === 1) {
        params.receiverCorpType = this.resendForm.receiverCorpType
      } else if (this.resendForm.target === 2) {
        params.receiverCorpType = 'CUSTOMIZE'
        params.receiverCorpNoList = this.resendForm.receiverCorpNoList
      }
      if (this.resendForm.timeType === 1) {
        params.signerTime = this.$dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      } else if (this.resendForm.timeType === 2) {
        params.signerTime = this.$dayjs(this.resendForm.signerTime.getTime()).format('YYYY-MM-DD HH:mm:ss')
      }

      PlatformApi.resendMessage({
        ...params,
        securityCode: code
      }).then(response => {
        this.$message({
          type: 'success',
          message: '重发成功!'
        })
        this.resendForm = { ...resendForm }
        this.$refs['resendForm'].resetFields()
        this.resendDialogVisible = false

        this.getData()
      }).catch(() => {

      })
    },
    cancelSending(row) {
      this.messageNo_cancel = row.messageNo
      this.$myConfirm({
        msg: '是否要取消发送并删除该条消息？',
        title: '取消发送并删除',
        icon: 'delete'
      }).then(() => {
        this.$securityCode().then(code => {
          this.triggerCancelApi(code)
        })
      }).catch(() => {
      })
    },
    triggerCancelApi(code) {
      PlatformApi.cancelSendMessage({
        messageNo: this.messageNo_cancel,
        securityCode: code
      }).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getData()
      })
    }
  },
}
</script>
