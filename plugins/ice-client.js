
import { iceGridInstanceName, serverIp, serverPort, CALLBACK_ACTION } from '../config/index'

let communication;

// 初始化ice连接
function initIce() {
  let args = ['--Ice.Default.Locator=' + iceGridInstanceName + '/Locator:ws -h ' + serverIp + ' -p ' + serverPort,
    'idleTimeOutSeconds=300',
    '--Ice.MessageSizeMax=4096'];
    communication = Ice.initialize(args)
    console.log(communication)
}
/**
 * 接口查询
 * @param {*} moduleName 模块名
 * @param {*} callback
 * @param  {...any} _IRequest 参数
 */
function refcallback(moduleName,_IRequest, callback) {
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
        
        callback.onCallback(CALLBACK_ACTION.COMPLETE, JSON.parse(result));
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

export { initIce, refcallback, CALLBACK_ACTION, IceCallback }



// var Demo = require("./sendRecvDemo").communication;

// //
// // Define a servant class that implements Demo.CallbackReceiver
// // interface.
// //
// var CallbackReceiverI = Ice.Class(Demo.Receiver, {
//     callback: function(num, current)
//     {
//         console.log("received callback #" + num);
//     }
// });

// var id = new Ice.InitializationData();
// id.properties = Ice.createProperties();

// var communicator = Ice.initialize();

// //
// // Exit on SIGINT or SIGBREAK
// //
// process.on(process.platform == "win32" ? "SIGBREAK" : "SIGINT", function()
//     {
//         if(communicator)
//         {
//             communicator.destroy().finally(
//                 function()
//                 {
//                     process.exit(0);
//                 });
//         }
//     });

// Ice.Promise.try(
//     function()
//     {
//         //
//         // Initialize the communicator and create a proxy to the sender object.
//         //
//         var proxy = communicator.stringToProxy("Sender:ws -h 192.168.1.145 -p 10000");

//         //
//         // Down-cast the proxy to the Demo.CallbackSender interface.
//         //
//         return Demo.CallbackSenderPrx.checkedCast(proxy).then(
//             function(server)
//             {
//                 //
//                 // Create the client object adapter.
//                 //
//                 return communicator.createObjectAdapter("").then(
//                     function(adapter)
//                     {
//                         //
//                         // Create a callback receiver servant and add it to
//                         // the object adapter.
//                         //
//                         var r = adapter.addWithUUID(new CallbackReceiverI());

//                         //
//                         // Set the connection adapter.
//                         //
//                         proxy.ice_getCachedConnection().setAdapter(adapter);

//                         //
//                         // Register the client with the bidir server.
//                         //
//                         return server.addClient(r.ice_getIdentity());
//                     });
//             });
//     }
// ).exception(
//     function(ex)
//     {
//         console.log(ex.toString());
//         Ice.Promise.try(
//             function()
//             {
//                 if(communicator)
//                 {
//                     return communicator.destroy();
//                 }
//             }
//         ).finally(
//             function()
//             {
//                 process.exit(1);
//             });
//     });