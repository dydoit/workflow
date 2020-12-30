"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Home = _interopRequireDefault(require("@/views/Home"));

var _login = _interopRequireDefault(require("@/views/login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var vueRoutes = [{
  path: '/redirect',
  component: _login["default"]
}, {
  path: '/',
  component: _Home["default"],
  redirect: '/index',
  children: [{
    path: 'index',
    name: "Index",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/index/index.vue'));
      });
    },
    meta: {
      title: '首页',
      haveChild: false,
      icon: 'el-icon-shopping-cart-full'
    }
  }]
}, {
  path: '/workCenter',
  component: _Home["default"],
  redirect: '/workCenter/todo',
  meta: {
    title: '工作中心',
    haveChild: true,
    icon: 'el-icon-tickets'
  },
  children: [{
    path: 'add-work',
    name: 'addWork',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/work-center/add.vue'));
      });
    },
    meta: {
      title: '新增工单'
    },
    hidden: true
  }, {
    path: 'list',
    name: 'workList',
    meta: {
      title: '我的发起'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/work-center/list.vue'));
      });
    }
  }, {
    path: 'todo',
    name: 'todo',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/work-center/toDo.vue'));
      });
    },
    meta: {
      title: '我的待办'
    }
  }, {
    path: 'finished',
    name: 'finished',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/work-center/finished.vue'));
      });
    },
    meta: {
      title: '我的已办'
    }
  }, {
    path: 'delegate',
    name: 'delegate',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/work-center/delegate.vue'));
      });
    },
    meta: {
      title: '设置委托'
    }
  }, {
    path: 'apply',
    name: 'apply',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/work-center/apply.vue'));
      });
    },
    meta: {
      title: '办理工单'
    },
    hidden: true
  }, {
    path: 'detail',
    name: 'apply',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/work-center/detail.vue'));
      });
    },
    meta: {
      title: '工单详情'
    },
    hidden: true
  }]
}];
var _default = vueRoutes;
exports["default"] = _default;