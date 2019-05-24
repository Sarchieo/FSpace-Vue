const UserKey = 'f-space-user' 
const UserStatusKey = 'f-space-user-state'
const saveAreasKey = 'f-space-areas'

export function loadAreas() {
  return JSON.parse(localStorage.getItem(saveAreasKey))
}

export function saveAreas (data, context) {
  localStorage.setItem(saveAreasKey, data)
  return true
}

export function loadUser (context) {
  return context.$cookies.get(UserKey)
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

export function loadUserStatus(context) {
  console.log(context.$cookies.get(UserStatusKey) || false)
  return context.$cookies.get(UserStatusKey) || false
}

export function saveUserStatus (state, context) {
  context.$cookies.set(UserStatusKey, state, { 
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  return state
}

export function removeUserStatus (context) {
  context.$cookies.remove(UserStatusKey)
  return false
}


