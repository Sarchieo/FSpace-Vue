// **********************************************************************
//
// Copyright (c) 2003-2017 ZeroC, Inc. All rights reserved.
//
// **********************************************************************

var Demo = communication; 

//
// Define a servant class that implements Demo.CallbackReceiver
// interface.
//

var id = new Ice.InitializationData();
id.properties = Ice.createProperties();

var communicator = Ice.initialize();


function iceTest() {
  debugger
  var CallbackReceiverI = Ice.Class(Demo.Receiver, {
    callback: function(num, current)
    {
        console.log("received callback #" + num);
    }
  });

  

  Ice.Promise.try(
    function()
    {
        //
        // Initialize the communicator and create a proxy to the sender object.
        //
        var proxy = communicator.stringToProxy("Sender:ws -h 192.168.1.145 -p 10000");

        //
        // Down-cast the proxy to the Demo.CallbackSender interface.
        //
        return Demo.SenderPrx.checkedCast(proxy).then(
            function(server)
            {
                //
                // Create the client object adapter.
                //
                return communicator.createObjectAdapter("").then(
                    function(adapter)
                    {
                        //
                        // Create a callback receiver servant and add it to
                        // the object adapter.
                        //
                        var r = adapter.addWithUUID(new CallbackReceiverI());

                        //
                        // Set the connection adapter.
                        //
                        proxy.ice_getCachedConnection().setAdapter(adapter);

                        //
                        // Register the client with the bidir server.
                        //
                        return server.addClient(r.ice_getIdentity());
                    });
            });
    }
).exception(
    function(ex)
    {
        console.log(ex.toString());
        Ice.Promise.try(
            function()
            {
                if(communicator)
                {
                    return communicator.destroy();
                }
            }
        ).finally(
            function()
            {
                process.exit(1);
            });
    });
}

export { iceTest }

//
// Exit on SIGINT or SIGBREAK
//
process.on(process.platform == "win32" ? "SIGBREAK" : "SIGINT", function()
    {
        if(communicator)
        {
            communicator.destroy().finally(
                function()
                {
                    process.exit(0);
                });
        }
    });