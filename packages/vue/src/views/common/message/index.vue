<template>
  <div class="page page-ent-message">
    <div class="filter-form">
      <el-form label-position="left" :inline="true" :model="form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="关键字">
              <el-input v-model="form.keyWord" clearable auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收日期">
              <el-date-picker
                v-model="form.timeRange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="~"
                type="daterange"
                :clearable="false"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tar">
            <el-form-item label="消息类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in messageTypeOptions"
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
            <el-form-item label="消息状态">
              <el-select v-model="form.readStatus" placeholder="请选择">
                <el-option
                  v-for="item in readStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
              <span class="opt-add-btn">
                <el-button type="primary" @click="markAllReaded">全部标记为已读</el-button>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
      <el-table-column slot="messageType" label="消息类型" width="120">
        <template slot-scope="scope">
          <div class="message-type">{{ '【' + messageTypeMap[scope.row.type] + '】' }}</div>
        </template>
      </el-table-column>
      <el-table-column slot="content" label="消息内容">
        <template slot-scope="scope">
          <div class="title">{{ scope.row.title }}</div>
          <div class="content" v-html="scope.row.content" />
          <div class="time">{{ scope.row.signerTime }}</div>
        </template>
      </el-table-column>
      <el-table-column slot="readStatus" label="消息状态" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.readStatus === 'READ'" class="readed">已读</div>
          <el-button v-else type="text" size="small" @click="markReaded(scope.row)">标记为已读</el-button>
        </template>
      </el-table-column>
    </basic-table>

    <Pagination
      v-if="!loading && list.length"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      :current-change="onCurrentChange"
      :size-change="onSizeChange"
    />
  </div>
</template>

<script>
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'

import { CommonApi } from '@/api'

const messageTypeOptions = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '平台公告',
    value: 'ANNOUNCEMENT'
  },
  {
    label: '业务通知',
    value: 'NOTICE'
  }
]
const readStatusOptions = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '已读',
    value: 'READ'
  },
  {
    label: '未读',
    value: 'UNREAD'
  }
]
const filterForm = {
  timeRange: null,
  keyWord: '',
  type: '',
  readStatus: ''
}
const messageTypeMap = {
  ANNOUNCEMENT: '平台公告',
  NOTICE: '业务通知'
}
export default {
  name: 'EntMessage',
  components: {
    BasicTable,
    Pagination
  },
  data() {
    return {
      form: { ...filterForm },
      readStatusOptions,
      messageTypeOptions,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      list: [],
      colConfigs: [
        { slot: 'messageType' },
        { slot: 'content' },
        { slot: 'readStatus' }
      ],
      messageTypeMap
    }
  },
  created() {
    this.getData()
  },
  methods: {
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
        keyWord: this.form.keyWord,
        type: this.form.type,
        readStatus: this.form.readStatus,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.loading = true
      CommonApi.queryMessageList({
        ...params
      })
        .then(response => {
          this.list = response.data
          this.total = response.total
          this.loading = false
        })
        .catch(() => {
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
    markAllReaded() {
      this.$confirm('是否要全部标记为已读？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          CommonApi.markAllRead(this.list.map(item => item.id)).then(
            response => {
              this.$message({
                type: 'success',
                message: '标记成功!'
              })
              this.getData()
            }
          )
        })
        .catch(() => {})
    },
    markReaded(row) {
      CommonApi.markRead({
        messageOperId: row.id
      }).then(response => {
        this.$message({
          type: 'success',
          message: '标记成功!'
        })
        this.getData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message-type {
  color: $titleColor;
}
.title {
  color: $titleColor;
  font-weight: 700;
  font-size: 16px;
}
.content {
  color: $textColor;
}
.time {
  color: #8492a6;
  font-size: 12px;
}
.readed {
  color: $labelColor;
}
</style>
