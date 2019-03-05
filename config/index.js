
export const iceGridInstanceName = "WLQ";
export const serverIp = "119.23.203.132";
export const serverPort = 4062;

const CALLBACK_ACTION = {
  READY: 1,
  COMPLETE: 2,
  ERROR: 3
};

function initIce() {
  let args = ['--Ice.Default.Locator=' + iceGridInstanceName + '/Locator:ws -h ' + serverIp + ' -p ' + serverPort,
    'idleTimeOutSeconds=300',
    '--Ice.MessageSizeMax=4096'];
  return Ice.initialize(args);
}

function IceCallback(args) {
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

export { initIce, CALLBACK_ACTION, IceCallback }

