<template>
  <div class="page page-token-account">
    <div class="statistics-container">
      <div class="statistics-inner">
        <div class="item">
          <div class="number">{{ AMobj.totalAvaliable | thousands }}</div>
          <div class="text">可用数量（个）</div>
        </div>
        <div class="item">
          <div class="number">{{ AMobj.totalOverdued | thousands }}</div>
          <div class="text">已过期（个）</div>
        </div>
      </div>
    </div>
    <div class="title">我的{{ TOKEN__NAME }}</div>
    <div v-loading="loading" class="grant-credit-container">
      <ul v-if="tokens.length" class="grant-credit-detail clearfix">
        <li v-for="item in tokens" :key="item.id" class="detail-item">
          <span
            :class="CREDIT_STATUS_CLS_MAP[item.status]"
            class="status"
          >{{ CREDIT_STATUS_MAP[item.status] }}</span>
          <div class="bank-name">{{ item.issueQuotaCorpName }}</div>
          <div class="detail">
            <div class="bigTitle">
              <div class="item available-item">
                <div class="label">可用余额（个）</div>
                <hash-link v-if="item.tokenNo" :txhash="item.tokenNo" type="2">
                  <div class="number theme">{{ (item.balAmt || 0) | thousands }}</div>
                </hash-link>
                <span v-else>-</span>
              </div>
              <div class="item available-item">
                <div class="label">冻结数量（个）</div>
                <div class="text number">{{ item.frzAmt | thousands }}</div>
              </div>
            </div>
            <div class="item time-item" style="flex:1.5">
              <div class="label">授信有效期</div>
              <div class="text time">{{ item.creditEffectiveDate + ' ~ ' + item.creditExpireDate }}</div>
            </div>
            <div class="item time-item">
              <div class="label">获得时间</div>
              <div class="text time">{{ item.gmtCreated }}</div>
            </div>
            <div class="item time-item">
              <div class="label">签发有效期</div>
              <div class="text time">{{ item.expireDate }}</div>
            </div>
            <div class="item time-item">
              <div class="label">签发方</div>
              <div class="text time">
                <el-tooltip effect="dark" :content="item.issueCorpName" placement="top">
                  <p class="ellipsis" style="width:70px">{{ item.issueCorpName }}</p>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="button-row">
            <el-button :disabled="item.status !== 'AVALIABLE'" type="text" @click="goLoan">融资</el-button>
            <el-button :disabled="item.status !== 'AVALIABLE'" type="text" @click="goTransfer">转让</el-button>
          </div>
        </li>
      </ul>
      <NoData v-else :title="`暂时没有${TOKEN__NAME}信息`" style="margin-top: 50px" />
    </div>
  </div>
</template>

<script>
import { CommonApi } from '@/api'
import { CREDIT_STATUS_MAP, CREDIT_STATUS_CLS_MAP } from '@/utils/constant/quota'

export default {
  name: 'AttachedAccountManage',
  data() {
    return {
      AMobj: {
        totalAvaliable: 0,
        totalOverdued: 0
      },
      loading: false,
      tokens: [],
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
      const result = await CommonApi.queryChainToken()
      this.loading = false
      if (result) {
        this.AMobj = { ...result.data }
        this.tokens = [...result.data.tokens]
      }
    },
    goLoan() {
      this.$router.push('/business/loan-manage')
    },
    goTransfer() {
      this.$router.push('/business/transfer/transfer-list')
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-container {
  padding: 30px 32px 30px;
  background: url(../../../assets/images/account-attached-bg.png);
  background-size: 100% 100%;
}
.statistics-inner {
  display: flex;
  .item {
    flex-basis: 22%;
    margin-right: 20px;
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
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  max-width: 642px;
  // height: 252px;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .bigTitle {
      width: 100%;
      > .item {
        width: 31%;
        display: inline-block;
      }
    }
    > .item {
      flex: 1;
    }
    .item {
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
    .available-item {
      flex-basis: 100%;
    }
    .time-item {
      margin-right: 20px;
    }
  }
}
.button-row {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-top: 1px dotted #e0e6ed;
  display: flex;
  justify-content: space-around;
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
