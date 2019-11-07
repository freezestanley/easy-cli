/**
 * 垫资管理
 */
import request from 'utils/request';

// 列表接口
export function getListApi({
  queryType,
  caseNo,
  advanceNo,
  insuranceName,
  contactPhone,
  capitalApplyTime,
  spCode,
  clerkId,
  fundCode,
  capitalType,
  status,
  hospital,
  pageSize,
  pageNum,
}) {
  return request({
    url: '/api/hil/advanceCase/query',
    method: 'post',
    data: {
      queryType,
      caseNo,
      advanceNo,
      insuranceName,
      contactPhone,
      capitalApplyTime,
      spCode,
      clerkId,
      fundCode,
      capitalType,
      status,
      hospital,
      pageSize,
      pageNum,
    }
  });
}

// 垫资详情接口
export function getApplyInfoApi(id) {
  return request({
    url: '/api/hil/advanceCase/detail',
    method: 'post',
    data: {
      id
    }
  });
}

// 放款信息
export function getLoanInfoApi(advanceNo) {
  return request({
    url: '/api/hil/advanceCase/loanInfoDetail',
    method: 'post',
    data: {
      advanceNo
    }
  });
}

// 还款计划
export function getRepayPlanApi(advanceNo) {
  return request({
    url: '/api/hil/advanceCase/loanRepayDetail',
    method: 'post',
    data: {
      advanceNo
    }
  });
}

// 还款明细
export function getRepayDetailApi({
  advanceNo,
  start,
  end,
  repayType,
  tradeSt,
}) {
  return request({
    url: '/api/hil/advanceCase/repayDetail',
    method: 'post',
    data: {
      advanceNo,
      start,
      end,
      repayType,
      tradeSt,
    }
  });
}
