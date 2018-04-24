'use strict';
const Service = require('egg').Service;
const axios = require('axios');
const _ = require('lodash');
const crypto = require('crypto');
const userList = require('../../data/userlist');
// 默认系统
function decrypt(data) {
  const decipher = crypto.createDecipher('aes-128-ecb', 'v587');
  return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
}
class HomeService extends Service {
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    const umUrlMap = {
      prod: 'http://30.16.47.71/a/3rd/login',
      stg: 'http://30.4.39.172/a/3rd/login',
      dev: 'http://10.20.26.53:30080/a/3rd/login',
    };
    const url = umUrlMap[process.env.EGG_SERVER_ENV] || umUrlMap.prod;
    // 白名单 用username作为user_id
    const user = _.find(userList, {
      user_id: body.username,
      password: body.password,
    });
    // 验证权限
    // 白名单登录
    if (user) {
      // 更新用户信息
      await this.updateUser({
        userId: user.user_id,
        userName: user.username,
        sysName: this.ctx,
      });
      // egg-jwt 创建token
      // const token = this.app.jwt.sign(
      //   { user_id: user.user_id },
      //   this.config.jwt.secret
      // );
      return {
        user_id: user.user_id,
        username: user.username,
        role: user.role_name,
        // token,
      };
    }
    const that = this;
    return new Promise((resolve, reject) => {
      axios
        .request({
          url,
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: `u=${body.username}&p=${body.password}`,
          auth: {
            username: 'icore_node_ebcs',
            password: 'v587',
          },
        })
        .then(async res => {
          const data = res.data;
          if (!_.isEmpty(res) && !res.error) {
            // const token = that.app.jwt.sign(
            //   { user_id: data.uid },
            //   this.config.jwt.secret
            // );
            const user = {
              user_id: data.uid,
              username: data.userName,
              // 默设置认为admin
              role: ['admin'],
              // token,
            };
            await that.updateUser({
              userId: user.user_id,
              userName: user.username,
            });
            resolve(user);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          console.warn('失败');
          reject(err);
        });
    });
  }
  // 更新用户表、用户-角色关系表，角色表
  async updateUser({ userId, userName }) {
    const mysql = this.app.mysql;
    // 查询用户
    const dbUser = await mysql.select('user_info', {
      where: {
        user_id: userId,
      },
    });
    const user_info_obj = {
      username: userName,
      user_id: userId,
    };
    if (!dbUser.length) {
      // 如果数据库不存在该用户，则新增用户并返回用户ID
      await mysql.insert('user_info', user_info_obj);
    } else {
      const SQL_str = `update user_info u SET u.last_login_time=u.login_time, u.login_time=now() WHERE u.user_id='${userId}'`;
      // 如果已经存在，更新用户登录信息并返回用户ID
      await mysql.query(SQL_str);
    }
  }
  async decrypt() {
    const ctx = this.ctx;
    try {
      const user = JSON.parse(decrypt(ctx.request.body.str));
      this.updateUser({ userId: user.user_id, userName: user.username });
      return user;
    } catch (e) {
      return false;
    }
  }
}
module.exports = HomeService;
