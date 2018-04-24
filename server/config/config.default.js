'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  /**
   * middleware 配置，这里有的均开启
   */
  config.middleware = ['gzip', 'auth'];

  /**
   * Cookie 安全字符串
   */
  config.keys = 'v587';
  /**
   * egg-jwt
   */
  config.jwt = { secret: 'v587' };
  /**
   * gzip 中间件配置
   * @property {Number} threshold - 开启 gzip 的门槛，单位字节
   */
  config.gzip = { threshold: 512 };

  /**
   * egg-view 模板渲染引擎配置
   * @property {String} defualtExtension - 默认渲染引擎
   * @property {Object} mapping - 模板文件后缀及渲染引擎映射关系
   */
  config.view = { defaultExtension: '.html', mapping: { '.html': 'ejs' } };

  /**
   * egg-static 静态文件配置
   * @property {String} prefix - 静态文件默认前缀
   * @property {String} dir - 静态文件所在目录
   */
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public/'),
  };

  /**
   * egg-mysql mysql 数据库连接配置
   * @property {Object} client - 单数据库连接配置
   * @property {Boolean} app - 是否加载到 app 上，默认开启
   * @property {Boolean} agent - 是否加载到 agent 上，默认关闭
   */
  config.mysql = {
    client: {
      host: '10.20.26.53',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'rmp',
    },
    app: true,
    agent: false,
  };

  /**
   * egg-redis Redis 数据库连接配置
   * @property {Object} client - 单数据库连接配置
   * @property {Object} clients - 多数据库连接配置
   * @property {Boolean} agent - 是否加载到 agent 上，默认关闭
   */
  config.redis = {
    client: {
      host: '10.20.26.53',
      port: '6379',
      password: '',
      db: '0',
      keyPrefix: 'rmp-session-',
    },
    agent: true,
  };

  /**
   * egg-mongoose mongodb 连接配置
   */
  config.mongoose = { url: 'mongodb://127.0.0.1/db', options: {} };

  /**
   * egg-onerror 异常处理配置
   */
  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.set('X-Error-Message', encodeURI(err.message));
      ctx.status = 500;
      ctx.response.message = 'Server Internal Error';
    },
  };

  /**
   * egg-multipart 文件上传配置
   * @property {String} fileSize - 上传文件大小限制
   */
  config.multipart = { fileSize: '100mb' };

  /**
   * egg-security 安全配置
   */
  config.security = { csrf: { enable: false } };

  /**
   * url 地址列表
   */
  config.urlList = { loginUrl: 'http://10.20.26.53:30080/a/3rd/login' };
  /**
   * 自定义logs
   */
  // config.customLogger = {
  //   customLogger: {
  //     file: path.join(appInfo.root, 'logs/customLogger.log'),
  //   },
  // };
  return config;
};
