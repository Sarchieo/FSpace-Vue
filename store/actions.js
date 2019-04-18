import * as types from './mutation-types'
import {
  saveUser,
  removeUser,
  saveUserStatus,
  saveAreas,
  removeUserStatus
} from '../utils/cache'
const UserKey = 'f-space-user' 
const UserStatusKey = 'f-space-user-state'


const actions = {
  nuxtServerInit({ commit }, { app }) {
    if(app.$cookies.get(UserStatusKey)) {
      commit(types.SET_LOGIN_STATE, saveUserStatus(true, app))
      commit(types.SET_USER, saveUser(app.$cookies.get(UserKey), app))
    }
  },
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
  async setLogout(store, { context }) {
    store.commit(types.SET_USER, removeUser())
    store.commit(types.SET_LOGIN_STATE, removeUserStatus(context))
    
  }
}
export default actions