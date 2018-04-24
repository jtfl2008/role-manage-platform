'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('get()', () => {
  it('should get exists cluster', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.cluster
    const cluster = await ctx.service.cluster.getK8s('cnsz035206');
    assert(cluster.objectMeta.name);
  });

  it('should get null when cluster not exists', async () => {
    const ctx = app.mockContext();
    const cluster = await ctx.service.cluster.getK8s('cnsz035206');
    assert(!cluster.objectMeta.name);
  });
});
