'use strict';
const Controller = require('egg').Controller;
class UserroleController extends Controller {
  async setRole() {
    const data = await this.service.userrole.setRole();
    this.ctx.body = data;
  }
  async getRoles() {
    const data = await this.service.userrole.getRoles();
    this.ctx.body = { code: 1, data };
  }
  async getUsers() {
    const data = await this.service.userrole.getUsers();
    this.ctx.body = { code: 1, data };
  }
  async deleteRelation() {
    const data = await this.service.userrole.deleteRelation();
    this.ctx.body = data;
  }
}
module.exports = UserroleController;
