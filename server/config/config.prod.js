'use strict';

module.exports = () => {
  const config = {};

  /**
   * egg-mysql mysql 数据库连接配置
   * @property {Object} client - 单数据库连接配置
   * @property {Boolean} app - 是否加载到 app 上，默认开启
   * @property {Boolean} agent - 是否加载到 agent 上，默认关闭
   */
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'database-name',
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
      host: '127.0.0.1',
      port: '6379',
      password: 'auth',
      db: '0',
      keyPrefix: 'prefix-',
    },
    agent: true,
  };

  /**
   * egg-mongoose mongodb 连接配置
   */
  config.mongoose = {
    url: 'mongodb://127.0.0.1/db',
    options: {},
  };

  /**
   * url-list
   */
  config.urlList = {
    loginUrl: 'http://30.16.47.71/a/3rd/login',
  };

  return config;
};
