import { BASE_URL } from 'utils/constant';
import request from 'utils/request';

export const UPLOAD_URL = BASE_URL + '/api/ops/ossApi/upload';

// 下载文件
export function downloadFile(fileUrl) {
  return request({
    url: '/api/ops/ossApi/downLoad?fileUrl=' + fileUrl,
    method: 'POST',
    responseType: 'blob', // ms-stream IE中支持这个
    headers: {
      'Content-Type': 'text/html;charset=utf-8'
    }
  });
}
