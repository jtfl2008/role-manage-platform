'use strict';

module.exports = app => {
  const { router, controller } = app;
  // login
  router.post('/role-manage/login', controller.home.login);
  // logout
  router.get('/role-manage/logout', controller.home.logout);
  // logstate
  router.get('/role-manage/logstate', controller.home.logstate);
  // system
  router.post('/role-manage/system', controller.system.createSys);
  router.get('/role-manage/system', controller.system.getSysList);
  router.get('/role-manage/system/:id', controller.system.getSysInfo);
  router.put('/role-manage/system', controller.system.updateSys);
  router.delete('/role-manage/system/:id', controller.system.deleteSys);
  // role
  router.post('/role-manage/role', controller.role.createRole);
  router.get('/role-manage/role', controller.role.getRolesList);
  router.get('/role-manage/role/:id', controller.role.getRoleInfo);
  router.delete('/role-manage/role/:id', controller.role.deleteRole);
  router.put('/role-manage/role', controller.role.updateRole);
  // user_role_relation
  router.post('/role-manage/userrole', controller.userrole.setRole);
  router.get('/role-manage/userrole/user/:userId', controller.userrole.getRoles);
  router.get('/role-manage/userrole/role/:roleId', controller.userrole.getUsers);
  router.delete('/role-manage/userrole', controller.userrole.deleteRelation);
  // resource
  router.post('/role-manage/resource', controller.resource.createResource);
  router.get('/role-manage/resource', controller.resource.getResourceList);
  router.get('/role-manage/resource/:id', controller.resource.getResourceInfo);
  router.delete('/role-manage/resource/:id', controller.resource.deleteResource);
  router.put('/role-manage/resource', controller.resource.updateResource);
  // resource_role_relation
  router.post('/role-manage/resourcerole/resource', controller.resourcerole.setRoles); // 批量创建单个资源对多个角色的关系
  router.post('/role-manage/resourcerole/role', controller.resourcerole.setResource); // 批量创建单个角色对多个资源的关系
  router.get('/role-manage/resourcerole/resource/:id', controller.resourcerole.getRoles);
  router.get('/role-manage/resourcerole/role/:id', controller.resourcerole.getResources);
  router.delete('/role-manage/resourcerole', controller.resourcerole.deleteRelation);
};
