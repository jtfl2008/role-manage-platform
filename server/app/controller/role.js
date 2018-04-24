'use strict';
const Controller = require('egg').Controller;

class RoleController extends Controller {
  async createRole() {
    const data = await this.service.role.createRole();
    this.ctx.body = data;
  }
  async getRolesList() {
    const data = await this.service.role.getRolesList();
    this.ctx.body = { code: 1, data };
  }
  async getRoleInfo() {
    const data = await this.service.role.getRoleInfo();
    this.ctx.body = { code: 1, data };
  }
  async deleteRole() {
    const data = await this.service.role.deleteRole();
    this.ctx.body = data;
  }
  async updateRole() {
    const data = await this.service.role.updateRole();
    this.ctx.body = data;
  }
}
module.exports = RoleController;
