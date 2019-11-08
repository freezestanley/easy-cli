import request from 'utils/request';

// // 添加基本信息
// export function addBasicInfoApi({
//   policyNo,
//   caseNo,
//   advanceNo,
//   capitalType,
//   insuranceName,
//   insuranceCardType,
//   idCardF,
//   idCardB,
//   hospital,
//   reason,
//   item1,
//   hospitalizationDate,
//   rtgs,
//   stamp,
//   advanceAmount,
//   capitalAmount,
//   otherAcInfo,
// }) {
//   return request({
//     url: '/api/hil/advanceCase/addCase',
//     method: 'post',
//     data: {
      
//     }
//   });
// }

// 添加（一次性全部添加）
export function addCaseInfoApi(data) {
  return request({
    url: '/api/hil/advanceCase/addCaseInfo',
    method: 'post',
    data,
  });
}

// 添加基本信息
export function addBasicInfoApi(data) {
  return request({
    url: '/api/hil/advanceCase/addCase',
    method: 'post',
    data,
  });
}

// 添加借款人信息
export function addLoanInfoApi(data) {
  return request({
    url: '/api/hil/advanceCase/addLoanCustomer',
    method: 'post',
    data,
  });
}

// 添加上传资料
export function addUploadInfoApi(data) {
  return request({
    url: '/api/hil/advanceCase/addCaseMaterial',
    method: 'post',
    data,
  });
}
