import { initIce, IceCallback, refcallback, initIceLong } from './ice-client'

(function () {
  initIce();
}());

// 全局注入
export default ({ app }, inject) => {
  inject('iceCallback', IceCallback)
  inject('refcallback', refcallback)
  inject('initIceLong', initIceLong)
}
