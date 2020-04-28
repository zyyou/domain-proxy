module.exports = {
  port: 10000,
  workPath: './test',
  pathList: [
    { path: '/api/', target: 'http://192.168.5.145/mock/193/customer/api' },
    { path: '/test', target: 'https://www.toutiao.com' },
  ],
};
