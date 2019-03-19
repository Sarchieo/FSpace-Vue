import * as caches from '../utils/cache'

export default {
  user: caches.loadUser(),
  userState: caches.loadLoginState()
}