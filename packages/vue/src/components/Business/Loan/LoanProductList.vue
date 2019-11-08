<template>
  <div class="com-loan-product-list">
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
          </el-col> -->
          <el-col :span="8">
            <el-form-item v-if="role === 'PLATFORM'" label="资金方" prop="fundCorpName">
              <el-input v-model="ruleForm.fundCorpName" clearable placeholder="请输入" />
            </el-form-item>
            <div style="height: 1px; width: 100%;" />
          </el-col>
          <el-col :span="8">
            <el-form-item class="sp-label" label="融资产品名称" label-width="96px" prop="productName">
              <el-input v-model="ruleForm.productName" clearable placeholder="请输入" />
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
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item />
          </el-col>
          <el-col :span="8">
            <el-form-item class="option-btns">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onResetForm()">重置</el-button>
              <!-- <div v-permission="'loan-manage-products__add'" class="opt-add-btn">
                <el-button type="primary" @click="handleAdd">+ 新增产品</el-button>
              </div> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-loading="loading">
      <el-table :data="list" :empty-text="' '" fit highlight-current-row stripe>
        <el-table-column label="编号" prop="productNo" :min-width="130" show-overflow-tooltip />
        <el-table-column
          v-if="role === 'PLATFORM'"
          label="资金方"
          prop="fundCorpName"
          show-overflow-tooltip
          min-width="220px"
        >
          <template slot-scope="scope">
            <corp-link :corp-no="scope.row.fundCorpNo">{{ scope.row.fundCorpName }}</corp-link>
          </template>
        </el-table-column>
        <el-table-column label="融资产品名称" prop="productName" min-width="220px" show-overflow-tooltip />
        <el-table-column label="融资额度(万元)" prop="formatMoney" width="180px" />
        <el-table-column label="融资利率" prop="formatRate" width="100px" />
        <el-table-column label="融资期限" prop="formatDate" width="200px" />
        <el-table-column fixed="right" label="操作" min-width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click="viewProductDetail(scope.$index, scope.row)">查看</el-button>
            <!-- <el-button
              v-permission="'loan-manage-products__edit'"
              type="text"
              @click="editProduct(scope.$index, scope.row)"
            >编辑产品</el-button> -->
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
    <!-- 产品详情 -->
    <el-dialog
      title="产品详情"
      :visible.sync="productDetailVisible"
      :append-to-body="true"
      width="750px"
    >
      <el-form v-loading="formLoading" label-width="100px" class="loan-product-detail">
        <h4>融资合同信息</h4>
        <p>
          1.本企业是一家在中华人民共和国依法注册的
          <span
            class="inline-input tac"
          >{{ productForm.enterpriseStatement }}</span>公司，依法可提供
          <span class="inline-input">{{ productForm.serviceStatement }}</span>服务。
        </p>
        <p>
          2.融资生成的合同词汇具有明确定义与解释，未特别解释的专业术语，可参照国家法律规定或
          <span
            class="inline-input"
          >{{ productForm.contractStatement }}</span>的国际惯例予以解释。
        </p>
        <h4>融资产品信息</h4>
        <el-form-item label="融资产品名称">{{ productForm.productName }}</el-form-item>
        <el-form-item label="融资额度">{{ productForm.formatMoney }}</el-form-item>
        <el-form-item label="融资利率">{{ productForm.formatRate }}</el-form-item>
        <el-form-item label="融资期限">{{ productForm.formatDate }}</el-form-item>
        <el-form-item label="逾期利率">{{ productForm.formatOverRate }}</el-form-item>
        <el-form-item label="融资产品介绍">{{ productForm.productIntroduction }}</el-form-item>
        <el-form-item label="申请条件">{{ productForm.applyRequirement }}</el-form-item>
        <el-form-item label="申请流程">{{ productForm.applyProcess }}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from '@/utils/tableMixin'
import { CommonApi } from '@/api'
import { thousands, formatWan } from '@/utils/index'
import store from '@/store'

export default {
  name: 'LoanProductList',
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
      list: [],
      productNo: null,
      productDetailVisible: false,
      formLoading: false,
      productForm: {},
      ruleForm: {
        fundCorpName: '',
        fundCorpNo: '',
        loanStartTime: '',
        loanEndTime: '',
        productName: '',
        regdate: ''
      }
    }
  },
  beforeUpdate() {
    this.list = this.result.map(item => ({
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
    thousands,
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
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
    },
    viewProductDetail(index, row) {
      this.productNo = row.productNo
      this.getProduct()
      this.productDetailVisible = true
    },
    // editProduct(index, row) {
    //   this.$router.push({
    //     path: '/fbusiness/loan-product-edit',
    //     query: {
    //       productNo: row.productNo
    //     }
    //   })
    // },
    // handleAdd() {
    //   this.$router.push({
    //     path: '/fbusiness/loan-product-add'
    //   })
    // },
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
          this.productForm = res.data
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
.loan-product-detail {
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
