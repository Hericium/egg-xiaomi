'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // admin
  router.resources('admin/managers', '/admin/managers', controller.admin.managers);
  router.resources('admin/access', '/admin/access', controller.admin.access);
  router.resources('admin/role', '/admin/role', controller.admin.role);
};
