import * as types from './mutation-types'

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_AREAS] (state, areas) {
    state.areas = areas
  },
  [types.SET_LOGIN_STATE] (state, status) {
    state.userStatus = status
  },
  [types.KEY_WORD] (state, keyword) {
    state.keyword = keyword
  }
}
export default mutations