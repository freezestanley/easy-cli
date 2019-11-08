<template>
  <organization-chart :datasource="ds">
    <template slot-scope="{ nodeData }">
      <div v-if="nodeData.level" :class="['node-box', { 'parent': nodeData.level == 1 }, nodeData.transType && TRANS_TYPE[nodeData.transType].class]">
        <div v-if="nodeData.level === 1" class="node-first">
          <span>{{ nodeData.corpName }}</span>
        </div>
        <div v-else>
          <div :class="['node-head', TRANS_TYPE[nodeData.transType].class]">
            <span>{{ TRANS_TYPE[nodeData.transType].text }}</span>
            <label>{{ nodeData.transDate }} </label>
          </div>
          <div class="node-content">
            <div class="node-title">
              <el-tooltip :content="nodeData.corpName" placement="top">
                <span class="flex-1 nowarp">{{ nodeData.corpName }}</span>
              </el-tooltip>
              <!-- <svg-icon v-if="nodeData.transType === 'TRANSFER'" icon-class="transfer" @click="getDetail(nodeData.transNo)" /> -->
            </div>
            <div class="node-label">
              <div><label>编号：</label> <span>{{ nodeData.tokenNo }}</span></div>
              <div><label>数量：</label> <span>{{ nodeData.amount }}</span></div>
              <div v-if="nodeData.transType === 'CREDIT'">
                <label>授信有效期：</label> <span>{{ nodeData.expireDate }}</span>
              </div>
              <div v-if="nodeData.transType !== 'CREDIT'">
                <label>签发有效期：</label> <span>{{ nodeData.expireDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </organization-chart>
</template>

<script>
import OrganizationChart from 'vue-organization-chart'
import { CommonApi } from '@/api/index'
import 'vue-organization-chart/dist/orgchart.css'

// const data = {
//   level: 1,
//   corpName: '平台',
//   tokenNo: 'dfewfawwaef235234532wef23r2',
//   amount: 1999999,
//   transType: 'CREDIT',
//   transDate: '2019-08-15',
//   expireDate: '2019-08-15',
//   children: [
//     {
//       level: 2,
//       corpName: '华夏银行',
//       tokenNo: '368724789993009192',
//       amount: 1999999,
//       transType: 'CREDIT',
//       transDate: '2019-08-15',
//       expireDate: '2019-08-31',
//       children: [
//         {
//           level: 3,
//           corpName: '众安',
//           tokenNo: 'TOKEN111111',
//           amount: 1000,
//           transType: 'ISSUE',
//           transDate: '2019-08-07',
//           expireDate: '2019-08-31',
//           children: [
//             {
//               level: 4,
//               corpName: '上海擎亿科技发展有限公司',
//               tokenNo: '366226766161383445',
//               amount: 1000,
//               transType: 'LOAN',
//               transDate: '2019-08-08',
//               expireDate: '2019-08-31',
//               children: [
//                 {
//                   level: 5,
//                   corpName: '悦达通',
//                   tokenNo: '366590264991375463',
//                   amount: 1000,
//                   transType: 'REPAY',
//                   transDate: '2019-08-09',
//                   expireDate: '2019-08-31',
//                   children: []
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
// CREDIT("CREDIT","授信"),
//  ISSUE("ISSUE", "签发"),
//  TRANSFER("TRANSFER", "转让"),
//  LOAN("LOAN", "融资"),
//  REPAY("REPAY", "还款"),
export default {
  name: 'OrgChart',
  components: {
    OrganizationChart
  },
  props: {
    ds: {
      type: Object,
      default() {
        return {
          // ...data
        }
      }
    }
  },
  data () {
    return {
      TRANS_TYPE: {
        CREDIT: {
          class: 'quota',
          text: '授信'
        },
        ISSUE: {
          class: 'issue',
          text: '签发'
        },
        TRANSFER: {
          class: 'transfer',
          text: '转出'
        },
        LOAN: {
          class: 'loan',
          text: '融资'
        },
        REPAY: {
          class: 'repay',
          text: '还款'
        },

      }
    }
  },

  methods: {
    log(e) {
      console.log(e)
    },
    getDetail(transNo) {
      if (!transNo) return
      debugger
      CommonApi.queryTransferTokenTransNotice({ transNo }).then(res => {
        if (res.data) {
          window.open(res.data)
        }
      })
    }
  }
}
</script>

<style lang="scss" >
.orgchart-container {
  height: 800px;
  width: 100%;
  color: $titleColor;
}
.parent {
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, .1);
}
.parent:before {
  content: "";
  display: none !important;
}
.orgchart {
  width: 100%;
  background: #fff;
  .node {
      width: 260px;
      &:hover {
        background-color: #fff;
      }
  }
}
.orgchart .lines {
  .downLine {
    background-color: $border;
  }
  .rightLine {
    border-right: 1px solid $border;
  }
  .topLine {
    border-top: 2px solid $border;
  }
  .leftLine {
    border-left: 1px solid $border;
  }
}

.node-box {
  border: 1px solid $border;
  position: relative;
  color: $titleColor;
  border-radius: 4px;
  &.quota {
    border-color: $quota;
    box-shadow: 0px 2px 12px 0px $quotaBg;
    &:hover {
      box-shadow: 0px 2px 12px 0px $quotaHover;
    }
  }
  &.transfer {
    border-color: $transfer;
    box-shadow: 0px 2px 12px 0px $transferBg;
    &:hover {
      box-shadow: 0px 2px 12px 0px $transferHover;
    }
  }
  &.issue {
    border-color: $issue;
    box-shadow: 0px 2px 12px 0px $issueBg;
    &:hover {
      box-shadow: 0px 2px 12px 0px $issueHover;
    }
  }
  &.loan {
    border-color: $loan;
    box-shadow: 0px 2px 12px 0px $loanBg;
    &:hover {
      box-shadow: 0px 2px 12px 0px $loanHover;
    }
  }
  &.repay {
    border-color: $repay;
    box-shadow: 0px 2px 12px 0px $repayBg;
    &:hover {
      box-shadow: 0px 2px 12px 0px $repayHover;
    }
  }
}
.node-first {
  font-size: 18px;
  padding: 10px 20px;
  text-align: center;
}
.node-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  font-size: 12px;
  background-color: $pageBg;
  span {
    padding: 2px 4px;
    font-size: 12px;
    border-radius: 4px;
  }
  label {
    color: $labelColor;
    font-weight: 300;
  }
  &.quota {
    background-color: $quotaBg;
    span {
      color: #fff;
      background-color: $quota;
    }
  }
  &.transfer {
    background-color: $transferBg;
    span {
      color: #fff;
      background-color: $transfer;
    }
  }
  &.issue {
    span {
      color: #fff;
      background-color: $issue;
    }
    background-color: $issueBg;
  }
  &.loan {
    span {
      color: #fff;
      background-color: $loan;
    }
    background-color: $loanBg;
  }
  &.repay {
    span {
      color: #fff;
      background-color: $repay;
    }
    background-color: $repayBg;
  }
}
.node-title {
  line-height: 30px;
  font-size: 14px;
  font-weight: 500;
  color: $titleColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 20px;
  }
}
.node-content {
  background-color: #fff;
  text-align-last: left;
  padding: 4px 10px 10px;
  border-radius: 4px;
  .node-label {
    color: $labelColor;
    font-size: 12px;
    line-height: 1.5;
    label {
      font-weight: 400;
    }
  }
}
.node-box::before {
  content: "▼";
  position: absolute;
  top: -16px;
  left: 50%;
  color: $border;
  transform: translateX(-50%);
}
</style>
