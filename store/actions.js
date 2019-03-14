import * as types from './mutation-types'


// export const login = (context, code) => {
//   return new Promise(((resolve, reject) => {

//   }))
// }

// // 保存用户个人信息
// export const  setUser = function ({commit, state}, user) {
//   commit(types.SET_USER, saveUser(user))
// }
const actions = {
  async setUser({ commit }, { user }) {
    commit(types.SET_USER, saveUser(user))
  }
}

export default actions