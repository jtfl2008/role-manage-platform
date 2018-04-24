// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

const proxyUrls = [
  '/login', // 登陆
  '/logout', // 登出
  '/logstate', // 获取登陆信息
  '/role-manage', // 系统管理
];
const proxyTable = {};
const targetAddress = 'http://localhost:3000';
proxyUrls.forEach(url => {
  proxyTable[url] = {
    target: targetAddress,
    changeOrigin: true,
  };
});

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../server/app/view/index.html'),
    assetsRoot: path.resolve(__dirname, '../../server/app/public/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    env: require('./dev.env'),
    useEslint: true,
    port: process.env.PORT || 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
};
