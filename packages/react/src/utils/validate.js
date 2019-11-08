/**
 * 模版阶段，校验用户名
 * @param {string} str 
 * @returns {boolean}
 */
export function validUsername(str) {
  const validMap = ['admin', 'editor'];
  return validMap.indexOf(str.trim()) >= 0;
}

// 统一社会信用代码校验 Unified Social Credit Code
export function isUSCC(val) {
  const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/;
  return reg.test(val);
}

// 身份证号码校验/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
export function isIdNo(val) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(val);
}

export const isPhone = function (val) {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  return reg.test(val);
};
