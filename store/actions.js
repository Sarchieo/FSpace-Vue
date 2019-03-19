import * as types from './mutation-types'
import {
  saveUser,
  removeUser,
  saveLoginState,
  removeLoginState
} from '../utils/cache'

const actions = {
  async setUserState(store) {
    store.commit(types.SET_LOGIN_STATE, saveLoginState(200))
  },
  async setUser(store, user) {
    store.commit(types.SET_USER, saveUser(user))
  },
  async removeUser(store) {
    store.commit(types.REMOVE_USER, removeUser())
    store.commit(types.REMOVE_LOGIN_STATE, removeLoginState())
  }
}
export default actions