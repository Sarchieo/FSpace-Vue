import { initIce, IceCallback, refcallback } from './ice-client'
import { generateIdentification } from './fingerprint2'
// import { iceTest } from './ice-client2'
import utils from './commom'

(function () {
  initIce();
  generateIdentification();
}());

// 全局注入
export default ({ app }, inject) => {
  inject('iceCallback', IceCallback)
  inject('refcallback', refcallback)
  // inject('iceTest', iceTest)
  inject('commom', utils)
}
