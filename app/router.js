'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  app.redirect('/', '/admin/login');

  // admin =====================================
  // 公共方法
  // 删除
  router.get('/admin/base/delete', 'admin.base.delete');
  // 修改状态
  router.get('/admin/base/changeStatus', 'admin.base.changeStatus');
  // 直接修改内容
  router.get('/admin/base/editNum', 'admin.base.editNum');
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
  // banner
  router.get('/admin/banner/index', 'admin.banner.index');
  router.get('/admin/banner/add', 'admin.banner.add');
  router.post('/admin/banner/doAdd', 'admin.banner.doAdd');
  router.get('/admin/banner/edit', 'admin.banner.edit');
  router.post('/admin/banner/doEdit', 'admin.banner.doEdit');
  // goodsType
  router.get('/admin/goodsType/index', 'admin.goodsType.index');
  router.get('/admin/goodsType/add', 'admin.goodsType.add');
  router.post('/admin/goodsType/doAdd', 'admin.goodsType.doAdd');
  router.get('/admin/goodsType/edit', 'admin.goodsType.edit');
  router.post('/admin/goodsType/doEdit', 'admin.goodsType.doEdit');

  // goodsTypeAttribute
  router.get('/admin/goodsTypeAttribute/index', controller.admin.goodsTypeAttribute.index);
  router.get('/admin/goodsTypeAttribute/add', controller.admin.goodsTypeAttribute.add);
  router.get('/admin/goodsTypeAttribute/edit', controller.admin.goodsTypeAttribute.edit);
  router.post('/admin/goodsTypeAttribute/doEdit', controller.admin.goodsTypeAttribute.doEdit);
  router.post('/admin/goodsTypeAttribute/doAdd', controller.admin.goodsTypeAttribute.doAdd);
};
