// **********************************************************************
//
// Copyright (c) 2003-2017 ZeroC, Inc. All rights reserved.
//
// **********************************************************************

//
// Define a servant class that implements Demo.CallbackReceiver
// interface.
//

var id = new Ice.InitializationData();
id.properties = Ice.createProperties();

let args = ['--Ice.Default.Locator=' + 'DemoIceGrid' + '/Locator:ws -h ' + '192.168.1.145' + ' -p ' + '4062',
  'idleTimeOutSeconds=300',
  '--Ice.MessageSizeMax=4096'];
var communicator = Ice.initialize(args);
var serverInterface

function initIceLong() {
  Ice.Promise.try(
    function () {
      //
      // Initialize the communicator and create a proxy to the sender object.
      //

      // var ice = communicator.stringToProxy(args[0]);
      var proxy = communicator.stringToProxy("orderServer" + 536862721 % 8192 / 65535);
      // var proxy = InterfacesPrxHelper.checkedCast(base);
      // communication = Ice.initialize(args)

      //
      // Down-cast the proxy to the Demo.CallbackSender interface.
      //
      return inf.InterfacesPrx.checkedCast(proxy).then(
        function (server) {

          a = server
          //
          // Create the client object adapter.
          //
          return communicator.createObjectAdapter("").then(
            function (adapter) {
              //
              // Create a callback receiver servant and add it to
              // the object adapter.
              //
              var r = new Ice.Identity();
              r.name = '536862721'

              //
              // Set the connection adapter.
              //
              adapter.add(new CallbackReceiverI(), r)
              proxy.ice_getCachedConnection().setAdapter(adapter);

              //
              // Register the client with the bidir server.
              //
              return server.online(r);
            });
        });
    }
  ).exception(
    function (ex) {
      console.log(ex.toString());
      Ice.Promise.try(
        function () {
          if (communicator) {
            return communicator.destroy();
          }
        }
      ).finally(
        function () {
          process.exit(1);
        });
    });
}



export { serverInterface }

//
// Exit on SIGINT or SIGBREAK
//
process.on(process.platform == "win32" ? "SIGBREAK" : "SIGINT", function () {
  if (communicator) {
    communicator.destroy().finally(
      function () {
        process.exit(0);
      });
  }
});