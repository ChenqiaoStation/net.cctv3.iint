import { OSSTarget } from "./interfaces";

const Host4NodeJS = "http://localhost:2021/api";
const Host4Springboot = "http://localhost:8080";
const OSS = "net.cctv3.next/cover/%E5%B0%8F%E5%A7%90%E5%A7%90.png";

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
