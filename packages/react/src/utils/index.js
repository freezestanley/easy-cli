import { downloadFile } from 'api/file';
/**
 * 将数值转换成千分位, dot表示保留的小数位
 * @param {numberr} num
 * @param {number} dot
 */
export function thousandPoint(num, dot = 0) {
  if (!num || num === 0) return '0';
  const res = Number(num).toLocaleString('zh-CN', { maximumFractionDigits: dot });
  return res.indexOf('.') === 0 ? '0' + res : res;
}

// 从请求url中将query参数中的文件名抽取出来
export function getUrlFileName(url = '') {
  const dUrl = decodeURIComponent(url);
  return dUrl.slice(dUrl.lastIndexOf('/') + 1);
}

export function downloadFileFun(url) {
  if (!url) return;
  downloadFile(encodeURIComponent(url));
}
