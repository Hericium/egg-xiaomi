'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  // admin =====================================
  // 删除
  router.get('/admin/base/delete', 'admin.base.delete');
  router.get('/admin/base/changeStatus', 'admin.base.changeStatus');
  // login
  router.get('/admin/login', 'admin.login.index');
  router.get('/admin/captcha', 'admin.login.captcha');
  router.post('/admin/doLogin', 'admin.login.doLogin');
  router.get('/admin/doLoginOut', 'admin.login.doLoginOut');
  // manager
  router.get('/admin/manager/index', 'admin.manager.index');
  router.get('/admin/manager/add', 'admin.manager.add');
  router.post('/admin/manager/doAdd', 'admin.manager.doAdd');
  router.get('/admin/manager/edit', 'admin.manager.edit');
  router.post('/admin/manager/doEdit', 'admin.manager.doEdit');
  // access
  router.get('/admin/access/index', 'admin.access.index');
  router.get('/admin/access/add', 'admin.access.add');
  router.post('/admin/access/doAdd', 'admin.access.doAdd');
  router.get('/admin/access/edit', 'admin.access.edit');
  router.post('/admin/access/doEdit', 'admin.access.doEdit');
  // role
  router.get('/admin/role/index', 'admin.role.index');
  router.get('/admin/role/add', 'admin.role.add');
  router.post('/admin/role/doAdd', 'admin.role.doAdd');
  router.get('/admin/role/edit', 'admin.role.edit');
  router.post('/admin/role/doEdit', 'admin.role.doEdit');
  router.get('/admin/role/auth', 'admin.role.auth');
  router.post('/admin/role/doAuth', 'admin.role.doAuth');
  // upload
  router.get('/admin/upload/upload', 'admin.upload.upload');
  router.post('/admin/upload/doUpload', 'admin.upload.doUpload');
};
