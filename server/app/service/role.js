'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async createRole() {
    const body = this.ctx.request.body;
    const newRole = {};
    const sysId = this.ctx.system_id;

    newRole.role_name = body.role_name;
    newRole.system_id = sysId;
    newRole.created_by = body.created_by;
    let result = {};
    if (newRole.role_name && newRole.system_id && newRole.created_by) {
      // 如果没有同名的role，则插入
      const SQL = `insert into role_info(role_name,system_id,created_by) select '${
        newRole.role_name
      }',${newRole.system_id},'${
        newRole.created_by
      }' from dual where not exists(select role_name,system_id from role_info where role_name='${
        newRole.role_name
      }' and system_id=${sysId})`;
      const feedback = await this.app.mysql.query(SQL);
      if (feedback.affectedRows) {
        const callback = await this.app.mysql.select('role_info', {
          where: {
            role_id: feedback.insertId,
          },
        });
        result = { code: 1, msg: '添加成功', data: callback };
      } else {
        result = { code: 0, msg: '角色已经存在' };
      }
    } else {
      result = { code: 0, msg: 'error! 参数不能为空' };
    }
    return result;
  }
  async getRolesList() {
    const sysId = this.ctx.system_id;
    const data = await this.app.mysql.select('role_info', {
      where: {
        system_id: sysId,
      },
    });
    return data;
  }
  async getRoleInfo() {
    const id = this.ctx.params.id;
    const sysId = this.ctx.system_id;
    return await this.app.mysql.select('role_info', {
      where: {
        role_id: id,
        system_id: sysId,
      },
    });
  }
  async deleteRole() {
    const mysql = this.app.mysql;
    const roleId = this.ctx.params.id;
    const sysId = this.ctx.system_id;
    await mysql.query(`delete from role_info where role_id = ${roleId} and system_id=${sysId}`);
    // 删除其他关联表信息
    await mysql.query(`delete from user_role_relation where role_id = ${roleId} and system_id=${sysId}`);
    await mysql.query(`delete from resource_role_relation where role_id = ${roleId} and system_id=${sysId}`);
    return { code: 1, msg: '删除成功' };
  }
  async updateRole() {
    const body = this.ctx.request.body;
    const roleId = body.role_id;
    const roleName = body.role_name;
    const sysId = this.ctx.system_id;
    const option = {
      where: {
        role_id: roleId,
        system_id: sysId,
      },
    };
    let message = {};
    if (roleName) {
      const result = await this.app.mysql.update(
        'role_info',
        { role_name: roleName },
        option
      );
      if (result.affectedRows === 1) {
        message = { code: 1, msg: '更新成功' };
      } else {
        message = { code: 1, msg: '数据已经更新' };
      }
    } else {
      message = { code: 0, msg: '参数为空，请检查' };
    }
    return message;
  }
}
module.exports = RoleService;
