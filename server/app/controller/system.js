'use strict';
const Controller = require('egg').Controller;
class SystemController extends Controller {
  async createSys() {
    const data = await this.service.system.createSys();
    this.ctx.body = data;
  }
  async getSysList() {
    const data = await this.service.system.getSysList();
    this.ctx.body = { code: 1, data };
  }
  async getSysInfo() {
    const data = await this.service.system.getSysInfo();
    this.ctx.body = { code: 1, data };
  }
  async deleteSys() {
    const data = await this.service.system.deleteSys();
    this.ctx.body = data;
  }
  async updateSys() {
    const data = await this.service.system.updateSys();
    this.ctx.body = data;
  }
}

module.exports = SystemController;
