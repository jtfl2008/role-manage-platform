'use strict';

const Service = require('egg').Service;
const BasicAuth = require('basic-auth');
const crypto = require('crypto');
class SystemService extends Service {
  async createSys() {
    const body = this.ctx.request.body;
    let newSys = {};
    newSys.system_name = body.system_name;
    newSys.created_by = body.created_by;
    const pwd = body.system_password;
    newSys.encrypted_password = crypto.createHash('md5').update(pwd).digest('hex');
    // 需要权限,权限规则后面补上
    let result = {};
    if (newSys.system_name && newSys.created_by) {
      // 如果没有同名的system,则插入
      let SQL_str = `insert into system_info(system_name,created_by,encrypted_password) select '${
        newSys.system_name
      }','${newSys.created_by}','${
        newSys.encrypted_password
      }' from dual where not exists(select system_name from system_info where system_name='${
        newSys.system_name
      }')`;
      const feedback = await this.app.mysql.query(SQL_str);
      if (feedback.affectedRows === 1) {
        //创建系统成功后，需要创建一个默认角色
        await this.app.mysql.insert('role_info',{
          role_name: 'admin',
          system_id: feedback.insertId,
          created_by: newSys.created_by
        });
        // 返回新增系统的信息
        const newSysInfo = await this.app.mysql.select('system_info', {
          where: {
            system_id: feedback.insertId,
          },
        });
        result = { code: 1, msg: '创建成功！', data: newSysInfo };
      } else {
        result = { code: 0, msg: 'system已经存在' };
      }
    } else {
      result = { code: 0, msg: 'system_name 或 created_by 不能为空' };
    }

    return result;
  }
  async getSysList() {
    const data = await this.app.mysql.select('system_info');
    return data;
  }
  async getSysInfo() {
    let id = this.ctx.params.id;
    let sysId = this.ctx.system_id;
    if(+id !== +sysId) {
      return '无权访问！';
    }
    const option = {
      where: { system_id: id },
    };
    const sysInfo = await this.app.mysql.select('system_info', option);
    if (sysInfo.length) {
      const roleList = await this.app.mysql.select('role_info', {
        ...option,
        columns: ['role_id', 'role_name'],
      });
      const resourceList = await this.app.mysql.select('resource_info', {
        ...option,
        columns: ['resource_id', 'resource_name'],
      });
      return { ...sysInfo[0], roleList, resourceList };
    } else {
      return sysInfo;
    }
  }
  async deleteSys() {
    let id = this.ctx.params.id;
    let sysId = this.ctx.system_id;
    if(+id !== +sysId) {
      return '无权访问！';
    }
    const mysql = this.app.mysql;
    const option = {
      system_id: sysId,
    };
    const result = await mysql.delete('system_info', option);
    // 删除系统下的全部关联信息
    await mysql.delete('resource_role_info', option);
    await mysql.delete('user_role_info', option);
    await mysql.delete('resource_info', option);
    await mysql.delete('role_info', option);
    if (result.affectedRows) {
      return { code: 1, msg: '删除成功' };
    } else {
      return { code: 1, msg: '系统不存在' };
    }
  }
  // 更新系统名称或密码
  async updateSys() {
    const body = this.ctx.request.body;
    let newData = {};
    const sysId = this.ctx.system_id;
    const name = body.system_name;
    const oldPwd = crypto
      .createHash('md5')
      .update(body.old_password)
      .digest('hex');;
    const newPwd = crypto
      .createHash('md5')
      .update(body.new_password)
      .digest('hex');;
    if (name) {
      newData.system_name = name;
    }
    if (oldPwd && newPwd) {
      newData.encrypted_password = newPwd;
    }
    if (newData.system_name || newData.encrypted_password) {
      if (newData.encrypted_password) {
        // 验证旧密码是否正确
        const isPass = await this.app.mysql.select('system_info', {
          where: {
            encrypted_password: oldPwd,
            system_id: sysId,
          },
        });
        if (!isPass.length) {
          return { code: 0, msg: '密码错误！' };
        }
      }
      const result = await this.app.mysql.update(
        'system_info',
        { ...newData },
        {
          where: {
            system_id: sysId,
          },
        }
      );
      if (result.affectedRows === 1) {
        return { code: 1, msg: '更新成功' };
      } else {
        return { code: 1, msg: '系统不存在' };
      }
    } else {
      return { code: 0, msg: '参数为空，请检查' };
    }
  }
}

module.exports = SystemService;
