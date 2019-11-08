<template>
  <div class="page page-browser">
    <el-tabs v-model="type" @tab-click="handleClick">
      <div>
        <el-row :gutter="20">
          <!-- <el-col :span="3">{{ label }}</el-col> -->
          <el-col :span="20">
            <el-form label-position="left">
              <el-form-item :label="label" label-width="90px">
                <el-input
                  v-model="txhash"
                  type="search"
                  clearable
                  placeholder="请输入区块hash地址"
                  style="width:100%;"
                />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4" style="padding-left: 10px">
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="txhash = ''">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <el-tab-pane label="交易" name="0">
        <div class="content" style="overflow-y: auto; min-height:600px">
          <NoData v-if="hashData.notFund" title="您输入的hash地址无法获取数据，请确认后重试" style="margin-top: 100px" />
          <NoData v-else-if="noData" is-no-result title="输入hash后，在此显示相关信息" style="margin-top: 100px" />
          <TransferData v-else v-loading="loading" :hash-data="hashData" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="存证" name="1">
        <div v-loading="loading" class="content">
          <NoData v-if="hashData.notFund" title="您输入的hash地址无法获取数据，请确认后重试" style="margin-top: 100px" />
          <NoData v-else-if="noData" is-no-result title="输入hash后，在此显示相关信息" style="margin-top: 100px" />
          <el-form v-else label-position="left" label-width="72px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="区块高度">
                  {{ hashData.height }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="账户地址">
                  {{ hashData.accountAddress }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="key">
                  <code>
                    {{ hashData.key }}
                  </code>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注说明">
                  {{ hashData.memo }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="存储内容">
                  <div style="word-break: break-all">{{ hashData.value }}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="TOKEN__NAME" name="2">
        <div v-loading="loading" class="content">
          <NoData v-if="hashData.notFund" title="您输入的hash地址无法获取数据，请确认后重试" style="margin-top: 100px" />
          <NoData v-else-if="noData" is-no-result title="输入hash后，在此显示相关信息" style="margin-top: 100px" />
          <el-form v-else label-position="left" label-width="96px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="`${TOKEN__NAME}编号`">
                  {{ hashData.tokenNo }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="`${TOKEN__NAME}数量`">
                  {{ hashData.amount }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="创建时间">
                  {{ hashData.tokenCreateTime }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="`父${TOKEN__NAME}编号`">
                  {{ hashData.parentTokenNo }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="`根${TOKEN__NAME}编号`">
                  {{ hashData.rootTokenNo }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TransferData from './TransferData'
import { CommonApi } from '@/api'
const { transer, evidence, tokenInfo } = CommonApi
const apis = [transer, evidence, tokenInfo]
export default {
  name: 'Browser',
  components: {
    TransferData
  },
  data () {
    return {
      type: '0',
      txhash: '',
      loading: false,
      hashData: {
        unInputed: true
      }
    }
  },
  computed: {
    label() {
      const labels = ['交易hash', '存证hash', this.TOKEN__NAME + '编号']
      return labels[this.type]
    },
    noData() {
      return this.hashData.unInputed
    }
  },
  mounted () {
    const query = this.$route.query
    if (query.type) {
      this.type = query.type + ''
    }
    if (query.txhash) {
      this.txhash = query.txhash
    }
    this.getData()
  },
  methods: {
    handleClick(t) {
      this.type = t.index
      this.hashData = {
        unInputed: true
      }
      if (this.txhash) {
        this.getData()
      }
    },
    getData() {
      if (!this.txhash) return
      this.loading = true
      apis[this.type]({ txhash: this.txhash }).then(res => {
        if (!res.data) {
          this.$message.info('抱歉，无法查询到指定内容')
          this.hashData = {
            notFund: true
          }
        } else {
          this.hashData = res.data
        }
      }).finally(() => {
        this.loading = false
      })
    },
    onSearch() {
      if (!this.txhash) {
        this.$message.error('请输入区块hash地址')
        return
      }
      this.getData()
    }
  }
}
</script>

<style lang="scss" >
  .page-browser {
    .content {
      height: 100%;
      padding: 20px;
      margin: 16px 8px;
      box-shadow: 0px 0px 16px 0 rgba(101, 85, 246, 0.16);
      border-radius: 8px;
      background-color: #fff;
    }
  }
</style>
