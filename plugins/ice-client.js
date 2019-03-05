
import { iceGridInstanceName, serverIp, serverPort, CALLBACK_ACTION } from '../config/index'

let communication;

// 初始化ice连接
function initIce() {
  let args = ['--Ice.Default.Locator=' + iceGridInstanceName + '/Locator:ws -h ' + serverIp + ' -p ' + serverPort,
    'idleTimeOutSeconds=300',
    '--Ice.MessageSizeMax=4096'];
    communication = Ice.initialize(args)
}
/**
 * 接口查询
 * @param {*} moduleProxy 模块代理
 * @param {*} moduleName 模块名
 * @param {*} methodName 方法名
 * @param {*} callback
 * @param  {...any} params 参数
 */
function queryIce(moduleProxy, moduleName, methodName, callback, ...params) {
  if (!params) {
    params = []
  }
  if (!callback || callback.constructor === IceCallback.constructor) {
    throw new Error("callback is not IceCallback!")
  }
  console.log("ICE : ",moduleName,methodName,params);
  Ice.Promise.try(
    function () {
      callback.onCallback(CALLBACK_ACTION.READY, params);
      let proxy = communication
        .stringToProxy(moduleName)
        // .ice_timeout(18000)
        // .ice_invocationTimeout(18000)
        .ice_twoway()
        .ice_preferSecure(true);
      // proxy.ice_timeout(1000).ice_twoway().ice_secure(false);

      return moduleProxy.checkedCast(proxy)
    }
  )
    .then(
      function (remoteProxy) {
        let result
        if (params.length > 0) {
          result = remoteProxy[methodName].apply(remoteProxy,params)
        }else{
          result = remoteProxy[methodName].apply(remoteProxy)
        }
        return result;
        // return params.length > 0 ? remoteProxy[methodName].apply(remoteProxy, params) : remoteProxy[methodName].apply(remoteProxy);
      }
    )
    .then(
      function (result) {
        callback.onCallback(CALLBACK_ACTION.COMPLETE, result);
      }
    )
    .exception(
      function (e) {
        callback.onCallback(CALLBACK_ACTION.ERROR, e);
        process.exit(1);
      }
    )
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

export { initIce, queryIce, CALLBACK_ACTION, IceCallback }

