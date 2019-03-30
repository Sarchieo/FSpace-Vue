import * as caches from '../utils/cache'

export function userState(state) {
  return state.userState
}

export function areas() {
  if(process.client) {
    return caches.loadAreas()
  }
}