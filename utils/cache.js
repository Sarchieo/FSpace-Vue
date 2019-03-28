const UserKey = 'User' 
const saveUserStatusKey = 'userState'


export function saveUserStatus (state, context) {
  context.$cookies.set(saveUserStatusKey, state, { 
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  return true
}

export function removesaveUserStatus () {
  localStorage.removeItem(saveUserStatusKey)
  return false
}

export function loadUser () {
  return JSON.parse(localStorage.getItem(UserKey))
}

export function saveUser (userInfo,context) {
  context.$cookies.set(UserKey, userInfo, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
  });
  return userInfo
}

export function removeUser () {
  localStorage.removeItem(UserKey)
  return {}
}