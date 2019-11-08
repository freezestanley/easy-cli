<template>
  <div class="page page-invite-code">
    <el-tabs v-if="role=='CHAIN'" v-model="currentAssestType" @tab-click="switchTab">
      <el-tab-pane label="应付资产" :name="payAssets" />
      <el-tab-pane label="应收资产" :name="collectAssets" />
    </el-tabs>
    <div class="filter-form">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="资产名称" prop="assetName">
              <el-input v-model="ruleForm.assetName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="currentAssestType==payAssets" label="供应商名" prop="corpName">
              <el-input v-model="ruleForm.receiveCorpName" placeholder="请输入" />
            </el-form-item>
            <el-form-item v-if="currentAssestType==collectAssets" label="客户名称" prop="corpName">
              <el-input v-model="ruleForm.payCorpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="assetStatus">
              <el-select v-model="ruleForm.assetStatus" placeholder="请选择">
                <el-option label="全部" value="ALL" />
                <el-option label="正常" value="VALID" />
                <el-option label="作废" value="INVALID" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="currentAssestType==payAssets?'应付日期':'应收日期'" prop="filterDate">
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
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
              <div v-permission="'assets-register-list__add'" class="opt-add-btn">
                <el-button type="primary" @click="assetsAdd">+ 新增{{ currentAssestType==payAssets ? '应付' : '应收' }}</el-button>
              </div>
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
          <el-table-column label="编号" prop="assetNo" width="180px" show-overflow-tooltip />
          <el-table-column label="hash" prop="txHash" show-overflow-tooltip min-width="200px">
            <template slot-scope="scope">
              <hash-link v-if="scope.row.txHash" :txhash="scope.row.txHash" type="1">{{ scope.row.txHash }}</hash-link>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="资产名称" prop="assetName" :min-width="150" show-overflow-tooltip />
          <el-table-column
            label="上传企业"
            prop="registerCorpName"
            min-width="200px"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.registerCorpNo">{{ scope.row.registerCorpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column label="上传时间" prop="gmtCreated" width="100px" />
          <el-table-column
            :label="currentAssestType==payAssets ? '应付金额(万元)' : '应收金额(万元)'"
            width="120px"
          >
            <template slot-scope="scope">{{ scope.row.realAmt | formatWan }}</template>
          </el-table-column>
          <el-table-column
            :label="currentAssestType==payAssets?'应付到期日':'应收到期日'"
            prop="assetExpireDate"
            width="100px"
          />
          <el-table-column
            v-if="currentAssestType==payAssets"
            label="供应商名称"
            min-width="200px"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.receiveCorpNo">{{ scope.row.receiveCorpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="gmtCreated" width="100px" />
          <el-table-column
            v-if="currentAssestType==collectAssets"
            label="客户名称"
            width="200px"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <corp-link :corp-no="scope.row.payCorpNo">{{ scope.row.payCorpName }}</corp-link>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="状态" width="60px" prop="assetStatusDesc">
            <template slot-scope="scope">
              <span
                :style="{'color':scope.row.assetStatus=='VALID'?'$titleColor':'#99A9BF'}"
              >{{ scope.row.assetStatusDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="text" @click="showDialogEntInfo(scope.$index, scope.row)">查看</el-button>
              <el-button
                v-if="scope.row.isEdit"
                v-permission="'assets-register-list__edit'"
                type="text"
                @click="handleTableEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                v-if="scope.row.isDestory"
                v-permission="'assets-register-list__edit'"
                class="error"
                type="text"
                @click="showEntDestroy(scope.$index, scope.row)"
              >作废</el-button>
            </template>
          </el-table-column>
          <div slot="append">
            <NoData v-if="!list.length && !loading" title="暂时没有数据" />
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
  </div>
</template>

<script>
import { EnterprisApi } from '@/api'
import store from '@/store'
import tableMixin from '@/utils/tableMixin'
import Pagination from '@/components/Pagination'
import { PAY_ASSETS, COLLECT_ASSETS } from '@/utils/constant/assets'

const ruleForm = {
  assetName: '',
  assetStatus: 'ALL',
  expireEnd: '',
  expireStart: '',
  filterDate: null,
  payCorpName: '',
  receiveCorpName: '',
  assetNo: ''
}

export default {
  name: 'AssetRegister',
  components: {
    Pagination
  },
  mixins: [tableMixin],
  data() {
    return {
      role: store.getters.role,
      payAssets: PAY_ASSETS,
      collectAssets: COLLECT_ASSETS,
      currentAssestType: PAY_ASSETS,
      ruleForm: { ...ruleForm },
      loading: false,
      dialogFormVisible: false, // 表单弹窗
      list: [],
      rules: {
        corpName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        corpType: [
          { required: true, message: '请选择企业类型', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    const assetType = this.$route.query.assetType
    if (assetType) {
      this.currentAssestType = assetType
    }
    this.getData()
  },
  mounted() {
    // const { name } = this.$router.history.current
    // if (!name) return
    // this.currentAssestType = name
  },
  methods: {
    getData() {
      if (this.loading) return
      this.loading = true
      const params = {
        assetType: this.currentAssestType,
        assetName: this.ruleForm.assetName,
        expireStart: this.ruleForm.expireStart,
        expireEnd: this.ruleForm.expireEnd,
        assetStatus: this.ruleForm.assetStatus,
        assetNo: this.ruleForm.assetNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.currentAssestType === this.payAssets) {
        params.receiveCorpName = this.ruleForm.receiveCorpName
      } else if (this.currentAssestType === this.collectAssets) {
        params.payCorpName = this.ruleForm.payCorpName
      }
      EnterprisApi.queryAssetList(params)
        .then(res => {
          this.list = res.data
          this.total = res.total
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    },
    onSearch() {
      this.pageNum = 1
      const { filterDate } = this.ruleForm
      if (Array.isArray(filterDate)) {
        this.ruleForm.expireStart = filterDate[0]
        this.ruleForm.expireEnd = filterDate[1]
      }
      this.getData()
    },
    onResetForm() {
      this.ruleForm = { ...ruleForm }
    },
    getSkipUrl(lastPath) {
      const { path } = this.$router.history.current
      if (!lastPath) return
      let url = path.split('/')
      url.splice(2, 1, lastPath)
      url = url.join('/')
      return url
    },
    showDialogEntInfo(index, row) {
      const lastPath =
        this.currentAssestType === this.payAssets
          ? 'payexamine'
          : 'collectexamine'
      this.$router.push({
        path: this.getSkipUrl(lastPath),
        query: { assetNo: row.assetNo, assetType: this.currentAssestType }
      })
    },
    handleTableEdit(index, row) {
      const lastPath =
        this.currentAssestType === this.payAssets ? 'payedit' : 'collectedit'
      this.$router.push({
        path: this.getSkipUrl(lastPath),
        query: { assetNo: row.assetNo, assetType: this.currentAssestType }
      })
    },
    showEntDestroy(index, row) {
      this.$confirm('作废后不能撤销操作,确认要作废当前项目吗?', '作废提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = { assetNo: row.assetNo }
          this.$securityCode().then((code) => {
            EnterprisApi.destroyAsset({
              ...params,
              securityCode: code
            }).then(res => {
              this.$message({
                type: 'success',
                message: '作废成功!'
              })
              this.getData()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消作废'
            })
          })
        })
    },
    assetsAdd() {
      const lastPath =
        this.currentAssestType === this.payAssets ? 'payadd' : 'collectadd'
      this.$router.push({
        path: this.getSkipUrl(lastPath)
      })
    },
    switchTab(target) {
      this.pageNum = 1
      this.onResetForm()
      this.getData()
    }
  }
}
</script>
