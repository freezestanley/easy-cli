<template>
  <div class="page page-invite-code">
    <div class="filter-form">
      <el-form ref="form" :inline="true" :model="ruleForm" label-position="left">
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="编号" prop="productNo">
              <el-input
                v-model.trim="ruleForm.productNo"
                type="text"
                placeholder="请输入编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="融资期限" prop="regdate">
              <el-date-picker
                v-model="ruleForm.regdate"
                end-placeholder="结束日期"
                start-placeholder="开始日期"
                type="daterange"
                value-format="yyyy-MM-dd"
                :clearable="false"
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item class="sp-label" label="融资产品名称" label-width="96px" prop="productName">
              <el-input v-model="ruleForm.productName" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
              <div v-permission="'loan-product__add'" class="opt-add-btn">
                <el-button @click="handleAdd">+ 新增产品</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item />
          </el-col>
        </el-row> -->
      </el-form>
    </div>
    <div v-loading="loading">
      <el-table :data="listData" :empty-text="' '" fit highlight-current-row stripe>
        <el-table-column label="编号" prop="productNo" :min-width="130" show-overflow-tooltip />
        <el-table-column label="融资产品名称" prop="productName" min-width="220px" show-overflow-tooltip />
        <el-table-column label="融资额度(万元)" prop="formatMoney" width="180px" />
        <el-table-column label="融资利率" prop="formatRate" width="100px" />
        <el-table-column label="融资期限" prop="formatDate" width="200px" />
        <el-table-column fixed="right" label="操作" min-width="160px">
          <template slot-scope="scope">
            <el-button type="text" @click="viewProductDetail(scope.$index, scope.row)">查看</el-button>
            <el-button
              v-permission="'loan-product__add'"
              type="text"
              @click="editProduct(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
        <div slot="append">
          <NoData v-if="!listData.length && !loading" title="暂时没有数据" />
        </div>
      </el-table>
      <Pagination
        v-if="listData.length && !loading"
        :current-change="onCurrentChange"
        :current-page="pageNum"
        :page-size="pageSize"
        :size-change="onSizeChange"
        :total="total"
      />
    </div>
    <!-- 产品详情 -->
    <el-dialog
      title="融资产品详情"
      :visible.sync="productDetailVisible"
      :append-to-body="true"
      width="750px"
    >
      <el-form v-loading="formLoading" label-width="72px" class="financing-product-detail">
        <h4>融资合同信息</h4>
        <p>
          1.本企业是一家在中华人民共和国依法注册的
          <span
            class="inline-input tac"
          >{{ financingForm.enterpriseStatement }}</span>公司，依法可提供
          <span class="inline-input">{{ financingForm.serviceStatement }}</span>服务。
        </p>
        <p>
          2.融资生成的合同词汇具有明确定义与解释，未特别解释的专业术语，可参照国家法律规定或
          <span
            class="inline-input"
          >{{ financingForm.contractStatement }}</span>的国际惯例予以解释。
        </p>
        <h4>融资产品信息</h4>
        <el-form-item label="产品名称">{{ financingForm.productName }}</el-form-item>
        <el-form-item label="融资额度">{{ financingForm.formatMoney }}</el-form-item>
        <el-form-item label="融资利率">{{ financingForm.formatRate }}</el-form-item>
        <el-form-item label="融资期限">{{ financingForm.formatDate }}</el-form-item>
        <el-form-item label="逾期利率">{{ financingForm.formatOverRate }}</el-form-item>
        <el-form-item label="产品介绍">{{ financingForm.productIntroduction }}</el-form-item>
        <el-form-item label="申请条件">{{ financingForm.applyRequirement }}</el-form-item>
        <el-form-item label="申请流程">{{ financingForm.applyProcess }}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from '@/utils/tableMixin'
import { CommonApi } from '@/api'
import { formatWan } from '@/utils/index'
import store from '@/store'

export default {
  name: 'FinancingList',
  mixins: [tableMixin],
  props: {
    result: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      role: store.getters.role,
      listData: [],

      // feeDetailVisible: false,

      productNo: null,
      productDetailVisible: false,
      formLoading: false,
      financingForm: {},
      ruleForm: {
        fundCorpName: '',
        fundCorpNo: '',
        loanStartTime: '',
        loanEndTime: '',
        productName: '',
        regdate: '',
        productNo: ''
      }
    }
  },
  beforeUpdate() {
    this.listData = this.result.map(item => ({
      ...item,
      formatDate: item.loanStartTime + ' ~ ' + item.loanEndTime,
      formatMoney:
        item.loanMinAmount / 10000 + ' ~ ' + item.loanMaxAmount / 10000,
      formatRate: item.loanInterestRate ? item.loanInterestRate + '%' : '',
      formatOverRate: item.overdueInterestRate
        ? item.overdueInterestRate + '%'
        : ''
    }))
    this.total = this.count
  },
  mounted() {},
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const { regdate } = this.ruleForm
      if (Array.isArray(regdate)) {
        this.ruleForm.loanStartTime = this.ruleForm.regdate[0]
        this.ruleForm.loanEndTime = this.ruleForm.regdate[1]
      }
      this.$emit('getDataHandle', {
        fundCorpName: this.ruleForm.fundCorpName,
        productName: this.ruleForm.productName,
        loanStartTime: this.ruleForm.loanStartTime,
        loanEndTime: this.ruleForm.loanEndTime,
        productNo: this.ruleForm.productNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
    },
    viewProductDetail(index, row) {
      this.productNo = row.productNo
      this.getProduct()
      this.productDetailVisible = true
    },
    editProduct(index, row) {
      this.$router.push({
        path: 'product-edit',
        query: {
          productNo: row.productNo
        }
      })
    },
    handleAdd() {
      this.$router.push({
        path: 'product-add'
      })
    },
    getProduct() {
      if (!this.productNo) return false

      this.formLoading = true
      CommonApi.getLoanProduct({
        productNo: this.productNo
      })
        .then(res => {
          res.data.formatDate = `${res.data.loanStartTime} ~ ${res.data.loanEndTime}`
          res.data.formatMoney = `${formatWan(res.data.loanMinAmount)}万元 ~ ${formatWan(res.data.loanMaxAmount)}万元`
          res.data.formatRate = `${res.data.loanInterestRate}%`
          res.data.formatOverRate = `${res.data.overdueInterestRate}%`
          this.financingForm = res.data
        })
        .finally(() => {
          this.formLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>

/deep/.el-dialog__body {
  padding: 20px;
}

.financingShow {
  .f_edit {
    position: absolute;
    right: 40px;
  }
  .baseInfo {
    color: $labelColor;
    font-size: 14px;
    line-height: 25px;
  }
  .line {
    display: flex;
    .tit {
      width: 100px;
    }
    > p {
      flex: 1;
      font-size: 14px;
      color: $titleColor;
      > span {
        color: $labelColor;
        display: inline-block;
        padding-right: 15px;
      }
    }
  }
}
.financing-product-detail {
  color: $titleColor;
  p {
    line-height: 34px;
    margin: 8px 0;
  }
  .inline-input {
    font-weight: 500;
    padding: 0 5px;
    border-bottom: 1px solid $borderColor;
  }
}
</style>
