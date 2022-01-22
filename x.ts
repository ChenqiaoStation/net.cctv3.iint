import { OSSTarget } from "./interfaces";
import CryptoJS from "crypto-js";

// 公司: 192.168.110.131
// 宿舍: 192.168.0.109
// 服务器: 1.15.80.141
const Host4NodeJS = "http://localhost:2021/api";
const Host4Springboot = "http://localhost:8080";

/**
 * 使用 OSS 生成图片链接
 * @param target
 * @returns
 */
const useOSS = (target: OSSTarget) => {
  return `https://net-cctv3.oss-cn-qingdao.aliyuncs.com/${target.project}/${target.target}/${target.file}`;
};

/** 随机颜色 */
const useRandomColor = () => {
  return `#${Math.random().toString(16).replace(/0\./, "").substring(0, 6)}`;
};

/** uuid */
const useUUID = () => {
  return `${Math.random().toString(36).replace(/0\./, "").substring(0, 8)}`;
};

/**
 * 定义加密函数
 * http://tool.chacuo.net/cryptaes
 * @param {string} data - 需要加密的数据, 传过来前先进行 JSON.stringify(data);
 * @param {string} key - 加密使用的 key，必须是 128->16位 | 192->24位 | 256->32位
 */
const aesEncrypt = (data: string, key?: string) => {
  /**
   * CipherOption, 加密的一些选项:
   *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
   *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
   *   iv: 偏移量, mode === ECB 时, 不需要 iv
   * 返回的是一个加密对象
   */

  // return CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key ?? AES_KEY), {
  //   mode: CryptoJS.mode.ECB,
  //   padding: CryptoJS.pad.Pkcs7,
  // }).ciphertext.toString(CryptoJS.enc.Base64);
  return CryptoJS.AES.encrypt(
    data,
    CryptoJS.enc.Utf8.parse(key || "@net.cctv3.xAPIs"),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).ciphertext.toString(CryptoJS.enc.Base64);
};

/**
 * 定义解密函数
 * @param {string} encrypted - 加密的数据;
 * @param {string} key - 加密使用的 key
 */
const aesDecrypt = (encrypted: string, key?: string) => {
  // 这里 mode, padding, iv 一定要跟加密的时候完全一样
  // 返回的是一个解密后的对象
  const decipher = CryptoJS.AES.decrypt(
    encrypted,
    CryptoJS.enc.Utf8.parse(key || "@net.cctv3.xAPIs"),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  // 将解密对象转换成 UTF8 的字符串
  return CryptoJS.enc.Utf8.stringify(decipher);
};

/**
 * 是否 JSON
 * @param {*} s
 * @returns
 */
const isJSON = (s: string) => {
  try {
    JSON.parse(s);
  } catch (e) {
    return false;
  }
};

/**
 * Http Get 请求
 * @param {*} url
 */
const useHttpGet = async (url: string) => {
  let request = await fetch(url);
  let text = await request.text();
  return JSON.parse(isJSON(text) ? text : aesDecrypt(text));
};

/**
 * Http Post 请求
 * @param url
 * @param body 请事先 JSON.stringify() 转成字符串
 * @returns
 */
const useHttpPost = async (url: string, body: string) => {
  let request = await fetch(url, {
    method: "POST",
    body,
  });
  let text = await request.text();
  return JSON.parse(isJSON(text) ? text : aesDecrypt(text));
};

export {
  Host4NodeJS,
  Host4Springboot,
  useRandomColor,
  useUUID,
  useOSS,
  aesDecrypt,
  aesEncrypt,
  useHttpGet,
  useHttpPost,
};
