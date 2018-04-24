'use strict';
const Service = require('egg').Service;
class UserroleService extends Service {
  async setRole() {
    const body = this.ctx.request.body;
    const sysId = this.ctx.system_id;
    // user_id 需要操作的用户id
    let user = body.user_id; // user_id为数组
    const role = body.role_id;
    const creater = body.created_by;
    let result = {};
    if (user.length === 1 && user[0] === '') {
      user = [];
    } else if (!Array.isArray(user)) {
      return { code: 0, msg: 'user_id必须为数组' };
    }
    if (role && creater) {
      // 先判断是否存在该角色
      const isRole = await this.app.mysql.select('role_info', {
        where: {
          system_Id: sysId,
          role_id: role,
        },
      });
      if (!isRole.length) {
        return { code: 0, msg: '角色还没创建！' };
      }
      // 一个用户可以有多个角色
      await this.app.mysql.delete('user_role_relation', {
        role_id: +role,
        system_id: sysId,
      });
      if ((user.length === 1 && user[0] === '') || !user.length) {
        result = { code: 1, data: { role_id: role } };
        return result;
      }
      for (let i = 0; i < user.length; i++) {
        if (user[i]) {
          const SQL = `insert into user_role_relation(user_id,role_id,created_by,system_id) select '${user[i]}',${role},'${creater}',${sysId} from dual 
          where not exists(select role_id,user_id from user_role_relation where role_id=${role} and user_id='${user[i]}' and system_id=${sysId})`;
          await this.app.mysql.query(SQL);
          result = {
            code: 1,
            msg: '操作成功！',
            data: { role_id: role, user_id: user },
          };
        }
      }
    } else {
      result = { code: 0, msg: 'Error! 参数有误或为空' };
    }
    return result;
  }
  async getRoles() {
    const userId = this.ctx.params.userId;
    const sysId = this.ctx.system_id;
    // 返回的日期是user 和 role 建立关系的时间，不是创建role的时间
    const result = await this.app.mysql.query(
      `select u.role_id, r.role_name from user_role_relation u join role_info r on(u.user_id='${userId}' and u.system_id=${sysId} and u.role_id=r.role_id and u.system_Id=r.system_id) `
    );
    return { roles: result };
  }
  async getUsers() {
    const roleId = this.ctx.params.roleId;
    const sysId = this.ctx.system_id;
    // 返回的日期是user 和 role 建立关系的时间，不是创建user的时间
    const result = await this.app.mysql.query(
      `select r.user_id, u.username from user_role_relation r join user_info u on(r.role_id=${roleId} and r.system_id=${sysId} and u.user_id=r.user_id)`
    );
    const userList = [];
    for (let i = 0; i < result.length; i++) {
      userList.push(result[i].user_id);
    }
    return { users: result };
  }
  async deleteRelation() {
    console.log(this.ctx.system_id);
    const body = this.ctx.request.body;
    const roleId = body.role_id;
    const userId = body.user_id;
    const sysId = this.ctx.system_id;
    let message = {};
    if (roleId && userId && sysId) {
      await this.app.mysql.delete('user_role_relation', {
        user_id: userId,
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
module.exports = UserroleService;
