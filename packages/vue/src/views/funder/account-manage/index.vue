<template>
  <div v-loading="loading" class="page page-token-account">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 融资账户 -->
      <el-tab-pane label="融资账户" name="loan">
        <div class="loan-container">
          <ul v-if="loanProductList && loanProductList.length" class="loan-detail clearfix">
            <li v-for="item in loanProductList" :key="item.id" class="detail-item">
              <span
                :class="CREDIT_STATUS_CLS_MAP[item.status]"
                class="status"
              >{{ CREDIT_STATUS_MAP[item.status] }}</span>
              <div class="bank-name">{{ item.fromCorpName }}</div>
              <div class="detail">
                <div class="bigTitle">
                  <div class="item available-item">
                    <div class="number theme">{{ (item.balAmt || 0) | thousands }}</div>
                    <div class="label">融资数量（个）</div>
                  </div>
                </div>
                <div class="item time-item" style="flex:1.5">
                  <div class="label">授信有效期</div>
                  <div class="text time">{{ item.creditEffectiveDate + ' ~ ' + item.creditExpireDate }}</div>
                </div>
                <div class="item time-item">
                  <div class="label">签发有效期</div>
                  <div class="text time">{{ item.expireDate }}</div>
                </div>
                <div class="item time-item">
                  <div class="label">获得时间</div>
                  <div class="text time">{{ item.gmtCreated }}</div>
                </div>
              </div>
            </li>
          </ul>
          <NoData v-else :title="`暂时没有融资${TOKEN__NAME}信息`" style="margin-top: 50px" />
        </div>
      </el-tab-pane>

      <!-- 回收账户 -->
      <el-tab-pane label="回收账户" name="recycle">
        <div class="loan-container">
          <ul v-if="recycleList && recycleList.length" class="loan-detail clearfix">
            <li v-for="item in recycleList" :key="item.id" class="detail-item">
              <span
                :class="CREDIT_STATUS_CLS_MAP[item.status]"
                class="status"
              >{{ CREDIT_STATUS_MAP[item.status] }}</span>
              <div class="bank-name">{{ item.corpName }}</div>
              <div class="detail">
                <div class="item available-item">
                  <div class="label">回收数量（个）</div>
                  <!-- <hash-link v-if="item.quotaNo" :txhash="item.quotaNo" type="2">
                  </hash-link>
                  <span v-else>-</span> -->
                  <div class="number theme">{{ (item.balAmt || 0) | thousands }}</div>
                </div>
                <div class="item time-item">
                  <div class="label">授信有效期</div>
                  <div class="text time">{{ item.effectiveDate + ' ~ ' + item.expireDate }}</div>
                </div>
                <div class="item time-item">
                  <div class="label">回收时间</div>
                  <div class="text time">{{ item.expireDate }}</div>
                </div>
              </div>
            </li>
          </ul>
          <NoData v-else :title="`暂时没有回收${TOKEN__NAME}信息`" style="margin-top: 50px" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { CommonApi } from '@/api'
import { CREDIT_STATUS_MAP, CREDIT_STATUS_CLS_MAP } from '@/utils/constant/quota'

export default {
  name: 'FunderAccountManage',

  data() {
    return {
      activeName: 'loan',
      loading: false,
      loanProductList: [],
      recycleList: [],
      CREDIT_STATUS_MAP,
      CREDIT_STATUS_CLS_MAP
    }
  },
  created() {
    this.getLoanData()
  },
  methods: {
    getLoanData: async function() {
      this.loading = true
      const result = await CommonApi.queryFundReToken()
      this.loading = false
      if (result) {
        this.loanProductList = [...result.data]
      }
    },
    getRecycleData: async function() {
      this.loading = true
      const result = await CommonApi.queryFundToken()
      this.loading = false
      if (result) {
        this.recycleList = [...result.data]
      }
    },
    handleClick(e) {
      const funcMap = {
        loan: this.getLoanData,
        recycle: this.getRecycleData
      }
      funcMap[e.name]()
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
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: #262626;
  line-height: 22px;
  margin: 30px 0 25px;
}
.loan-detail {
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
  height: 211px;
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
  .status.available {
    background: $success;
  }
  .status.expired {
    background: $info;
  }
  .status.frozen {
    background: $error;
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
    // justify-content: space-between;
    .bigTitle {
      width: 100%;
      > .item {
        width: 30%;
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
