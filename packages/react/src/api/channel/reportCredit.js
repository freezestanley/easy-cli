import request from 'utils/request';

// 列表接口
export function getListApi({
  caseNo,
  advanceNo,
  overDays,
  queryType,
  bwName,
  insureName,
  pageSize,
  pageNum,
}) {
  return request({
    url: '/zhengxin/queryZhenxinByPage',
    method: 'post',
    data: {
      caseNo,
      advanceNo,
      overDays,
      queryType,
      bwName,
      insureName,
      pageSize,
      pageNum,
    }
  });
}

// 上报征信
export function reportApi({
  idList,
}) {
  return request({
    url: '/zhengxin/sbzx',
    method: 'post',
    data: {
      idList,
    }
  });
}
