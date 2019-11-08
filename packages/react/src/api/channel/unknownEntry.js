import request from 'utils/request';

// 列表接口
export function getListApi({
  paymentNo,
  start,
  end,
  status,
  pageSize,
  pageNum,
}) {
  return request({
    url: '/api/hil/unEntry/unEntryList',
    method: 'post',
    data: {
      paymentNo,
      start,
      end,
      status,
      pageSize,
      pageNum,
    }
  });
}

// 案件号搜索接口
export function getAdNoApi({
  caseNo,
  // pageSize,
  // pageNum,
}) {
  return request({
    url: '/api/hil/unEntry/advanceNoList',
    method: 'post',
    data: {
      caseNo,
      // pageSize,
      // pageNum,
    }
  });
}

// 详情接口
export function getDetailApi(paymentNo) {
  return request({
    url: '/api/hil/unEntry/unEntryDetail',
    method: 'post',
    data: {
      paymentNo,
    }
  });
}

// 根据案件号查询垫资信息
export function getInfoByPaymentNoApi(caseNo) {
  return request({
    url: '/api/hil/unEntry/hospitalRefunInfo',
    method: 'post',
    data: {
      caseNo,
    }
  });
}

// 确认医院退费还款
export function confirmRefundApi({
  paymentNo,
  caseNo,
  confirmNote,
}) {
  return request({
    url: '/api/hil/payment/unKnowEntry',
    method: 'post',
    data: {
      paymentNo,
      caseNo,
      confirmNote,
    }
  });
}
