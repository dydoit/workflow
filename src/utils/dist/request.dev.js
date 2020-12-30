"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var service = _axios["default"].create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}); // 请求拦截


service.interceptors.request.use(function (config) {
  var token = _jsCookie["default"].get('token'); // alert('第一次：'+token)


  if (token && config.tokenFlag) {
    // 设置令牌请求头
    config.headers["authorization"] = token;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
}); // 响应拦截

service.interceptors.response.use(function (response) {
  if (response.data.status === 200) {
    return response.data;
  } else if (response.data.status === 302) {
    _jsCookie["default"].set('token', response.data.authorization); // sessionStorage.setItem('token', response.data.authorization)


    sessionStorage.removeItem('user');
    var redirect = encodeURIComponent(location.href);
    location.href = response.data.url + '&sysUrl=' + redirect;
  } else if (response.data.status === 500) {
    if (response.data.url) {
      location.href = response.data.url;
    } else {
      (0, _elementUi.Message)({
        message: '非法请求，请联系管理员',
        type: "error",
        duration: 2 * 1000
      });
    }
  }

  return response.data;
}, function (error) {
  return Promise.reject(error);
});
var _default = service;
exports["default"] = _default;