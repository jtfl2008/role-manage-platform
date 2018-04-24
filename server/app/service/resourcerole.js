'use strict';
const Service = require('egg').Service;
class RelationService extends Service {
  // 通过resource_id 查询对应的roles
  async getRoles() {
    const id = this.ctx.params.id;
    const sysId = this.ctx.system_id;
    let data = {};
    const result = await this.app.mysql.query(
      `select role_id from resource_role_relation where resource_id=${id} and system_id=${sysId}`
    );
    if (result.length) {
      const roleList = [];
      for (let i = 0; i < result.length; i++) {
        const res = await this.app.mysql.select('role_info', {
          where: {
            role_id: result[i].role_id,
            system_id: sysId,
          },
        });
        if (res.length) {
          roleList.push({
            role_id: result[i].role_id,
            role_name: res[0].role_name,
          });
        }
      }
      data = { roleList };
    } else {
      data = { roleList: [] };
    }
    return data;
  }
  // 通过role_id 查询对应的resources
  async getResources() {
    const id = this.ctx.params.id;
    const sysId = this.ctx.system_id;
    let data = {};
    const result = await this.app.mysql.query(
      `select resource_id from resource_role_relation where role_id=${id} and system_id=${sysId}`
    );
    if (result.length) {
      const resList = [];
      for (let i = 0; i < result.length; i++) {
        const res = await this.app.mysql.select('resource_info', {
          where: {
            resource_id: result[i].resource_id,
            system_id: sysId,
          },
        });
        if (res.length) {
          resList.push({
            resource_id: res[0].resource_id,
            resource_name: res[0].resource_name,
          });
        }
      }
      data = { resourceList: resList };
    } else {
      data = { resourceList: [] };
    }
    return data;
  }
  // 批量创建单个资源对多个角色的关系;
  async setRoles() {
    // 传参必须都是数组,不能为空
    const body = this.ctx.request.body;
    const roles = body.role_id;
    const resource = body.resource_id;
    const creater = body.created_by;
    const sysId = this.ctx.system_id;
    const isArrRole = Array.isArray(roles);
    const isArrRes = Array.isArray(resource);
    // 判断角色是否有创建
    let isCreated = 0;
    let data = {};
    if (isArrRole && roles.length && !isArrRes && resource && sysId) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i]) {
          const isRole = await this.app.mysql.select('role_info', {
            where: {
              system_Id: sysId,
              role_id: roles[i],
            },
          });
          if (!isRole.length) {
            // '角色还没创建！'
          } else {
            const SQL = `insert into resource_role_relation(role_id,resource_id,created_by,system_id) select ${
              roles[i]
            },${resource},'${creater}',${sysId} from dual
          where not exists(select role_id,resource_id,system_id from resource_role_relation where role_id=${
            roles[i]
          } and resource_id=${resource} and system_id=${sysId})`;
            await this.app.mysql.query(SQL);
            isCreated += 1;
          }
        }
      }
      if (!isCreated) {
        data = { code: 0, msg: '角色还没创建' };
      } else {
        data = { code: 1, msg: '创建成功' };
      }
    } else {
      data = { code: 0, msg: '参数格式有误' };
    }
    return data;
  }
  // 批量创建单个角色对多个资源的关系;
  async setResource() {
    // 传参必须都是数组,不能为空
    const body = this.ctx.request.body;
    const role = body.role_id;
    const resources = body.resource_id;
    const creater = body.created_by;
    const sysId = this.ctx.system_id;
    const isArrRole = Array.isArray(role);
    const isArrRes = Array.isArray(resources);
    // 判断资源是否有创建
    let isCreated = 0;
    let data = {};
    if (isArrRes && resources.length && !isArrRole && role && sysId) {
      const isRole = await this.app.mysql.select('role_info', {
        where: {
          system_Id: sysId,
          role_id: role,
        },
      });
      if (!isRole.length) {
        return { code: 0, msg: '角色还没创建！' };
      }
      for (let i = 0; i < resources.length; i++) {
        if (resources[i]) {
          const isResource = await this.app.mysql.select('resource_info', {
            where: {
              system_Id: sysId,
              role_id: resources[i],
            },
          });
          if (!isResource) {
            // 资源还没创建
          } else {
            const SQL = `insert into resource_role_relation(role_id,resource_id,created_by,system_id) select ${role},${
              resources[i]
            },'${creater}',${sysId} from dual 
            where not exists (select role_id,resource_id,system_id from resource_role_relation where role_id=${role} and resource_id=${
              resources[i]
            } and system_id=${sysId})`;
            await this.app.mysql.query(SQL);
            isCreated += 1;
          }
        }
      }
      if (!isCreated) {
        data = { code: 0, msg: '资源还没创建' };
      } else {
        data = { code: 1, msg: '创建成功' };
      }
    } else {
      data = { code: 0, msg: '参数格式有误' };
    }
    return data;
  }
  // 删除角色-资源对应关系
  async deleteRelation() {
    const body = this.ctx.request.body;
    const roleId = body.role_id;
    const resourceId = body.resource_id;
    const sysId = this.ctx.system_id;
    let message = {};
    if (roleId && resourceId && sysId) {
      await this.app.mysql.delete('resource_role_relation', {
        resource_id: resourceId,
        role_id: roleId,
        system_id: sysId,
      });
      message = { code: 1, msg: '已删除' };
    } else {
      message = { code: 0, msg: '参数错误' };
    }
    return message;
  }
}
module.exports = RelationService;
