const urlMap = {
  dev: ['http://10.20.26.53:3003/'],
  prod: ['http://30.4.132.10:8088/'],
  local: ['http://localhost:8080/'],
  localJupyter: ['http://10.25.85.185'],
  devJupyter: ['http://10.25.85.185'],
  prodJupyter: [''],
};
// 检测当前的环境
function getEnv() {
  const curUrl = window.location.href;
  for (const env in urlMap) {
    const hasUrl = urlMap[env].some(e => {
      return curUrl.includes(e);
    });
    if (hasUrl) {
      return env;
    }
  }
  return '';
}

const utils = {
  urlMap,
  env: getEnv(),
};

export default utils;
