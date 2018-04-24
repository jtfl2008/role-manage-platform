'use strict';
const Controller = require('egg').Controller;
class ResourceController extends Controller {
  async createResource() {
    const data = await this.service.resource.createResource();
    this.ctx.body = data;
  }
  async getResourceList() {
    const data = await this.service.resource.getResourceList();
    this.ctx.body = { code: 1, data };
  }
  async getResourceInfo() {
    const data = await this.service.resource.getResourceInfo();
    this.ctx.body = { code: 1, data };
  }
  async deleteResource() {
    const data = await this.service.resource.deleteResource();
    this.ctx.body = data;
  }
  async updateResource() {
    const data = await this.service.resource.updateResource();
    this.ctx.body = data;
  }
}

module.exports = ResourceController;
