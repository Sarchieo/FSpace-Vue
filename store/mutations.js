import * as types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_LOGOUT] (state) {
    state.user = null
  }
}
export default mutations