login ({ commit }, { username, password }) {
  return fetch('/api/login', {
    // 发送客户端 cookies 到服务端
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then((res) => {
    if (res.status === 401) {
      throw new Error('Bad credentials')
    } else {
      return res.json()
    }
  })
  .then((authUser) => {
    commit('SET_USER', authUser)
  })
}

logout ({ commit }) {
  return fetch('/api/logout', {
    // 发送客户端 cookies 到服务端
    credentials: 'same-origin',
    method: 'POST'
  })
  .then(() => {
    commit('SET_USER', null)
  })
}

export { login }