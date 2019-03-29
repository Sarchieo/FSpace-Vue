import * as types from './mutation-types'
import {
  saveUser,
  removeUser,
  saveUserStatus,
  saveAreas
} from '../utils/cache'

const actions = {
  async setUserStatus(store, { context }) {
    store.commit(types.SET_LOGIN_STATE, saveUserStatus(true, context))
  },
  async setUser(store, { context, user } ) {
    store.commit(types.SET_USER, saveUser(user, context))
  },
  async setAreas(store, { context, areas } ) {
    store.commit(types.SET_AREAS, saveAreas(areas, context))
  },
  async removeUser(store) {
    store.commit(types.REMOVE_USER, removeUser())
    store.commit(types.REMOVE_LOGIN_STATE, removeLoginState())
  },
  async nuxtServerInit ({ commit }, { req }) {
    
  }
}
export default actions