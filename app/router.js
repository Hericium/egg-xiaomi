'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 爬虫新闻网站
  router.get('/', 'home.index');
  router.get('/details', 'details.index');

  // 提交post csrf
  router.get('/post', controller.post.index);
  router.post('/post', controller.post.add);
  router.get('/postde', controller.post.deleteCookies);

  // api(api 目录结构)
  router.get('/api/v1/blogs', 'api.v1.blogs.index');

  // admin(封装中间件)
  router.get('/admin', 'admin.login.index');
  router.get('/admin/login', 'admin.login.login');
  router.get('/admin/register', 'admin.login.register');
  router.post('/doLogin', 'admin.login.doLogin');
  router.post('/doRegister', 'admin.login.doRegister');
};
