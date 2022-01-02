const Host4NodeJS = "http://localhost:2021/api";
const Host4Springboot = "http://localhost:8080";

/** 随机颜色 */
const useRandomColor = () => {
  return `#${Math.random().toString(16).replace(/0\./, "").substring(0, 6)}`;
};

/** uuid */
const useUUID = () => {
  return `${Math.random().toString(36).replace(/0\./, "").substring(0, 8)}`;
};

export { Host4NodeJS, Host4Springboot, useRandomColor, useUUID };
