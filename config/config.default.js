'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542984541094_5475';

  // 设置 session
  config.session = {
    key: 'SESSION_ID',
    maxAge: 864000,
    httpOnly: true,
    encrypt: true,
    renew: true, // 延长会话有效期
  };

  // add your config here
  config.middleware = [ 'auth' ];
  config.auth = {
    match: '/admin',
  };

  // 设置模板引擎
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // 设置数据库配置
  config.mongoose = {
    client: {
      url: 'mongodb://root:pp123456@ds038888.mlab.com:38888/mongo',
      options: {},
    },
  };
  return config;
};
