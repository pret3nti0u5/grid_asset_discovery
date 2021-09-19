const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/assets',
    proxy({
      target: 'http://localhost:9200',
      changeOrigin: true,
    })
  );
};
