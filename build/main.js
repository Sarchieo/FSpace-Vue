require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var pkg = __webpack_require__(7);

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: pkg.description }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/Ice.js' }, { src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/Glacier2.js' }, { src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/IceGrid.js' }, { src: 'https://cdnjs.cloudflare.com/ajax/libs/ice/3.6.3/IceStorm.js' }, { src: 'http://39.108.85.159:8080/wlq/info.js' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['ant-design-vue/dist/antd.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/antd-ui', { src: '@/plugins/fs-plugin.js', ssr: false }, { src: "~/plugins/vue-lazyload.js", ssr: false }],
  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.unknownContextCritical = false;
      }
    }
  }
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_Documents_FSpace_Vue_SSR_Demo_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_Documents_FSpace_Vue_SSR_Demo_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_Documents_FSpace_Vue_SSR_Demo_node_modules_babel_runtime_regenerator__);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_Documents_FSpace_Vue_SSR_Demo_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var nuxt, _nuxt$options$server, _nuxt$options$server$, host, _nuxt$options$server$2, port, builder;

    return __WEBPACK_IMPORTED_MODULE_0_D_Documents_FSpace_Vue_SSR_Demo_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Instantiate nuxt.js
            nuxt = new Nuxt(config);
            _nuxt$options$server = nuxt.options.server, _nuxt$options$server$ = _nuxt$options$server.host, host = _nuxt$options$server$ === undefined ? process.env.HOST || '127.0.0.1' : _nuxt$options$server$, _nuxt$options$server$2 = _nuxt$options$server.port, port = _nuxt$options$server$2 === undefined ? process.env.PORT || 3000 : _nuxt$options$server$2;

            // Build in development

            if (!config.dev) {
              _context.next = 8;
              break;
            }

            builder = new Builder(nuxt);
            _context.next = 6;
            return builder.build();

          case 6:
            _context.next = 10;
            break;

          case 8:
            _context.next = 10;
            return nuxt.ready();

          case 10:

            app.use(function (ctx) {
              ctx.status = 200;
              ctx.respond = false; // Bypass Koa's built-in response handling
              ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
              nuxt.render(ctx.req, ctx.res);
            });

            app.listen(port, host);
            consola.ready({
              message: 'Server listening on http://' + host + ':' + port,
              badge: true
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Koa = __webpack_require__(2);
var consola = __webpack_require__(6);

var _require = __webpack_require__(3),
    Nuxt = _require.Nuxt,
    Builder = _require.Builder;

var app = new Koa();

// Import and Set Nuxt.js options
var config = __webpack_require__(0);
config.dev = !(app.env === 'production');

start();

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("consola");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = {"name":"Project","version":"1.0.0","description":"My astonishing Nuxt.js project","author":"Sarchieo","private":true,"scripts":{"dev":"cross-env NODE_ENV=development nodemon server/index.js --watch server","build":"nuxt build","start":"cross-env NODE_ENV=production node server/index.js","generate":"nuxt generate"},"dependencies":{"cross-env":"^5.2.0","nuxt":"^2.4.0","koa":"^2.6.2","ant-design-vue":"^1.1.10","ice":"^3.6.3"},"devDependencies":{"nodemon":"^1.18.9","vue-lazyload":"^1.2.6"}}

/***/ }
/******/ ]);
//# sourceMappingURL=main.map