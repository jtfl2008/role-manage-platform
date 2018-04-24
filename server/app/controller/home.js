'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

function encrypt(data) {
  const cipher = crypto.createCipher('aes-128-ecb', 'v587');
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

class HomeController extends Controller {
  async index() {
    // 获取 index.html
    await this.ctx.render('index');
  }
  async login() {
    // 登录
    const ctx = this.ctx;
    const result = await this.service.home.login();
    if (result && result !== 'unauthorized') {
      // env参数标记来自开发环境的登录
      if (ctx.request.body.env === 'dev') {
        const encrypted = encrypt(JSON.stringify(result));
        ctx.body = { code: 1, encrypted };
      } else {
        // 非dev环境
        ctx.session.user_id = result.user_id;
        ctx.session.username = result.username;
        ctx.session.role = result.role || ['admin'];
        // ctx.session.token = result.token;
        ctx.body = Object.assign(result, { code: 1 });
      }
    } else {
      let msg = '';
      if (result === 'unauthorized') {
        msg = '你没有权限访问该系统！';
      } else {
        ('登录失败，账号或密码错误');
      }
      ctx.body = { code: 0, msg };
    }
  }
  async logout() {
    // 登出
    this.ctx.session = null;
    this.ctx.body = { code: 1 };
  }
  async logstate() {
    // 获取登录状态
    const ctx = this.ctx;
    ctx.body = {
      code: 1,
      logState: !!ctx.session.user_id,
      username: ctx.session.username,
      user_id: ctx.session.user_id,
      role: ctx.session.role || [],
      // token: ctx.session.token,
    };
  }
  async decrypt() {
    const result = await this.service.home.decrypt();
    const ctx = this.ctx;
    if (!result) {
      ctx.session = null;
      ctx.body = { code: 0, msg: '非法加密串' };
      return;
    }
    ctx.session.user_id = result.user_id;
    ctx.session.username = result.username;
    ctx.session.role = result.role || [];
    // ctx.session.token = result.token;
    ctx.body = Object.assign(result, { code: 1 });
  }
}

module.exports = HomeController;
