'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542984541094_5475';

  // add your config here
  config.middleware = [];

  // 配置ejs
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // 中间件
  exports.middleware = [
    'robot',
  ];
  // middleware config
  config.robot = {
    ip: [
      '127.0.0.1',
      '192.168.0.1',
    ],
  };

  // 接口api
  config.api = 'http://www.phonegap100.com/';
  return config;
};
