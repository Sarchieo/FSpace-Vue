import * as types from './mutation-types'
import {
  saveUser,
  removeUser,
  saveUserStatus
} from '../utils/cache'

const actions = {
  async setUserStatus(store, { context }) {
    store.commit(types.SET_LOGIN_STATE, saveUserStatus(true, context))
  },
  async setUser(store, { context, user } ) {
    store.commit(types.SET_USER, saveUser(user, context))
  },
  async removeUser(store) {
    store.commit(types.REMOVE_USER, removeUser())
    store.commit(types.REMOVE_LOGIN_STATE, removeLoginState())
  },
  async nuxtServerInit (store, { params, route, req }) {
    // 初始化基础数据
    // return axios.get(process.env.url + '服务器地址').then((res) => {
    //   //code
    //   store.commit('setData', r.data)
    // }).catch((error) => {
    //   console.log(error)
    // })
  }
}
export default actions