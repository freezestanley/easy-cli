<template>
  <div class="page page-token-account">
    <div class="statistics-container">
      <div class="statistics-inner">
        <div class="item" style="margin-right: 8px;">
          <div class="number">{{ AMobj.totalAvaliable | thousands }}</div>
          <div class="text">可用数量（个）</div>
        </div>
        <div class="item">
          <div class="number">{{ AMobj.totalIssued | thousands }}</div>
          <div class="text">已签发（个）</div>
        </div>
        <div class="item">
          <div class="number">{{ AMobj.totalRecycled | thousands }}</div>
          <div class="text">已回收（个）</div>
        </div>
        <div class="item">
          <div class="number">{{ AMobj.totalOverdued | thousands }}</div>
          <div class="text">已过期（个）</div>
        </div>
        <div class="item">
          <div class="number">{{ AMobj.totalFreezed | thousands }}</div>
          <div class="text">已冻结（个）</div>
        </div>
      </div>
    </div>
    <div class="title">我的{{ TOKEN__NAME }}</div>
    <div v-loading="loading" class="grant-credit-container">
      <ul v-if="quotas && quotas.length" class="grant-credit-detail clearfix">
        <li v-for="item in quotas" :key="item.id" class="detail-item">
          <span
            :class="CREDIT_STATUS_CLS_MAP[item.status]"
            class="status"
          >{{ CREDIT_STATUS_MAP[item.status] }}</span>
          <div class="bank-name">{{ item.issueCorpName }}</div>
          <div class="detail">
            <el-row :gutter="2">
              <el-col :span="9">
                <div class="item">
                  <div class="label">可用余额（个）</div>
                  <hash-link v-if="item.quotaNo" :txhash="item.quotaNo" type="2">
                    <div class="number theme">{{ (item.balAmt || 0) | thousands }}</div>
                  </hash-link>
                  <span v-else>-</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="item">
                  <div class="label">已签发（个）</div>
                  <div class="text number">{{ (item.coreIssueAmt || 0) | thousands }}</div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="item">
                  <div class="label">已回收（个）</div>
                  <div class="text number">{{ item.recycledAmt | thousands }}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="9">
                <div class="item">
                  <div class="label">授信有效期</div>
                  <div class="text time">{{ item.effectiveDate + ' ~ ' + item.expireDate }}</div>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="item">
                  <div class="label">授信时间</div>
                  <div class="text time">{{ item.issueDate }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="button-row">
            <el-button :disabled="item.status !== 'AVALIABLE'" type="text" @click="goSign">签发</el-button>
          </div>
        </li>
      </ul>
      <NoData v-else :title="`暂时没有${TOKEN__NAME}信息`" style="margin-top: 50px" />
    </div>
  </div>
</template>

<script>
import { CREDIT_STATUS_MAP, CREDIT_STATUS_CLS_MAP } from '@/utils/constant/quota'
import { CommonApi } from '@/api'

export default {
  name: 'CoreAccountManage',

  data() {
    return {
      AMobj: {
        totalOverdued: 0,
        totalAvaliable: 0,
        totalFreezed: 0,
        totalIssued: 0
      },
      loading: false,
      quotas: [],
      CREDIT_STATUS_MAP,
      CREDIT_STATUS_CLS_MAP
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData: async function() {
      this.loading = true
      const result = await CommonApi.queryCoreToken()
      this.loading = false
      if (result) {
        this.AMobj = { ...result.data }
        this.quotas = result.data.quotas
      }
    },
    goSign() {
      this.$router.push('/business/issue')
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-container {
  padding: 30px 32px 30px;
  background: url(../../../assets/images/account-core-bg.png);
  background-size: 100% 100%;
}
.statistics-inner {
  display: flex;
  justify-content: space-between;
  .item {
    flex-basis: 22%;
  }
  .number {
    font-weight: 700;
    font-size: 30px;
    line-height: 42px;
    color: #fff;
  }
  .text {
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    margin-top: 12px;
  }
}
.available {
  background: $success;
}
.expired {
  background: $info;
}
.frozen {
  background: $error;
}
.title {
  font-size: 16px;
  font-weight: 700;
  color: #262626;
  line-height: 22px;
  margin: 30px 0 25px;
}
.grant-credit-detail {
  margin-right: -24px;
  display: flex;
  flex-wrap: wrap;
}
.detail-item:nth-of-type(2n) {
  margin-left: 2%;
}
.detail-item {
  width: 48%;
  max-width: 542px;
  height: 252px;
  border: 1px solid $info;
  border-radius: 8px;
  margin-bottom: 24px;
  position: relative;
  .status {
    display: block;
    width: 48px;
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    position: absolute;
    top: 16px;
    right: 20px;
  }
  .bank-name {
    padding-top: 22px;
    color: $titleColor;
    font-size: 16px;
    line-height: 22px;
    font-weight: 700;
    width: 450px;
    padding-left: 24px;
  }
  .detail {
    padding-left: 24px;
    margin-bottom: 16px;
    // display: flex;
    // flex-wrap: wrap;
    .item {
      width: 100%;
      margin-top: 16px;
      .label {
        color: #8492a6;
        font-size: 14px;
        line-height: 20px;
      }
      .text {
        color: $titleColor;
        margin-top: 8px;
      }
      .number {
        margin-top: 8px;
        font-size: 24px;
        line-height: 33px;
      }
      .time {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
.button-row {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-top: 1px dotted #e0e6ed;
  button {
    font-size: 16px;
  }
}
</style>
<style type="text/css">
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>
