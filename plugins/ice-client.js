import Vue from 'vue'
import { initIce, CALLBACK_ACTION, IceCallback } from '../config/index'

var communication

(function () {
  communication = initIce();
}());

Vue.prototype.IceCallback = IceCallback

Vue.prototype.$queryIce = function (moduleProxy, moduleName, methodName) {
  let len = arguments.length;
  let params = [];
  for (let i = 3; i < len - 1; i++) {
    params.push(arguments[i])
  }

  let callback = arguments[len - 1];
  if (!callback || callback.constructor === IceCallback.constructor) {
    throw new Error("callback is not IceCallback!")
  }
  console.log("ICE : ", moduleName, methodName, params);
  Ice.Promise.try(
    function () {
      callback.onCallback(CALLBACK_ACTION.READY, params);
      let proxy = communication
        .stringToProxy(moduleName)
        .ice_timeout(18000)
        .ice_invocationTimeout(18000)
        .ice_twoway()
        .ice_preferSecure(true);
      // proxy.ice_timeout(1000).ice_twoway().ice_secure(false);

      return moduleProxy.checkedCast(proxy)
    }
  )
    .then(
      function (remoteProxy) {
        return params.length > 0 ? remoteProxy[methodName].apply(remoteProxy, params) : remoteProxy[methodName].apply(remoteProxy);
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