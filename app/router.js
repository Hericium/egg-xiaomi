'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  // admin =====================================
  // login
  router.get('/admin/login', 'admin.login.index');
  router.get('/admin/captcha', 'admin.login.captcha');
  router.post('/admin/doLogin', 'admin.login.doLogin');
  router.get('/admin/doLoginOut', 'admin.login.doLoginOut');
  // manager
  router.get('/admin/manager/index', 'admin.manager.index');
  router.get('/admin/manager/add', 'admin.manager.add');
  router.get('/admin/manager/edit', 'admin.manager.edit');
  // access
  router.get('/admin/access/index', 'admin.access.index');
  router.get('/admin/access/add', 'admin.access.add');
  router.get('/admin/access/edit', 'admin.access.edit');
  // role
  router.get('/admin/role/index', 'admin.role.index');
  router.get('/admin/role/add', 'admin.role.add');
  router.post('/admin/role/doAdd', 'admin.role.doAdd');
  router.get('/admin/role/edit', 'admin.role.edit');
  router.post('/admin/role/doEdit', 'admin.role.doEdit');
};
