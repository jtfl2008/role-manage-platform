'use strict';
const Service = require('egg').Service;
class ResourceService extends Service {
  // 创建资源
  async createResource() {
    const body = this.ctx.request.body;
    const sysId = this.ctx.system_id;
    const type = body.resource_type;
    const name = body.resource_name;
    const val = body.value;
    const creater = body.created_by;
    let result = {};
    if (type && name && sysId && creater && val) {
      const SQL = `insert into resource_info(resource_type,resource_name,system_id,created_by,value) select '${type}','${name}','${sysId}','${creater}','${val}' from dual where not exists(select resource_name from resource_info where resource_name='${name}' and system_id=${sysId}) `;
      const feedback = await this.app.mysql.query(SQL);
      if (feedback.affectedRows === 1) {
        // 成功后返回该条数据
        const callback = await this.app.mysql.select('resource_info', {
          where: {
            resource_id: feedback.insertId,
          },
        });
        result = { code: 1, msg: '添加成功', data: callback };
      } else {
        result = { code: 0, msg: `资源${name}已存在！` };
      }
    } else {
      result = {
        code: 0,
        msg: 'Error！参数有误',
      };
    }

    return result;
  }
  // 获取资源列表
  async getResourceList() {
    const sysId = this.ctx.system_id;
    const data = this.app.mysql.select('resource_info', {
      where: {
        system_id: sysId,
      },
    });
    return data;
  }
  // 获取资源详情
  async getResourceInfo() {
    const id = this.ctx.params.id;
    const sysId = this.ctx.system_id;
    return await this.app.mysql.select('resource_info', {
      where: {
        resource_id: id,
        system_id: sysId,
      },
    });
  }
  // 删除单个资源
  async deleteResource() {
    const id = this.ctx.params.id;
    const sysId = this.ctx.system_id;
    const mysql = this.app.mysql;
    let data = {};
    const result = await mysql.query(`delete from resource_info where resource_id=${id} and system_id=${sysId}`);
    // 删除其他表的引用
    await mysql.query(`delete from resource_role_relation where resource_id=${id} and system_id=${sysId}`);
    if (result.affectedRows) {
      data = { code: 1, msg: '删除成功' };
    } else {
      data = { code: 0, msg: '资源不存在' };
    }
    return data;
  }
  // 更新资源
  async updateResource() {
    const body = this.ctx.request.body;
    const id = body.resource_id;
    const sysId = this.ctx.system_id;
    console.log('系统id' + sysId);
    const name = body.resource_name;
    const type = body.resource_type;
    const value = body.value;
    const row = {};
    const option = {
      where: {
        resource_id: id,
        system_id: sysId,
      },
    };
    let message = {};
    if (name) {
      row.resource_name = name;
    }
    if (type) {
      row.resource_type = type;
    }
    if (value) {
      row.value = value;
    }
    if (type || name || value) {
      const checkName = await this.app.mysql.query(
        `select count(*) from resource_info where resource_id=${id} and system_id=${sysId}`
      );
      if (checkName[0]['count(*)']) {
        const result = await this.app.mysql.update(
          'resource_info',
          row,
          option
        );
        if (result.affectedRows === 1) {
          message = { code: 1, msg: '更新成功' };
        } else {
          message = { code: 0, msg: '更新失败' };
        }
      } else {
        message = { code: 0, msg: '资源不存在' };
      }
    } else {
      message = { code: 0, msg: '参数有误，请检查' };
    }
    return message;
  }
}

module.exports = ResourceService;
