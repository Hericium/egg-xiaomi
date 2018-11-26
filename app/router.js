'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 爬虫新闻网站
  router.get('/', controller.home.index);
  router.get('/details', controller.details.index);

  // 提交post csrf
  router.get('/post', controller.post.index);
  router.post('/post', controller.post.add);
};
