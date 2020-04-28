# domain-proxy

前后分离工程静态服务器，支持跨域代理

# 工程根目录配置文件 proxy.config.js

```
module.exports = {
  port: 10000,
  workPath: './test',
  pathList: [
    { path: '/api/', target: 'http://192.168.5.145/mock/193/customer/api' },
    { path: '/test', target: 'https://www.toutiao.com' },
  ],
};

```

# 使用方式

```
# 安装
npm i domain-proxy

# package.json 中添加 script

  "scripts": {
    "dev:proxy": "domain-proxy",
  },

```
