// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import '../theme/index.css';
import ElementUI from 'element-ui';
import Axios from 'axios';
import _ from 'lodash';
import store from './store';
import utils from './utils';
import ECharts from 'vue-echarts/components/ECharts';
import Md5 from 'md5';
import { Base64 } from 'js-base64';

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

// import mock data from mock.js
require('./mock/index.js');

// bind lodash, moment and alert to Vue.prototype
Object.defineProperties(Vue.prototype, {
  _: {
    value: _,
    writable: false,
  },
  $http: {
    value: Axios,
    writable: false,
  },
  utils: {
    value: utils,
    writable: false,
  },
  Md5: {
    value: Md5,
    writable: false,
  },
  Salt: {
    value: 'v587',
    writable: false,
  },
  Base64: {
    value: Base64,
    writable: false,
  },
});

Vue.use(ElementUI);
Vue.component('chart', ECharts);

Vue.config.productionTip = false;

Axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 500;
};

// 添加请求拦截器,每次请求前携带token
Axios.interceptors.request.use(
  request => {
    request.headers['x-Token'] = sessionStorage.getItem('token');
    request.auth = {
      username: 'mainSystem',
      password: 123,
    };
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
Axios.interceptors.response.use(
  response => {
    switch (response.status) {
      case 401:
        return response;
      default:
        return response;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
