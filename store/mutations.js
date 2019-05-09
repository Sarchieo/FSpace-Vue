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
  },
  [types.SELECTED_KEYS] (state, selectedKeys) {
    state.selectedKeys = selectedKeys
  },
  [types.IS_NEW_NOTICE] (state, status) {
    state.isNewNotice = status
  },
  [types.IS_NOTICE_TEXT] (state, text) {
    state.noticeText = text
  }
}
export default mutations