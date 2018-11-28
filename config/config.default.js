'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542984541094_5475';

  // session
  config.session = {
    key: 'SESSION_ID',
    maxAge: 864000,
    encrypt: true,
    renew: true, // 延长会话有效期(刷新延长)
  };

  // 配置ejs
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // 中间件
  exports.middleware = [
    'robot', 'compress',
  ];
  // middleware config
  config.robot = {
    ip: [
      '127.0.0.2',
      '192.168.31.48',
    ],
  };

  // gzip 配置
  config.compress = {
    threshold: 1,
  };

  // 开发时关闭安全验证
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
    ],
  };
  // mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://root:pp123456@ds038888.mlab.com:38888/mongo',
      options: {},
    },
  };

  // 接口api
  config.api = 'http://www.phonegap100.com/';
  return config;
};
