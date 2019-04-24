
import { iceGridInstanceName, serverIp, serverPort, CALLBACK_ACTION } from '../config/index'
import Vue from 'vue'

let communication;

// 初始化ice连接, 注册中心
function initIce() {
  let args = ['--Ice.Default.Locator=' + iceGridInstanceName + '/Locator:ws -h ' + serverIp + ' -p ' + serverPort,
    'idleTimeOutSeconds=300',
    '--Ice.MessageSizeMax=4096'];
  //   let args = ['--Ice.Default.Locator=' + 'DemoIceGrid' + '/Locator:ws -h ' + '192.168.1.145' + ' -p ' + '4062',
  // 'idleTimeOutSeconds=300',
  // '--Ice.MessageSizeMax=4096'];
    communication = Ice.initialize(args)
}
/**
 * 接口查询
 * @param context 实例
 * @param {*} moduleName 模块名
 * @param {*} callback
 * @param  {...any} _IRequest 参数
 */
function refcallback(context, moduleName,_IRequest, callback) {
  if (!callback || callback.constructor === IceCallback.constructor) {
    throw new Error("callback is not IceCallback!")
  }
  Ice.Promise.try(
    function () {
      callback.onCallback(CALLBACK_ACTION.READY, _IRequest);
      let proxy = communication.stringToProxy(moduleName)
      return inf.InterfacesPrx.checkedCast(proxy)
    }
  )
    .then(
      function (remoteProxy) {
        return remoteProxy.accessService(_IRequest);
      }
    )
    .then(
      function (result) {
        let success = JSON.parse(result)
        if(success.code === -2 && context.$route.name !== 'user-login') {
          context.$message.error('开发环境提示: <触发登录失效处理> 可能是由于当前账号在别处登录 or 后台异常 系统将在10s后跳转登录页面', 10);
          context.$message.error('开发环境提示: 模块名<'+ _IRequest.cls + '>  方法名:<' + _IRequest.method + '>原因:' + success.message, 10);
          // context.$store
          //   .dispatch("setLogout", { context: context })
          //   .then(res => {
          //     // 跳转页面
          //     setTimeout(() => {
          //       context.$router.push({
          //         path: "/user/login"
          //       });
          //     }, 10000);
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
          // return
          callback.onCallback(CALLBACK_ACTION.COMPLETE, success);
        } else {
          callback.onCallback(CALLBACK_ACTION.COMPLETE, success);
        }
      }
    )
    .exception(
      function (e) {
        
        callback.onCallback(CALLBACK_ACTION.ERROR, e);
        process.exit(1);
      }
    )
}

/**
 * 初始化ice 长连接
 * @param {*} serverName 服务名
 * @param {*} compid 企业ID
 * @param {*} callback
 */
function initIceLong(serverName, compid, callback) {
  Ice.Promise.try(
    function () {
      let server_addr = serverName + Math.floor(compid % 8192 / 65535)  // 公司码 % 8192/65535 
      var proxy = communication.stringToProxy(server_addr);
      return inf.InterfacesPrx.checkedCast(proxy).then(
        function (server) {
          Vue.prototype.$longConnection = server
          // longConnection = server
          return communication.createObjectAdapter("").then(
            function (adapter) {
              var r = new Ice.Identity();
              r.name = compid + ''
              adapter.add(callback, r)
              proxy.ice_getCachedConnection().setAdapter(adapter);
              return server.online(r);
            });
        });
    }
  ).exception(
    function (ex) {
      console.log(ex.toString());
      Ice.Promise.try(
        function () {
          if (communication) {
            return communication.destroy();
          }
        }
      ).finally(
        function () {
          process.exit(1);
        });
    });
}

function IceCallback() {
  let len = arguments.length;
  if (len === 1) {
    this.completeCallback = arguments[0];
  }
  if (len === 2) {
    this.completeCallback = arguments[0];
    this.errorCallback = arguments[1];
  }
  if (len === 3) {
    this.readyCallback = arguments[0];
    this.completeCallback = arguments[1];
    this.errorCallback = arguments[2];
  }
}


IceCallback.prototype = {
  constructor: IceCallback,
  setFilter: function (callback) {
    this.filter = callback;
  },
  onCallback: function (state, obj) {
    if (this.filter) {
      nobj = this.filter.onCallback(state, obj);
      if (nobj) {
        obj = nobj;
      }
    }
    switch (state) {
      case CALLBACK_ACTION.READY:
        if (this.readyCallback) {
          return this.readyCallback(obj);
        }
        break
      case CALLBACK_ACTION.COMPLETE:
        if (this.completeCallback) {
          return this.completeCallback(obj);
        }
        break
      case CALLBACK_ACTION.ERROR:
        if (this.errorCallback) {
          return this.errorCallback(obj);
        }
        break
    }
  },
};

export { initIce, refcallback, initIceLong, CALLBACK_ACTION, IceCallback }