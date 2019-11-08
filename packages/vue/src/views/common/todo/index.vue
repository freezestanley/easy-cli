<template>
  <div class="page page-invite-code">
    <!-- <el-tabs v-model="activeTab" @tab-click="switchTab">
      <el-tab-pane label="待处理" :name="TAB_STATUS.SUCCESS" />
      <el-tab-pane label="驳回" :name="TAB_STATUS.RESOLVED" />
    </el-tabs> -->
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="关键字" prop="keyWord">
              <el-input v-model="ruleForm.keyWord" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择日期" prop="filterDate">
              <el-date-picker
                v-model="ruleForm.filterDate"
                end-placeholder="结束日期"
                range-separator="~"
                start-placeholder="开始日期"
                type="daterange"
                value-format="yyyy-MM-dd"
                :clearable="false"
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
    <div>
      <basic-table v-loading="loading" stripe :data="list" :col-configs="colConfigs">
        <el-table-column slot="opt" label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <span>
              <el-button
                type="text"
                @click="see(scope.row)"
              >
                查看
              </el-button>
            </span>
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
  </div>
</template>

<script>
import { CommonApi } from '@/api'
import Pagination from '@/components/Pagination'
import tableMixin from '@/utils/tableMixin'
import { TAB_STATUS } from '@/utils/constant/index'
import BasicTable from '@/components/BasicTable'
import { getTodoPath } from '@/utils/todo'
import { mapGetters } from 'vuex'

const ruleForm = {
  keyWord: '',
  startDate: '',
  endDate: '',
  filterDate: null
}

export default {
  name: 'TODO',
  components: {
    Pagination,
    BasicTable
  },
  mixins: [tableMixin],
  data() {
    return {
      activeTab: TAB_STATUS.SUCCESS,
      ruleForm: { ...ruleForm },
      loading: false,
      list: [],
      colConfigs: [
        { label: '编号', type: 'index', width: '100px' },
        { label: '业务场景', prop: 'bizScene', width: '180px', showOverflowTooltip: true },
        { label: '标题', prop: 'title', width: '180px', showOverflowTooltip: true },
        { label: '内容', prop: 'content', minWidth: '200px', showOverflowTooltip: true },
        { slot: 'opt' }
      ],
      TAB_STATUS
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    'ruleForm.filterDate': function(val) {
      if (val) {
        this.ruleForm.startDate = val[0] || ''
        this.ruleForm.endDate = val[1] || ''
      } else {
        this.ruleForm.startDate = ''
        this.ruleForm.endDate = ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.loading) return
      this.loading = true
      CommonApi.queryTasks({
        ...this.ruleForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.activeTab === this.TAB_STATUS.SUCCESS ? 'TODO' : 'REJECT'
      }).then(res => {
        this.list = res.data
        this.total = res.total
        this.loading = false
      }).catch(err => {
        console.error(err)
        this.loading = false
      })
    },
    see(row) {
      const item = getTodoPath(this.userInfo.roleType, row.flowType, row.flowStatus)
      if (!item || !item.path) return
      const query = {
        transNo: row.transNo,
        tab: item.tab
      }
      this.$router.push({
        path: item.path,
        query
      })
    },
    switchTab(target) {
      this.pageNum = 1
      this.activeTab = target.name
      this.onResetForm()
      this.getData()
    }
  }
}
</script>

<style>

</style>
