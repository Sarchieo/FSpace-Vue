import * as types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_LOGIN_STATE] (state, status) {
    state.userStatus = status
  }
}
export default mutations