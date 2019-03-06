import { initIce, IceCallback, queryIce } from './ice-client'
import utils from './commom'

(function () {
  initIce();
}());

// 全局注入
export default ({ app }, inject) => {
  inject('iceCallback', IceCallback)
  inject('queryIce', queryIce)
  inject('commom', utils)
}
