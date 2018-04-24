'use strict';
const Auth = require('basic-auth');
const crypto = require('crypto');
module.exports = () => {
  return async function auth(ctx, next) {
    const url = ctx.request.url;
    const exception = /(^\/$)|(\/role-manage\/login.*)|(^\/$)|(\/role-manage\/logout.*)|(\/role-manage\/logstate.*)/;
    if (exception.test(url)) {
      // 登录时，查找是否有对应的角色
      if (url.includes('/role-manage/login')) {
        const loginName = ctx.request.body.username;
        const checkRole = await ctx.app.mysql.select('user_role_relation', {
          where: {
            user_id: loginName,
            system_id: 1, // 默认主系统的Id
          },
        });
        // 如果没有对应角色
        if (checkRole.length) {
          await next();
        } else {
          ctx.body = '你没有权限访问该系统';
          ctx.status = 403;
        }
      } else {
        await next();
      }
    } else {
      const auth_name = Auth(ctx).name;
      const auth_pass = Auth(ctx).pass;
      console.log(Auth(ctx));
      let inputSysId = '';
      // md5加密
      const encrypted_password = crypto
        .createHash('md5')
        .update(auth_pass)
        .digest('hex');
      console.log(encrypted_password);
      const SQL = `select system_id from system_info where system_name='${auth_name}' and encrypted_password = '${encrypted_password}'`;
      const result = await ctx.app.mysql.query(SQL);
      console.log(result);
      if (result.length) {
        if (url.includes('/role-manage/system')) {
          // 检查当前所在的系统和传入的系统id是否一致
          try {
            inputSysId = ctx.request.body.system_id || ctx.params.id;
          } catch (error) {
            // console.log(error);
          }
          if (+inputSysId !== +result[0].system_id && inputSysId) {
            ctx.body = '无权限跨系统访问！';
            ctx.status = 403;
          } else {
            ctx.system_id = +result[0].system_id;
            await next();
          }
        } else {
          ctx.system_id = +result[0].system_id;
          await next();
        }
      } else {
        ctx.status = 401;
      }
    }
  };
};
