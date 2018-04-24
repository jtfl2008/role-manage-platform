'use strict';
const Controller = require('egg').Controller;
class ResourceroleController extends Controller {
  async getRoles() {
    const data = await this.service.resourcerole.getRoles();
    this.ctx.body = { code: 1, data };
  }
  async getResources() {
    const data = await this.service.resourcerole.getResources();
    this.ctx.body = { code: 1, data };
  }
  async setRoles() {
    // 传参必须都是数组,不能为空
    const data = await this.service.resourcerole.setRoles();
    this.ctx.body = data;
  }
  async setResource() {
    // 传参必须都是数组,不能为空
    const data = await this.service.resourcerole.setResource();
    this.ctx.body = data;
  }
  async deleteRelation() {
    const data = await this.service.resourcerole.deleteRelation();
    this.ctx.body = data;
  }
}
module.exports = ResourceroleController;
