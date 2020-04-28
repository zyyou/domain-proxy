const Koa = require('koa');
const app = new Koa();
const path = require('path');
const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const bodyparser = require('koa-bodyparser');
const staticFiles = require('koa-static');

const config = require(`${process.cwd()}/proxy.config`);
config.port = config.port || 10000;
config.workPath = config.workPath || './';
if (!Array.isArray(config.pathList)) {
  config.pathList = [];
}

/**
 * 使用http代理请求转发，用于代理页面当中的http请求
 * 这个代理请求得写在bodyparse的前面，
 *
 */
app.use(async (ctx, next) => {
  const cfgPath = config.pathList.find(item => {
    return ctx.url.startsWith(item.path);
  });

  if (cfgPath) {
    const pathRewrite = {};
    pathRewrite[`^${cfgPath.path}`] = '';
    //匹配有api字段的请求url
    ctx.respond = false; // 绕过koa内置对象response ，写入原始res对象，而不是koa处理过的response
    await k2c(
      httpProxy.createProxyMiddleware({
        target: cfgPath.target,
        changeOrigin: true,
        secure: false,
        pathRewrite,
      }),
    )(ctx, next);
  }
  await next();
});

app.use(staticFiles(path.resolve(process.cwd(), config.workPath)));

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);

module.exports.start = function () {
  app.listen(config.port);
  console.info(`http://localhost:${config.port}`);
  console.info(`http://127.0.0.1:${config.port}`);
};
