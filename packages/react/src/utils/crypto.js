import CryptoJS from 'crypto-js';

const SALT = 'DIANZI';

export function encryption(origin) {
  const hmacMD5 = CryptoJS.HmacMD5(origin, SALT).toString(CryptoJS.enc.Hex);
  return hmacMD5;
}
