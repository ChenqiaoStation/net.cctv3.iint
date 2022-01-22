import { OSSTarget } from "./interfaces";

// 公司: 192.168.110.131
// 宿舍: 192.168.0.109
// 服务器: 1.15.80.141
const Host4NodeJS = "http://1.15.80.141:2021/api";
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

export { Host4NodeJS, Host4Springboot, useRandomColor, useUUID, useOSS };
