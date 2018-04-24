'use strict';

// add you build-in plugin here, example:
// exports.nunjucks = {
//   enable: true,
//   package: 'egg-view-nunjucks',
// };

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.mongoose = {
  enable: false,
  package: 'egg-mongoose',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
  maxAge: 12 * 3600 * 1000, // 半天
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
