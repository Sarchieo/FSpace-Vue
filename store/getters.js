import * as caches from '../utils/cache'

export function userState(state) {
  return caches.loadLoginState()
}
