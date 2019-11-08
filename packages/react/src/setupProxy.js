const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/apiMid',
      { 
        target: 'http://17225-finance-hil-hil-ops.test.za-tech.net/',
        // target: 'http://192.168.25.82:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/apiMid': ''
        }
      })
  );
  app.use(
    proxy('/sug',
      {
        target: 'https://suggest.taobao.com/',
        changeOrigin: true,
      })
  );
};
