const UserKey = 'User' 
const saveUserStatusKey = 'userState'
const saveAreasKey = 'areas'


export function saveUserStatus (state, context) {
  context.$cookies.set(saveUserStatusKey, state, { 
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  return true
}

export function saveAreas (data, context) {
  // context.$cookies.set(saveAreasKey, data, { 
  //   path: '/',
  //   maxAge: 60 * 60 * 24 * 7
  // })
  localStorage.setItem(saveAreasKey, data)
  return true
}

export function loadAreas() {
  return JSON.parse(localStorage.getItem(saveAreasKey))
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