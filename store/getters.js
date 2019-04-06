import * as caches from '../utils/cache'

export function userStatus() {
  return function(context) {
    if(process.client) {
      return caches.loadUserStatus(context)
    }
  }
}

export function user() {
  return function(context) {
    if(process.client) {
      return caches.loadUser(context)
    }
  }
}

export function areas(state, getters) {
  if(process.client) {
    return caches.loadAreas()
  }
}